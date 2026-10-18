import {requireChatGPTUser,chatGPTSignOutPath} from '../chatgpt-auth';
import {env} from 'cloudflare:workers';
import {isOwnerEmail} from '../../lib/catalog-model';
import AdminPanel from './AdminPanel';
export const dynamic='force-dynamic';
export default async function AdminPage(){const user=await requireChatGPTUser('/admin');if(!isOwnerEmail(user.email,env.ADMIN_EMAIL))return <main style={{padding:40,fontFamily:'Arial'}}><h1>Acceso restringido</h1><p>Esta cuenta no tiene permiso para administrar Chicken Huerta.</p><a href={chatGPTSignOutPath('/admin')} target="_top">Cambiar de cuenta</a></main>;return <AdminPanel displayName={user.displayName} signOut={chatGPTSignOutPath('/admin')}/>}
