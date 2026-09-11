'use client';
import {useEffect,useState} from 'react';
import {products} from '../../lib/products';
export default function Cart(){
 const [cart,setCart]=useState({});const [loading,setLoading]=useState(false);
 useEffect(()=>setCart(JSON.parse(localStorage.getItem('nakcart')||'{}')),[]);
 function save(next){setCart(next);localStorage.setItem('nakcart',JSON.stringify(next));window.dispatchEvent(new Event('nakcartchange'))}
 function setQty(id,qty){const next={...cart};if(qty<=0)delete next[id];else next[id]=Math.min(10,qty);save(next)}
 const items=products.filter(p=>cart[p.id]).map(p=>({...p,qty:cart[p.id]}));
 const subtotal=items.reduce((s,i)=>s+i.price*i.qty,0);const shipping=subtotal===0?0:(subtotal>=10000?0:799);const total=subtotal+shipping;
 async function checkout(){if(!items.length)return;setLoading(true);const r=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:items.map(i=>({id:i.id,qty:i.qty}))})});const d=await r.json();if(d.url)location.href=d.url;else{alert(d.error||'Checkout could not start');setLoading(false)}}
 function clear(){localStorage.removeItem('nakcart');setCart({});window.dispatchEvent(new Event('nakcartchange'))}
 return <main className="wrap"><div className="pagehead"><h1>Your Cart</h1><p className="sub">Free demo shipping on orders over $100.</p></div><div className="cartbox">{items.length?items.map(i=><div className="row cartItem" key={i.id}><div><b>{i.name}</b><div className="qty"><button onClick={()=>setQty(i.id,i.qty-1)}>−</button><span>{i.qty}</span><button onClick={()=>setQty(i.id,i.qty+1)}>+</button></div></div><b>${(i.price*i.qty/100).toFixed(2)}</b></div>):<p>Your cart is empty.</p>}<div className="summaryLine"><span>Subtotal</span><span>${(subtotal/100).toFixed(2)}</span></div><div className="summaryLine"><span>Shipping</span><span>{shipping===0&&subtotal>0?'FREE':`$${(shipping/100).toFixed(2)}`}</span></div><div className="row total"><span>Total</span><span>${(total/100).toFixed(2)}</span></div><button className="checkout" onClick={checkout} disabled={!items.length||loading}>{loading?'Opening Stripe…':'Proceed to secure test checkout'}</button><button className="add" onClick={clear}>Clear cart</button><p className="muted">Stripe Test Mode only. Use Stripe's standard test card during checkout; no real money is collected.</p></div></main>
}
