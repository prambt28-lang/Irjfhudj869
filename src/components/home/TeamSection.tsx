import { Mail, Phone } from 'lucide-react'

import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'
import { TiltCard } from '../ui/TiltCard'
import { useInquiry } from '../../context/InquiryContext'
import { agents } from '../../data/agents'

export function TeamSection() {
  const { openContact } = useInquiry()

  return (
    <section id="team" className="bg-ivory py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>تیم ما</SectionLabel>
            <h2 className="mt-5 font-display text-display-lg font-bold">کسانی که واقعاً با آن‌ها سروکار دارید</h2>
            <p className="mt-5 text-[0.96rem] leading-relaxed text-ink-muted">
              چهار مشاور و یک مدیرعامل. در مجموع، فروش خانه‌های شاخص معماری، راهبرد سرمایه‌گذاری، پروژه‌های
              نوساز و جابه‌جایی را پوشش می‌دهند.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => openContact()} className="hidden sm:inline-flex">
            درخواست تماس
          </Button>
        </Reveal>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {agents.map((agent, index) => (
            <Reveal as="li" key={agent.id} delay={index * 70}>
              <TiltCard
                intensity={5}
                className="rounded-card"
                cardClassName="overflow-hidden rounded-card bg-navy-900 shadow-depth transition-shadow duration-500 hover:shadow-depth-xl"
              >
                <div className="relative">
                  <img
                    src={agent.photo}
                    alt={`پرترهٔ ${agent.name}`}
                    width={720}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.05]"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/90 to-transparent p-5 pt-16"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-[1.04rem] font-semibold text-white">{agent.name}</h3>
                    <p className="mt-1.5 text-[0.78rem] text-champagne-light">{agent.role}</p>
                  </div>
                </div>
              </TiltCard>

              <p className="mt-5 text-[0.92rem] leading-relaxed text-ink-muted">{agent.focus}</p>
              <p className="mt-3 text-[0.76rem] text-ink-soft">{agent.years} همراه هورایزن</p>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href={`tel:${agent.phone.replace(/\D/g, '')}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-depth-sm transition-all duration-300 ease-premium hover:-translate-y-px hover:border-navy hover:bg-navy hover:text-white hover:shadow-depth"
                  aria-label={`تماس با ${agent.name}`}
                >
                  <Phone className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-depth-sm transition-all duration-300 ease-premium hover:-translate-y-px hover:border-navy hover:bg-navy hover:text-white hover:shadow-depth"
                  aria-label={`ایمیل به ${agent.name}`}
                >
                  <Mail className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
