import type { FormEvent } from 'react'
import { Search, Sparkles, X } from 'lucide-react'

import { Button } from '../ui/Button'
import { Field, selectClass } from '../ui/Field'
import {
  priceOptions,
  propertyLocations,
  propertyTypes,
  type PropertyFilters,
} from '../../data/properties'
import { priceSelectValue } from '../../lib/propertyFilters'
import { faInt } from '../../lib/format'
import { cn } from '../../lib/cn'

interface PropertySearchPanelProps {
  filters: PropertyFilters
  resultCount: number
  onChange: (patch: Partial<PropertyFilters>) => void
  onReset: () => void
}

/**
 * The property search block that used to sit at the bottom of the home hero.
 *
 * It keeps its three refinements — location, property type and price range — and
 * its search button, but they are now the real controls of the dedicated search
 * page: every change writes the URL, so results, sharing and the back button all
 * describe the same search. The panel is a raised plane (rounded, layered shadow,
 * lit top edge) and each field is its own recessed card.
 */
export function PropertySearchPanel({ filters, resultCount, onChange, onReset }: PropertySearchPanelProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // The filters already live in the URL; the button takes the visitor to the results.
    document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onPriceChange = (value: string) => {
    const option = priceOptions.find((item) => item.value === value)
    if (!option) return
    onChange({ minPrice: option.min === 0 ? null : option.min, maxPrice: option.max })
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="جست‌وجوی املاک"
      className={cn(
        'depth-stage relative overflow-hidden rounded-panel border border-white/60 bg-white/95 p-5 shadow-depth-xl backdrop-blur-md sm:p-7',
      )}
    >
      {/* Lit top edge — the panel reads as a card floating above the navy band. */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-white to-transparent"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-display text-[0.82rem] font-semibold text-navy">
          <Sparkles className="h-4 w-4 text-champagne-dark" strokeWidth={1.8} aria-hidden="true" />
          جست‌وجوی سریع
        </p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-navy"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          پاک کردن
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:gap-5 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-end">
        <div className="rounded-card bg-mist/70 p-4 shadow-inner-depth">
          <Field label="موقعیت" id="search-location">
            <select
              id="search-location"
              className={selectClass}
              value={filters.location}
              onChange={(event) => onChange({ location: event.target.value })}
            >
              {propertyLocations().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="rounded-card bg-mist/70 p-4 shadow-inner-depth">
          <Field label="نوع ملک" id="search-type">
            <select
              id="search-type"
              className={selectClass}
              value={filters.type}
              onChange={(event) => onChange({ type: event.target.value })}
            >
              <option value="all">همهٔ انواع</option>
              {propertyTypes().map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="rounded-card bg-mist/70 p-4 shadow-inner-depth">
          <Field label="محدودهٔ قیمت" id="search-price">
            <select
              id="search-price"
              className={selectClass}
              value={priceSelectValue(filters)}
              onChange={(event) => onPriceChange(event.target.value)}
            >
              {priceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          className="lg:w-auto"
          iconLeft={<Search className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />}
        >
          جست‌وجو
        </Button>
      </div>

      <p role="status" className="mt-4 text-xs text-ink-soft">
        {faInt(resultCount)} ملک با این شرایط پیدا شد.
      </p>
    </form>
  )
}
