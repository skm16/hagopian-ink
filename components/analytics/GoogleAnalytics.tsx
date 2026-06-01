import Script from 'next/script';
import { Suspense } from 'react';
import { RouteChangeTracker } from './RouteChangeTracker';

// Hardcoded fallback mirrors the SITE_URL pattern in app/layout.tsx — keeps
// analytics working in environments where the env var hasn't been set yet
// (e.g. Railway preview deploys), without leaking anything sensitive.
const MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-ENF9YZ2FTT';

export function GoogleAnalytics() {
  if (!MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // send_page_view:false — App Router routing handled by RouteChangeTracker
          // below, which fires the initial page_view and every client navigation.
          gtag('config', '${MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      {/* useSearchParams needs a Suspense boundary in App Router builds. */}
      <Suspense fallback={null}>
        <RouteChangeTracker measurementId={MEASUREMENT_ID} />
      </Suspense>
    </>
  );
}
