import {authorizeAdmin,sameOrigin,response,errorResponse} from '../../../../lib/catalog-server';
export async function POST(request:Request){try{sameOrigin(request);await authorizeAdmin(request);return response({ok:true,created:false});}catch(e){return errorResponse(e)}}
