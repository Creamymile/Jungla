'use client'

import Script from 'next/script'
import { useState, useEffect } from 'react'

const COOKIE_KEY = 'jungla-cookie-consent'

/**
 * Loads Plausible analytics only after the user has accepted cookies.
 * Reads localStorage so it never fires without consent.
 */
export default function PlausibleScript({ domain }: { domain: string }) {
  const [load, setLoad] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(COOKIE_KEY) === 'accepted') {
        setLoad(true)
      }
    } catch {
      // localStorage unavailable (SSR / private browsing edge-case)
    }
  }, [])

  if (!load) return null

  return (
    <Script
      src="https://plausible.io/js/script.outbound-links.js"
      data-domain={domain}
      strategy="afterInteractive"
    />
  )
}
