'use client'

import { Compass, PenTool, Hammer, Key, LineChart } from 'lucide-react'
import RevealWrapper from '@/components/ui/RevealWrapper'

const steps = [
  {
    icon: Compass,
    title: 'Land & Vision',
    desc: 'We identify premium plots and work with you to define the vision — from architectural style to investment goals.',
  },
  {
    icon: PenTool,
    title: 'Design',
    desc: 'Our architects create bespoke designs that maximize Lombok\'s natural beauty, airflow, and views while meeting international standards.',
  },
  {
    icon: Hammer,
    title: 'Build',
    desc: 'European-grade construction with local craftsmanship. Real-time progress updates, milestone payments, and rigorous quality control.',
  },
  {
    icon: Key,
    title: 'Handover',
    desc: 'Your villa is delivered turnkey — fully furnished, interior-designed, and ready for guests or personal use.',
  },
  {
    icon: LineChart,
    title: 'Manage & Earn',
    desc: 'Our management team handles guest operations, maintenance, marketing, and revenue optimization. You earn, hands-free.',
  },
]

export default function ApproachSteps() {
  return (
    <section className="px-[5.5vw] py-[120px]">
      <RevealWrapper>
        <div className="mb-16 max-w-xl">
          <p className="text-muted text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3">
            <span className="block w-8 h-px bg-black/20" />
            Our Approach
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2]">
            From Land
            <br />
            to Yield
          </h2>
        </div>
      </RevealWrapper>

      <div className="relative">
        {/* Vertical line connector — desktop */}
        <div className="hidden lg:block absolute left-[22px] top-8 bottom-8 w-px bg-black/10" />

        <div className="space-y-0">
          {steps.map((step, i) => (
            <RevealWrapper key={step.title} delay={i * 0.1}>
              <div className="group relative flex gap-6 lg:gap-10 border-t border-black/10 py-8 first:border-t-0 lg:first:border-t lg:pl-0">
                {/* Icon */}
                <div className="relative z-10 w-11 h-11 border border-black/10 bg-white flex items-center justify-center flex-shrink-0 group-hover:border-black/30 transition-colors">
                  <step.icon size={18} className="text-taupe" />
                </div>

                {/* Content */}
                <div className="flex-1 max-w-lg">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-muted text-[12px] font-sans tracking-widest">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-xl group-hover:translate-x-1 transition-transform duration-300">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted text-sm font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
