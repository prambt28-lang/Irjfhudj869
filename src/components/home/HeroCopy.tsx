import type { ReactNode } from 'react'
import { HelpCircle, Search } from 'lucide-react'

import { Button } from '../ui/Button'
import { useInquiry } from '../../context/InquiryContext'
import { brand, contact, heroCopy } from '../../data/site'

/**
 * Hero copy block. Shared by the scroll-driven hero and its static fallback so the
 * typography and CTAs stay identical; `children` is the slot for the hero's
 * loading meter.
 *
 * The property search used to live under this block — it now has its own page, and
 * the first button here is the clear route to it.
 */
export function HeroCopy({ children }: { children?: ReactNode }) {
  const { openContact } = useInquiry()

  return (
    <div className="max-w-[54rem] animate-fade-up">
      <p className="eyebrow text-champagne-light">{brand.tagline}</p>
      <h1 className="mt-6 font-display text-display-xl font-bold text-white [text-shadow:0_3px_24px_rgba(6,21,48,0.55)]">
        {heroCopy.headline.map((line) => (
          <span key={line} className="block">
            {line}{' '}
          </span>
        ))}
      </h1>
      <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-white/80 [text-shadow:0_2px_14px_rgba(6,21,48,0.5)] sm:text-[1.08rem]">
        {heroCopy.standfirst}
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3.5">
        <Button
          to="/search"
          variant="light"
          size="lg"
          iconLeft={<Search className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />}
        >
          جست‌وجوی املاک
        </Button>
        <Button to="/properties" variant="outline-light" size="lg">
          مشاهدهٔ املاک
        </Button>
        <Button
          variant="outline-light"
          size="lg"
          onClick={() => openContact()}
          iconLeft={<HelpCircle className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
        >
          گفت‌وگو با مشاور
        </Button>
      </div>

      <p className="mt-7 text-xs text-white/60 [text-shadow:0_1px_10px_rgba(6,21,48,0.6)]">
        آستین، تگزاس · {contact.hours}
      </p>

      {children}
    </div>
  )
}
