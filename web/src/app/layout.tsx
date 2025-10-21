
import { Inter, JetBrains_Mono } from 'next/font/google'
import { MainLayout } from '@/components/layout'
import './globals.css'

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
spiffy.load("nyllcpub");
`
        }}/>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
