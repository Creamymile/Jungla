import clsx from 'clsx'

interface SectionLabelProps {
  children: React.ReactNode
  light?: boolean
  className?: string
}

export default function SectionLabel({ children, light, className }: SectionLabelProps) {
  return (
    <div className={clsx('flex items-center gap-4', className)}>
      <span
        className={clsx(
          'block w-8 h-px',
          light ? 'bg-cream/30' : 'bg-black/20'
        )}
      />
      <span
        className={clsx(
          'text-[11px] font-sans font-medium tracking-widest uppercase',
          light ? 'text-cream/60' : 'text-muted'
        )}
      >
        {children}
      </span>
    </div>
  )
}
