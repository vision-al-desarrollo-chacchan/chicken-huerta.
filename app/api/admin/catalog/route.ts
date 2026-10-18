import {authorizeAdmin,database,response,errorResponse} from '../../../../lib/catalog-server';
import {readCatalog} from '../../../../lib/catalog-data';
export const dynamic='force-dynamic';
export async function GET(){try{await authorizeAdmin();return response(await readCatalog(database(),true))}catch(e){return errorResponse(e)}}
