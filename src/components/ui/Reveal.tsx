import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

import { cn } from '../../lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger in milliseconds, applied as a CSS transition delay. */
  delay?: number
  as?: ElementType
}

/**
 * Fade-and-rise entrance used across every section. One IntersectionObserver per
 * element, disconnected after the first reveal, and it never runs when the visitor
 * prefers reduced motion (the CSS transition is neutralised there).
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-visible={visible ? 'true' : 'false'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn('reveal', className)}
    >
      {children}
    </Tag>
  )
}
