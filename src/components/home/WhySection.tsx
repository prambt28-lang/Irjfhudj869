import { Check } from 'lucide-react'

import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { whyUs } from '../../data/site'

/** Dark band that gives the page its rhythm — reasons on the left, evidence beneath. */
export function WhySection() {
  return (
    <section id="why-horizon" className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-24 lg:py-28">
      <div
        className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 bg-[url('/images/gal-terrace.webp')] bg-cover bg-center opacity-[0.18] lg:block"
        aria-hidden="true"
      />
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionLabel tone="light">{whyUs.label}</SectionLabel>
          <h2 className="mt-5 font-display text-display-lg font-bold text-white">{whyUs.title}</h2>
          <p className="mt-6 text-[0.98rem] leading-relaxed text-white/70">{whyUs.body}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {whyUs.reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 90} className="border-t border-white/15 pt-7">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-champagne text-navy">
                <Check className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-display-sm font-semibold text-white">{reason.title}</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-white/65">{reason.description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <dl className="mt-16 grid grid-cols-2 gap-y-10 border-t border-white/15 pt-10 lg:grid-cols-4">
            {whyUs.stats.map((stat) => (
              <div key={stat.label} className="lg:border-r lg:border-white/10 lg:last:border-r-0">
                <dt className="font-display text-display-md font-bold text-champagne-light">{stat.value}</dt>
                <dd className="mt-2 pr-4 text-xs uppercase tracking-[0.16em] text-white/55">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
