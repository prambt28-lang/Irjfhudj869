import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

interface TiltCardProps {
  children: ReactNode
  /** Classes for the outer stage (grid placement, spacing). */
  className?: string
  /** Classes for the tilted plane itself (radius, overflow, shadow). */
  cardClassName?: string
  /** Maximum rotation in degrees. Kept small — this should read as depth, not as a toy. */
  intensity?: number
  as?: ElementType
}

/**
 * Depth primitive: a surface that tips very slightly toward the pointer and carries
 * a specular sheen across it.
 *
 * Only transform and opacity are written, all inside one `requestAnimationFrame`
 * loop that stops as soon as the card has settled, so an idle page costs nothing.
 * Pointer-tilt needs a fine pointer, and everything is skipped entirely when the
 * visitor prefers reduced motion — touch devices keep the static layering and
 * shadows instead.
 */
export function TiltCard({
  children,
  className,
  cardClassName,
  intensity = 6,
  as: Tag = 'div',
}: TiltCardProps) {
  const stageRef = useRef<HTMLElement | null>(null)
  const planeRef = useRef<HTMLDivElement | null>(null)
  const sheenRef = useRef<HTMLSpanElement | null>(null)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    const stage = stageRef.current
    const plane = planeRef.current
    if (!stage || !plane || reduceMotion) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const target = { rx: 0, ry: 0, scale: 1, x: 0 }
    const current = { rx: 0, ry: 0, scale: 1, x: 0 }
    let frame = 0

    const render = () => {
      let settled = true
      const keys = ['rx', 'ry', 'scale', 'x'] as const

      keys.forEach((key) => {
        current[key] += (target[key] - current[key]) * 0.16
        if (Math.abs(target[key] - current[key]) > 0.02) settled = false
      })

      plane.style.transform = `rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(
        2,
      )}deg) scale(${current.scale.toFixed(3)})`
      if (sheenRef.current) {
        sheenRef.current.style.transform = `translate3d(${current.x.toFixed(2)}%, 0, 0)`
      }

      frame = settled ? 0 : requestAnimationFrame(render)
      if (frame === 0) plane.style.transform = ''
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5

      target.rx = -ny * intensity
      target.ry = nx * intensity
      target.scale = 1.012
      target.x = nx * 26
      start()
    }

    const onPointerLeave = () => {
      target.rx = 0
      target.ry = 0
      target.scale = 1
      target.x = 0
      start()
    }

    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('pointerleave', onPointerLeave)

    return () => {
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerleave', onPointerLeave)
      if (frame) cancelAnimationFrame(frame)
      plane.style.transform = ''
      if (sheenRef.current) sheenRef.current.style.transform = ''
    }
  }, [intensity, reduceMotion])

  return (
    <Tag ref={stageRef} className={cn('depth-stage group relative', className)}>
      <div
        ref={planeRef}
        className={cn('depth-3d relative transition-shadow duration-500 ease-premium', cardClassName)}
      >
        {children}
        <span ref={sheenRef} className="depth-sheen" aria-hidden="true" />
      </div>
    </Tag>
  )
}
