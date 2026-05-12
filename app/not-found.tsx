import Link from 'next/link';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';

export default function NotFound() {
  return (
    <>
      <Nav alwaysVisible />
      <main
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <h1 style={{ fontSize: 48, marginBottom: 16 }}>Page not found</h1>
        <p style={{ marginBottom: 32 }}>
          Looking for something specific? Try our <Link href="/work">work</Link> or{' '}
          <Link href="/blog">blog</Link>.
        </p>
        <Link href="/">← Back home</Link>
      </main>
      <Footer />
    </>
  );
}
