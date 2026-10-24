import { ArrowRight, PhoneCall } from 'lucide-react'

import { HeroSearch } from './HeroSearch'
import { Button } from '../ui/Button'
import { useInquiry } from '../../context/InquiryContext'
import { brand, contact, heroCopy } from '../../data/site'

export function Hero() {
  const { openContact } = useInquiry()

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy-900">
      <img
        src="/images/hero-villa.webp"
        alt="Contemporary villa lit at dusk, reflected in a still pool"
        width={1920}
        height={1280}
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full animate-hero-zoom object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/85 via-navy-900/40 to-navy-900/90"
        aria-hidden="true"
      />

      <div className="shell flex flex-1 flex-col justify-end pb-10 pt-32 sm:pt-36">
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
        </div>
      </div>

      <div className="shell pb-14 lg:pb-20">
        <HeroSearch />
      </div>
    </section>
  )
}
