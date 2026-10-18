import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../app/chatgpt-auth';
import { isOwnerEmail } from './catalog-model';
export class ApiError extends Error{constructor(public status:number,message:string){super(message)}}
export function database(){if(!env.DB)throw new ApiError(503,'La base de datos no está disponible.');return env.DB;}
export async function authorizeAdmin(){const user=await getChatGPTUser();if(!user)throw new ApiError(401,'Inicia sesión para administrar la carta.');if(!isOwnerEmail(user.email,env.ADMIN_EMAIL))throw new ApiError(403,'Esta cuenta no tiene permiso para administrar Chicken Huerta.');return user;}
export function sameOrigin(request:Request){const origin=request.headers.get('origin');if(origin!==new URL(request.url).origin)throw new ApiError(403,'La solicitud debe realizarse desde esta página.');}
export function response(data:any,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store'}})}
export function errorResponse(error:any){if(error instanceof ApiError)return response({error:error.message},error.status);if(error?.name==='ZodError')return response({error:error.issues.map((i:any)=>i.message).join('. ')},400);if(error instanceof SyntaxError)return response({error:'Los datos enviados no son válidos.'},400);console.error('Catalog operation failed',error?.message);return response({error:'No se pudo completar la operación. Inténtalo de nuevo.'},500);}
