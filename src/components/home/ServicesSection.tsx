import { Building2, Camera, Compass, LineChart, Plane, Scale } from 'lucide-react'

import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { services } from '../../data/site'

const icons = [Building2, LineChart, Camera, Compass, Scale, Plane]

export function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <SectionLabel>Our Services</SectionLabel>
          <h2 className="mt-5 font-display text-display-lg font-bold">Everything a property decision needs</h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-muted">
            Six disciplines, one advisor. We move between them as your plans change, without handing you to
            another department.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length]
            return (
              <Reveal as="li" key={service.title} delay={index * 60} className="group border-t border-line pt-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory text-navy transition-colors duration-500 ease-premium group-hover:bg-navy group-hover:text-champagne-light">
                    <Icon className="h-[1.35rem] w-[1.35rem]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="font-display text-xs tracking-[0.24em] text-ink-soft">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-display-sm font-semibold">{service.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-muted">{service.description}</p>
                <p className="mt-5 text-[0.7rem] uppercase tracking-[0.16em] text-champagne-dark">{service.meta}</p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
