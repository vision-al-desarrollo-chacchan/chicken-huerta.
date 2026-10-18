'use client';
import React, { useState, useId, useEffect, useRef } from 'react';
import './polleria.css';
import type {ShopSettings} from '../../../lib/catalog-model';
type MenuItem={id:number;name:string;category:string;price:number;detail:string;color:string;tag:string;imageUrl:string|null;available:boolean;referenceImage?:boolean;imageCredit?:string};
const Food = ({
  kind = 'Pollos'
}: {
  kind?: string;
}) => {
  const uid = useId().replace(/:/g, '');
  return <svg viewBox="0 0 400 300" role="img" aria-label={kind === 'Bebidas' ? 'Ilustración de bebida' : kind === 'Extras' ? 'Ilustración de papas fritas' : 'Ilustración de pollo a la brasa con papas'} style={{
    width: '100%',
    height: '100%'
  }}><defs><radialGradient id={uid}><stop stopColor="#edaa43" /><stop offset=".6" stopColor="#b96022" /><stop offset="1" stopColor="#69341b" /></radialGradient><linearGradient id={uid + 'f'} x2="1" y2="1"><stop stopColor="#ffe198" /><stop offset="1" stopColor="#d89d35" /></linearGradient></defs>{kind === 'Bebidas' ? <g><path d="M165 50h70l-6 30 12 30v143q0 20-41 20t-41-20V110l12-30z" fill="#513227" /><rect x="170" y="32" width="60" height="25" rx="7" fill="#ad4927" /><path d="M159 137h82v60h-82z" fill="#ad4927" /><text x="200" y="173" textAnchor="middle" fill="#fff2cf" fontSize="17" fontFamily="Georgia">FRESCA</text><path d="M170 105v27" stroke="#a67552" strokeWidth="5" strokeLinecap="round" /></g> : <g><ellipse cx="200" cy="163" rx="178" ry="122" fill="#353d2e" /><ellipse cx="200" cy="158" rx="165" ry="110" fill="#434c37" />{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => <rect key={n} x={kind === 'Extras' ? 75 + n % 5 * 35 : 249 + n % 4 * 24} y={60 + Math.floor(n / 4) * 28} width="16" height="90" rx="4" transform={'rotate(' + (n % 2 ? 19 : -15) + ' ' + (kind === 'Extras' ? 190 : 290) + ' 140)'} fill={'url(#' + uid + 'f)'} stroke="#c99134" strokeWidth="1" />)}{kind !== 'Extras' && <g><ellipse cx="168" cy="148" rx="104" ry="76" transform="rotate(-15 168 148)" fill={'url(#' + uid + ')'} stroke="#6d3a21" strokeWidth="3" /><path d="M99 159q-30-27-48 3t37 49l49-25" fill={'url(#' + uid + ')'} stroke="#733d22" strokeWidth="3" /><path d="M227 160q33-30 51-1t-34 49l-39-29" fill={'url(#' + uid + ')'} stroke="#733d22" strokeWidth="3" /><path d="M116 106q43-34 85-21" stroke="#f5bc64" strokeWidth="6" strokeLinecap="round" opacity=".6" /><path d="M127 144l70-21m-62 39 70-21m-61 38 70-21" stroke="#65391f" strokeWidth="4" opacity=".4" />{[0, 1, 2, 3, 4, 5, 6, 7].map(n => <circle key={n} cx={114 + n * 15} cy={102 + n % 3 * 24} r="2" fill="#ffe09d" opacity=".65" />)}</g>}<g><path d="M65 208q-23-36 10-37 0-26 26-12 18-15 23 10 25-6 24 16 25 21-7 34z" fill="#719848" /><path d="M61 205q30-20 59-13" fill="none" stroke="#aec472" strokeWidth="3" /><circle cx="130" cy="227" r="24" fill="#c8462e" /><circle cx="130" cy="227" r="18" fill="#e5663c" /><path d="M117 220l26 12m-22 8 19-24" stroke="#f8a465" strokeWidth="3" /></g></g>}</svg>;
};
const WhatsAppIcon=()=> <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M27 15.5a11 11 0 0 1-16.3 9.7L5 27l1.8-5.6A11 11 0 1 1 27 15.5Z" stroke="currentColor" strokeWidth="2"/><path d="M12 10c-1 0-2 1-2 3 0 4 5 8 8 8 2 0 3-2 3-3l-4-2-1 2c-2-1-4-3-4-4l2-1-2-3Z" fill="currentColor"/></svg>;

