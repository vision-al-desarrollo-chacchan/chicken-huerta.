import {z} from 'zod';
import {authorizeAdmin,sameOrigin,database,response,errorResponse,ApiError} from '../../../../lib/catalog-server';
import {settingsInput} from '../../../../lib/catalog-model';
export async function PUT(request:Request){try{sameOrigin(request);await authorizeAdmin();const input=settingsInput.extend({version:z.number().int().positive()}).parse(await request.json());const {version,...settings}=input;const result=await database().prepare("UPDATE settings SET value=?,version=version+1 WHERE key='shop' AND version=?").bind(JSON.stringify(settings),version).run();if(!result.meta.changes)throw new ApiError(409,'Los datos del local cambiaron. Actualiza el panel.');return response({ok:true,version:version+1})}catch(e){return errorResponse(e)}}
