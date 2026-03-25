import Link from 'next/link'
import { Instagram, Mail, Phone } from 'lucide-react'

const footerLinks = {
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/projects', label: 'Projects' },
    { href: '/invest', label: 'Invest With Us' },
    { href: '/bookings', label: 'Bookings' },
    { href: '/contact', label: 'Contact' },
  ],
  services: [
    { href: '/projects', label: 'Villa Construction' },
    { href: '/projects', label: 'Villa Management' },
    { href: '/invest', label: 'Investment' },
    { href: '/bookings', label: 'Holiday Rentals' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-black text-cream/70">
      <div className="px-[5.5vw] py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 border border-cream/30 flex items-center justify-center">
                <span className="text-cream font-serif text-sm font-bold">J</span>
              </div>
              <span className="text-cream font-serif text-lg tracking-wider">JUNGLA</span>
            </Link>
            <p className="text-sm font-light leading-relaxed max-w-[280px]">
              Luxury villa construction & management in Lombok, Indonesia. European standards, island soul.
            </p>
          </div>

          {/* Col 2 — Company */}
          <div>
            <h4 className="text-cream text-[11px] font-sans font-medium tracking-widest uppercase mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light hover:text-cream transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="text-cream text-[11px] font-sans font-medium tracking-widest uppercase mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light hover:text-cream transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="text-cream text-[11px] font-sans font-medium tracking-widest uppercase mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-taupe flex-shrink-0" />
                <a href="mailto:hello@jungla.com" className="text-sm font-light hover:text-cream transition-colors">
                  hello@jungla.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-taupe flex-shrink-0" />
                <a href="tel:+6281234567890" className="text-sm font-light hover:text-cream transition-colors">
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={16} className="text-taupe flex-shrink-0" />
                <a
                  href="https://instagram.com/jungla.lombok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light hover:text-cream transition-colors"
                >
                  @jungla.lombok
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/[0.08] px-[5.5vw] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[12px] font-light text-cream/40">
          &copy; {new Date().getFullYear()} PT Jungla Lombok. All rights reserved.
        </p>
        <p className="text-[12px] font-light text-cream/40">
          Lombok, Indonesia
        </p>
      </div>
    </footer>
  )
}
