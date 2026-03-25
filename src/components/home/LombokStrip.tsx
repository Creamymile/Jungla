'use client'

import { TrendingUp, Building2, Plane, Sun } from 'lucide-react'
import RevealWrapper from '@/components/ui/RevealWrapper'

const facts = [
  {
    icon: TrendingUp,
    title: '20%+ Annual Growth',
    desc: 'Lombok\'s property market is one of the fastest-growing in Southeast Asia, driven by tourism and infrastructure investment.',
  },
  {
    icon: Building2,
    title: 'New International Airport',
    desc: 'Lombok International Airport connects the island to major Asian hubs with expanding routes year over year.',
  },
  {
    icon: Plane,
    title: '4M+ Tourists Targeted',
    desc: 'Indonesia\'s government targets 4 million tourists to Lombok by 2028, backed by the Mandalika SEZ development.',
  },
  {
    icon: Sun,
    title: 'Year-Round Season',
    desc: 'Tropical climate with consistent demand from international guests seeking sun, surf, and wellness retreats.',
  },
]

export default function LombokStrip() {
  return (
    <section className="relative bg-black overflow-hidden px-[5.5vw] py-[120px]">
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-serif text-[20vw] text-cream/[0.02] whitespace-nowrap uppercase tracking-widest">
          Lombok
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
        {/* Left — headline */}
        <RevealWrapper>
          <div>
            <p className="text-cream/40 text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="block w-8 h-px bg-cream/20" />
              The Opportunity
            </p>
            <h2 className="font-serif text-cream text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2] mb-6">
              Why Lombok,
              <br />
              <em className="text-taupe">Why Now</em>
            </h2>
            <p className="text-cream/50 text-base font-light leading-relaxed max-w-md">
              Lombok is at the inflection point Bali hit 15 years ago — with
              better fundamentals, government backing, and untouched natural
              beauty.
            </p>
          </div>
        </RevealWrapper>

        {/* Right — 4 facts */}
        <div className="space-y-0">
          {facts.map((fact, i) => (
            <RevealWrapper key={fact.title} delay={i * 0.1}>
              <div className="border-t border-cream/10 py-7 flex gap-5">
                <div className="w-11 h-11 border border-cream/15 flex items-center justify-center flex-shrink-0">
                  <fact.icon size={18} className="text-taupe" />
                </div>
                <div>
                  <h3 className="font-serif text-cream text-base mb-1.5">
                    {fact.title}
                  </h3>
                  <p className="text-cream/40 text-sm font-light leading-relaxed">
                    {fact.desc}
                  </p>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
