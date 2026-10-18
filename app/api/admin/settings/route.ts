import {z} from 'zod';
import {authorizeAdmin,sameOrigin,response,errorResponse,ApiError} from '../../../../lib/catalog-server';
import {settingsInput} from '../../../../lib/catalog-model';
import {updateSettings} from '../../../../lib/catalog-data';
export async function PUT(request:Request){try{sameOrigin(request);const user=await authorizeAdmin(request);const {version,...settings}=settingsInput.extend({version:z.number().int().positive()}).parse(await request.json());const row=await updateSettings(user.db,settings,version);if(!row)throw new ApiError(409,'Los datos del local cambiaron. Actualiza el panel.');return response({ok:true,version:row.version});}catch(e){return errorResponse(e)}}
