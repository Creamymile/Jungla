'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import RevealWrapper from '@/components/ui/RevealWrapper'

const services = [
  {
    num: '01',
    title: 'Villa Construction',
    desc: 'End-to-end villa development — from architectural design to final handover. European engineering, local craftsmanship, island-inspired aesthetics.',
    href: '/projects',
  },
  {
    num: '02',
    title: 'Villa Management',
    desc: 'Full-service property management including guest operations, maintenance, revenue optimization, and owner reporting. Hands-free ownership.',
    href: '/bookings',
  },
  {
    num: '03',
    title: 'Investment',
    desc: 'Curated investment opportunities in Lombok\'s booming hospitality market. Transparent models, proven returns, complete support.',
    href: '/invest',
  },
]

export default function ServicesGrid() {
  return (
    <section className="bg-cream px-[5.5vw] py-[120px]">
      <RevealWrapper>
        <div className="mb-16">
          <p className="text-muted text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3">
            <span className="block w-8 h-px bg-black/20" />
            What We Do
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2] max-w-xl">
            Three Pillars,
            <br />
            One Vision
          </h2>
        </div>
      </RevealWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {services.map((service, i) => (
          <RevealWrapper key={service.num} delay={i * 0.15}>
            <Link
              href={service.href}
              className="group relative block border-t border-black/10 pt-8 pb-12 md:pr-10 md:last:pr-0"
            >
              {/* Hover top-rule animation */}
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-black group-hover:w-full transition-all duration-500 ease-out" />

              <span className="block text-muted text-[12px] font-sans tracking-widest mb-6">
                {service.num}
              </span>
              <h3 className="font-serif text-xl md:text-2xl mb-4 group-hover:text-charcoal transition-colors">
                {service.title}
              </h3>
              <p className="text-muted text-sm font-light leading-relaxed mb-8">
                {service.desc}
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] font-sans font-medium tracking-widest uppercase text-black/60 group-hover:text-black transition-colors">
                Learn More
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}
