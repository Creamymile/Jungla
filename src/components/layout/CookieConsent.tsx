'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const COOKIE_KEY = 'jungla-cookie-consent'

type ConsentValue = 'accepted' | 'declined'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show if user hasn't already responded
    const stored = localStorage.getItem(COOKIE_KEY) as ConsentValue | null
    if (!stored) {
      // Small delay so it doesn't flash on first paint
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  function handleDecline() {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9980] p-4 md:p-6"
        >
          <div className="max-w-3xl mx-auto bg-charcoal text-cream rounded-xl shadow-2xl border border-cream/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              {/* Text */}
              <div className="flex-1 text-sm font-light leading-relaxed">
                <p>
                  We use essential cookies to keep the site running and optional
                  analytics cookies to improve your experience. No personal data
                  is sold or shared with advertisers.{' '}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-5 py-2.5 text-[11px] font-sans font-medium tracking-widest uppercase border border-cream/20 rounded-lg hover:border-cream/40 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-5 py-2.5 text-[11px] font-sans font-medium tracking-widest uppercase bg-cream text-black rounded-lg hover:bg-white transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
