import type {SupabaseClient} from '@supabase/supabase-js';
import {defaults,type ProductInput} from './catalog-model';
export function productRow(r:any){return {id:r.id,name:r.name,category:r.category,description:r.description,priceCents:r.price_cents,imageKey:r.image_key,available:r.available,visible:r.visible,version:r.version,updatedAt:r.updated_at};}
function checked<T>(result:{data:T,error:any}){if(result.error)throw result.error;return result.data;}
export async function readCatalog(db:SupabaseClient,admin=false){
 let query=db.from('huerta_products').select('*').is('deleted_at',null).order('id');
 if(!admin)query=query.eq('visible',true);
 const [items,shop]=await Promise.all([query,db.from('huerta_settings').select('value,version').eq('id',1).single()]);
 const record=checked(shop);return {initialized:true,products:(checked(items)||[]).map(productRow),settings:{...defaults,...record.value},settingsVersion:record.version};
}
const fields=(p:ProductInput)=>({name:p.name,category:p.category,description:p.description,price_cents:p.priceCents,image_key:p.imageKey,available:p.available,visible:p.visible});
export async function addProduct(db:SupabaseClient,p:ProductInput,_actor:string){return productRow(checked(await db.from('huerta_products').insert(fields(p)).select().single()));}
export async function editProduct(db:SupabaseClient,id:number,p:ProductInput,version:number,_actor:string){const row=checked(await db.from('huerta_products').update(fields(p)).eq('id',id).eq('version',version).is('deleted_at',null).select().maybeSingle());return row?productRow(row):null;}
export async function hideProduct(db:SupabaseClient,id:number,version:number,_actor:string){const rows=checked(await db.from('huerta_products').update({visible:false,deleted_at:new Date().toISOString()}).eq('id',id).eq('version',version).is('deleted_at',null).select('id'));return {meta:{changes:rows?.length||0}};}
export async function updateSettings(db:SupabaseClient,value:unknown,version:number){const row=checked(await db.from('huerta_settings').update({value}).eq('id',1).eq('version',version).select('version').maybeSingle());return row;}
