/**
 * Rewrite WordPress media URLs from the public site host to the WP origin.
 *
 * The WP install at hagopianink.wpengine.com has `home_url()` set to
 * hagopianink.com (so the dashboard URLs match the public brand). REST and
 * MCP responses therefore serialize media URLs as
 * `https://hagopianink.com/wp-content/uploads/...`. Pre-cutover that worked
 * because hagopianink.com pointed at WP. Post-cutover this Next app *is*
 * hagopianink.com, so those URLs now self-reference back to Next and 404.
 *
 * This helper swaps the host of any URL whose hostname matches the public
 * site for the configured WP host. Idempotent — calling it on an already-WP
 * URL is a no-op.
 *
 * Reads NEXT_PUBLIC_WP_URL first (so it works in both server and client
 * bundles), falling back to WP_URL on the server.
 */

const PUBLIC_HOSTS = new Set([
  'hagopianink.com',
  'www.hagopianink.com',
]);

function wpBase(): URL | null {
  // `||` + `.trim()` (not `??`) so an empty/whitespace-only env value falls
  // through. Empty NEXT_PUBLIC_WP_URL otherwise wins the coalesce and
  // new URL('') throws → wpBase returns null → media URLs aren't rewritten →
  // the public hagopianink.com host stays in WP-returned URLs and self-loops.
  const raw =
    process.env.NEXT_PUBLIC_WP_URL?.trim() ||
    process.env.WP_URL?.trim() ||
    'https://hagopianink.wpenginepowered.com';
  try {
    return new URL(raw);
  } catch {
    return null;
  }
}

export function rewriteWpMediaUrl<T extends string | null | undefined>(url: T): T {
  if (!url || typeof url !== 'string') return url;
  if (!url.startsWith('http')) return url;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }
  if (!PUBLIC_HOSTS.has(parsed.hostname)) return url;

  const base = wpBase();
  if (!base) return url;

  parsed.protocol = base.protocol;
  parsed.hostname = base.hostname;
  parsed.port = base.port;
  return parsed.toString() as T;
}

/**
 * Rewrite WP media URLs embedded in HTML attributes (src, href, srcset,
 * data-src, poster). Used for WYSIWYG content where image URLs live inside
 * a string of HTML rather than as discrete fields.
 *
 * Conservative regex: only matches hagopianink.com / www.hagopianink.com
 * hostnames so unrelated absolute links (e.g. external citations) are left
 * untouched.
 */
const HOST_PATTERN = /https?:\/\/(?:www\.)?hagopianink\.com(?=[/"'?#\s)])/gi;

export function rewriteWpMediaUrlsInHtml(html: string): string {
  if (!html) return html;
  const base = wpBase();
  if (!base) return html;
  const replacement = `${base.protocol}//${base.host}`;
  return html.replace(HOST_PATTERN, replacement);
}
