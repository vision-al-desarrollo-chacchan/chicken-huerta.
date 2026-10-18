import {database,response,errorResponse} from '../../../lib/catalog-server';
import {readCatalog} from '../../../lib/catalog-data';
export const dynamic='force-dynamic';
export async function GET(){try{const catalog=await readCatalog(database());return response({products:catalog.products,settings:catalog.settings});}catch(e){return errorResponse(e)}}
