'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/invest', label: 'Invest' },
  { href: '/bookings', label: 'Bookings' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[76px] bg-black border-b border-cream/[0.08]">
      <div className="flex items-center justify-between h-full px-[5.5vw]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <div className="w-9 h-9 border border-cream/30 flex items-center justify-center">
            <span className="text-cream font-serif text-sm font-bold">J</span>
          </div>
          <span className="text-cream font-serif text-lg tracking-wider">JUNGLA</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-cream/70 text-[13px] font-sans font-light tracking-widest uppercase hover:text-cream transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA button — desktop */}
        <Link
          href="/contact"
          className="hidden lg:inline-flex items-center h-10 px-6 bg-cream text-black text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-black hover:text-cream border border-cream transition-all duration-300"
        >
          Book a Call
        </Link>

        {/* Hamburger — mobile */}
        <button
          className="lg:hidden text-cream"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 top-[76px] bg-black z-40 flex flex-col items-center justify-center gap-8"
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-cream text-2xl font-serif tracking-wider hover:text-taupe transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center h-12 px-8 bg-cream text-black text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-black hover:text-cream border border-cream transition-all duration-300"
          >
            Book a Call
          </Link>
        </div>
      )}
    </nav>
  )
}
