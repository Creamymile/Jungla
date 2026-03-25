import type { Metadata } from 'next'
import { Libre_Baskerville, DM_Sans } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import './globals.css'

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jungla.com'),
  title: {
    default: 'Jungla — Luxury Villa Construction & Management, Lombok',
    template: '%s | Jungla',
  },
  description:
    'We design, build, and manage high-end villas in Lombok, Indonesia. Seamless investment and villa management with European standards.',
  openGraph: {
    title: 'Jungla — Luxury Villa Development, Lombok',
    description:
      'We design, build, and manage high-end villas in Lombok, Indonesia. Seamless investment and villa management with European standards.',
    images: ['/og-image.jpg'],
    locale: 'en_US',
    type: 'website',
    siteName: 'Jungla',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${libreBaskerville.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <Nav />
        <main className="pt-[var(--nav-height)]">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
