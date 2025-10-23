
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { MainLayout } from '@/components/layout'
import { generateRootSchemas } from '@/lib/seo/structured-data'
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
  metadataBase: new URL('https://newyorkpllc.com'),
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
      url: '/og-image.svg',
      width: 1200,
      height: 630,
      alt: 'New York PLLC Formation Service - Professional LLC Services',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NY PLLC Formation | Professional LLC Services New York',
    description: 'Form your New York Professional Limited Liability Company (PLLC) for $885 including all publishing requirements.',
    images: ['/og-image.svg'],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* SEO Verification Meta Tags */}
        {/* <meta name="google-site-verification" content="your-gsc-code-here" />
        <meta name="msvalidate.01" content="your-bing-code-here" />
        <meta name="facebook-domain-verification" content="your-facebook-code-here" />
        <meta name="linkedin-verification-id" content="your-linkedin-code-here" /> */}

        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17672972971" />
        <script
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
        <script type="text/javascript" dangerouslySetInnerHTML={{
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
          `}} 
        />


      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <script async dangerouslySetInnerHTML={{
          __html: `
            "use strict";!function(i,t){var f=t.spiffy=t.spiffy||[];if(!f.init){
            if(f.invoked)return void(t.console&&console.error&&console.warn("Spiffy Elements included twice."))
            ;f.invoked=!0,f.methods=["identify","config","debug","off","on"],f.factory=function(i){
            return function(){var t=Array.prototype.slice.call(arguments);return t.unshift(i),f.push(t),f}},
            f.methods.forEach(function(i){spiffy[i]=f.factory(i)}),f.load=function(t,f){if(!spiffy.ACCOUNT){
            spiffy.ACCOUNT=t,spiffy.DOMAIN=f;var e=i.createElement("script");e.type="text/javascript",
            e.async=!0,e.crossorigin="anonymous",e.src="https://js.static.spiffy.co/spiffy.js?a="+t
            ;var n=i.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)}}}}(document,window),
            spiffy.SNIPPET_VERSION="1.1.0";
            spiffy.config({
                hideSidebar: false,
            })
            spiffy.load("nypllc");
          `
        }}/>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateRootSchemas()),
          }}
        />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
