import { Building2, Camera, Compass, LineChart, Plane, Scale } from 'lucide-react'

import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { services } from '../../data/site'
import { faDigits } from '../../lib/format'

const icons = [Building2, LineChart, Camera, Compass, Scale, Plane]

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <SectionLabel>خدمات ما</SectionLabel>
          <h2 className="mt-5 font-display text-display-lg font-bold">
            هر آنچه یک تصمیم ملکی به آن نیاز دارد
          </h2>
          <p className="mt-5 text-[0.96rem] leading-relaxed text-ink-muted">
            شش تخصص، یک مشاور. هم‌زمان که برنامه‌های شما تغییر می‌کند میان این تخصص‌ها جابه‌جا می‌شویم، بی‌آنکه
            شما را به بخش دیگری بسپاریم.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length]
            return (
              <Reveal
                as="li"
                key={service.title}
                delay={index * 60}
                // Each service sits on its own raised plane; the lift is transform-only.
                className="group relative rounded-panel border border-line/80 bg-white p-7 shadow-depth-sm transition-[transform,box-shadow] duration-500 ease-premium hover:-translate-y-1.5 hover:border-line hover:shadow-depth-lg"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_20px_-14px_rgba(11,36,71,0.5)] transition-colors duration-500 ease-premium group-hover:bg-navy group-hover:text-champagne-light">
                    <Icon className="h-[1.35rem] w-[1.35rem]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="font-display text-xs text-ink-soft">
                    {faDigits(String(index + 1).padStart(2, '0'))}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-display-sm font-semibold">{service.title}</h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-muted">{service.description}</p>
                <p className="mt-5 text-[0.76rem] font-medium text-champagne-dark">{service.meta}</p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
