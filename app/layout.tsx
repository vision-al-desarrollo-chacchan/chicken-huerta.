import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Chicken Huerta · Pollos y parrillas',description:'Chicken Huerta en Puente Piedra. Carta, pollos y parrillas y pedidos por WhatsApp.',icons:{icon:'/assets/chicken-huerta-logo.jpeg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
