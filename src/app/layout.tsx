import type { Metadata } from 'next'
import Script from 'next/script'
import { Libre_Baskerville, DM_Sans } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import CookieConsent from '@/components/layout/CookieConsent'
import { siteConfig } from '@/lib/site.config'
import './globals.css'

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Luxury Villa Construction & Management, Lombok`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — Luxury Villa Development, Lombok`,
    description: siteConfig.description,
    // OG image auto-discovered from src/app/opengraph-image.tsx
    locale: 'en_US',
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {plausibleDomain && (
          <Script
            id="plausible-loader"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    if (localStorage.getItem('jungla-cookie-consent') === 'accepted') {
                      var s = document.createElement('script');
                      s.defer = true;
                      s.dataset.domain = '${plausibleDomain}';
                      s.src = 'https://plausible.io/js/script.outbound-links.js';
                      document.head.appendChild(s);
                    }
                  } catch(e) {}
                })();
              `,
            }}
          />
        )}
      </head>
      <body
        className={`${libreBaskerville.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-black focus:text-cream focus:px-4 focus:py-2 focus:text-sm">
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" className="pt-[var(--nav-height)]">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CookieConsent />
      </body>
    </html>
  )
}
