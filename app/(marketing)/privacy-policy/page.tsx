import type { Metadata } from 'next';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { SERIF, SANS } from '@/lib/brand';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'Hagopian Ink privacy policy.',
  canonicalPath: '/privacy-policy',
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav alwaysVisible />
      <main style={{ maxWidth: 880, margin: '110px auto 80px', padding: '0 24px' }}>
        <h1 style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 700, marginBottom: 32, color: '#111' }}>
          Privacy Policy
        </h1>

        <p style={pStyle}>
          Our Privacy Policy sets forth what type of information Hagopian Ink collects from visitors
          to our site and how we use this information. Your use of the Hagopian Ink website is an
          expression of your understanding and compliance with our Privacy Policy and Terms of Use.
        </p>

        <h2 style={h2Style}>Information We Collect</h2>
        <p style={pStyle}>
          Our website uses a form that our visitors can complete to request information on our services
          and/or share project details with us, including contact information and company URLs. We use
          this information for the purpose of evaluating potential business relationships with those
          who contact us. The information disclosed via this form is held secure by Hagopian Ink and
          is never shared with third parties.
        </p>

        <h2 style={h2Style}>Usage Data &amp; Cookies</h2>
        <p style={pStyle}>
          We also use visitors&rsquo; IP addresses, aggregated traffic statistics (number of visitors,
          pages visited, etc.) and cookies to help us better administer our website.
        </p>

        <h2 style={h2Style}>Email Communications</h2>
        <p style={pStyle}>
          We collect email addresses for the purposes of providing periodic updates on Hagopian Ink
          and our services. Sharing your email address with us indicates your interest in receiving
          this information.
        </p>

        <h2 style={h2Style}>Data Use &amp; Third Parties</h2>
        <p style={pStyle}>
          All information collected via the Hagopian Ink website is for our internal use. We will not
          sell, rent or share your information with third parties.
        </p>

        <h2 style={h2Style}>Contact</h2>
        <p style={pStyle}>For questions about our Privacy Policy, you may contact us at:</p>
        <p style={pStyle}>
          Hagopian Ink<br />
          Phone: (212)-327-1445<br />
          Email: <a href="mailto:info@hagopianink.com" style={{ color: '#222' }}>info@hagopianink.com</a>
        </p>
      </main>
      <Footer />
    </>
  );
}
