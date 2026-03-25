'use client'

import { Shield, Headphones, Star, CreditCard } from 'lucide-react'
import RevealWrapper from '@/components/ui/RevealWrapper'

const advantages = [
  {
    icon: Shield,
    title: 'Verified Properties',
    desc: 'Every listing is owned and managed by Jungla. No third-party surprises.',
  },
  {
    icon: Headphones,
    title: '24/7 Guest Support',
    desc: 'On-site team and WhatsApp concierge throughout your stay.',
  },
  {
    icon: Star,
    title: 'Premium Experience',
    desc: 'Hotel-grade linens, welcome packages, and curated local experiences.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    desc: 'Book with confidence through our secure payment system.',
  },
]

export default function AdvantagesStrip() {
  return (
    <section className="bg-black px-[5.5vw] py-[100px]">
      <RevealWrapper>
        <div className="text-center mb-14">
          <p className="text-cream/40 text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center justify-center gap-3">
            <span className="block w-8 h-px bg-cream/20" />
            Why Book Direct
            <span className="block w-8 h-px bg-cream/20" />
          </p>
          <h2 className="font-serif text-cream text-3xl md:text-4xl leading-[1.2]">
            The Jungla Difference
          </h2>
        </div>
      </RevealWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {advantages.map((adv, i) => (
          <RevealWrapper key={adv.title} delay={i * 0.1}>
            <div className="text-center">
              <div className="w-12 h-12 border border-cream/15 flex items-center justify-center mx-auto mb-5">
                <adv.icon size={20} className="text-taupe" />
              </div>
              <h3 className="font-serif text-cream text-base mb-2">{adv.title}</h3>
              <p className="text-cream/40 text-sm font-light leading-relaxed">
                {adv.desc}
              </p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}
