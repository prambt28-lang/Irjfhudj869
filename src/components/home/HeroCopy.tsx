import type { ReactNode } from 'react'
import { ArrowRight, PhoneCall } from 'lucide-react'

import { Button } from '../ui/Button'
import { useInquiry } from '../../context/InquiryContext'
import { brand, contact, heroCopy } from '../../data/site'

/**
 * Hero copy block. Shared by the scroll-driven hero and its static fallback so the
 * typography and CTAs stay identical; `children` is the slot for the hero's
 * loading meter.
 */
export function HeroCopy({ children }: { children?: ReactNode }) {
  const { openContact } = useInquiry()

  return (
    <div className="max-w-[54rem] animate-fade-up">
      <p className="eyebrow text-champagne-light">{brand.tagline}</p>
      <h1 className="mt-6 font-display text-display-xl font-bold text-white">
        {heroCopy.headline.map((line) => (
          <span key={line} className="block">
            {line}{' '}
          </span>
        ))}
      </h1>
      <p className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-white/75 sm:text-[1.05rem]">
        {heroCopy.standfirst}
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3.5">
        <Button
          to="/properties"
          variant="light"
          size="lg"
          iconRight={<ArrowRight className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />}
        >
          Explore properties
        </Button>
        <Button
          variant="outline-light"
          size="lg"
          onClick={() => openContact()}
          iconLeft={<PhoneCall className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
        >
          Speak to an advisor
        </Button>
      </div>

      <p className="mt-7 text-xs uppercase tracking-[0.18em] text-white/45">
        Austin, Texas · {contact.hours}
      </p>

      {children}
    </div>
  )
}
