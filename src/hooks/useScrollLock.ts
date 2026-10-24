import { useEffect } from 'react'

/**
 * Locks background scrolling while an overlay (mobile menu, gallery, modal) is
 * open, restoring the previous value on close.
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return

    const { overflow, paddingRight } = document.body.style
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [active])
}
