/**
 * Strangler-fig catch-all proxy.
 *
 * Falls through to the WP_PROXY_URL site for any route not handled by a
 * more specific app route. Lets agencies migrate an existing WP site to
 * headless one route at a time — explicit Next.js routes always win;
 * unmatched routes proxy to the original.
 *
 * To opt out: clear WP_PROXY_URL in .env.local (this handler returns
 * 404), or delete this file entirely.
 *
 * Edit freely — this file is project-policy scaffolding (like
 * lib/jab/client.ts), not regenerated SDK code.
 */

import type { NextRequest } from "next/server";

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
]);

async function handler(
  request: NextRequest,
  ctx: { params: Promise<{ slug?: string[] }> },
): Promise<Response> {
  const proxyUrl = process.env.WP_PROXY_URL?.replace(/\/+$/, "");
  if (!proxyUrl) {
    return new Response("Not Found", { status: 404 });
  }

  const { slug = [] } = await ctx.params;
  const pathname = "/" + slug.join("/");

  // Don't proxy Next.js internals or local API routes — guard even though
  // routing precedence usually handles this; defense in depth is cheap.
  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/")) {
    return new Response("Not Found", { status: 404 });
  }

  const target = new URL(
    pathname + request.nextUrl.search,
    proxyUrl + "/",
  ).toString();

  const forwardHeaders = new Headers();
  for (const [key, value] of request.headers.entries()) {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      forwardHeaders.set(key, value);
    }
  }

  const body =
    request.method === "GET" || request.method === "HEAD"
      ? null
      : await request.arrayBuffer();

  const upstream = await fetch(target, {
    method: request.method,
    headers: forwardHeaders,
    body,
    redirect: "manual",
  });

  // Strip hop-by-hop headers from the response too — anything in that
  // set is per-connection metadata that shouldn't propagate to the
  // browser via Next.js's runtime.
  const responseHeaders = new Headers();
  for (const [key, value] of upstream.headers.entries()) {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;
