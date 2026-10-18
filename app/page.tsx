import {readCatalog} from '../lib/catalog-data';
import {database} from '../lib/catalog-server';
import {LUMATiendaDeAccesorios} from '../src/components/generated/LUMATiendaDeAccesorios';
export const dynamic='force-dynamic';
export default async function Home(){const data=await readCatalog(database());const items=data.products.map(p=>({...p,price:p.priceCents/100,detail:p.description,sourceCategory:p.category,tag:p.category,color:'#242424',imageUrl:p.imageKey?'/api/images/'+p.imageKey:null}));return <LUMATiendaDeAccesorios initialProducts={items} shopSettings={data.settings}/>}
