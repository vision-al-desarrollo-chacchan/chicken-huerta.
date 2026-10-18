'use client';
import {useEffect,useState,type FormEvent} from 'react';
import {browserDatabase} from '../../lib/supabase/client';
import AdminPanel from './AdminPanel';
import './admin.css';
export default function AdminGate(){
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[owner,setOwner]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(true);
 async function verify(){const db=browserDatabase();const {data,error}=await db.auth.getUser();if(error||!data.user){setOwner('');return;}const {data:allowed,error:denied}=await db.rpc('is_huerta_admin');if(denied||!allowed){setOwner('');setError('Esta cuenta no tiene permiso para administrar la carta.');return;}setOwner(data.user.email||'Propietario');}
 useEffect(()=>{verify().catch(()=>setError('No se pudo verificar la sesión.')).finally(()=>setBusy(false));},[]);
 async function login(e:FormEvent){e.preventDefault();setBusy(true);setError('');try{const {error}=await browserDatabase().auth.signInWithPassword({email:email.trim(),password});setPassword('');if(error)throw new Error('No se pudo iniciar sesión. Revisa tu correo, contraseña y confirmación de cuenta.');await verify();}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
 async function logout(){await browserDatabase().auth.signOut();setOwner('');setError('');}
 if(owner)return <AdminPanel displayName={owner} onSignOut={logout}/>;
 return <main className="login-page"><form onSubmit={login} className="login-card"><img src="/assets/chicken-huerta-logo.jpeg" width="80" height="80" alt="Chicken Huerta"/><h1>Administra tu carta</h1><p>Acceso exclusivo del propietario.</p>{error&&<p role="alert" className="admin-error">{error}</p>}<label>Correo electrónico<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Contraseña<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="red-btn" disabled={busy}>{busy?'Verificando…':'Iniciar sesión'}</button><a href="/">Volver a la carta</a></form></main>;
}
