'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error monitoring service in production
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="bg-cream pt-[var(--nav-height)] min-h-screen flex items-center">
      <div className="px-[5.5vw] py-20 lg:py-28 max-w-3xl mx-auto text-center">
        <p className="text-[11px] font-sans font-medium tracking-widest uppercase text-muted mb-6">
          Something Went Wrong
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-black mb-6">
          A Storm in Paradise
        </h1>
        <p className="text-muted text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto mb-12">
          We encountered an unexpected error. Our team has been notified. You can try again or
          return home.
        </p>

        {error.digest && (
          <p className="text-xs font-mono text-muted/60 mb-8">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center h-12 px-8 bg-black text-cream text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-charcoal transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 bg-transparent text-black border border-black/20 text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-black hover:text-cream transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
