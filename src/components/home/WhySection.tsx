import { Check } from 'lucide-react'

import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { whyUs } from '../../data/site'

/**
 * Dark band that gives the page its rhythm — reasons on the start side, evidence
 * beneath. The band reads as a plane set back from the white sections: an inset
 * top highlight, a receding image and cards raised above it.
 */
export function WhySection() {
  return (
    <section
      id="why-horizon"
      className="relative isolate overflow-hidden bg-navy-900 py-20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.09),inset_0_-1px_0_rgba(0,0,0,0.35)] sm:py-24 lg:py-28"
    >
      <div
        className="absolute inset-y-0 end-0 -z-10 hidden w-1/2 bg-[url('/images/gal-terrace.webp')] bg-cover bg-center opacity-[0.18] lg:block"
        aria-hidden="true"
      />
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionLabel tone="light">{whyUs.label}</SectionLabel>
          <h2 className="mt-5 font-display text-display-lg font-bold text-white">{whyUs.title}</h2>
          <p className="mt-6 text-[0.98rem] leading-relaxed text-white/70">{whyUs.body}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {whyUs.reasons.map((reason, index) => (
            <Reveal
              key={reason.title}
              delay={index * 90}
              className="group rounded-panel border border-white/10 bg-white/[0.05] p-7 shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_30px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur-[2px] transition-[transform,box-shadow] duration-500 ease-premium hover:-translate-y-1.5 hover:bg-white/[0.07]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-champagne text-navy shadow-[0_14px_26px_-14px_rgba(197,160,112,0.9)]">
                <Check className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-display-sm font-semibold text-white">{reason.title}</h3>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-white/65">{reason.description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {whyUs.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-card border border-white/10 bg-navy-900/60 p-5 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_24px_50px_-40px_rgba(0,0,0,0.9)]"
              >
                <dt className="font-display text-display-md font-bold text-champagne-light">{stat.value}</dt>
                <dd className="mt-2 text-xs leading-relaxed text-white/55">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
