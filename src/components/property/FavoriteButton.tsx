import { Heart } from 'lucide-react'

import type { Property } from '../../data/properties'
import { useFavorites } from '../../context/FavoritesContext'
import { cn } from '../../lib/cn'

interface FavoriteButtonProps {
  property: Property
  className?: string
  size?: 'sm' | 'md'
  /** `dark` = white-on-image treatment used on cards. */
  tone?: 'dark' | 'light'
}

export function FavoriteButton({ property, className, size = 'md', tone = 'dark' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(property.id)

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleFavorite(property.id)
      }}
      aria-pressed={active}
      aria-label={
        active ? `حذف ${property.name} از فهرست کوتاه` : `افزودن ${property.name} به فهرست کوتاه`
      }
      title={active ? 'در فهرست کوتاه ذخیره شده' : 'افزودن به فهرست کوتاه'}
      className={cn(
        'z-10 flex items-center justify-center rounded-full border shadow-[0_12px_26px_-18px_rgba(0,0,0,0.85)] backdrop-blur-[3px] transition-all duration-300 ease-premium hover:-translate-y-px active:translate-y-0',
        size === 'sm' ? 'h-9 w-9' : 'h-11 w-11',
        active
          ? 'border-champagne bg-champagne text-navy shadow-[0_14px_28px_-16px_rgba(197,160,112,0.9)]'
          : tone === 'dark'
            ? 'border-white/40 bg-navy-900/25 text-white hover:border-white hover:bg-navy-900/50'
            : 'border-line bg-white/90 text-ink-muted hover:border-navy/30 hover:text-navy',
        className,
      )}
    >
      <Heart
        className={cn(size === 'sm' ? 'h-4 w-4' : 'h-[1.05rem] w-[1.05rem]')}
        strokeWidth={1.8}
        fill={active ? 'currentColor' : 'none'}
        aria-hidden="true"
      />
    </button>
  )
}
