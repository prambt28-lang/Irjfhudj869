import { Mail, Phone } from 'lucide-react'

import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'
import { useInquiry } from '../../context/InquiryContext'
import { agents } from '../../data/agents'

export function TeamSection() {
  const { openContact } = useInquiry()

  return (
    <section id="team" className="bg-ivory py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>The Team</SectionLabel>
            <h2 className="mt-5 font-display text-display-lg font-bold">People you will actually deal with</h2>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-muted">
              Four advisors and one managing director. Between them they cover architectural sales,
              investment strategy, new developments and relocation.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => openContact()} className="hidden sm:inline-flex">
            Book a call
          </Button>
        </Reveal>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {agents.map((agent, index) => (
            <Reveal as="li" key={agent.id} delay={index * 70} className="group">
              <div className="relative overflow-hidden rounded-card bg-navy-900">
                <img
                  src={agent.photo}
                  alt={`Portrait of ${agent.name}`}
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
                  <h3 className="font-display text-[1.02rem] font-semibold text-white">{agent.name}</h3>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-champagne-light">{agent.role}</p>
                </div>
              </div>

              <p className="mt-5 text-[0.9rem] leading-relaxed text-ink-muted">{agent.focus}</p>
              <p className="mt-3 text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">{agent.years} with Horizon</p>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href={`tel:${agent.phone.replace(/\D/g, '')}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
                  aria-label={`Call ${agent.name}`}
                >
                  <Phone className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
                  aria-label={`Email ${agent.name}`}
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
