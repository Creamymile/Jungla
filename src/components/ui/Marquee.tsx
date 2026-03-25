'use client'

import clsx from 'clsx'

interface MarqueeProps {
  items: string[]
  className?: string
  speed?: number
}

export default function Marquee({ items, className, speed = 30 }: MarqueeProps) {
  const content = items.join(' \u2014 ')

  return (
    <div
      className={clsx(
        'overflow-hidden whitespace-nowrap bg-cream py-4',
        className
      )}
    >
      <div
        className="inline-flex animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        <span className="text-[13px] font-sans font-light tracking-widest uppercase text-muted px-4">
          {content} &mdash;&nbsp;
        </span>
        <span className="text-[13px] font-sans font-light tracking-widest uppercase text-muted px-4">
          {content} &mdash;&nbsp;
        </span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  )
}
