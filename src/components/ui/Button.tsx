import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'outline' | 'outline-light' | 'light' | 'champagne' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
  iconLeft?: ReactNode
  iconRight?: ReactNode
  fullWidth?: boolean
  /** Internal route — renders a react-router Link. */
  to?: string
  /** External / telephone / mail link — renders an anchor. */
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  tabIndex?: number
  'aria-label'?: string
}

export type ButtonProps = ButtonBaseProps

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold transition-all duration-300 ease-premium disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-[1px]'

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-5 text-[0.78rem]',
  md: 'h-12 px-7 text-[0.84rem]',
  lg: 'h-[3.4rem] px-9 text-[0.88rem]',
}

/** Depth on every variant: a lit top edge, then a contact + ambient shadow pair. */
const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-navy text-white shadow-depth hover:bg-navy-800 hover:shadow-depth-lg active:shadow-press',
  outline:
    'border border-navy/25 bg-white text-navy shadow-depth-sm hover:-translate-y-px hover:border-navy hover:bg-navy hover:text-white hover:shadow-depth',
  'outline-light':
    'border border-white/45 text-white shadow-[0_12px_30px_-18px_rgba(0,0,0,0.65)] backdrop-blur-[2px] hover:-translate-y-px hover:border-white hover:bg-white hover:text-navy hover:shadow-lift',
  light: 'bg-white text-navy shadow-depth hover:-translate-y-px hover:shadow-depth-lg',
  // The site's one gold action, used by the closing 3D gallery.
  champagne:
    'bg-champagne text-navy shadow-depth hover:-translate-y-px hover:bg-champagne-light hover:shadow-depth-lg active:shadow-press',
  ghost: 'text-navy hover:text-champagne-dark',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  iconLeft,
  iconRight,
  fullWidth,
  to,
  href,
  type = 'button',
  disabled,
  onClick,
  tabIndex,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], fullWidth && 'w-full', className)
  const content = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} tabIndex={tabIndex} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  )
}
