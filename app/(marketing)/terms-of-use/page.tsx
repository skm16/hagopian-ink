import type { Metadata } from 'next';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { SERIF, SANS } from '@/lib/brand';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'Hagopian Ink terms of use.',
  canonicalPath: '/terms-of-use',
});

const pStyle: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 16,
  lineHeight: 1.6,
  marginBottom: 16,
  color: '#222',
};

const h2Style: React.CSSProperties = {
  fontFamily: SERIF,
  fontSize: 22,
  fontWeight: 700,
  marginTop: 40,
  marginBottom: 12,
  color: '#111',
};

export default function TermsOfUsePage() {
  return (
    <>
      <Nav alwaysVisible />
      <main style={{ maxWidth: 880, margin: '110px auto 80px', padding: '0 24px' }}>
        <h1 style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 700, marginBottom: 32, color: '#111' }}>
          Terms of Use
        </h1>

        <h2 style={h2Style}>Accuracy &amp; Liability</h2>
        <p style={pStyle}>
          Content on the Hagopian Ink website is published in good faith and for information purposes
          only. No warranty or guarantee is given as to its accuracy, completeness or reliability.
          Hagopian Ink accepts no responsibility for any loss or damage relating to use of this website.
        </p>

        <h2 style={h2Style}>Intellectual Property</h2>
        <p style={pStyle}>
          Certain artwork, photography and logos included on this site are copyrighted intellectual
          property of Hagopian Ink&rsquo;s clients and are used with their permission. These materials
          may not be reproduced elsewhere, except by their respective copyright and trademark holders.
          All other material is copyrighted intellectual property of Hagopian Ink and may not be
          reproduced elsewhere without our explicit written permission.
        </p>

        <h2 style={h2Style}>Agreement</h2>
        <p style={pStyle}>
          By using our site, you indicate that you accept these terms of use and that you agree to
          abide by them.
        </p>

        <h2 style={h2Style}>Contact</h2>
        <p style={pStyle}>For questions about our Terms of Use, you may contact us at:</p>
        <p style={pStyle}>
          Hagopian Ink<br />
          82 Clearwater Drive<br />
          Harwich, MA 02645<br />
          Phone: <a href="tel:+12123271445" style={{ color: '#222' }}>(212)-327-1445</a><br />
          Email: <a href="mailto:info@hagopianink.com" style={{ color: '#222' }}>info@hagopianink.com</a>
        </p>
      </main>
      <Footer />
    </>
  );
}
