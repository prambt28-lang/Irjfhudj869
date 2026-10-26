import { Heart, Search, SlidersHorizontal, X } from 'lucide-react'

import { Button } from '../ui/Button'
import { Field, controlClass, selectClass } from '../ui/Field'
import {
  bathOptions,
  bedOptions,
  priceOptions,
  propertyLocations,
  propertyTypes,
  type PropertyFilters,
} from '../../data/properties'
import { activeFilterCount, priceSelectValue } from '../../lib/propertyFilters'
import { faInt } from '../../lib/format'
import { cn } from '../../lib/cn'

interface FilterPanelProps {
  filters: PropertyFilters
  resultCount: number
  savedCount: number
  onChange: (patch: Partial<PropertyFilters>) => void
  onReset: () => void
}

/** The refinement rail. A single raised plane that stays with the visitor on desktop. */
export function FilterPanel({ filters, resultCount, savedCount, onChange, onReset }: FilterPanelProps) {
  const activeCount = activeFilterCount(filters)

  return (
    <div className="rounded-panel border border-line bg-white p-6 shadow-depth-lg lg:sticky lg:top-[104px]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2.5 font-display text-[0.9rem] font-semibold text-navy">
          <SlidersHorizontal className="h-4 w-4 text-champagne-dark" strokeWidth={1.8} aria-hidden="true" />
          پالایش نتایج
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-navy"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            پاک کردن ({faInt(activeCount)})
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <Field label="کلیدواژه" id="filter-query">
          <div className="relative">
            <Search
              className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <input
              id="filter-query"
              type="search"
              placeholder="نام، شهر یا ویژگی"
              value={filters.query}
              onChange={(event) => onChange({ query: event.target.value })}
              className={cn(controlClass, 'ps-11')}
            />
          </div>
        </Field>

        <Field label="موقعیت" id="filter-location">
          <select
            id="filter-location"
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

        <Field label="نوع ملک" id="filter-type">
          <select
            id="filter-type"
            className={selectClass}
            value={filters.type}
            onChange={(event) => onChange({ type: event.target.value })}
          >
            <option value="all">همهٔ انواع</option>
            {propertyTypes().map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="محدودهٔ قیمت" id="filter-price">
          <select
            id="filter-price"
            className={selectClass}
            value={priceSelectValue(filters)}
            onChange={(event) => {
              const option = priceOptions.find((item) => item.value === event.target.value)
              if (!option) return
              onChange({ minPrice: option.min === 0 ? null : option.min, maxPrice: option.max })
            }}
          >
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="اتاق خواب" id="filter-beds">
            <select
              id="filter-beds"
              className={selectClass}
              value={filters.beds === null ? 'any' : String(filters.beds)}
              onChange={(event) => {
                const option = bedOptions.find((item) => item.value === event.target.value)
                onChange({ beds: option ? option.min : null })
              }}
            >
              {bedOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="سرویس بهداشتی" id="filter-baths">
            <select
              id="filter-baths"
              className={selectClass}
              value={filters.baths === null ? 'any' : String(filters.baths)}
              onChange={(event) => {
                const option = bathOptions.find((item) => item.value === event.target.value)
                onChange({ baths: option ? option.min : null })
              }}
            >
              {bathOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <button
          type="button"
          onClick={() => onChange({ savedOnly: !filters.savedOnly })}
          aria-pressed={filters.savedOnly}
          className={cn(
            'flex items-center justify-between gap-4 rounded-xl border px-4 py-3.5 text-start transition-all duration-300 ease-premium hover:-translate-y-px',
            filters.savedOnly
              ? 'border-champagne bg-champagne-tint shadow-depth-sm'
              : 'border-line bg-white shadow-inner-depth hover:border-navy/25 hover:shadow-depth-sm',
          )}
        >
          <span className="flex items-center gap-3">
            <Heart
              className={cn('h-4 w-4', filters.savedOnly ? 'text-champagne-dark' : 'text-ink-soft')}
              strokeWidth={1.8}
              fill={filters.savedOnly ? 'currentColor' : 'none'}
              aria-hidden="true"
            />
            <span className="font-display text-[0.86rem] font-medium text-navy">فهرست کوتاه من</span>
          </span>
          <span className="text-xs text-ink-muted">{faInt(savedCount)}</span>
        </button>
      </div>

      <p className="mt-6 border-t border-line pt-5 text-xs text-ink-soft">
        {faInt(resultCount)} ملک
      </p>

      <Button variant="outline" size="sm" fullWidth className="mt-5 lg:hidden" onClick={onReset}>
        بازنشانی فیلترها
      </Button>
    </div>
  )
}