const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const FoodLabel=({category}:{category:string})=><div className="food-label"><svg viewBox="0 0 100 80" aria-hidden="true"><path d="M20 58h60M28 50a22 22 0 0 1 44 0H28zM50 23v5M20 64h60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg><span>{category}</span></div>;
const SocialLinks=({settings}:{settings:ShopSettings})=> <div className="social-links">{settings.facebook&&<a aria-label="Facebook de Chicken Huerta" href={settings.facebook} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4a24 24 0 0 0-3-.2c-3.1 0-5 1.8-5 5.1V9H7v4h3v9Z"/></svg><span>Facebook<small>Chicken Huerta</small></span><b>↗</b></a>}{settings.tiktok&&<a aria-label="TikTok de Chicken Huerta" href={settings.tiktok} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M15 2h3c.2 3 1.8 4.6 4 5v3a9 9 0 0 1-4-1v7a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V2Z"/></svg><span>TikTok<small>@chikenhuerta</small></span><b>↗</b></a>}</div>;
export const LUMATiendaDeAccesorios = ({initialProducts:menu,shopSettings:settings}:{initialProducts:MenuItem[];shopSettings:ShopSettings}) => {
 const categories=['Todos',...new Set(menu.map(p=>p.category))];
 const contactUrl='https://wa.me/'+settings.whatsapp;
 const formatHour=(value:string)=>{const [h,m]=value.split(':');const hour=Number(h);return (hour%12||12)+':'+m+(hour<12?' a. m.':' p. m.');};
 const hours=formatHour(settings.opens)+' – '+formatHour(settings.closes);
 const featured=settings.featuredIds.map(id=>menu.find(p=>p.id===id)).filter((p):p is MenuItem=>!!p&&p.available);

  const [category, setCategory] = useState('POLLOS');
  const [cart, setCart] = useState<Record<number, number>>({});
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('Recojo en local');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [table, setTable] = useState('');
  const [notes, setNotes] = useState('');
  const [done, setDone] = useState(false);
 const [slide,setSlide]=useState(0);
 const [limit,setLimit]=useState(12);
 useEffect(()=>setLimit(12),[category,search]);
 const campaigns=(featured.length?featured:[{id:0,name:'Explora nuestra carta',price:0,imageUrl:null}]).map((p,i)=>({label:['EL PLAN PERFECTO PARA COMPARTIR','TU ANTOJO TIENE BUENA BRASA','DATE ESE GUSTITO'][i%3],title:['Hoy se come','Un clásico.','Tu pausa.'][i%3],accent:['en familia.','Todo el sabor.','Tu brasa.'][i%3],description:p.name,price:p.price,id:p.id,button:p.id?'Agregar a mi pedido':'Ver la carta',imageUrl:p.imageUrl}));
 const campaign=campaigns[slide%campaigns.length];
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement;
    const focusable = () => Array.from(panel.current?.querySelectorAll<HTMLElement>('button,input,select,a[href]') || []);
    focusable()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        const list = focusable();
        const first = list[0],
          last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, [open]);
  const quantity = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = menu.reduce((a, p) => a + p.price * (cart[p.id] || 0), 0);
  const change = (id: number, delta: number) => {
    if(delta>0&&!menu.find(p=>p.id===id&&p.available))return;
    setDone(false);
    setCart(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };
 const orderMessage=['Hola, '+settings.name+'. Quiero realizar este pedido:','',...menu.filter(p=>cart[p.id]>0).map(p=>`${cart[p.id]} x ${p.name} — S/ ${(p.price*cart[p.id]).toFixed(2)}`),'',`Subtotal de productos: S/ ${total.toFixed(2)}`,`Modalidad: ${type}`,`Nombre: ${name.trim()}`, ...(type === 'En mesa' ? [`Mesa: ${table.trim()}`] : []), ...(notes.trim() ? [`Indicaciones: ${notes.trim()}`] : []),...(type==='Delivery'?[`Dirección: ${address.trim()}`,'Delivery: costo por confirmar.']:[]),'Por favor, confirmen disponibilidad y total antes de preparar el pedido.'].join('\n');
 const orderUrl=contactUrl+'?text='+encodeURIComponent(orderMessage);
  const products = menu.filter(p => (category === 'Todos' || p.category === category) && normalize(p.name+' '+p.category).includes(normalize(search)));
  return <div className="brasa">
 <div className="announcement">{settings.name.toUpperCase()} <span>•</span> Atención: {hours} <span>•</span> Puente Piedra</div>
 <header><a href="#" className="brand" aria-label="Chicken Huerta, inicio"><img className="business-logo" src="/assets/chicken-huerta-logo.jpeg" alt="Logo Chicken Huerta · Pollos y parrillas"/><span>{settings.name.toUpperCase()}<span className="brand-small">{settings.subtitle.toUpperCase()}</span></span></a><button className="delivery-top" onClick={()=>{setType('Delivery');setOpen(true)}}><span className="location-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.7"/></svg></span><span><small>¿DÓNDE DISFRUTAS TU BRASA?</small><b>{address||'Mesa, recojo o delivery'}</b></span><span>⌄</span></button><nav><a href="#promociones">Favoritos</a><a href="#menu">Carta</a><a href="#visitanos">Local</a></nav><button className="cart-button" onClick={() => setOpen(true)}>Tu pedido <span>{quantity}</span></button></header>
 <main><section className={'hero campaign-'+slide} aria-label="Favoritos de la carta"><img className="hero-photo" src={campaign.imageUrl||"/assets/brasa-hero-v2.jpg"} alt="Pollo a la brasa dorado con papas fritas, ensalada y cremas"/><div className="hero-shade"/><div className="hero-copy"><div className="eyebrow">{campaign.label}</div><h1>{campaign.title}<br/><em>{campaign.accent}</em></h1><p>{campaign.description}</p><div className="hero-actions"><a className="menu-cta" href="#menu">Ver carta completa ↓</a><button className="primary" onClick={()=>{if(campaign.id){change(campaign.id,1);setOpen(true)}else{document.getElementById("menu")?.scrollIntoView()}}}>{campaign.button}<span>↗</span></button></div><div className="hero-bottom"><span>Pollo a la brasa</span><span>Papas doraditas</span><span>Sabor peruano</span></div></div><div className="hero-price"><small>EN NUESTRA CARTA</small><span>S/ <b>{Math.floor(campaign.price)}</b><sup>.{campaign.price.toFixed(2).split(".")[1]}</sup></span><small>PRECIO EN SOLES</small></div><div className="slide-control"><button aria-label="Favorito anterior" onClick={()=>setSlide((slide+campaigns.length-1)%campaigns.length)}>←</button><div>{campaigns.map((c,i)=><button key={c.id} className={slide===i?'selected':''} aria-label={'Ver favorito '+(i+1)} aria-pressed={slide===i} onClick={()=>setSlide(i)}/>)}</div><button aria-label="Favorito siguiente" onClick={()=>setSlide((slide+1)%campaigns.length)}>→</button></div><span className="hero-footnote">Imagen referencial generada con IA. Consulta los acompañamientos con el local.</span></section>
 <div className="benefits-bar"><span><b>♨</b> Sabor al carbón</span><span><b>⌖</b> Mesa, delivery o recojo</span><span><b>▤</b> Pedido a tu gusto</span><a href="#menu">Explora toda la carta →</a></div>
 <section id="promociones" className="promotions"><div className="promo-heading"><div><div className="eyebrow">QUE NO FALTE LA BUENA COMIDA</div><h2>Los planes más ricos.</h2></div><a href="#menu">Ver toda la carta ↗</a></div><div className="promo-grid">{featured.slice(0,2).map((p,i)=><article key={p.id} className={'promo-card '+(i?'personal':'family')}><div><span className="promo-label">FAVORITOS DE LA CASA</span><h3>{p.name}</h3><p>Elige tu favorito y arma tu pedido.</p><button onClick={()=>{change(p.id,1);setOpen(true)}}>Agregar · S/ {p.price.toFixed(2)} ↗</button></div>{p.imageUrl?<img src={p.imageUrl} alt={p.name}/>:<div className="promo-illustration"><Food/></div>}</article>)}</div></section>
 <section id="menu" className="menu-section"><div className="menu-heading"><div className="eyebrow">RECIÉN SALIDO DE LA BRASA</div><div className="title-row"><h2>¿Qué se te antoja hoy?</h2><span>Elige tus favoritos y arma tu pedido.</span></div></div><div className="filters" aria-label="Filtros de la carta"><div className="tabs">{categories.slice(0,6).map(c=><button key={c} className={category===c?'active':''} aria-pressed={category===c} onClick={()=>{setCategory(c);setSearch('')}}>{c==='Todos'?'Todos':c==='BROSTER HUERTA'?'Broster':c.charAt(0)+c.slice(1).toLowerCase()}</button>)}</div><div className="catalog-controls"><label className="category-select"><span>Todas las categorías</span><select aria-label="Categoría de productos" value={category} onChange={e=>{setCategory(e.target.value);setSearch('')}}>{categories.map(c=><option key={c} value={c}>{c} {c==='Todos'?'('+menu.length+')':'('+menu.filter(p=>p.category===c).length+')'}</option>)}</select></label><input aria-label="Buscar en la carta" placeholder="Buscar platos, bebidas..." value={search} onChange={e=>{setSearch(e.target.value);setCategory('Todos')}}/></div></div><div className="catalog-summary"><span>{search?'Resultados para “'+search+'”':category==='Todos'?'Toda nuestra carta':category}</span><b>{products.length} productos</b></div><div className="product-grid">{products.slice(0,limit).map(p => <article className="product" key={p.id}><div className="product-art" style={{
              background: p.color
            }}><span className="product-tag">{p.tag}</span>{p.imageUrl?<img className="menu-photo" src={p.imageUrl} alt={p.name+(p.referenceImage?" · imagen referencial":"")} loading="lazy"/>:p.category==='POLLOS'&&p.name.toLowerCase().includes('pollo')?<img className="menu-photo" src="/assets/brasa-hero-v2.jpg" alt={p.name+' · imagen referencial'} loading="lazy"/>:<FoodLabel category={p.category}/>}</div><div className="product-info">{p.referenceImage&&<a className="reference-photo-label" href={p.imageCredit} target="_blank" rel="noopener noreferrer">Imagen referencial · Créditos ↗</a>}<h3>{p.name}</h3><p className="category-detail">{p.detail||p.category}</p><div className="product-bottom"><strong>S/ {p.price.toFixed(2)}</strong><button disabled={!p.available} aria-label={'Agregar ' + p.name} onClick={() => change(p.id, 1)}>{p.available?'Agregar':'No disponible'} <span>+</span></button></div></div></article>)}</div>{products.length>limit&&<div className="load-more"><button onClick={()=>setLimit(prev=>prev+12)}>Ver más productos <span>({products.length-limit} restantes)</span> ↓</button></div>}{products.length === 0 && <div className="empty">No encontramos ese antojo. Prueba otro nombre.</div>}</section>
 <section id="historia" className="story"><span className="fire">♨</span><div><div className="eyebrow">EL SECRETO ESTÁ EN LA BRASA</div><h2>Fuego lento.<br />Buenos momentos.</h2></div><p>Un marinado lleno de sabor, el calor del carbón y el cariño de servir una buena mesa. En {settings.name}, compartimos esta idea: un lugar para volver, compartir y disfrutar.</p></section>
 <section id="visitanos" className="visit"><div><div className="eyebrow">CONOCE NUESTRO LOCAL</div><h2>Visítanos en<br />Chicken Huerta.</h2><p>{settings.address} · {settings.district}. Reconoce nuestra fachada y sube por la entrada al segundo piso.</p><div className="local-photos"><figure><a href="/assets/fachada-chicken-huerta.jpg" target="_blank" rel="noopener noreferrer" aria-label="Ver foto completa de la fachada"><img src="/assets/fachada-chicken-huerta.jpg" alt="Fachada real de Chicken Huerta con letrero iluminado, en Av. Buenos Aires 324" loading="lazy" width="768" height="1024" /></a><figcaption>Reconoce nuestra fachada</figcaption></figure><figure><a href="/assets/entrada-chicken-huerta.jpg" target="_blank" rel="noopener noreferrer" aria-label="Ver foto completa de la entrada"><img src="/assets/entrada-chicken-huerta.jpg" alt="Entrada real de Chicken Huerta, número 324, con escaleras hacia el segundo piso" loading="lazy" width="768" height="1024" /></a><figcaption>Sube por esta entrada al segundo piso</figcaption></figure></div><a className="primary" href={"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(settings.address+", "+settings.district)} target="_blank" rel="noopener noreferrer">Cómo llegar ↗</a></div><div className="location"><div className="eyebrow">CHICKEN HUERTA · PUENTE PIEDRA</div><h3>Nos vemos en la mesa.</h3><div className="local-detail"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.7"/></svg><div><b>{settings.address}</b><p>{settings.district}</p></div></div><div className="local-detail"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg><div><b>Horario de atención</b><p>{hours}</p></div></div><p><a className="whatsapp-contact" href={contactUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/> WhatsApp: {settings.whatsapp.slice(-9)} ↗</a></p><a className="map-link" href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(settings.address+', '+settings.district)} target="_blank" rel="noopener noreferrer">Buscar dirección en Google Maps ↗</a><div className="social-heading">SÍGUENOS Y DESCUBRE MÁS</div><SocialLinks settings={settings}/></div></section>
 </main><footer><a className="footer-brand" href="#"><img src="/assets/chicken-huerta-logo.jpeg" alt="Chicken Huerta · Pollos y parrillas"/><b>{settings.name.toUpperCase()}</b></a><div className="footer-info"><span>{settings.address} · {settings.district}</span><span>{hours}</span></div><SocialLinks settings={settings}/><span>Fotos de platos referenciales · Precios en soles</span><a href="/creditos-fotos.html">Créditos de fotografías</a><a href="/admin">Administrar carta</a></footer>
 {!open&&<a className="whatsapp-float" aria-label="Consultar a Chicken Huerta por WhatsApp" href={contactUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/></a>}
 {quantity > 0 && !open && <button className="floating-cart" onClick={() => setOpen(true)}><span>{quantity} productos · Ver mi pedido</span><b>S/ {total.toFixed(2)} →</b></button>}
 {open && <div className="cart-overlay" onClick={() => setOpen(false)}><aside ref={panel} className="cart-panel" role="dialog" aria-modal="true" aria-label="Tu pedido" onClick={e => e.stopPropagation()}><div className="cart-title"><h2>Tu antojo, listo.</h2><button aria-label="Cerrar pedido" onClick={() => setOpen(false)}>✕</button></div><p className="muted">Arma tu pedido a tu gusto.</p>{quantity === 0 ? <div className="cart-empty"><div style={{
            width: 150,
            margin: 'auto'
          }}><Food /></div><h3>Aún falta el protagonista.</h3><p>Agrega algo rico desde nuestra carta.</p><button className="primary" onClick={() => setOpen(false)}>Explorar la carta</button></div> : <><div className="cart-items">{menu.filter(p => cart[p.id] > 0).map(p => <div className="cart-item" key={p.id}><span className="cart-food"><FoodLabel category={p.category}/></span><div><b>{p.name}</b><small>S/ {(p.price * cart[p.id]).toFixed(2)}</small><div className="stepper"><button aria-label={'Quitar uno de ' + p.name} onClick={() => change(p.id, -1)}>−</button><span>{cart[p.id]}</span><button aria-label={'Añadir uno de ' + p.name} onClick={() => change(p.id, 1)}>+</button></div></div></div>)}</div><div className="total"><span>Total de productos</span><b>S/ {total.toFixed(2)}</b></div><form onSubmit={e => {
            e.preventDefault();
            setDone(true);
 window.open(orderUrl,'_blank','noopener,noreferrer');
          }}><label>¿Cómo lo prefieres?<select value={type} onChange={e => {
                setType(e.target.value);
                setDone(false);
              }}><option>Recojo en local</option><option>Delivery</option><option>En mesa</option></select></label><label>Tu nombre<input required pattern=".*\S.*" maxLength={80} autoComplete="name" placeholder="Escribe tu nombre" value={name} onChange={e => setName(e.target.value)} /></label>{type === 'Delivery' && <label>Dirección de entrega<input required pattern=".*\S.*" maxLength={250} autoComplete="street-address" placeholder="Dirección y referencia" value={address} onChange={e => setAddress(e.target.value)} /></label>}{type === 'En mesa' && <label>Número de mesa<input required maxLength={12} placeholder="Ejemplo: 4" value={table} onChange={e => {setTable(e.target.value);setDone(false)}} /></label>}<label>Indicaciones (opcional)<input maxLength={300} placeholder="Alguna indicación para tu pedido" value={notes} onChange={e => {setNotes(e.target.value);setDone(false)}} /></label><button className="primary checkout" type="submit">Continuar en WhatsApp ↗</button></form>{done && <div role="status" className="success"><b>Tu pedido está listo para enviar.</b><p>Se abrirá WhatsApp con el resumen. Pulsa Enviar allí para solicitar la confirmación de Chicken Huerta.</p><a className="whatsapp-retry" href={orderUrl} target="_blank" rel="noopener noreferrer">Abrir mi pedido en WhatsApp ↗</a></div>}<small className="demo-note">Envía el mensaje en WhatsApp para solicitar tu pedido. El local confirma disponibilidad y total. Delivery por cotizar.</small></>}</aside></div>}
 </div>;
};