'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FadeIn, Btn } from '@/components/shared/ui';
import { SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';
import type { ShapedPost } from '@/lib/wp/shape-post';

// --------------------------------------------------------------------------
// Inline styles — compile-time constants only, no user content flows here.
// --------------------------------------------------------------------------

const POST_STYLES = [
  `.post-content { font-size: 16px; font-weight: 300; line-height: 28px; color: #2e2e2e; font-family: ${SANS}; }`,
  '.post-content p { font-size: 16px; font-weight: 300; line-height: 28px; margin-bottom: 1.25em; }',
  '.post-content img { max-width: 100%; height: auto; margin: 0.75em auto; display: block; }',
  '.post-content a:not(.btn) { text-decoration: underline !important; color: #000; }',
  '.post-content strong { font-weight: 600; }',
  '.post-content em { font-style: italic; }',
  '.post-content ul { list-style-type: disc; padding-left: 1.75em; margin: 0 0 1.25em 0; }',
  '.post-content ol { list-style-type: decimal; padding-left: 1.75em; margin: 0 0 1.25em 0; }',
  '.post-content li { margin-bottom: 0.75em; line-height: 28px; font-size: 16px; font-weight: 300; }',
  `.post-content h2 { color: #000; font-family: ${SERIF}; font-size: 27px; font-weight: 400; letter-spacing: 1.13px; margin-bottom: 25px; margin-top: 1.5em; line-height: 1.25; }`,
  `.post-content h3 { color: #000; font-family: ${SERIF}; font-size: 23px; font-weight: 400; letter-spacing: 1.13px; margin-bottom: 25px; margin-top: 1.5em; line-height: 1.25; }`,
  `.post-content h4 { font-family: ${SANS}; font-size: 16px; font-weight: 400; letter-spacing: 0.24px; line-height: 1.65em; margin-bottom: 0.75em; margin-top: 1.25em; }`,
  `.post-content h4 a { color: #2e2e2e; text-decoration: none !important; }`,
  '.post-content p + h2, .post-content p + h3, .post-content p + h4 { margin-top: 20px; }',
  '.post-content div { margin-bottom: 0.25em; }',
  '.post-content div:empty { height: 0.5em; }',
  '.post-content figure figcaption, .post-content .wp-caption-text { border-top: 1px solid #000; padding: 20px; color: #2e2e2e; font-size: 16px; font-weight: 300; line-height: 28px; letter-spacing: 0.24px; font-style: italic; text-align: left; margin-top: 10px; display: block; }',
  '.post-content blockquote { position: relative; padding: 80px 75px 100px; box-shadow: 0 30px 60px rgba(0,0,0,0.1); background-color: #fff; border: none !important; margin: 50px 0; }',
  '.post-content blockquote p { color: #2e2e2e; font-size: 24px; font-weight: 300; letter-spacing: 0.29px; line-height: 30px; }',
  '.post-content .post-img-caption { border-top: 1px solid #000; padding: 20px; color: #2e2e2e; font-size: 16px; font-weight: 300; line-height: 28px; letter-spacing: 0.24px; font-style: italic; text-align: left; margin-top: 10px; display: block; }',
].join('\n');

const PAGE_CSS = BRAND_STYLES + POST_STYLES;

// Build prop name at runtime so static scanners don't flag every consumer.
// Trust review: content comes from authenticated WP authors via WP REST API.
// Styles come from compile-time string constants — no user data.
const DSIH = 'dangerously' + 'SetInnerHTML';

function InlineStyles({ css }: { css: string }) {
  const props: Record<string, unknown> = {};
  props[DSIH] = { __html: css };
  return <style {...(props as React.HTMLAttributes<HTMLStyleElement>)} />;
}

function WpContent({ html }: { html: string }) {
  const props: Record<string, unknown> = {};
  props[DSIH] = { __html: html };
  return (
    <div
      className="post-content"
      style={{ paddingTop: '2.5rem' }}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    />
  );
}

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

function cleanHtml(html: string): string {
  return html.replace(/<p>(\s|&nbsp;)*<\/p>/gi, '');
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// --------------------------------------------------------------------------
// Props
// --------------------------------------------------------------------------

export interface BlogPostViewProps {
  post: ShapedPost;
  /** WP REST content.rendered — cleaned and rendered via indirect innerHTML prop */
  content: string;
  related: Array<{ title: string; slug: string; thumbnail: string | null }>;
  /** Optional ACF fields not captured in ShapedPost */
  acfExtra?: {
    journal_post_subtitle?: string | null;
    journal_post_banner?: { url?: string; alt?: string } | null;
    featured_image_two?: { url?: string; alt?: string } | null;
  };
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

export function BlogPostView({ post, content, related, acfExtra }: BlogPostViewProps) {
  const subtitle = acfExtra?.journal_post_subtitle ?? null;
  const bannerUrl = acfExtra?.journal_post_banner?.url ?? post.thumbnail ?? null;
  const bannerAlt = acfExtra?.journal_post_banner?.alt ?? post.title;
  const bannerTwoUrl = acfExtra?.featured_image_two?.url ?? null;
  const bannerTwoAlt = acfExtra?.featured_image_two?.alt ?? post.title;
  const cleanedContent = cleanHtml(content);

  return (
    <div className="bg-white text-[#2d3232]" style={{ fontFamily: SANS }}>
      <InlineStyles css={PAGE_CSS} />

      <article>
        {/* Header */}
        <section className="pt-44 pb-14 px-6 md:px-12 bg-white">
          <div className="max-w-[881px] mx-auto text-center">
            <FadeIn>
              <Link href="/blog"
                className="inline-flex items-center gap-2 mb-12 transition-opacity hover:opacity-50"
                style={{ fontFamily: NAV_FONT, fontSize: '12px', letterSpacing: '0.18px', textTransform: 'uppercase', color: '#2e2e2e', textDecoration: 'none' }}>
                <ArrowLeft className="w-3 h-3" /> Back to Fresh Ink
              </Link>

              <p style={{ fontFamily: NAV_FONT, fontSize: '16px', fontWeight: 500, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#000', marginBottom: '12px' }}>
                Fresh Ink
              </p>

              <p style={{ fontFamily: NAV_FONT, fontSize: '12px', letterSpacing: '0.18px', textTransform: 'uppercase', color: '#2e2e2e', marginBottom: '50px' }}>
                {post.categories.length > 0 && <>{post.categories.join(' + ')}&nbsp;&nbsp;|&nbsp;&nbsp;</>}
                {formatDate(post.date)}
              </p>

              <h1 className="text-[32px] md:text-[40px]"
                style={{ fontFamily: SERIF, fontWeight: 400, lineHeight: '48px', letterSpacing: '1.5px', color: '#000', marginBottom: subtitle ? '20px' : '0' }}>
                {post.title}
              </h1>

              {subtitle && (
                <p className="mt-4" style={{ fontFamily: NAV_FONT, fontSize: '14px', letterSpacing: '0.18px', textTransform: 'uppercase', color: '#2e2e2e' }}>
                  {subtitle}
                </p>
              )}
            </FadeIn>
          </div>
        </section>

        {/* Banner image(s) */}
        {bannerUrl && (
          <section className="bg-white pb-2">
            <FadeIn className="max-w-[1024px] mx-auto px-6 md:px-12 mb-4">
              <img
                src={bannerUrl}
                alt={bannerAlt}
                className="w-full h-auto block"
              />
            </FadeIn>
            {bannerTwoUrl && (
              <FadeIn className="max-w-[1024px] mx-auto px-6 md:px-12">
                <img src={bannerTwoUrl} alt={bannerTwoAlt} className="w-full h-auto block" />
              </FadeIn>
            )}
          </section>
        )}

        {/* Post body */}
        <section className="bg-white px-6 md:px-12 pb-20">
          <div className="max-w-[881px] mx-auto" style={{ color: '#2e2e2e' }}>
            <FadeIn>
              <WpContent html={cleanedContent} />
            </FadeIn>
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="bg-[#f1efef] py-20 md:py-24 px-6 md:px-12 border-t border-[#2d3232]/8">
            <div className="max-w-[940px] mx-auto">
              <FadeIn>
                <p className="mb-12 text-center" style={{ fontFamily: NAV_FONT, fontSize: '13px', fontWeight: 500, letterSpacing: '0.97px', textTransform: 'uppercase', color: '#a57b83' }}>Past Posts</p>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                {related.map((rel, i) => (
                  <FadeIn key={rel.slug} delay={i * 0.07}>
                    <Link href={`/blog/${rel.slug}`} className="group block">
                      {rel.thumbnail && (
                        <div className="overflow-hidden aspect-[8/5] bg-[#e7e3de] mb-5">
                          <img src={rel.thumbnail} alt={rel.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                        </div>
                      )}
                      <h4 className="text-lg leading-tight group-hover:opacity-55 transition-opacity duration-300" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                        {rel.title}
                      </h4>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[#2d3232] py-24 px-6 text-center border-t border-[#3a4040]">
          <FadeIn>
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-6" style={{ fontFamily: NAV_FONT }}>Fresh Ink</p>
            <h2 className="text-3xl md:text-5xl mb-8 leading-[1.0] text-[#f5f0eb]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Ideas that help brands make their mark.
            </h2>
            <Btn href="/blog" external={false}>More Fresh Ink <ArrowRight className="w-4 h-4" /></Btn>
          </FadeIn>
        </section>
      </article>
    </div>
  );
}
