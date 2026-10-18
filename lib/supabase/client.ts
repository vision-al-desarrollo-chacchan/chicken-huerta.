import {createClient} from '@supabase/supabase-js';
import {supabaseUrl,supabaseKey} from './config';
let instance:ReturnType<typeof createClient>|undefined;
export function browserDatabase(){return instance??=createClient(supabaseUrl,supabaseKey);}
