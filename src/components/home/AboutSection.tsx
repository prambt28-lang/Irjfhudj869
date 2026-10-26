import { ArrowLeft } from 'lucide-react'

import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { aboutCopy } from '../../data/site'

/** About band: one image plane behind, one floating in front — the depth is the layout. */
export function AboutSection() {
  return (
    <section id="about" className="relative bg-ivory py-20 sm:py-24 lg:py-28">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="depth-stage relative">
            <img
              src="/images/about-villa.webp"
              alt="ویلای مدرن سفید با تراس‌های عمیق و گیاهان کهنسال"
              width={1080}
              height={1350}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-card object-cover shadow-depth-lg"
            />
            <img
              src="/images/about-side.webp"
              alt="جزئیاتی از ورودی چوب‌پوش"
              width={640}
              height={480}
              loading="lazy"
              decoding="async"
              className="absolute -bottom-10 -end-4 hidden w-[46%] rotate-[2deg] rounded-card border-4 border-ivory object-cover shadow-depth-xl transition-transform duration-700 ease-premium hover:rotate-0 sm:block lg:-end-10"
            />
            <span
              className="absolute -start-6 -top-6 hidden h-24 w-24 border-s border-t border-champagne/60 lg:block"
              aria-hidden="true"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6 lg:ps-6">
          <SectionLabel>{aboutCopy.label}</SectionLabel>
          <h2 className="mt-5 font-display text-display-lg font-bold">{aboutCopy.title}</h2>
          <p className="mt-6 text-[0.98rem] leading-relaxed text-ink-muted">{aboutCopy.body}</p>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-muted">{aboutCopy.secondary}</p>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-8 border-t border-line pt-8">
            {aboutCopy.stats.map((stat) => (
              <div key={stat.label} className="rounded-card bg-white px-6 py-5 shadow-depth-sm">
                <dt className="font-display text-display-md font-bold text-navy">{stat.value}</dt>
                <dd className="mt-1.5 text-xs text-ink-soft">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <Button
            to="/properties"
            variant="ghost"
            size="md"
            className="mt-8 -ms-1 px-1"
            iconRight={<ArrowLeft className="h-4 w-4 rotate-180" strokeWidth={1.8} aria-hidden="true" />}
          >
            ببینید نمایندهٔ چه املاکی هستیم
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
