/**
 * Normalize WP-authored HTML/text fields so they render consistently.
 *
 * WP serializes ACF text fields through a chain (REST encoder, MCP adapter,
 * jab SDK) that occasionally HTML-encodes tags an editor typed by hand —
 * e.g. `<br>` becomes the literal text `&lt;br&gt;`. When that string lands
 * in a React component rendered as plain text (`{block.title}`), React
 * escapes it *again* and the visitor sees "&lt;br&gt;" on the page; when it
 * lands in WpHtml (the project's trusted HTML wrapper), browsers render it
 * correctly.
 *
 * Run every WP string field through this helper as it leaves the data layer
 * (see `shape-work.ts` and `app/work/[slug]/page.tsx`). After this, the
 * output is safe to either render via WpHtml *or* set as text — the same
 * source-of-truth makes both paths produce the same line breaks.
 *
 * Scope intentionally narrow: only decode the entities WP/MCP routinely
 * double-encodes. Do NOT decode arbitrary HTML entities here — that would
 * undo legitimate escaping (e.g. a literal "&lt;" in body text).
 */

const ENTITY_DECODE: Array<[RegExp, string]> = [
  // Tag-bracket entities, case-insensitive — covers &lt;br&gt;, &LT;BR&GT;, etc.
  [/&lt;/gi, '<'],
  [/&gt;/gi, '>'],
  // Non-breaking spaces become regular spaces; they break line-wrapping in
  // headings and add little value in body copy.
  [/&nbsp;/gi, ' '],
  // & last so we don't undo decodings above (e.g. &amp;lt; → &lt; → <)
  [/&amp;/g, '&'],
];

const TAG_LOWERCASE: Array<[RegExp, string]> = [
  // Self-closing voids editors commonly uppercase. Use a closing variant too
  // (`<BR/>`, `<BR />`) so all forms collapse to the canonical lowercase.
  [/<BR\s*\/?>/g, '<br>'],
  [/<HR\s*\/?>/g, '<hr>'],
];

export function normalizeWpHtml(input: string): string {
  if (!input) return input;

  let out = input;

  // 1. Normalize line endings — Windows-authored content arrives as \r\n
  //    which adds visible whitespace in some renderers.
  out = out.replace(/\r\n/g, '\n');

  // 2. Decode the entities WP serializers tend to double-encode.
  for (const [re, replacement] of ENTITY_DECODE) {
    out = out.replace(re, replacement);
  }

  // 3. Canonicalize commonly-uppercased self-closing tags.
  for (const [re, replacement] of TAG_LOWERCASE) {
    out = out.replace(re, replacement);
  }

  return out;
}
