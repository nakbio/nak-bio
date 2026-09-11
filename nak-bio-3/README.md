# NAK.BIO — Business Class E-commerce Demo

A Next.js storefront with catalog, individual product pages, cart, shipping logic, and Stripe-hosted **test checkout**.

## Run locally
1. Install Node.js 20+.
2. In this folder run: `npm install`
3. Copy `.env.example` to `.env.local`
4. Paste your Stripe **test secret key** into `.env.local`
5. Run `npm run dev`
6. Open http://localhost:3000

## Stripe test checkout
Use Stripe Test Mode only. A standard successful test card is `4242 4242 4242 4242`, any future expiry, any CVC.

The cart adds $7.99 demo shipping below $100 and free demo shipping at $100 or more.

## Deploy on Vercel
1. Push this folder to GitHub or import it into Vercel.
2. Add `STRIPE_SECRET_KEY` as a Vercel environment variable using a Stripe TEST key (`sk_test_...`).
3. Set `NEXT_PUBLIC_SITE_URL` to the final Vercel URL (for example `https://nak-bio.vercel.app`).
4. Redeploy.

## Important
This project intentionally does not enable live payments or actual fulfillment of peptide/drug products. It is designed to demonstrate a real checkout workflow in a controlled classroom test environment.
