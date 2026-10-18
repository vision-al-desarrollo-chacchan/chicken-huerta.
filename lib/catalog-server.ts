import {createClient} from '@supabase/supabase-js';
import {supabaseUrl,supabaseKey} from './supabase/config';
export class ApiError extends Error{constructor(public status:number,message:string){super(message)}}
export function database(token?:string){return createClient(supabaseUrl,supabaseKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false},...(token?{global:{headers:{Authorization:'Bearer '+token}}}:{})});}
export async function authorizeAdmin(request:Request){
 const token=request.headers.get('authorization')?.match(/^Bearer (\S+)$/)?.[1];
 if(!token)throw new ApiError(401,'Inicia sesión para administrar la carta.');
 const db=database(token);const {data,error}=await db.auth.getUser(token);
 if(error||!data.user?.email_confirmed_at)throw new ApiError(401,'Tu sesión venció o el correo no está confirmado. Inicia sesión nuevamente.');
 const {data:allowed,error:denied}=await db.rpc('is_huerta_admin');
 if(denied||!allowed)throw new ApiError(403,'Esta cuenta no tiene permiso para administrar Chicken Huerta.');
 return {userId:data.user.id,email:data.user.email,db};
}
export function sameOrigin(request:Request){if(request.headers.get('origin')!==new URL(request.url).origin)throw new ApiError(403,'La solicitud debe realizarse desde esta página.');}
export function response(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store'}});}
export function errorResponse(error:any){if(error instanceof ApiError)return response({error:error.message},error.status);if(error?.name==='ZodError')return response({error:error.issues.map((i:any)=>i.message).join('. ')},400);if(error instanceof SyntaxError)return response({error:'Los datos enviados no son válidos.'},400);console.error('Catalog operation failed',error?.code||'unknown');return response({error:'No se pudo completar la operación. Inténtalo de nuevo.'},500);}
