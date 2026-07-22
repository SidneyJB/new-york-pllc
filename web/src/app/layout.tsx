import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { MainLayout } from '@/components/layout'
import { Analytics } from '@vercel/analytics/next'
import { generateRootSchemas } from '@/lib/seo/structured-data'
import { SEO_CONFIG } from '@/lib/seo/config'
import { BingAdsTracking } from '@/components/analytics/bing-ads-tracking'
import { MetaPixelEvents } from '@/components/analytics/meta-pixel-events'
import { TawkOnGesture } from '@/components/analytics/tawk-on-gesture'
import { ClickAttributionCapture } from '@/components/click-attribution/click-attribution-capture'
import { PartnerReferralCapture } from '@/components/referral-attribution/partner-referral-capture'
import { FB_PIXEL_ID } from '@/lib/fbpixel'
import './globals.css'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Root metadata for SEO
export const metadata: Metadata = {
  // NOTE (Jul 22 2026 title/meta pass): `template` intentionally omitted.
  // Every page already sets its own full, brand-suffixed title string; a
  // template here silently appended "| NY PLLC Formation" a second time to
  // every child route's <title> (confirmed via rendered HTML). `default`
  // still covers the root route and any future page that omits metadata.
  title: 'NY PLLC Formation — $885 Flat, Publishing Included | NYPLLC',
  description: 'Form your New York PLLC for $885 flat — DOS filing, required 6-week publication, and EIN included. Fast, compliant formation for licensed professionals.',
  keywords: [
    'NY PLLC formation',
    'New York PLLC',
    'PLLC publishing',
    'professional LLC New York',
    'licensed professional LLC',
    'PLLC formation service',
    'NY professional corporation'
  ],
  authors: [{ name: 'New York PLLC Formation Service' }],
  creator: 'New York PLLC Formation Service',
  publisher: 'New York PLLC Formation Service',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        url: '/favicon.ico',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'New York PLLC Formation Service',
    title: 'NY PLLC Formation — $885 Flat, Publishing Included | NYPLLC',
    description: 'Form your New York PLLC for $885 flat — DOS filing, required 6-week publication, and EIN included. Fast, compliant formation for licensed professionals.',
    images: [{
      url: new URL(SEO_CONFIG.socialImage, SEO_CONFIG.siteUrl).toString(),
      width: 1200,
      height: 630,
      alt: 'New York PLLC Formation Service - Professional LLC Services',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NY PLLC Formation — $885 Flat, Publishing Included | NYPLLC',
    description: 'Form your New York PLLC for $885 flat — DOS filing, required 6-week publication, and EIN included.',
    images: [new URL(SEO_CONFIG.socialImage, SEO_CONFIG.siteUrl).toString()],
    creator: '@nypllc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* SEO Verification Meta Tags */}
        {/* <meta name="google-site-verification" content="your-gsc-code-here" />
        <meta name="msvalidate.01" content="your-bing-code-here" />
        <meta name="facebook-domain-verification" content="your-facebook-code-here" />
        <meta name="linkedin-verification-id" content="your-linkedin-code-here" /> */}

        {/* Merged Google Ads + GA4 gtag — one library load, deferred past LCP.
            Purchase / Begin checkout wait for window.gtag before firing. */}
        <Script
          id="gtag"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17672972971');
              gtag('config', 'G-X6Y3R8ZTXS');
              var s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17672972971';
              document.head.appendChild(s);
            `,
          }}
        />

        {/* Bing Ads Universal Event Tracking — deferred past LCP */}
        <BingAdsTracking />

        {/* Meta Pixel — deferred past LCP (Purchase waits for fbq on confirmation) */}
        {FB_PIXEL_ID && (
          <>
            <Script
              id="fb-pixel"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${FB_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                alt=""
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}

      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateRootSchemas()),
          }}
        />
        <Suspense fallback={null}>
          <MetaPixelEvents />
        </Suspense>
        <PartnerReferralCapture />
        <ClickAttributionCapture />
        <TawkOnGesture />
        <MainLayout>{children}</MainLayout>
        <Analytics />
      </body>
    </html>
  )
}
