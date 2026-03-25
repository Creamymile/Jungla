'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const stats = [
  { value: '5+', label: 'Villas' },
  { value: '100%', label: 'Managed' },
  { value: '14yr', label: 'Heritage' },
  { value: '∞', label: 'Vision' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function Hero() {
  return (
    <section className="relative w-full min-h-[700px] h-screen overflow-hidden bg-black -mt-[var(--nav-height)]">
      {/* Background image with zoom */}
      <div className="absolute inset-0 z-0 animate-hero-zoom">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')",
          }}
        />
      </div>

      {/* Dark scrim */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/60 to-black/30" />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 h-full flex flex-col justify-end px-[5.5vw] pb-0"
      >
        {/* 2-col split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12">
          {/* Left — headline */}
          <div>
            <motion.p
              variants={fadeUp}
              className="text-cream/50 text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3"
            >
              <span className="block w-8 h-px bg-cream/30" />
              Lombok, Indonesia
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-serif text-cream text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight"
            >
              We Build Luxury
              <br />
              <em className="text-taupe">You Live It</em>
            </motion.h1>
          </div>

          {/* Right — desc + CTAs */}
          <div className="flex flex-col justify-end lg:border-l lg:border-cream/10 lg:pl-16">
            <motion.p
              variants={fadeUp}
              className="text-cream/60 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md"
            >
              Jungla designs, builds, and manages high-end villas in Lombok —
              European standards, island soul. Investment opportunities with
              full-service management.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button href="/projects" variant="cream">
                View Projects
              </Button>
              <Button href="/invest" variant="ghost">
                Invest With Us
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          variants={fadeUp}
          className="border-t border-cream/10 py-6 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <span className="block font-serif text-cream text-2xl md:text-3xl">
                {stat.value}
              </span>
              <span className="text-cream/40 text-[11px] font-sans tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue — right side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute right-[5.5vw] bottom-28 z-10 hidden lg:flex flex-col items-center gap-3"
      >
        <span className="text-cream/30 text-[10px] font-sans tracking-[0.35em] uppercase [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-px h-12 bg-cream/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-cream/60 animate-scroll-bar" />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes hero-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .animate-hero-zoom {
          animation: hero-zoom 20s ease-out forwards;
        }
        @keyframes scroll-bar {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-bar {
          animation: scroll-bar 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
