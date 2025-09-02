// Next.js v15 / Route Handler
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';

export const runtime = 'nodejs';

export async function POST() {
  try {
    // headers() は同期。await は不要
    const origin = (await headers()).get('origin') ?? process.env.NEXT_PUBLIC_BASE_URL!;
    const priceId = process.env.PRICE_ID;

    if (!priceId?.startsWith('price_')) {
      return NextResponse.json({ error: 'PRICE_ID が不正（price_ で始まるIDを設定してください）' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Checkout URL を取得できませんでした' }, { status: 500 });
    }

    return NextResponse.redirect(session.url, 303);
  } catch (err: unknown) {
    const message = (err as Error)?.message ?? 'Unknown error';
    // Stripe/HTTP 由来の statusCode or status があれば使う。なければ 500
    const status = (err as { statusCode?: number })?.statusCode ?? (err as { status?: number })?.status ?? 500;

    return NextResponse.json({ error: message }, { status });
  }
}
