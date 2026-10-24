import type { ReactNode } from 'react'

import { cn } from '../../lib/cn'

/** Shared control styling for select / input / textarea across filters and forms. */
export const controlClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink-soft hover:border-navy/25 focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/35 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60'

export const selectClass = cn(controlClass, 'select-field appearance-none pr-10')

interface FieldProps {
  label: string
  id: string
  error?: string
  hint?: string
  children: ReactNode
  className?: string
}

export function Field({ label, id, error, hint, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={id}
        className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted"
      >
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs leading-relaxed text-ink-soft">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
