import React from 'react';
import { Link, useParams } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, BtnLight } from '@/components/shared/ui';
import { SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';
import { useWork } from '@/hooks/useWork';
import { renderBlock } from '@/components/work-flex';
import type { DetailPost, RelatedItem } from '@/lib/work-detail-types';

export function CaseStudyPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { status, post, related, error } = useWork(slug);

  return (
    <div style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav alwaysVisible />

      {status === 'loading' && <CenteredMessage label="Loading work…" />}
      {status === 'error' && <CenteredMessage label={error ?? 'Something went wrong.'} tone="error" />}
      {status === 'not-found' && <NotFound slug={slug} />}
      {status === 'ok' && post && (
        <>
          <Header post={post} />
          {post.blocks.map((block, i) => renderBlock(block, i))}
          {related.length > 0 && <RelatedWork items={related} />}
          <ConversationCTA />
        </>
      )}

      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------------------
   Header (kept from current design - content from WP)
   ------------------------------------------------------------------------- */

function Header({ post }: { post: DetailPost }) {
  const eyebrow = [...post.termNames, ...post.tagNames].join(' • ');
  const showRightCol = Boolean(post.intro);

  return (
    <section style={{ background: '#f1efef', paddingTop: 110, paddingBottom: 90 }}>
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: '0 15px' }}>
        <Link
          href="/work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: NAV_FONT,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(45,50,50,0.6)',
            textDecoration: 'none',
            marginBottom: 32,
            cursor: 'pointer',
          }}
        >
          <ArrowLeft style={{ width: 14, height: 14 }} />
          Work
        </Link>

        <h1 style={{
          fontFamily: SERIF,
          fontWeight: 700,
          fontSize: 64,
          lineHeight: 1.05,
          color: '#2d3232',
          margin: 0,
          marginBottom: 16,
        }}>
          {post.title}
        </h1>

        {eyebrow && (
          <p style={{
            fontFamily: NAV_FONT,
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(45,50,50,0.55)',
            margin: 0,
            marginBottom: showRightCol ? 64 : 0,
          }}>
            {eyebrow}
          </p>
        )}

        {(post.subtitle || post.intro) && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 40,
            alignItems: 'flex-start',
            marginTop: 16,
          }}>
            {post.subtitle && (
              <div style={{ flex: '1 1 360px', minWidth: 280 }}>
                <p style={{
                  fontFamily: SERIF,
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: 36,
                  lineHeight: 1.15,
                  color: '#2d3232',
                  margin: 0,
                }}>
                  {post.subtitle}
                </p>
              </div>
            )}
            {post.intro && (
              <div style={{ flex: '1 1 360px', minWidth: 280 }}>
                <p style={{
                  fontFamily: SANS,
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: 'rgba(45,50,50,0.85)',
                  margin: 0,
                }}>
                  {post.intro}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Related Work (kept from current design - content from WP)
   ------------------------------------------------------------------------- */

function RelatedWork({ items }: { items: RelatedItem[] }) {
  return (
    <section style={{ background: '#f1efef', padding: '90px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 40,
        }}>
          <p style={{
            fontFamily: NAV_FONT,
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(45,50,50,0.55)',
            margin: 0,
          }}>
            — Related Work
          </p>
          <Link
            href="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: NAV_FONT,
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(45,50,50,0.7)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            View All Work
            <ArrowRight style={{ width: 12, height: 12 }} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
              <FadeIn>
                <div style={{ aspectRatio: '293 / 414', overflow: 'hidden', background: '#fff' }}>
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </div>
                <p style={{
                  fontFamily: SANS,
                  fontSize: 14,
                  color: '#2d3232',
                  margin: 0,
                  marginTop: 12,
                }}>
                  {item.title}
                </p>
              </FadeIn>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Conversation CTA (kept from current design)
   ------------------------------------------------------------------------- */

function ConversationCTA() {
  return (
    <section style={{ background: '#2d3232', padding: '90px 32px', textAlign: 'center' }}>
      <FadeIn>
        <p style={{
          fontFamily: NAV_FONT,
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,235,0.6)',
          margin: 0,
          marginBottom: 24,
        }}>
          Start a Conversation
        </p>
        <h2 style={{
          fontFamily: SERIF,
          fontWeight: 700,
          fontSize: 48,
          lineHeight: 1,
          color: '#f5f0eb',
          margin: 0,
          marginBottom: 16,
        }}>
          Good design is good business.
        </h2>
        <p style={{
          fontSize: 16,
          color: 'rgba(245,240,235,0.6)',
          maxWidth: 560,
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          You don't need to have it all figured out — that's what we're here for. Share your story, and we'll help shape the strategy.
        </p>
        <BtnLight href="/contact" external={false}>
          Get In Touch <ArrowRight className="w-4 h-4" />
        </BtnLight>
      </FadeIn>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Status states
   ------------------------------------------------------------------------- */

function CenteredMessage({ label, tone }: { label: string; tone?: 'error' }) {
  return (
    <section style={{ background: '#f1efef', minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{
        fontFamily: tone === 'error' ? 'monospace' : NAV_FONT,
        fontSize: tone === 'error' ? 14 : 12,
        color: tone === 'error' ? '#c33' : 'rgba(45,50,50,0.45)',
        letterSpacing: tone === 'error' ? 'normal' : '0.18em',
        textTransform: tone === 'error' ? 'none' : 'uppercase',
        margin: 0,
      }}>
        {label}
      </p>
    </section>
  );
}

function NotFound({ slug }: { slug?: string }) {
  return (
    <section style={{ background: '#f1efef', minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <h1 style={{
        fontFamily: SERIF,
        fontWeight: 700,
        fontSize: 36,
        color: '#2d3232',
        marginBottom: 16,
      }}>
        We couldn't find that work.
      </h1>
      <p style={{
        fontFamily: SANS,
        fontSize: 14,
        color: 'rgba(45,50,50,0.6)',
        marginBottom: 32,
      }}>
        {slug ? `No post matched "${slug}".` : 'No slug provided.'}
      </p>
      <Link
        href="/work"
        style={{
          fontFamily: NAV_FONT,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#2d3232',
          borderBottom: '1px solid rgba(45,50,50,0.25)',
          paddingBottom: 4,
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        ← All Work
      </Link>
    </section>
  );
}
