import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

import { useScrollLock } from '../../hooks/useScrollLock'
import type { PropertyImage } from '../../data/properties'
import { cn } from '../../lib/cn'

interface LightboxProps {
  images: PropertyImage[]
  index: number
  open: boolean
  onClose: () => void
  onIndexChange: (index: number) => void
}

/** Full-screen photo viewer — arrow keys, click-outside and Escape all close or step through. */
export function Lightbox({ images, index, open, onClose, onIndexChange }: LightboxProps) {
  useScrollLock(open)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowRight') {
        onIndexChange((index + 1) % images.length)
      } else if (event.key === 'ArrowLeft') {
        onIndexChange((index - 1 + images.length) % images.length)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, index, images.length, onClose, onIndexChange])

  if (!open) return null

  const image = images[index] ?? images[0]

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Property photo gallery" className="fixed inset-0 z-[80] bg-navy-900/96">
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} aria-hidden="true" />

      <div className="pointer-events-none relative flex h-full flex-col">
        <div className="pointer-events-auto flex items-center justify-between px-5 py-5 sm:px-8">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-white/60">
            {index + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
          >
            <X className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
          </button>
        </div>

        <div className="pointer-events-none flex flex-1 items-center justify-center px-4">
          <img
            src={image.src}
            alt={image.alt}
            className="pointer-events-auto max-h-[68vh] w-auto max-w-full rounded-card object-contain shadow-lift"
          />
        </div>

        <div className="pointer-events-auto flex items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <button
            type="button"
            onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
            aria-label="Previous photo"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            {images.map((item, itemIndex) => (
              <button
                key={item.src}
                type="button"
                onClick={() => onIndexChange(itemIndex)}
                aria-label={`Show photo ${itemIndex + 1}`}
                aria-pressed={itemIndex === index}
                className={cn(
                  'h-14 w-20 overflow-hidden rounded-lg border transition-all duration-300',
                  itemIndex === index ? 'border-champagne opacity-100' : 'border-white/20 opacity-60 hover:opacity-90',
                )}
              >
                <img src={item.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onIndexChange((index + 1) % images.length)}
            aria-label="Next photo"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
          >
            <ArrowRight className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
