import { ArrowRight } from 'lucide-react'

import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { aboutCopy } from '../../data/site'

export function AboutSection() {
  return (
    <section id="about" className="bg-ivory py-20 sm:py-24 lg:py-28">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="relative">
            <img
              src="/images/about-villa.webp"
              alt="White modernist villa with deep terraces and mature planting"
              width={1080}
              height={1350}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-card object-cover shadow-soft"
            />
            <img
              src="/images/about-side.webp"
              alt="Detail of a timber-lined entrance hall"
              width={640}
              height={480}
              loading="lazy"
              decoding="async"
              className="absolute -bottom-10 -right-4 hidden w-[46%] rounded-card border-4 border-ivory object-cover shadow-lift sm:block lg:-right-10"
            />
            <span
              className="absolute -left-6 -top-6 hidden h-24 w-24 border-l border-t border-champagne/60 lg:block"
              aria-hidden="true"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6 lg:pl-6">
          <SectionLabel>{aboutCopy.label}</SectionLabel>
          <h2 className="mt-5 font-display text-display-lg font-bold">{aboutCopy.title}</h2>
          <p className="mt-6 text-[0.98rem] leading-relaxed text-ink-muted">{aboutCopy.body}</p>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-muted">{aboutCopy.secondary}</p>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-8 border-t border-line pt-8">
            {aboutCopy.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-display-md font-bold text-navy">{stat.value}</dt>
                <dd className="mt-1.5 text-xs uppercase tracking-[0.16em] text-ink-soft">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <Button
            to="/properties"
            variant="ghost"
            size="md"
            className="mt-8 -ml-1 px-1"
            iconRight={<ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
          >
            See what we represent
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
