import {
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'

import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import type { Property } from '../../data/properties'

interface GalleryRing3DProps {
  properties: Property[]
  active: number
  onSelect: (index: number) => void
  className?: string
}

/** Travel below this is a tap, not a drag. */
const DRAG_SLOP = 6
/** Travel past this turns the drum by one property. */
const DRAG_COMMIT = 46
/** Degrees the drum turns per pixel dragged — a full step feels like a swipe. */
const DRAG_RATIO = 0.24
/** Pointer-follow depth. Enough to feel lit, small enough to stay invisible. */
const PARALLAX_X = 3.4
const PARALLAX_Y = 2.2

/**
 * The drum: real property photography on vertical panels arranged around a
 * faceted cylinder, so the selected panel sits closest and largest while its
 * neighbours turn away at the sides.
 *
 * Geometry only. One `rotateY` on the drum moves every panel, the browser sorts
 * the depth, and panels facing away drop out through `backface-visibility`. The
 * pointer can drag the drum round (touch included) or tip it very slightly;
 * every transform is written imperatively inside one animation frame, so React
 * never re-renders while the drum moves and the page never jumps.
 */
export function GalleryRing3D({ properties, active, onSelect, className }: GalleryRing3DProps) {
  const count = properties.length
  const step = 360 / count
  // Circumradius at which neighbouring panels meet edge to edge: a cylinder with
  // no gaps to see through and no panels cutting into each other.
  const radius = 1 / (2 * Math.sin(Math.PI / count))

  const stageRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const drumRef = useRef<HTMLDivElement>(null)
  /** Committed drum rotation, in degrees. */
  const turn = useRef(0)
  const drag = useRef({ active: false, startX: 0, dx: 0, moved: false })
  const swallowClick = useRef(false)
  const reduceMotion = usePrefersReducedMotion()

  // Each move of the selection turns the drum the short way round.
  useEffect(() => {
    const drum = drumRef.current
    if (!drum) return
    const target = active * step
    const delta = (((target - turn.current) % 360) + 540) % 360 - 180
    turn.current += delta
    drum.style.transition = ''
    drum.style.transform = `rotateY(${turn.current}deg)`
  }, [active, step])

  // Fine pointers tip the whole scene a degree or two toward the cursor.
  useEffect(() => {
    const stage = stageRef.current
    const tilt = tiltRef.current
    if (!stage || !tilt || reduceMotion) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const target = { rx: 0, ry: 0 }
    const current = { rx: 0, ry: 0 }
    let frame = 0

    const render = () => {
      let settled = true
      const keys = ['rx', 'ry'] as const

      keys.forEach((key) => {
        current[key] += (target[key] - current[key]) * 0.14
        if (Math.abs(target[key] - current[key]) > 0.02) settled = false
      })

      tilt.style.transform = `rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(2)}deg)`
      frame = settled ? 0 : requestAnimationFrame(render)
      if (frame === 0) tilt.style.transform = ''
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (drag.current.active) return
      const rect = stage.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5

      target.ry = nx * PARALLAX_X * 2
      target.rx = -ny * PARALLAX_Y * 2
      start()
    }

    const onPointerLeave = () => {
      target.rx = 0
      target.ry = 0
      start()
    }

    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('pointerleave', onPointerLeave)

    return () => {
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerleave', onPointerLeave)
      if (frame) cancelAnimationFrame(frame)
      tilt.style.transform = ''
    }
  }, [reduceMotion])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    swallowClick.current = false
    drag.current = { active: true, startX: event.clientX, dx: 0, moved: false }
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current
    if (!state.active) return

    const dx = event.clientX - state.startX
    if (!state.moved && Math.abs(dx) > DRAG_SLOP) {
      state.moved = true
      swallowClick.current = true
      // A pointer released between events cannot be captured; bubbling still
      // carries the gesture, so the drum must not break either way.
      try {
        event.currentTarget.setPointerCapture(event.pointerId)
      } catch {
        /* capturing is an optimisation, not a requirement */
      }
    }
    if (!state.moved) return

    state.dx = dx
    const drum = drumRef.current
    if (!drum) return
    drum.style.transition = 'none'
    drum.style.transform = `rotateY(${turn.current + dx * DRAG_RATIO}deg)`
  }

  // RTL reading order: the next property waits on the left, so dragging the drum
  // to the right is what brings it round to the front.
  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current
    if (!state.active) return
    state.active = false

    const drum = drumRef.current
    if (drum && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (!state.moved || !drum) {
      state.dx = 0
      return
    }

    drum.style.transition = ''
    if (Math.abs(state.dx) > DRAG_COMMIT) {
      const next = ((active + (state.dx > 0 ? 1 : -1)) % count + count) % count
      onSelect(next)
    } else {
      drum.style.transform = `rotateY(${turn.current}deg)`
    }

    state.dx = 0
    state.moved = false
  }

  // A drag that ended over a panel must not also select it.
  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!swallowClick.current) return
    swallowClick.current = false
    event.preventDefault()
    event.stopPropagation()
  }

  const stageStyle = {
    '--panel-w': 'clamp(214px, 52vw, 352px)',
    '--panel-h': 'calc(var(--panel-w) * 1.25)',
    '--ring-r': `calc(var(--panel-w) * ${radius.toFixed(4)})`,
    height: 'calc(var(--panel-h) * 1.66)',
  } as CSSProperties

  return (
    <div
      ref={stageRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      style={stageStyle}
      className={cn('depth-stage relative w-full touch-pan-y select-none lg:cursor-grab', className)}
    >
      <div ref={tiltRef} className="depth-3d absolute inset-0">
        <div
          ref={drumRef}
          className="depth-3d absolute inset-0 transition-transform duration-700 ease-premium"
        >
          {properties.map((property, index) => {
            const isActive = index === active
            const distance = Math.min(Math.abs(index - active), count - Math.abs(index - active))
            const image = property.images[0]
            const label = [property.name, property.city].filter(Boolean).join('، ')

            return (
              <button
                key={property.id}
                type="button"
                onClick={() => onSelect(index)}
                tabIndex={distance === 1 ? 0 : -1}
                aria-current={isActive ? 'true' : undefined}
                aria-label={label}
                style={{
                  width: 'var(--panel-w)',
                  height: 'var(--panel-h)',
                  // The collection reads right to left, so the next property waits
                  // on the left of the selected one.
                  transform: `translate(-50%, -50%) rotateY(${-index * step}deg) translateZ(var(--ring-r))`,
                  backfaceVisibility: 'hidden',
                }}
                className="absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-[18px] bg-navy-800 shadow-[0_46px_80px_-34px_rgba(0,0,0,0.92),0_18px_40px_-22px_rgba(0,0,0,0.6)]"
              >
                {image && (
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={920}
                    height={1150}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className={cn(
                      'h-full w-full object-cover transition-[filter,transform] duration-700 ease-premium',
                      isActive ? 'scale-[1.015]' : 'brightness-[0.66] saturate-[0.92]',
                    )}
                  />
                )}

                {/* Room light grazing the top of the glass. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_38%)]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(180deg,transparent,rgba(4,12,26,0.9))]"
                />
                {/* Lit hairline, and a champagne rim on the selected panel. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-0 rounded-[18px] border transition-colors duration-700 ease-premium',
                    isActive ? 'border-champagne/45' : 'border-white/12',
                  )}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.4)]"
                />

                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-start">
                  <span className="block font-display text-[0.9rem] font-semibold leading-snug text-white [text-shadow:0_2px_10px_rgba(3,10,22,0.75)]">
                    {property.name}
                  </span>
                  {property.city && (
                    <span className="mt-1 block text-[0.7rem] text-white/70">{property.city}</span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
