import {authorizeAdmin,sameOrigin,database,response,errorResponse} from '../../../../lib/catalog-server';
import {productInput} from '../../../../lib/catalog-model';
import {addProduct} from '../../../../lib/catalog-data';
export async function POST(request:Request){try{sameOrigin(request);const user=await authorizeAdmin();const input=productInput.parse(await request.json());return response({product:await addProduct(database(),input,user.userId)},201)}catch(e){return errorResponse(e)}}
