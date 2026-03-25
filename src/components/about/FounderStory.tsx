'use client'

import Image from 'next/image'
import RevealWrapper from '@/components/ui/RevealWrapper'

export default function FounderStory() {
  return (
    <section className="px-[5.5vw] py-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image with offset frame */}
        <RevealWrapper>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Jungla founders"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-taupe/30 -z-10" />
          </div>
        </RevealWrapper>

        {/* Story */}
        <RevealWrapper delay={0.2}>
          <div>
            <p className="text-muted text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="block w-8 h-px bg-black/20" />
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2] mb-8">
              Born From a Love
              <br />
              of Lombok
            </h2>
            <div className="space-y-5 text-muted text-base font-light leading-relaxed">
              <p>
                Jungla was founded by a team of European entrepreneurs and
                Indonesian craftspeople who shared a single conviction: Lombok
                deserves world-class architecture that respects the land.
              </p>
              <p>
                With over 14 years of combined experience in construction,
                hospitality, and property management across Southeast Asia, we
                set out to bridge the gap between international investor
                expectations and local building realities.
              </p>
              <p>
                Today, Jungla is a full-service company — from land acquisition
                and architectural design to construction, interior finishing,
                guest operations, and revenue management. Every villa we deliver
                is a testament to what happens when European precision meets
                island soul.
              </p>
            </div>
            <blockquote className="border-l-2 border-taupe/40 pl-6 mt-8">
              <p className="font-serif text-lg italic text-charcoal leading-relaxed">
                &ldquo;We didn&apos;t come to Lombok to build villas. We came to
                build a legacy.&rdquo;
              </p>
              <cite className="text-muted text-sm font-light mt-3 block not-italic">
                — Founding Team
              </cite>
            </blockquote>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
