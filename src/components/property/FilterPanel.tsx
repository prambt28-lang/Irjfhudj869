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
import { cn } from '../../lib/cn'

interface FilterPanelProps {
  filters: PropertyFilters
  resultCount: number
  savedCount: number
  onChange: (patch: Partial<PropertyFilters>) => void
  onReset: () => void
}

export function FilterPanel({ filters, resultCount, savedCount, onChange, onReset }: FilterPanelProps) {
  const activeCount = activeFilterCount(filters)

  return (
    <div className="rounded-panel border border-line bg-white p-6 shadow-soft lg:sticky lg:top-[104px]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-navy">
          <SlidersHorizontal className="h-4 w-4 text-champagne-dark" strokeWidth={1.8} aria-hidden="true" />
          Refine
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-navy"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            Clear ({activeCount})
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <Field label="Keyword" id="filter-query">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <input
              id="filter-query"
              type="search"
              placeholder="Name, city or feature"
              value={filters.query}
              onChange={(event) => onChange({ query: event.target.value })}
              className={cn(controlClass, 'pl-11')}
            />
          </div>
        </Field>

        <Field label="Location" id="filter-location">
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

        <Field label="Property type" id="filter-type">
          <select
            id="filter-type"
            className={selectClass}
            value={filters.type}
            onChange={(event) => onChange({ type: event.target.value })}
          >
            <option value="all">All types</option>
            {propertyTypes().map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Price range" id="filter-price">
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
          <Field label="Bedrooms" id="filter-beds">
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

          <Field label="Bathrooms" id="filter-baths">
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
            'flex items-center justify-between gap-4 rounded-xl border px-4 py-3.5 text-left transition-colors duration-300',
            filters.savedOnly ? 'border-champagne bg-champagne-tint' : 'border-line hover:border-navy/25',
          )}
        >
          <span className="flex items-center gap-3">
            <Heart
              className={cn('h-4 w-4', filters.savedOnly ? 'text-champagne-dark' : 'text-ink-soft')}
              strokeWidth={1.8}
              fill={filters.savedOnly ? 'currentColor' : 'none'}
              aria-hidden="true"
            />
            <span className="font-display text-[0.82rem] font-medium text-navy">My shortlist</span>
          </span>
          <span className="text-xs text-ink-muted">{savedCount}</span>
        </button>
      </div>

      <p className="mt-6 border-t border-line pt-5 text-xs uppercase tracking-[0.16em] text-ink-soft">
        {resultCount} {resultCount === 1 ? 'residence' : 'residences'}
      </p>

      <Button variant="outline" size="sm" fullWidth className="mt-5 lg:hidden" onClick={onReset}>
        Reset filters
      </Button>
    </div>
  )
}
