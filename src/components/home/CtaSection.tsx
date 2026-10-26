import { ArrowLeft, PhoneCall } from 'lucide-react'

import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { useInquiry } from '../../context/InquiryContext'
import { contact, ctaCopy } from '../../data/site'

export function CtaSection() {
  const { openContact } = useInquiry()

  return (
    <section
      className="relative isolate overflow-hidden bg-navy-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
    >
      <img
        src="/images/prop-oceanfront.webp"
        alt=""
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {/* In RTL the copy sits on the right, so the scrim is heaviest there. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-l from-navy-900/94 via-navy-900/78 to-navy-900/55"
        aria-hidden="true"
      />

      <div className="shell py-20 sm:py-24 lg:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-display-lg font-bold text-white [text-shadow:0_2px_18px_rgba(6,21,48,0.6)]">
            {ctaCopy.title}
          </h2>
          <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-white/75">{ctaCopy.body}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Button
              variant="light"
              size="lg"
              onClick={() => openContact()}
              iconRight={<ArrowLeft className="h-4 w-4 rotate-180" strokeWidth={1.9} aria-hidden="true" />}
            >
              {ctaCopy.action}
            </Button>
            <Button
              href={contact.phoneHref}
              variant="outline-light"
              size="lg"
              iconLeft={<PhoneCall className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
            >
              <span className="ltr-inline">{contact.phoneDisplay}</span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
