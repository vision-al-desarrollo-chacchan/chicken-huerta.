import {authorizeAdmin,database,response,errorResponse} from '../../../../lib/catalog-server';
import {readCatalog} from '../../../../lib/catalog-data';
export const dynamic='force-dynamic';
export async function GET(request:Request){try{const user=await authorizeAdmin(request);return response(await readCatalog(user.db,true))}catch(e){return errorResponse(e)}}
