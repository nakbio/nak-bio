'use client';
export default function AddProductButton({id,name}){
  function add(){const c=JSON.parse(localStorage.getItem('nakcart')||'{}');c[id]=(c[id]||0)+1;localStorage.setItem('nakcart',JSON.stringify(c));window.dispatchEvent(new Event('nakcartchange'));alert(`${name} added to cart`)}
  return <button className="checkout detailAdd" onClick={add}>Add to cart</button>
}
