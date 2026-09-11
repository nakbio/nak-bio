import Stripe from 'stripe';
import {products} from '../../../lib/products';
export async function POST(req){
 try{
  if(!process.env.STRIPE_SECRET_KEY)return Response.json({error:'Missing STRIPE_SECRET_KEY. Add your Stripe test secret key to .env.local.'},{status:500});
  const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
  const {items=[]}=await req.json();
  let subtotal=0;
  const line_items=items.map(({id,qty})=>{const p=products.find(x=>x.id===id);if(!p)throw new Error('Unknown item');const quantity=Math.max(1,Math.min(10,qty||1));subtotal+=p.price*quantity;return {quantity,price_data:{currency:'usd',unit_amount:p.price,product_data:{name:p.name,description:'NAK.BIO classroom demo product — test transaction only'}}}});
  if(!line_items.length)throw new Error('Cart is empty');
  if(subtotal<10000)line_items.push({quantity:1,price_data:{currency:'usd',unit_amount:799,product_data:{name:'Standard Shipping',description:'Classroom demo shipping charge'}}});
  const origin=process.env.NEXT_PUBLIC_SITE_URL||new URL(req.url).origin;
  const session=await stripe.checkout.sessions.create({mode:'payment',line_items,success_url:`${origin}/success?session_id={CHECKOUT_SESSION_ID}`,cancel_url:`${origin}/cart`,billing_address_collection:'required',shipping_address_collection:{allowed_countries:['US']},phone_number_collection:{enabled:true}});
  return Response.json({url:session.url});
 }catch(e){return Response.json({error:e.message},{status:400})}
}
