import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

import { useScrollLock } from '../../hooks/useScrollLock'
import type { PropertyImage } from '../../data/properties'
import { faInt } from '../../lib/format'
import { cn } from '../../lib/cn'

interface LightboxProps {
  images: PropertyImage[]
  index: number
  open: boolean
  onClose: () => void
  onIndexChange: (index: number) => void
}

/**
 * Full-screen photo viewer — arrow keys, click-outside and Escape all close or
 * step through. The layout is RTL, so "next" sits on the left and the arrow keys
 * follow what the buttons show.
 */
export function Lightbox({ images, index, open, onClose, onIndexChange }: LightboxProps) {
  useScrollLock(open)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowLeft') {
        onIndexChange((index + 1) % images.length)
      } else if (event.key === 'ArrowRight') {
        onIndexChange((index - 1 + images.length) % images.length)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, index, images.length, onClose, onIndexChange])

  if (!open) return null

  const image = images[index] ?? images[0]

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="گالری تصاویر ملک"
      dir="rtl"
      className="fixed inset-0 z-[80] bg-navy-900/96"
    >
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} aria-hidden="true" />

      <div className="pointer-events-none relative flex h-full flex-col">
        <div className="pointer-events-auto flex items-center justify-between px-5 py-5 sm:px-8">
          <p className="font-display text-xs text-white/60">
            {faInt(index + 1)} / {faInt(images.length)}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن گالری"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 ease-premium hover:-translate-y-px hover:border-white hover:bg-white/10 hover:shadow-depth"
          >
            <X className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
          </button>
        </div>

        <div className="pointer-events-none flex flex-1 items-center justify-center px-4">
          <img
            src={image.src}
            alt={image.alt}
            className="pointer-events-auto max-h-[68vh] w-auto max-w-full rounded-card object-contain shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]"
          />
        </div>

        <div className="pointer-events-auto flex items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <button
            type="button"
            onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
            aria-label="عکس پیشین"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 ease-premium hover:-translate-y-px hover:border-white hover:bg-white/10 hover:shadow-depth"
          >
            {/* «پیشین» points right in RTL. */}
            <ArrowLeft className="h-5 w-5 rotate-180" strokeWidth={1.7} aria-hidden="true" />
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            {images.map((item, itemIndex) => (
              <button
                key={item.src}
                type="button"
                onClick={() => onIndexChange(itemIndex)}
                aria-label={`نمایش عکس ${faInt(itemIndex + 1)}`}
                aria-pressed={itemIndex === index}
                className={cn(
                  'h-14 w-20 overflow-hidden rounded-lg border transition-all duration-300 ease-premium',
                  itemIndex === index
                    ? 'border-champagne opacity-100 shadow-depth'
                    : 'border-white/20 opacity-60 hover:-translate-y-0.5 hover:opacity-90',
                )}
              >
                <img src={item.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onIndexChange((index + 1) % images.length)}
            aria-label="عکس بعدی"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 ease-premium hover:-translate-y-px hover:border-white hover:bg-white/10 hover:shadow-depth"
          >
            <ArrowRight className="h-5 w-5 rotate-180" strokeWidth={1.7} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
