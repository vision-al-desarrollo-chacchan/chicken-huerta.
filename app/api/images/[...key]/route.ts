import {supabaseUrl} from '../../../../lib/supabase/config';
export async function GET(_request:Request,context:{params:Promise<{key:string[]}>}){const key=(await context.params).key.join('/');if(!/^products\/[a-z0-9-]+\.(jpg|png|webp|gif)$/.test(key))return new Response('Not found',{status:404});return Response.redirect(supabaseUrl+'/storage/v1/object/public/huerta-images/'+key,302);}
