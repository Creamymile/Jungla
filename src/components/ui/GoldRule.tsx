import clsx from 'clsx'

interface GoldRuleProps {
  className?: string
  light?: boolean
}

export default function GoldRule({ className, light }: GoldRuleProps) {
  return (
    <div
      className={clsx(
        'h-px w-full',
        light ? 'bg-cream/10' : 'bg-black/10',
        className
      )}
    />
  )
}
