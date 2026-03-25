'use client'

import Image from 'next/image'
import RevealWrapper from '@/components/ui/RevealWrapper'

const pillars = [
  {
    title: 'European Standards',
    desc: 'Built to international building codes with premium materials and meticulous quality control.',
  },
  {
    title: 'Full Transparency',
    desc: 'Real-time project tracking, detailed cost breakdowns, and open communication at every stage.',
  },
  {
    title: 'End-to-End Service',
    desc: 'From land acquisition to villa management — one team handles everything so you don\'t have to.',
  },
  {
    title: 'Proven Returns',
    desc: 'Data-driven pricing, high occupancy rates, and professional revenue management for your investment.',
  },
]

export default function WhyJungla() {
  return (
    <section className="relative bg-black overflow-hidden px-[5.5vw] py-[120px]">
      {/* Giant watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-serif text-[18vw] text-cream/[0.03] whitespace-nowrap">
          Jungla
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
        {/* Left — pillars */}
        <div>
          <RevealWrapper>
            <p className="text-cream/40 text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="block w-8 h-px bg-cream/20" />
              Why Jungla
            </p>
            <h2 className="font-serif text-cream text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2] mb-14">
              Built Different,
              <br />
              <em className="text-taupe">By Design</em>
            </h2>
          </RevealWrapper>

          <div className="space-y-0">
            {pillars.map((pillar, i) => (
              <RevealWrapper key={pillar.title} delay={i * 0.1}>
                <div className="group border-t border-cream/10 py-6 cursor-default">
                  <div className="flex items-start gap-6">
                    <span className="text-cream/20 text-[12px] font-sans tracking-widest mt-1">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-cream text-lg mb-2 group-hover:translate-x-2 transition-transform duration-300">
                        {pillar.title}
                      </h3>
                      <p className="text-cream/40 text-sm font-light leading-relaxed max-w-sm">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>

        {/* Right — image collage */}
        <RevealWrapper delay={0.3}>
          <div className="grid grid-cols-2 gap-3 h-full">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
                alt="Villa exterior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                  alt="Villa interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative flex-1 min-h-[200px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=600&q=80"
                  alt="Lombok landscape"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
