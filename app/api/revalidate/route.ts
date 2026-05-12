import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  }

  const body = (await req.json().catch(() => null)) as
    | { secret?: string; tag?: string; slug?: string }
    | null;

  if (!body || body.secret !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tags: string[] = [];
  if (body.tag) tags.push(body.tag);
  if (body.tag && body.slug) {
    const singular = body.tag.endsWith('s') ? body.tag.slice(0, -1) : body.tag;
    tags.push(`${singular}-${body.slug}`);
  }
  tags.push('sitemap');

  for (const tag of tags) revalidateTag(tag);

  return NextResponse.json({ revalidated: true, tags, now: Date.now() });
}
