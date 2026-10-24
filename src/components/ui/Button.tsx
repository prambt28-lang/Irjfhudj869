import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'outline' | 'outline-light' | 'light' | 'ghost'
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
  'inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold tracking-[0.01em] transition-all duration-300 ease-premium disabled:cursor-not-allowed disabled:opacity-50'

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-5 text-[0.76rem]',
  md: 'h-12 px-7 text-[0.82rem]',
  lg: 'h-[3.4rem] px-9 text-[0.86rem]',
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white shadow-soft hover:bg-navy-800 hover:shadow-lift',
  outline: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white',
  'outline-light': 'border border-white/45 text-white hover:border-white hover:bg-white hover:text-navy',
  light: 'bg-white text-navy shadow-soft hover:bg-white/90',
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
