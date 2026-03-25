'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import RevealWrapper from '@/components/ui/RevealWrapper'

export default function IntroSplit() {
  return (
    <section className="px-[5.5vw] py-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — image with offset frame */}
        <RevealWrapper>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Jungla luxury villa interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Offset decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-taupe/30 -z-10" />
          </div>
        </RevealWrapper>

        {/* Right — text */}
        <RevealWrapper delay={0.2}>
          <div className="flex flex-col">
            <p className="text-muted text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="block w-8 h-px bg-black/20" />
              Who We Are
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2] mb-8">
              Crafting Lombok&apos;s
              <br />
              Finest Retreats
            </h2>
            <p className="text-muted text-base font-light leading-relaxed mb-8 max-w-lg">
              Jungla is a luxury villa construction and management company
              rooted in Lombok, Indonesia. We combine European building
              standards with the island&apos;s natural beauty to deliver
              exceptional properties — from concept to keys, and beyond.
            </p>
            <blockquote className="border-l-2 border-taupe/40 pl-6 mb-10">
              <p className="font-serif text-lg italic text-charcoal leading-relaxed">
                &ldquo;We don&apos;t just build villas — we build legacies that
                blend seamlessly with the landscape.&rdquo;
              </p>
            </blockquote>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-[12px] font-sans font-medium tracking-widest uppercase text-black hover:text-taupe transition-colors group"
            >
              Learn Our Story
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
