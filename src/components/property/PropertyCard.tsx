import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

import { FavoriteButton } from './FavoriteButton'
import { TiltCard } from '../ui/TiltCard'
import { formatMeta, formatPrice, locationLabel, type Property } from '../../data/properties'
import { cn } from '../../lib/cn'

interface PropertyCardProps {
  property: Property
  /** First cards in a viewport load eagerly to protect LCP. */
  priority?: boolean
  className?: string
}

const statusTone: Record<Property['status'], string> = {
  اختصاصی: 'bg-champagne text-navy',
  'فهرست جدید': 'bg-white/92 text-navy',
  'برای فروش': 'bg-navy-900/45 text-white/90',
}

/**
 * Property card — one raised plane that tips slightly toward the pointer (see
 * TiltCard). The shortlist button and the status badge ride on the same plane, so
 * the whole card moves together.
 */
export function PropertyCard({ property, priority = false, className }: PropertyCardProps) {
  const image = property.images[0]
  const showStatus = property.status !== 'برای فروش'

  return (
    <TiltCard
      as="article"
      className={cn('relative', className)}
      cardClassName="overflow-hidden rounded-card shadow-depth transition-shadow duration-500 ease-premium hover:shadow-depth-xl"
    >
      <Link
        to={`/properties/${property.id}`}
        className="block overflow-hidden rounded-card focus-visible:outline-none"
        aria-label={`${property.name}، ${locationLabel(property)}، ${formatPrice(property.price)}`}
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
            className="absolute inset-0 bg-gradient-to-t from-navy-900/92 via-navy-900/30 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 className="font-display text-[1.08rem] font-semibold leading-snug text-white [text-shadow:0_2px_12px_rgba(6,21,48,0.6)] sm:text-[1.15rem]">
              {property.name}
            </h3>
            <p className="mt-2 flex items-center gap-1.5 text-[0.82rem] text-white/80">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-champagne-light" strokeWidth={1.8} aria-hidden="true" />
              {locationLabel(property)}
            </p>
            <p className="mt-3 font-display text-[1rem] font-semibold text-champagne-light">
              {formatPrice(property.price)}
            </p>
            <p className="mt-1.5 text-[0.76rem] text-white/60">
              {property.type} · {formatMeta(property)}
            </p>
          </div>
        </div>
      </Link>

      {showStatus && (
        <span
          className={cn(
            'pointer-events-none absolute start-4 top-4 z-10 rounded-full px-3 py-1.5 font-display text-[0.68rem] font-semibold shadow-[0_10px_24px_-14px_rgba(0,0,0,0.8)] backdrop-blur-[3px]',
            statusTone[property.status],
          )}
        >
          {property.status}
        </span>
      )}

      <FavoriteButton property={property} className="absolute end-4 top-4" />
    </TiltCard>
  )
}
