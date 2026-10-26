import { useState } from 'react'
import { MapPin } from 'lucide-react'

import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { GalleryRing3D } from '../property/GalleryRing3D'
import { formatPrice, locationLabel, properties } from '../../data/properties'
import { cn } from '../../lib/cn'

/**
 * Closing scene: the properties we represent, staged as vertical panels on a lit
 * drum inside a dark room, with a grid floor receding to the horizon.
 *
 * Nothing about the photography changes — the panels hold the same images the
 * rest of the site uses, and only their position in space moves. The selected
 * panel drives the caption, the gold action and the dots underneath.
 */
export function Property3dGallery() {
  const [active, setActive] = useState(0)
  const property = properties[active]

  // Real listings only: a field the data doesn't carry is left out rather than filled in.
  const place =
    property.city || property.region || property.country ? locationLabel(property) : null
  const price = property.price > 0 ? formatPrice(property.price) : null

  return (
    <section
      id="gallery"
      aria-label="گالری سه‌بعدی املاک"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#061530_0%,#050c1b_44%,#03070e_100%)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(72%_54%_at_50%_58%,rgba(56,108,168,0.3),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(38%_30%_at_50%_56%,rgba(197,160,112,0.13),transparent_72%)]"
      />
      <div className="gallery-floor" aria-hidden="true" />

      <div className="shell relative pt-20 text-center sm:pt-24">
        <Reveal className="mx-auto max-w-2xl">
          <SectionLabel align="center" tone="light">
            گالری سه‌بعدی
          </SectionLabel>
          <h2 className="mt-5 font-display text-display-lg font-bold text-white [text-shadow:0_2px_22px_rgba(3,10,22,0.7)]">
            املاک را از همه زاویه ببینید
          </h2>
          <p className="mt-5 text-[0.96rem] leading-relaxed text-white/70">
            هر پنل یکی از ملک‌های واقعی فهرست ماست. برای گردش میان آن‌ها، پنل کناری را لمس کنید یا نشانگر را
            روی صحنه بکشید.
          </p>
        </Reveal>
      </div>

      <GalleryRing3D properties={properties} active={active} onSelect={setActive} className="mt-10 sm:mt-12" />

      <div className="shell relative pb-16 pt-2 sm:pb-20">
        <Reveal className="mx-auto max-w-xl text-center">
          {/* Keyed so the caption cross-fades each time the drum turns. */}
          <div key={property.id} className="animate-fade-up">
            <div className="flex min-h-[3.6rem] items-center justify-center sm:min-h-[2.4rem]">
              <h3 className="font-display text-display-sm font-bold text-white">{property.name}</h3>
            </div>

            <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.9rem] text-white/70">
              {place && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-champagne-light" strokeWidth={1.8} aria-hidden="true" />
                  {place}
                </span>
              )}
              {place && price && <span className="h-4 w-px bg-white/20" aria-hidden="true" />}
              {price && <span className="font-display font-semibold text-champagne-light">{price}</span>}
            </p>
          </div>

          <div className="mt-7">
            <Button variant="champagne" size="lg" to={`/properties/${property.id}`}>
              مشاهده جزئیات
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-1">
            {properties.map((item, index) => {
              const isActive = index === active
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`نمایش ${item.name}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="group block p-3"
                  >
                    <span
                      className={cn(
                        'block h-2 rounded-full transition-all duration-500 ease-premium',
                        isActive ? 'w-7 bg-champagne' : 'w-2 bg-white/30 group-hover:bg-white/60',
                      )}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
