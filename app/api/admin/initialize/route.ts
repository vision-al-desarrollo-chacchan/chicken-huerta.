import {env} from 'cloudflare:workers';
import {authorizeAdmin,sameOrigin,database,response,errorResponse,ApiError} from '../../../../lib/catalog-server';
import {initializeCatalog} from '../../../../lib/catalog-data';
export async function POST(request:Request){try{const supplied=request.headers.get('x-catalog-seed-token');let actor='';if(supplied&&env.SEED_TOKEN&&supplied===env.SEED_TOKEN){actor='initial-import';}else{sameOrigin(request);actor=(await authorizeAdmin()).userId;}const created=await initializeCatalog(database(),actor);return response({ok:true,created});}catch(e){return errorResponse(e)}}
