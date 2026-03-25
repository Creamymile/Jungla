'use client'

import { Search, PenTool, Hammer, Key } from 'lucide-react'
import RevealWrapper from '@/components/ui/RevealWrapper'

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Discovery',
    desc: 'We understand your goals, budget, and timeline. You receive a curated shortlist of opportunities matched to your profile.',
  },
  {
    num: '02',
    icon: PenTool,
    title: 'Agreement',
    desc: 'Transparent terms, clear legal structure, and a detailed project plan. No hidden costs, no surprises.',
  },
  {
    num: '03',
    icon: Hammer,
    title: 'Build',
    desc: 'Your villa is built to European standards with real-time progress updates, photo reports, and milestone payments.',
  },
  {
    num: '04',
    icon: Key,
    title: 'Yield',
    desc: 'Once delivered, our management team handles everything — guest operations, maintenance, and revenue optimization. You earn.',
  },
]

export default function InvestmentModel() {
  return (
    <section className="px-[5.5vw] py-[120px]">
      <RevealWrapper>
        <div className="mb-16">
          <p className="text-muted text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3">
            <span className="block w-8 h-px bg-black/20" />
            How It Works
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2] max-w-xl">
            From Capital
            <br />
            to Returns
          </h2>
        </div>
      </RevealWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {steps.map((step, i) => (
          <RevealWrapper key={step.num} delay={i * 0.12}>
            <div className="group relative border-t border-black/10 pt-8 pb-12 md:pr-8 last:pr-0">
              {/* Hover top-rule */}
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-black group-hover:w-full transition-all duration-500 ease-out" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-11 h-11 border border-black/10 flex items-center justify-center group-hover:border-black/30 transition-colors">
                  <step.icon size={18} className="text-taupe" />
                </div>
                <span className="text-muted text-[12px] font-sans tracking-widest">
                  {step.num}
                </span>
              </div>

              <h3 className="font-serif text-xl mb-3">{step.title}</h3>
              <p className="text-muted text-sm font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}
