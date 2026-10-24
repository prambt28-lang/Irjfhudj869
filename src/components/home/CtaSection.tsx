import { ArrowRight, PhoneCall } from 'lucide-react'

import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { useInquiry } from '../../context/InquiryContext'
import { contact, ctaCopy } from '../../data/site'

export function CtaSection() {
  const { openContact } = useInquiry()

  return (
    <section className="relative isolate overflow-hidden bg-navy-900">
      <img
        src="/images/prop-oceanfront.webp"
        alt=""
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900/92 via-navy-900/75 to-navy-900/55"
        aria-hidden="true"
      />

      <div className="shell py-20 sm:py-24 lg:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-display-lg font-bold text-white">{ctaCopy.title}</h2>
          <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-white/70">{ctaCopy.body}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Button
              variant="light"
              size="lg"
              onClick={() => openContact()}
              iconRight={<ArrowRight className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />}
            >
              {ctaCopy.action}
            </Button>
            <Button
              href={contact.phoneHref}
              variant="outline-light"
              size="lg"
              iconLeft={<PhoneCall className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
            >
              {contact.phoneDisplay}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
