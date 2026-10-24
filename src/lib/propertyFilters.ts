import {
  bathOptions,
  bedOptions,
  defaultFilters,
  priceOptions,
  type PropertyFilters,
  type SortKey,
} from '../data/properties'

const sortKeys: SortKey[] = ['featured', 'price-desc', 'price-asc', 'newest', 'largest']

function minFor(value: string | null, options: { value: string; min: number | null }[]): number | null {
  if (!value) return null
  return options.find((option) => option.value === value)?.min ?? null
}

/** Option value for the price band currently applied, so the select can stay the source of truth. */
function priceValue(filters: PropertyFilters): string {
  const min = filters.minPrice ?? 0
  return priceOptions.find((option) => option.min === min && option.max === filters.maxPrice)?.value ?? 'any'
}

/**
 * The URL is the single source of truth for the properties page, so a hero search,
 * the filter panel, a shared link and the back button all describe the same result set.
 */
export function filtersFromParams(params: URLSearchParams): PropertyFilters {
  const price = priceOptions.find((option) => option.value === params.get('price'))
  const sort = params.get('sort')

  return {
    ...defaultFilters,
    query: params.get('query') ?? '',
    location: params.get('location') ?? 'all',
    type: params.get('type') ?? 'all',
    minPrice: price ? price.min : null,
    maxPrice: price ? price.max : null,
    beds: minFor(params.get('beds'), bedOptions),
    baths: minFor(params.get('baths'), bathOptions),
    sort: sortKeys.includes(sort as SortKey) ? (sort as SortKey) : 'featured',
    savedOnly: params.get('saved') === '1',
  }
}

export function filtersToParams(filters: PropertyFilters): URLSearchParams {
  const params = new URLSearchParams()
  const price = priceValue(filters)

  if (filters.query.trim()) params.set('query', filters.query.trim())
  if (filters.location !== 'all') params.set('location', filters.location)
  if (filters.type !== 'all') params.set('type', filters.type)
  if (price !== 'any') params.set('price', price)
  if (filters.beds !== null) params.set('beds', String(filters.beds))
  if (filters.baths !== null) params.set('baths', String(filters.baths))
  if (filters.sort !== 'featured') params.set('sort', filters.sort)
  if (filters.savedOnly) params.set('saved', '1')

  return params
}

export const priceSelectValue = priceValue

/** How many refinements beyond the default view are active — shown on the mobile filter toggle. */
export function activeFilterCount(filters: PropertyFilters): number {
  let count = 0
  if (filters.location !== 'all') count += 1
  if (filters.type !== 'all') count += 1
  if (priceValue(filters) !== 'any') count += 1
  if (filters.beds !== null) count += 1
  if (filters.baths !== null) count += 1
  if (filters.savedOnly) count += 1
  return count
}
