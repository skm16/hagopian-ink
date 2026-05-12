import 'server-only';
import { shapePost, type ShapedPost, type WpApiPostFull } from './shape-post';

function wpCredentials() {
  const wpUrl = process.env.WP_URL;
  const user = process.env.WP_USER;
  const password = process.env.WP_APP_PASSWORD;
  if (!wpUrl || !user || !password) {
    throw new Error('Missing WP credentials. Set WP_URL, WP_USER, WP_APP_PASSWORD.');
  }
  return { wpUrl, authHeader: `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}` };
}

export async function fetchPosts(tags: string[] = ['posts']): Promise<ShapedPost[]> {
  const { wpUrl, authHeader } = wpCredentials();
  const res = await fetch(`${wpUrl}/wp-json/wp/v2/posts?per_page=100&status=publish&_embed=1`, {
    headers: { Authorization: authHeader },
    next: { tags },
  });
  if (!res.ok) throw new Error(`WP REST API returned ${res.status}`);
  const raw = (await res.json()) as WpApiPostFull[];
  return raw.map(shapePost);
}

export async function fetchPostBySlug(slug: string): Promise<{
  post: WpApiPostFull;
  related: Array<{ title: string; slug: string; thumbnail: string | null }>;
} | null> {
  const { wpUrl, authHeader } = wpCredentials();
  const encoded = encodeURIComponent(slug);

  const postRes = await fetch(`${wpUrl}/wp-json/wp/v2/posts?slug=${encoded}&_embed=1`, {
    headers: { Authorization: authHeader },
    next: { tags: [`post-${slug}`, 'posts'] },
  });
  if (!postRes.ok) throw new Error(`WP REST API returned ${postRes.status}`);
  const posts = (await postRes.json()) as WpApiPostFull[];
  if (!posts.length) return null;
  const post = posts[0];

  const relatedRes = await fetch(
    `${wpUrl}/wp-json/wp/v2/posts?before=${encodeURIComponent(post.date)}&per_page=2&_embed=1&exclude=${post.id}`,
    { headers: { Authorization: authHeader }, next: { tags: ['posts'] } },
  );
  const relatedRaw = relatedRes.ok ? ((await relatedRes.json()) as WpApiPostFull[]) : [];
  const related = relatedRaw.map((p) => {
    const shaped = shapePost(p);
    return {
      title: shaped.title,
      slug: p.slug,
      thumbnail: shaped.thumbnail,
    };
  });

  return { post, related };
}
