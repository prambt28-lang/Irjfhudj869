import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'

import { FilterPanel } from '../components/property/FilterPanel'
import { PropertyCard } from '../components/property/PropertyCard'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { selectClass } from '../components/ui/Field'
import { useFavorites } from '../context/FavoritesContext'
import {
  filterAndSortProperties,
  properties,
  sortOptions,
  type PropertyFilters,
  type SortKey,
} from '../data/properties'
import { activeFilterCount, filtersFromParams, filtersToParams } from '../lib/propertyFilters'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { cn } from '../lib/cn'

export default function PropertiesPage() {
  useDocumentTitle('Properties')

  const [searchParams, setSearchParams] = useSearchParams()
  const { favorites } = useFavorites()
  const [panelOpen, setPanelOpen] = useState(false)

  const filters = useMemo(() => filtersFromParams(searchParams), [searchParams])
  const results = useMemo(() => filterAndSortProperties(properties, filters, favorites), [filters, favorites])
  const activeCount = activeFilterCount(filters)

  const update = (patch: Partial<PropertyFilters>) => {
    setSearchParams(filtersToParams({ ...filters, ...patch }), { replace: true })
  }

  const reset = () => setSearchParams(new URLSearchParams(), { replace: true })

  return (
    <>
      <section className="bg-navy-900 pt-[76px] text-white">
        <div className="shell pb-14 pt-16 sm:pb-16 sm:pt-20">
          <SectionLabel tone="light">Portfolio</SectionLabel>
          <h1 className="mt-5 max-w-3xl font-display text-display-lg font-bold text-white">
            Residences currently represented
          </h1>
          <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-white/70">
            {properties.length} properties across the United States — from lakeside villas to ocean-facing
            residences. Filter the collection, or save the ones you would like to discuss.
          </p>
        </div>
      </section>

      <section className="bg-mist py-12 sm:py-14 lg:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-12">
          {/* Mobile: the panel collapses, so results stay above the fold. */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => setPanelOpen((open) => !open)}
              iconLeft={
                panelOpen ? (
                  <X className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                ) : (
                  <SlidersHorizontal className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                )
              }
            >
              {panelOpen ? 'Hide filters' : activeCount > 0 ? `Filters (${activeCount})` : 'Filters'}
            </Button>
            {panelOpen && (
              <div className="mt-4">
                <FilterPanel
                  filters={filters}
                  resultCount={results.length}
                  savedCount={favorites.length}
                  onChange={update}
                  onReset={reset}
                />
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <FilterPanel
              filters={filters}
              resultCount={results.length}
              savedCount={favorites.length}
              onChange={update}
              onReset={reset}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
              <p role="status" className="text-sm text-ink-muted">
                <span className="font-display font-semibold text-navy">{results.length}</span>{' '}
                {results.length === 1 ? 'property' : 'properties'}
                {filters.query.trim() ? ` matching “${filters.query.trim()}”` : ''}
              </p>

              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Sort
                </label>
                <select
                  id="sort"
                  className={cn(selectClass, 'h-11 w-auto min-w-[11rem] py-0')}
                  value={filters.sort}
                  onChange={(event) => update({ sort: event.target.value as SortKey })}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {results.length > 0 ? (
              <ul className="mt-8 grid gap-7 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                {results.map((property, index) => (
                  <Reveal as="li" key={property.id} delay={Math.min(index, 5) * 60}>
                    <PropertyCard property={property} priority={index < 3} />
                  </Reveal>
                ))}
              </ul>
            ) : (
              <div className="mt-10 rounded-panel border border-line bg-white px-8 py-16 text-center shadow-soft">
                <h2 className="font-display text-display-sm font-semibold">No properties match these filters</h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
                  Widen the price range or clear a filter to see the rest of the collection. We also hold
                  off-market listings that never appear here — ask us directly.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Button variant="primary" size="md" onClick={reset}>
                    Clear all filters
                  </Button>
                  <Button to="/" variant="outline" size="md">
                    Back to home
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
