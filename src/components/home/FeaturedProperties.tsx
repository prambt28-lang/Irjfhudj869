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
import { cn } from '../../lib/cn'

const featured = properties.filter((property) => property.featured)

/**
 * Scroll-snap carousel with pointer dragging on desktop. Touch devices use the
 * browser's own momentum scrolling, so drag handling is limited to a mouse.
 */
export function FeaturedProperties() {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })
  const [edges, setEdges] = useState({ start: true, end: false })

  const syncEdges = useCallback(() => {
    const node = trackRef.current
    if (!node) return
    setEdges({
      start: node.scrollLeft <= 4,
      end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 4,
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

  const scrollByCard = (direction: -1 | 1) => {
    const node = trackRef.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 24 : node.clientWidth * 0.8
    node.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const node = trackRef.current
    if (!node || event.pointerType !== 'mouse') return
    drag.current = { active: true, startX: event.clientX, startScroll: node.scrollLeft, moved: false }
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
    if (state.moved) node.scrollLeft = state.startScroll - delta
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
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollByCard(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollByCard(-1)
    }
  }

  return (
    <section id="featured" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Featured Properties</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-display text-display-lg font-bold">
              A small, considered collection
            </h2>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ink-muted">
              Each residence is visited, measured and priced by us before it reaches this page.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={edges.start}
                aria-label="Previous properties"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-navy"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={edges.end}
                aria-label="Next properties"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-navy"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
            <Button to="/properties" variant="outline" size="sm" className="hidden lg:inline-flex">
              View all
            </Button>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          role="group"
          aria-label="Featured properties"
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
            Browse all properties
          </Button>
        </div>
      </div>
    </section>
  )
}
