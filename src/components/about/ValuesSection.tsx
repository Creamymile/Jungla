'use client'

import RevealWrapper from '@/components/ui/RevealWrapper'

const values = [
  {
    title: 'Integrity',
    desc: 'We say what we mean and deliver what we promise. Transparent pricing, honest timelines, and open communication.',
  },
  {
    title: 'Craftsmanship',
    desc: 'Every detail matters. From structural engineering to the placement of a light switch — we obsess over quality.',
  },
  {
    title: 'Sustainability',
    desc: 'We build with the land, not against it. Local materials, rainwater harvesting, and energy-efficient design are standard.',
  },
  {
    title: 'Partnership',
    desc: 'Our clients are partners. Your success is our success — whether you\'re an investor or a guest.',
  },
]

export default function ValuesSection() {
  return (
    <section className="relative bg-black overflow-hidden px-[5.5vw] py-[120px]">
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-serif text-[16vw] text-cream/[0.03] whitespace-nowrap">
          Values
        </span>
      </div>

      <div className="relative z-10">
        <RevealWrapper>
          <div className="mb-14">
            <p className="text-cream/40 text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="block w-8 h-px bg-cream/20" />
              What We Stand For
            </p>
            <h2 className="font-serif text-cream text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2]">
              Our Values
            </h2>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {values.map((value, i) => (
            <RevealWrapper key={value.title} delay={i * 0.1}>
              <div className="group border-t border-cream/10 py-8 md:pr-12 md:even:pl-12 md:even:pr-0 md:even:border-l md:even:border-cream/10">
                <div className="flex items-start gap-5">
                  <span className="text-cream/20 text-[12px] font-sans tracking-widest mt-1">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-cream text-lg mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {value.title}
                    </h3>
                    <p className="text-cream/40 text-sm font-light leading-relaxed max-w-sm">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
