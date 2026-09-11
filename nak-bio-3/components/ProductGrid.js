'use client';
import Link from 'next/link';
import {products} from '../lib/products';
export default function ProductGrid(){
  function add(p){
    const c=JSON.parse(localStorage.getItem('nakcart')||'{}');
    c[p.id]=(c[p.id]||0)+1;
    localStorage.setItem('nakcart',JSON.stringify(c));
    window.dispatchEvent(new Event('nakcartchange'));
    alert(`${p.name} added to cart`);
  }
  return <div className="grid">{products.map(p=><article className="card" key={p.id}>
    <Link href={`/shop/${p.id}`} className="productLink" aria-label={`View ${p.name}`}><div className="vial"><div className="bottle"/></div></Link>
    <div className="body"><div className="tag">{p.tag}</div><h3><Link href={`/shop/${p.id}`} className="plainLink">{p.name}</Link></h3><div className="price">{p.display}</div><p className="muted">{p.desc}</p><div className="cardActions"><Link className="secondary" href={`/shop/${p.id}`}>Details</Link><button className="add inlineAdd" onClick={()=>add(p)}>Add to cart</button></div></div>
  </article>)}</div>
}
