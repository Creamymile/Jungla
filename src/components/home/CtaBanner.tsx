'use client'

import Button from '@/components/ui/Button'
import RevealWrapper from '@/components/ui/RevealWrapper'

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')",
          filter: 'brightness(0.2)',
        }}
      />

      <div className="relative z-10 px-[5.5vw] py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — headline */}
          <RevealWrapper>
            <h2 className="font-serif text-cream text-3xl md:text-4xl lg:text-5xl leading-[1.15]">
              Ready to Build
              <br />
              Your Vision?
            </h2>
          </RevealWrapper>

          {/* Right — body + buttons */}
          <RevealWrapper delay={0.2}>
            <div>
              <p className="text-cream/60 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md">
                Whether you&apos;re looking to invest, build your dream villa,
                or book an unforgettable stay — we&apos;re here to make it
                happen.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contact" variant="cream">
                  Book a Call
                </Button>
                <Button href="/invest" variant="ghost">
                  Explore Investments
                </Button>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
