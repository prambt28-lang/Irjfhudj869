import type { ReactNode } from 'react'

import { cn } from '../../lib/cn'

/**
 * Shared control styling for select / input / textarea across filters and forms.
 * The recessed shadow and the champagne focus glow are what give the fields their
 * depth; both are shadow-only, so nothing reflows on focus.
 */
export const controlClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink shadow-inner-depth transition-[border-color,box-shadow,transform] duration-300 placeholder:text-ink-soft hover:border-navy/25 focus:-translate-y-px focus:border-champagne focus:shadow-glow focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60'

/** The arrow is drawn on the left (RTL), so the control reserves padding on its end side. */
export const selectClass = cn(controlClass, 'select-field appearance-none pe-10')

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
        className="font-display text-[0.74rem] font-semibold text-ink-muted"
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
