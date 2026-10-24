import type { ReactNode } from 'react'

import { cn } from '../../lib/cn'

interface SectionLabelProps {
  children: ReactNode
  align?: 'left' | 'center'
  /** `light` sits on navy/dark surfaces. */
  tone?: 'default' | 'light'
  className?: string
}

/** Small letter-spaced label that opens every section. */
export function SectionLabel({ children, align = 'left', tone = 'default', className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center', className)}>
      <span className={cn('h-px w-8', tone === 'light' ? 'bg-champagne/70' : 'bg-champagne')} aria-hidden="true" />
      <span className={cn('eyebrow', tone === 'light' && 'text-champagne-light')}>{children}</span>
    </div>
  )
}
