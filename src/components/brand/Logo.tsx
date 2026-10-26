import { cn } from '../../lib/cn'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M9 33V19.5l7-5.6 7 5.6V33" />
      <path d="M23 33V11.5h9V33" />
      <path d="M5 33h30" />
      <path d="M13 24.5h6M27 17.5h1.5M27 23.5h1.5M27 29.5h1.5" />
    </svg>
  )
}

interface LogoProps {
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Wordmark used in the header (light, over the hero) and the footer.
 *
 * The lockup is the brand's visual identity and stays in Latin: it keeps its own
 * Montserrat face (`font-brand`) and its wide letter-spacing, both of which the
 * Persian UI text deliberately drops. Only its position follows the RTL layout.
 */
export function Logo({ tone = 'light', className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark className="h-8 w-8 shrink-0 text-champagne drop-shadow-[0_4px_10px_rgba(197,160,112,0.35)] sm:h-9 sm:w-9" />
      <span className="flex flex-col leading-none" dir="ltr">
        <span
          className={cn(
            'font-brand text-[0.9rem] font-bold uppercase tracking-[0.2em] sm:text-[0.98rem]',
            tone === 'light' ? 'text-white' : 'text-navy',
          )}
        >
          Horizon
        </span>
        <span
          className={cn(
            'mt-[5px] font-brand text-[0.5rem] font-semibold uppercase tracking-[0.36em]',
            tone === 'light' ? 'text-white/70' : 'text-ink-soft',
          )}
        >
          Properties
        </span>
      </span>
    </span>
  )
}
