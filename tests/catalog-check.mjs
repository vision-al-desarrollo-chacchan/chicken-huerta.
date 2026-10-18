import {build} from 'esbuild';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import assert from 'node:assert/strict';
const dir=await mkdtemp(join(tmpdir(),'huerta-supabase-'));
try{
 await build({entryPoints:['lib/catalog-server.ts'],outfile:join(dir,'server.mjs'),bundle:true,platform:'node',format:'esm'});
 await build({entryPoints:['lib/catalog-data.ts'],outfile:join(dir,'data.mjs'),bundle:true,platform:'node',format:'esm'});
 const {database,authorizeAdmin}=await import(join(dir,'server.mjs'));
 const {readCatalog}=await import(join(dir,'data.mjs'));
 const db=database();const catalog=await readCatalog(db);
 assert.equal(catalog.products.length,119);
 assert.equal(catalog.products.reduce((s,p)=>s+p.priceCents,0),260050);
 assert.equal(catalog.products.find(p=>p.id===181).priceCents,5600);
 assert.equal(catalog.settings.whatsapp,'51970530466');
 const {data:admins,error:denied}=await db.from('huerta_admins').select('*');
 assert.ok(denied);assert.equal(admins,null);
 const {error:writeDenied}=await db.from('huerta_products').update({price_cents:1}).eq('id',-1);
 assert.ok(writeDenied);
 await assert.rejects(()=>authorizeAdmin(new Request('https://example.test/api/admin/catalog',{headers:{'oai-authenticated-user-email':'owner@example.test','oai-authenticated-user-id':'forged'}})),e=>e.status===401);
 await assert.rejects(()=>authorizeAdmin(new Request('https://example.test/api/admin/catalog',{headers:{Authorization:'Bearer invalid'}})),e=>e.status===401);
 console.log('PASS: 119 productos, precios, ajustes, lectura pública, escritura y administradores bloqueados para visitantes, identidad falsa rechazada.');
}finally{await rm(dir,{recursive:true,force:true});}
