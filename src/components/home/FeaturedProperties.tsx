import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { PropertyCard } from '../property/PropertyCard'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { properties } from '../../data/properties'
import { faInt } from '../../lib/format'
import { cn } from '../../lib/cn'

const featured = properties.filter((property) => property.featured)

/**
 * Scroll-snap carousel with pointer dragging on desktop. Touch devices use the
 * browser's own momentum scrolling, so drag handling is limited to a mouse.
 *
 * The layout is RTL, where the scroll origin sits at the right edge and
 * `scrollLeft` runs negative — so both the button step and the drag delta are
 * signed from the track's own computed direction instead of assuming LTR.
 */
export function FeaturedProperties() {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false, sign: 1 })
  const [edges, setEdges] = useState({ start: true, end: false })

  const isRtl = (node: HTMLElement) => window.getComputedStyle(node).direction === 'rtl'

  const syncEdges = useCallback(() => {
    const node = trackRef.current
    if (!node) return
    const offset = Math.abs(node.scrollLeft)
    setEdges({
      start: offset <= 4,
      end: offset + node.clientWidth >= node.scrollWidth - 4,
    })
  }, [])

  useEffect(() => {
    const node = trackRef.current
    if (!node) return

    syncEdges()
    node.addEventListener('scroll', syncEdges, { passive: true })

    const observer = new ResizeObserver(syncEdges)
    observer.observe(node)

    return () => {
      node.removeEventListener('scroll', syncEdges)
      observer.disconnect()
    }
  }, [syncEdges])

  /** `direction` is 1 for "further through the collection", -1 for "back". */
  const scrollByCard = (direction: -1 | 1) => {
    const node = trackRef.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 24 : node.clientWidth * 0.8
    // In RTL, moving forward through the collection means scrolling negative.
    node.scrollBy({ left: (isRtl(node) ? -1 : 1) * direction * step, behavior: 'smooth' })
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const node = trackRef.current
    if (!node || event.pointerType !== 'mouse') return
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: node.scrollLeft,
      moved: false,
      sign: isRtl(node) ? 1 : -1,
    }
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const node = trackRef.current
    const state = drag.current
    if (!node || !state.active) return

    const delta = event.clientX - state.startX
    if (!state.moved && Math.abs(delta) > 6) {
      state.moved = true
      node.setPointerCapture(event.pointerId)
    }
    if (state.moved) node.scrollLeft = state.startScroll + state.sign * delta
  }

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const node = trackRef.current
    if (node && drag.current.moved && node.hasPointerCapture(event.pointerId)) {
      node.releasePointerCapture(event.pointerId)
    }
    drag.current.active = false
  }

  // A drag that ended over a card must not open the property.
  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!drag.current.moved) return
    event.preventDefault()
    event.stopPropagation()
    drag.current.moved = false
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const node = trackRef.current
    if (!node) return
    // In RTL the next card sits to the left, so the arrow keys follow the layout.
    const nextKey = isRtl(node) ? 'ArrowLeft' : 'ArrowRight'
    const previousKey = isRtl(node) ? 'ArrowRight' : 'ArrowLeft'

    if (event.key === nextKey) {
      event.preventDefault()
      scrollByCard(1)
    } else if (event.key === previousKey) {
      event.preventDefault()
      scrollByCard(-1)
    }
  }

  return (
    <section id="featured" className="relative bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>املاک منتخب</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-display text-display-lg font-bold">
              مجموعه‌ای کوچک و سنجیده
            </h2>
            <p className="mt-5 max-w-xl text-[0.96rem] leading-relaxed text-ink-muted">
              {faInt(featured.length)} خانهٔ منتخب از میان {faInt(properties.length)} ملکی که نمایندگی می‌کنیم؛
              هر کدام پیش از رسیدن به این صفحه، توسط خودمان دیده، اندازه‌گیری و قیمت‌گذاری شده است.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={edges.start}
                aria-label="املاک پیشین"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 bg-white text-navy shadow-depth-sm transition-all duration-300 ease-premium hover:-translate-y-px hover:border-navy hover:bg-navy hover:text-white hover:shadow-depth disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:text-navy"
              >
                {/* «پیشین» points right in RTL, so the glyph is mirrored. */}
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={edges.end}
                aria-label="املاک بعدی"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 bg-white text-navy shadow-depth-sm transition-all duration-300 ease-premium hover:-translate-y-px hover:border-navy hover:bg-navy hover:text-white hover:shadow-depth disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:text-navy"
              >
                <ArrowRight className="h-4 w-4 rtl:rotate-180" strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
            <Button to="/properties" variant="outline" size="sm" className="hidden lg:inline-flex">
              مشاهدهٔ همه
            </Button>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          role="group"
          aria-label="املاک منتخب"
          tabIndex={0}
          onScroll={syncEdges}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          onKeyDown={onKeyDown}
          className={cn(
            'no-scrollbar mt-12 flex select-none snap-x snap-mandatory gap-5 overflow-x-auto pb-2 sm:gap-6 lg:cursor-grab',
            'focus-visible:outline-none',
          )}
        >
          {featured.map((property, index) => (
            <div key={property.id} data-card className="w-[80%] shrink-0 snap-start sm:w-[52%] lg:w-[31.4%]">
              <Reveal delay={index * 70}>
                <PropertyCard property={property} priority={index < 2} />
              </Reveal>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Button to="/properties" variant="outline" size="md" fullWidth>
            مشاهدهٔ همهٔ املاک
          </Button>
        </div>
      </div>
    </section>
  )
}
