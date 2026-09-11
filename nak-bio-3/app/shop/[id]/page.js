import Link from 'next/link';
import {notFound} from 'next/navigation';
import {products} from '../../../lib/products';
import AddProductButton from '../../../components/AddProductButton';
export function generateStaticParams(){return products.map(p=>({id:p.id}))}
export default async function ProductPage({params}){
  const {id}=await params;
  const p=products.find(x=>x.id===id);
  if(!p)notFound();
  return <main className="wrap"><div className="pagehead"><Link className="crumb" href="/shop">← Back to catalog</Link></div><section className="productDetail"><div className="detailVisual"><div className="vial bigVial"><div className="bottle bigBottle"/></div></div><div><div className="tag">{p.tag}</div><h1 className="detailTitle">{p.name}</h1><div className="detailPrice">{p.display}</div><p className="detailText">{p.desc}</p><div className="notice"><b>Classroom demo listing.</b> This page demonstrates product merchandising and e-commerce UX only. It is not an offer for real-world purchase or human use.</div><AddProductButton id={p.id} name={p.name}/><div className="detailMeta"><div><b>Checkout</b><span>Stripe Test Mode</span></div><div><b>Shipping demo</b><span>$7.99 or free over $100</span></div><div><b>Payment</b><span>Test cards only</span></div></div></div></section></main>
}
