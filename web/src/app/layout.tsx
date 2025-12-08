
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import { Suspense } from 'react'
import { MainLayout } from '@/components/layout'
import { Analytics } from '@vercel/analytics/next'
import { generateRootSchemas } from '@/lib/seo/structured-data'
import { SEO_CONFIG } from '@/lib/seo/config'
import { BingAdsTracking } from '@/components/analytics/bing-ads-tracking'
import { MetaPixelEvents } from '@/components/analytics/meta-pixel-events'
import './globals.css'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

// Root metadata for SEO
export const metadata: Metadata = {
  title: {
    default: 'NY PLLC Formation | Professional LLC Services New York',
    template: '%s | NY PLLC Formation',
  },
  description: 'Form your New York Professional Limited Liability Company (PLLC) for $885 including all publishing requirements. Fast, simple, and compliant PLLC formation for licensed professionals.',
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
    title: 'NY PLLC Formation | Professional LLC Services New York',
    description: 'Form your New York Professional Limited Liability Company (PLLC) for $885 including all publishing requirements. Fast, simple, and compliant PLLC formation for licensed professionals.',
    images: [{
      url: new URL(SEO_CONFIG.socialImage, SEO_CONFIG.siteUrl).toString(),
      width: 1200,
      height: 630,
      alt: 'New York PLLC Formation Service - Professional LLC Services',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NY PLLC Formation | Professional LLC Services New York',
    description: 'Form your New York Professional Limited Liability Company (PLLC) for $885 including all publishing requirements.',
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

        {/* Google tag (gtag.js) */}
        <Script
          id="gtag-src"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17672972971"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17672972971');
            `,
          }}
        />

        {/* Tawk.to Chat Widget */}
        <Script
          id="tawk-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/68f940cd511129194ce113cc/1j86qa8he';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />

        {/* Bing Ads Universal Event Tracking */}
        <BingAdsTracking />

        {/* Meta Pixel Code */}
        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
          <>
            <Script
              id="fb-pixel"
              strategy="afterInteractive"
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
                  fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
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
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}

      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased`}>
        <Script
          id="spiffy-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              "use strict";
              !function(i,t){
                var f=t.spiffy=t.spiffy||[];
                if(!f.init){
                  if(f.invoked){
                    return void (t.console && console.warn && console.warn("Spiffy Elements included twice."));
                  }
                  f.invoked=!0;
                  f.methods=["identify","config","debug","off","on"];
                  f.factory=function(i){
                    return function(){
                      var t=Array.prototype.slice.call(arguments);
                      t.unshift(i);
                      return f.push(t),f;
                    }
                  };
                  f.methods.forEach(function(i){spiffy[i]=f.factory(i)});
                  f.load=function(t,f){
                    if(!spiffy.ACCOUNT){
                      spiffy.ACCOUNT=t;
                      spiffy.DOMAIN=f;
                      var e=i.createElement("script");
                      e.type="text/javascript";
                      e.async=!0;
                      e.crossorigin="anonymous";
                      e.src="https://js.static.spiffy.co/spiffy.js?a="+t;
                      var n=i.getElementsByTagName("script")[0];
                      n.parentNode.insertBefore(e,n);
                    }
                  };
                }
              }(document,window);
              spiffy.SNIPPET_VERSION="1.1.0";
              spiffy.config({ hideSidebar: false });
              spiffy.load("nypllc");
            `,
          }}
        />
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
        <MainLayout>{children}</MainLayout>
        <Analytics />
      </body>
    </html>
  )
}
