import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

import { FavoriteButton } from './FavoriteButton'
import { formatPrice, locationLabel, type Property } from '../../data/properties'
import { cn } from '../../lib/cn'

interface PropertyCardProps {
  property: Property
  /** First cards in a viewport load eagerly to protect LCP. */
  priority?: boolean
  className?: string
}

const statusTone: Record<Property['status'], string> = {
  Exclusive: 'bg-champagne text-navy',
  'New Listing': 'bg-white/92 text-navy',
  'For Sale': 'bg-navy-900/45 text-white/90',
}

export function PropertyCard({ property, priority = false, className }: PropertyCardProps) {
  const image = property.images[0]
  const showStatus = property.status !== 'For Sale'

  return (
    <article className={cn('group relative', className)}>
      <Link
        to={`/properties/${property.id}`}
        className="block overflow-hidden rounded-card focus-visible:outline-none"
        aria-label={`${property.name}, ${locationLabel(property)}, ${formatPrice(property.price)}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-navy-900">
          <img
            src={image.src}
            alt={image.alt}
            width={920}
            height={1150}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.06]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/25 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-white sm:text-[1.12rem]">
              {property.name}
            </h3>
            <p className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-white/75">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-champagne-light" strokeWidth={1.8} aria-hidden="true" />
              {locationLabel(property)}
            </p>
            <p className="mt-3 font-display text-[0.95rem] font-semibold text-champagne-light">
              {formatPrice(property.price)}
            </p>
            <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-white/55">
              {property.type} · {property.beds} bd · {property.baths} ba · {property.sqft.toLocaleString('en-US')} sq ft
            </p>
          </div>
        </div>
      </Link>

      {showStatus && (
        <span
          className={cn(
            'pointer-events-none absolute left-4 top-4 z-10 rounded-full px-3 py-1.5 font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-[3px]',
            statusTone[property.status],
          )}
        >
          {property.status}
        </span>
      )}

      <FavoriteButton property={property} className="absolute right-4 top-4" />
    </article>
  )
}
