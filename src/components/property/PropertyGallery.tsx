import { useState } from 'react'
import { Images } from 'lucide-react'

import { Lightbox } from './Lightbox'
import type { PropertyImage } from '../../data/properties'
import { faInt } from '../../lib/format'
import { cn } from '../../lib/cn'

interface PropertyGalleryProps {
  name: string
  images: PropertyImage[]
}

/**
 * Lead photo with a thumbnail rail — the lightbox is a portal over the whole page.
 * The frames sit on their own planes (shadow, slight lift on the active thumb) so
 * the gallery reads as a stack of prints rather than a flat strip.
 */
export function PropertyGallery({ name, images }: PropertyGalleryProps) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const current = images[index] ?? images[0]

  return (
    <div className="depth-stage">
      <div className="relative overflow-hidden rounded-panel bg-navy-900 shadow-depth-xl">
        <img
          src={current.src}
          alt={current.alt}
          width={1600}
          height={1000}
          decoding="async"
          className="aspect-[16/10] w-full object-cover"
        />

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute bottom-4 end-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 font-display text-[0.78rem] font-semibold text-navy shadow-depth backdrop-blur-sm transition-all duration-300 ease-premium hover:-translate-y-px hover:bg-white hover:shadow-depth-lg sm:bottom-6 sm:end-6"
        >
          <Images className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          همهٔ {faInt(images.length)} عکس
        </button>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((image, itemIndex) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(itemIndex)}
            aria-label={`نمایش عکس ${faInt(itemIndex + 1)} از ${name}`}
            aria-pressed={itemIndex === index}
            className={cn(
              'overflow-hidden rounded-xl border-2 transition-all duration-300 ease-premium',
              itemIndex === index
                ? 'border-champagne shadow-depth'
                : 'border-transparent opacity-75 shadow-depth-sm hover:-translate-y-0.5 hover:opacity-100 hover:shadow-depth',
            )}
          >
            <img
              src={image.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={index}
        open={open}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </div>
  )
}
