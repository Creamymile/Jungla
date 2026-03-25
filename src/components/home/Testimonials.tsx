'use client'

import { Star } from 'lucide-react'
import RevealWrapper from '@/components/ui/RevealWrapper'
import type { Testimonial } from '@/types'

interface TestimonialsProps {
  testimonials?: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null

  const items = testimonials

  return (
    <section className="bg-cream px-[5.5vw] py-[120px]">
      <RevealWrapper>
        <div className="text-center mb-16">
          <p className="text-muted text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center justify-center gap-3">
            <span className="block w-8 h-px bg-black/20" />
            Testimonials
            <span className="block w-8 h-px bg-black/20" />
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2]">
            What They Say
          </h2>
        </div>
      </RevealWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((t, i) => (
          <RevealWrapper key={t._id} delay={i * 0.15}>
            <div className="bg-white p-8 md:p-10 flex flex-col h-full">
              {/* Quote mark */}
              <span className="font-serif text-6xl text-taupe/40 leading-none mb-4">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.stars || 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    className="text-taupe fill-taupe"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-base italic text-charcoal leading-relaxed flex-1 mb-8">
                {t.quote}
              </p>

              {/* Divider */}
              <div className="h-px w-full bg-black/10 mb-6" />

              {/* Author */}
              <div>
                <p className="font-sans text-sm font-medium text-black">
                  {t.authorName}
                </p>
                <p className="text-muted text-[12px] font-light mt-1">
                  {t.roleOrigin}
                </p>
              </div>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}
