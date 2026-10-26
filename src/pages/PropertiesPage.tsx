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
import { faInt } from '../lib/format'
import { cn } from '../lib/cn'

export default function PropertiesPage() {
  useDocumentTitle('املاک')

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
      <section className="relative bg-navy-900 pt-[76px] text-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.35)]">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent"
          aria-hidden="true"
        />
        <div className="shell relative flex flex-wrap items-end justify-between gap-8 pb-14 pt-16 sm:pb-16 sm:pt-20">
          <div>
            <SectionLabel tone="light">مجموعهٔ املاک</SectionLabel>
            <h1 className="mt-5 max-w-3xl font-display text-display-lg font-bold text-white">
              خانه‌هایی که اکنون نمایندگی می‌کنیم
            </h1>
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-white/70">
              {faInt(properties.length)} ملک در سراسر ایالات متحده — از ویلاهای کنار دریاچه تا اقامتگاه‌های روبه‌دریا.
              مجموعه را پالایش کنید، یا هر ملکی را که می‌خواهید درباره‌اش گفت‌وگو کنیم ذخیره کنید.
            </p>
          </div>

          <Button to="/search" variant="light" size="lg" className="shrink-0">
            جست‌وجوی پیشرفتهٔ املاک
          </Button>
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
              {panelOpen
                ? 'بستن فیلترها'
                : activeCount > 0
                  ? `فیلترها (${faInt(activeCount)})`
                  : 'فیلترها'}
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
                <span className="font-display font-semibold text-navy">{faInt(results.length)}</span> ملک
                {filters.query.trim() ? ` مطابق «${filters.query.trim()}»` : ''}
              </p>

              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-xs text-ink-soft">
                  ترتیب
                </label>
                <select
                  id="sort"
                  className={cn(selectClass, 'h-11 w-auto min-w-[12rem] py-0')}
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
              <div className="mt-10 rounded-panel border border-line bg-white px-8 py-16 text-center shadow-depth-lg">
                <h2 className="font-display text-display-sm font-semibold">هیچ ملکی با این فیلترها پیدا نشد</h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
                  محدودهٔ قیمت را بازتر کنید یا یکی از فیلترها را بردارید تا بقیهٔ مجموعه را ببینید. املاکی هم
                  داریم که هرگز در فهرست عمومی منتشر نمی‌شوند — مستقیم بپرسید.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Button variant="primary" size="md" onClick={reset}>
                    پاک کردن همهٔ فیلترها
                  </Button>
                  <Button to="/" variant="outline" size="md">
                    بازگشت به خانه
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
