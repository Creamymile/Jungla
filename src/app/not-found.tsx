import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found — Jungla',
  description: 'The page you are looking for could not be found.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="bg-cream pt-[var(--nav-height)] min-h-screen flex items-center">
      <div className="px-[5.5vw] py-20 lg:py-28 max-w-3xl mx-auto text-center">
        <p className="text-[11px] font-sans font-medium tracking-widest uppercase text-muted mb-6">
          Error 404
        </p>
        <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-black mb-6">
          Lost in Paradise
        </h1>
        <p className="text-muted text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto mb-12">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. Let&rsquo;s get
          you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 bg-black text-cream text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-charcoal transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center h-12 px-8 bg-transparent text-black border border-black/20 text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-black hover:text-cream transition-colors"
          >
            Browse Projects
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-black/10 max-w-md mx-auto">
          <p className="text-muted text-sm font-light mb-4">Or explore</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-light">
            <Link href="/about" className="text-black hover:opacity-60 transition-opacity">About</Link>
            <Link href="/bookings" className="text-black hover:opacity-60 transition-opacity">Bookings</Link>
            <Link href="/invest" className="text-black hover:opacity-60 transition-opacity">Invest</Link>
            <Link href="/contact" className="text-black hover:opacity-60 transition-opacity">Contact</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
