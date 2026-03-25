'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

export default function InvestHero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80')",
          filter: 'brightness(0.25)',
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 px-[5.5vw] py-[140px] md:py-[180px]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
          <div>
            <motion.p
              variants={fadeUp}
              className="text-cream/40 text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3"
            >
              <span className="block w-8 h-px bg-cream/20" />
              Investment
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-serif text-cream text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Invest in
              <br />
              <em className="text-taupe">Lombok&apos;s Future</em>
            </motion.h1>
          </div>
          <div className="lg:border-l lg:border-cream/10 lg:pl-16">
            <motion.p
              variants={fadeUp}
              className="text-cream/60 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md"
            >
              Curated investment opportunities in Southeast Asia&apos;s
              fastest-growing hospitality market. Transparent models, proven
              returns, complete support from land to yield.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button href="#opportunities" variant="cream">
                View Opportunities
              </Button>
              <Button href="#lead-form" variant="ghost">
                Request Info
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
