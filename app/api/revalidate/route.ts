import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hagopianink.com';

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

  // Cloudflare edge cache purge — opt-in via env vars.
  // Must fire AFTER revalidateTag: if CF re-fetched first, it'd re-cache the
  // stale upstream response before Next's data cache invalidated. By purging
  // CF second, the next visitor triggers a clean fetch top-to-bottom.
  const purgedUrls = await purgeCloudflare(body.tag, body.slug);

  return NextResponse.json({ revalidated: true, tags, purgedUrls, now: Date.now() });
}

async function purgeCloudflare(tag?: string, slug?: string): Promise<string[] | null> {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!zoneId || !apiToken) return null;

  const files = urlsForTag(tag, slug);
  if (files.length === 0) return [];

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files }),
      },
    );
    if (!res.ok) {
      // Fail-open: Next's data cache is already invalidated, so the editor's
      // primary expectation ("my edit is live") still holds at the origin.
      // The edge may stay stale up to the configured edge TTL.
      console.error('[revalidate] Cloudflare purge failed:', res.status, await res.text());
      return null;
    }
  } catch (err) {
    console.error('[revalidate] Cloudflare purge errored:', err);
    return null;
  }
  return files;
}

// Map a webhook tag/slug to the specific URLs that need edge purging. Keep
// this list tight — purging unrelated URLs invalidates cache hits we'd want
// to keep warm for other visitors.
function urlsForTag(tag?: string, slug?: string): string[] {
  const sitemap = `${SITE_URL}/sitemap.xml`;
  if (!tag) return [sitemap];

  const listingByTag: Record<string, string> = {
    posts: `${SITE_URL}/blog`,
    works: `${SITE_URL}/work`,
  };
  const detailByTag: Record<string, (s: string) => string> = {
    posts: (s) => `${SITE_URL}/blog/${s}`,
    works: (s) => `${SITE_URL}/work/${s}`,
  };

  const urls = new Set<string>([sitemap]);
  const listing = listingByTag[tag];
  if (listing) urls.add(listing);
  if (slug && detailByTag[tag]) urls.add(detailByTag[tag](slug));
  return [...urls];
}
