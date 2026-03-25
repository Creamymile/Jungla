import Link from 'next/link'
import clsx from 'clsx'

interface ButtonProps {
  href?: string
  variant?: 'cream' | 'ghost' | 'dark'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export default function Button({
  href,
  variant = 'cream',
  children,
  className,
  onClick,
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center h-11 px-7 text-[12px] font-sans font-medium tracking-widest uppercase transition-all duration-300 min-w-[44px]'

  const variants = {
    cream: 'bg-cream text-black border border-cream hover:bg-black hover:text-cream',
    ghost: 'bg-transparent text-cream border border-cream/40 hover:bg-cream hover:text-black',
    dark: 'bg-black text-cream border border-black hover:bg-cream hover:text-black',
  }

  const classes = clsx(base, variants[variant], className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
