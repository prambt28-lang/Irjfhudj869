export type PropertyType = 'Villa' | 'Estate' | 'Residence' | 'Penthouse' | 'House' | 'Retreat'

export type PropertyStatus = 'For Sale' | 'New Listing' | 'Exclusive'

export interface PropertyImage {
  src: string
  alt: string
}

export interface Property {
  id: string
  name: string
  city: string
  region: string
  country: string
  price: number
  type: PropertyType
  status: PropertyStatus
  beds: number
  baths: number
  sqft: number
  lot: string
  year: number
  featured: boolean
  /** One-line lead used on cards and at the top of the detail page. */
  summary: string
  /** Body copy for the detail page. */
  description: string[]
  features: string[]
  amenities: string[]
  images: PropertyImage[]
  agentId: string
}

export const properties: Property[] = [
  {
    id: 'lakeside-modern-villa',
    name: 'Lakeside Modern Villa',
    city: 'Austin',
    region: 'Texas',
    country: 'USA',
    price: 2_350_000,
    type: 'Villa',
    status: 'For Sale',
    beds: 4,
    baths: 4,
    sqft: 3650,
    lot: '0.62 acres',
    year: 2021,
    featured: true,
    summary: 'A calm, glass-wrapped villa set directly on the water with a private boat dock.',
    description: [
      'Framed by mature oak and a full western water frontage, Lakeside Modern Villa is built around long horizontal sightlines. Floor-to-ceiling glazing folds away along the entire living wing, opening the interior to a sheltered terrace and the lake beyond.',
      'Interiors are deliberately restrained: pale oak floors, honed stone, and a warm neutral palette that lets the water do the talking. The primary suite occupies its own wing, with a private terrace and a bathing area positioned toward the sunset.',
    ],
    features: [
      'Full-height retractable glazing to the lake terrace',
      'Private boat dock with covered mooring',
      'Chef’s kitchen with honed stone island',
      'Primary suite wing with sunset terrace',
      'Whole-home automation and climate zoning',
    ],
    amenities: [
      'Infinity pool',
      'Boat dock',
      'Home cinema',
      'Wine room',
      'Gym',
      'Guest house',
      'EV charging',
      'Smart security',
    ],
    images: [
      { src: '/images/prop-lakeside.webp', alt: 'Glass-walled lakeside villa with swimming pool and timber deck' },
      { src: '/images/gal-living.webp', alt: 'Open living room with floor-to-ceiling windows' },
      { src: '/images/gal-kitchen.webp', alt: 'Kitchen with stone island and integrated appliances' },
      { src: '/images/gal-bedroom.webp', alt: 'Primary bedroom with soft neutral furnishings' },
    ],
    agentId: 'daniel-morgan',
  },
  {
    id: 'pacific-glass-house',
    name: 'Pacific Glass House',
    city: 'Malibu',
    region: 'California',
    country: 'USA',
    price: 4_800_000,
    type: 'Residence',
    status: 'New Listing',
    beds: 5,
    baths: 5,
    sqft: 5200,
    lot: '0.84 acres',
    year: 2019,
    featured: true,
    summary: 'An ocean-facing residence of glass and pale concrete, minutes from the beach.',
    description: [
      'Pacific Glass House sits on a graded shelf above the coastline, its concrete frame set into the hillside so that every principal room looks straight out to open water. Deep cantilevered eaves shade the glazing without interrupting the view.',
      'The plan is generous but simple: a single fluid living level, four guest suites stepping down the slope, and a lower floor given over to wellness — lap pool, sauna, and a treatment room opening to a walled garden.',
    ],
    features: [
      'Uninterrupted ocean views from every principal room',
      'Cantilevered concrete frame with deep shading eaves',
      'Lower-level wellness floor with lap pool and sauna',
      'Guest suites stepping down the hillside',
      'Two-car garage plus motor court',
    ],
    amenities: [
      'Lap pool',
      'Sauna',
      'Treatment room',
      'Outdoor kitchen',
      'Fire pit terrace',
      'Landscaped garden',
      'Solar array',
      'Smart shading',
    ],
    images: [
      { src: '/images/prop-pacific.webp', alt: 'Modern glass house with pool beside a sandy terrace' },
      { src: '/images/gal-lounge.webp', alt: 'Lounge with soft seating and large windows' },
      { src: '/images/gal-terrace.webp', alt: 'Shaded terrace with outdoor seating' },
      { src: '/images/gal-bath.webp', alt: 'Spa bathroom in stone and pale timber' },
    ],
    agentId: 'olivia-carter',
  },
  {
    id: 'desert-horizon-estate',
    name: 'Desert Horizon Estate',
    city: 'Scottsdale',
    region: 'Arizona',
    country: 'USA',
    price: 3_150_000,
    type: 'Estate',
    status: 'For Sale',
    beds: 5,
    baths: 6,
    sqft: 6100,
    lot: '1.4 acres',
    year: 2022,
    featured: false,
    summary: 'A low, horizontal estate arranged around courtyards, shade and long desert views.',
    description: [
      'Desert Horizon Estate borrows its logic from the landscape: a long, low roofline, thick shaded walls, and a series of courtyards that cool the plan through the hottest months. Rammed earth and warm stone tie the house to its ground.',
      'The living volume opens on both sides, linking a shaded arrival court to a rear terrace with a negative-edge pool that appears to spill toward the mountains.',
    ],
    features: [
      'Rammed earth and stone construction',
      'Three shaded courtyards',
      'Negative-edge pool oriented to the mountains',
      'Detached casita for guests',
      'Passive cooling and deep roof overhangs',
    ],
    amenities: [
      'Negative-edge pool',
      'Casita',
      'Outdoor shower',
      'Bocce court',
      'Fire lounge',
      'Desert planting',
      'Workshop',
      'Water harvesting',
    ],
    images: [
      { src: '/images/prop-desert.webp', alt: 'Desert estate with stacked roofs and swimming pool' },
      { src: '/images/gal-exterior.webp', alt: 'Exterior elevation with planted landscaping' },
      { src: '/images/gal-dining.webp', alt: 'Dining area with warm timber table' },
      { src: '/images/gal-living.webp', alt: 'Living space opening to a courtyard' },
    ],
    agentId: 'james-wilson',
  },
  {
    id: 'oceanfront-residence',
    name: 'Oceanfront Residence',
    city: 'Miami',
    region: 'Florida',
    country: 'USA',
    price: 5_200_000,
    type: 'Residence',
    status: 'New Listing',
    beds: 6,
    baths: 7,
    sqft: 7400,
    lot: '0.9 acres',
    year: 2020,
    featured: true,
    summary: 'Direct ocean frontage, a private beach deck and seven thousand square feet of calm.',
    description: [
      'Set behind a walled garden with direct beach access, Oceanfront Residence is organised as a sequence of pavilions. Living, dining and kitchen sit in one continuous volume that opens onto the pool deck; two separate wings hold the family and guest bedrooms.',
      'Materials are pale and hard-wearing — limestone floors, white oak joinery, bronze detailing — chosen for how they age in constant sea light.',
    ],
    features: [
      'Direct beach access with private deck',
      'Pavilion plan with separated sleeping wings',
      'Limestone floors and white oak joinery throughout',
      'Summer kitchen and covered poolside dining',
      'Impact-rated glazing and full storm protection',
    ],
    amenities: [
      'Beach access',
      'Pool and spa',
      'Summer kitchen',
      'Staff suite',
      'Elevator',
      'Gym',
      'Boat mooring',
      'Generator',
    ],
    images: [
      { src: '/images/prop-oceanfront.webp', alt: 'Oceanfront home with infinity pool at sunset' },
      { src: '/images/gal-terrace.webp', alt: 'Covered terrace facing the water' },
      { src: '/images/gal-living.webp', alt: 'Bright living room with pale furnishings' },
      { src: '/images/gal-bath.webp', alt: 'Stone bathroom with freestanding bath' },
    ],
    agentId: 'olivia-carter',
  },
  {
    id: 'modern-hillside-retreat',
    name: 'Modern Hillside Retreat',
    city: 'Los Angeles',
    region: 'California',
    country: 'USA',
    price: 3_750_000,
    type: 'Retreat',
    status: 'For Sale',
    beds: 4,
    baths: 4,
    sqft: 4050,
    lot: '0.5 acres',
    year: 2018,
    featured: false,
    summary: 'A quiet hillside house with a horizontal slatted screen and canyon views.',
    description: [
      'A screen of vertical timber shades the street side of Modern Hillside Retreat, keeping the house private while filtering light deep into the plan. At the rear it opens completely to the canyon, with a pool deck set level with the main living floor.',
      'The upper level holds two bedrooms and a study; the lower level is given to a media room that doubles as a guest suite.',
    ],
    features: [
      'Vertical timber privacy screen to the street',
      'Fully glazed rear elevation to the canyon',
      'Pool deck level with the living floor',
      'Flexible media room / guest suite',
      'Two-car garage with direct entry',
    ],
    amenities: [
      'Canyon views',
      'Pool',
      'Media room',
      'Study',
      'Outdoor fireplace',
      'Drought-tolerant planting',
      'Security system',
      'Storage',
    ],
    images: [
      { src: '/images/prop-hillside.webp', alt: 'Hillside home with slatted timber facade and tree' },
      { src: '/images/gal-architecture.webp', alt: 'Architectural detail of the hillside house' },
      { src: '/images/gal-kitchen.webp', alt: 'Minimal kitchen with integrated cabinetry' },
      { src: '/images/gal-bedroom.webp', alt: 'Quiet bedroom with neutral textiles' },
    ],
    agentId: 'sophia-bennett',
  },
  {
    id: 'palm-garden-residence',
    name: 'Palm Garden Residence',
    city: 'Beverly Hills',
    region: 'California',
    country: 'USA',
    price: 6_400_000,
    type: 'Estate',
    status: 'Exclusive',
    beds: 6,
    baths: 8,
    sqft: 8300,
    lot: '1.1 acres',
    year: 2023,
    featured: true,
    summary: 'A newly completed estate arranged around a mature palm garden and a 25-metre pool.',
    description: [
      'Palm Garden Residence is a newly completed estate behind gates, planned so that the mature garden is the first thing you see from every principal room. The house steps around the garden rather than sitting in front of it.',
      'A 25-metre pool runs the length of the rear elevation, with a pool house, gym and guest accommodation arranged discreetly below the main terrace.',
    ],
    features: [
      'Gated 25-metre pool with pool house',
      'Garden-facing principal rooms',
      'Lower level with gym, cinema and wine cellar',
      'Guest accommodation beneath the main terrace',
      'Off-street parking for six cars',
    ],
    amenities: [
      '25-metre pool',
      'Pool house',
      'Gym',
      'Cinema',
      'Wine cellar',
      'Staff quarters',
      'Elevator',
      'Gatehouse',
    ],
    images: [
      { src: '/images/prop-palm.webp', alt: 'White villa with pool and outdoor lounge area' },
      { src: '/images/gal-living.webp', alt: 'Garden-facing living room' },
      { src: '/images/gal-dining.webp', alt: 'Formal dining room with timber table' },
      { src: '/images/gal-bath.webp', alt: 'Primary bathroom in pale stone' },
    ],
    agentId: 'daniel-morgan',
  },
  {
    id: 'contemporary-lake-house',
    name: 'Contemporary Lake House',
    city: 'Lake Tahoe',
    region: 'Nevada',
    country: 'USA',
    price: 2_950_000,
    type: 'House',
    status: 'For Sale',
    beds: 4,
    baths: 3,
    sqft: 3400,
    lot: '0.7 acres',
    year: 2017,
    featured: false,
    summary: 'Stacked volumes in stone and cedar, a short walk from the shoreline.',
    description: [
      'The house is composed as three stacked volumes: stone at the base for winter, cedar above for warmth, and a glazed top floor that catches the lake through the pines.',
      'An open living floor sits at the centre of the plan, with a covered deck extending the season by several months on either side.',
    ],
    features: [
      'Stacked stone, cedar and glazed volumes',
      'Covered deck with outdoor fireplace',
      'Ski room and boot drying area',
      'Radiant floors throughout the ground level',
      'Boat and paddle storage',
    ],
    amenities: [
      'Lake access',
      'Outdoor fireplace',
      'Ski room',
      'Radiant heating',
      'Double garage',
      'Guest bunk room',
      'Deck',
      'Storage loft',
    ],
    images: [
      { src: '/images/prop-lakehouse.webp', alt: 'Lake house with stacked volumes and reflecting pool' },
      { src: '/images/gal-exterior.webp', alt: 'Lake house exterior in late afternoon light' },
      { src: '/images/gal-living.webp', alt: 'Living room with timber ceiling' },
      { src: '/images/gal-terrace.webp', alt: 'Covered deck with seating' },
    ],
    agentId: 'james-wilson',
  },
  {
    id: 'architectural-downtown-penthouse',
    name: 'Architectural Downtown Penthouse',
    city: 'Austin',
    region: 'Texas',
    country: 'USA',
    price: 1_850_000,
    type: 'Penthouse',
    status: 'New Listing',
    beds: 3,
    baths: 3,
    sqft: 2750,
    lot: '—',
    year: 2022,
    featured: false,
    summary: 'A full-floor penthouse with 360-degree glazing above the city skyline.',
    description: [
      'A full-floor penthouse in a landmark downtown tower, delivered with a restrained interior by its architectural authors: pale timber, deep reveals, and glazing that runs the entire perimeter.',
      'Living, kitchen and dining occupy one uninterrupted volume with two exposures; the primary suite sits behind a screened gallery at the quieter end of the plan.',
    ],
    features: [
      'Full-floor plan with 360-degree glazing',
      'Two private elevator entries',
      'Architect-designed interior fit-out',
      'Motorised shading throughout',
      'Two secure parking spaces with storage',
    ],
    amenities: [
      'Concierge',
      'Residents’ pool',
      'Private gym',
      'Wine storage',
      'Roof terrace',
      'Guest suite',
      'Smart home',
      'Storage',
    ],
    images: [
      { src: '/images/prop-penthouse.webp', alt: 'Penthouse living space with full-height windows' },
      { src: '/images/gal-lounge.webp', alt: 'Lounge seating in the penthouse' },
      { src: '/images/gal-kitchen.webp', alt: 'Kitchen with integrated appliances' },
      { src: '/images/gal-architecture.webp', alt: 'Architectural interior detail' },
    ],
    agentId: 'sophia-bennett',
  },
]

export function getPropertyById(id: string): Property | undefined {
  return properties.find((property) => property.id === id)
}

export function getSimilarProperties(property: Property, count = 3): Property[] {
  const others = properties.filter((item) => item.id !== property.id)
  const sameCity = others.filter((item) => item.city === property.city)
  const rest = others.filter((item) => item.city !== property.city)
  return [...sameCity, ...rest].slice(0, count)
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

/** $2.35 Million / $850,000 — the headline price used across the site. */
export function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    const millions = price / 1_000_000
    return `$${millions.toFixed(2).replace(/\.00$/, '')} Million`
  }
  return `$${price.toLocaleString('en-US')}`
}

export function formatSqft(sqft: number): string {
  return `${sqft.toLocaleString('en-US')} sq ft`
}

export function locationLabel(property: Pick<Property, 'city' | 'region' | 'country'>): string {
  return `${property.city}, ${property.region}, ${property.country}`
}

/* ------------------------------------------------------------------ */
/* Discovery: filters + sorting                                        */
/* ------------------------------------------------------------------ */

export type SortKey = 'featured' | 'price-desc' | 'price-asc' | 'newest' | 'largest'

export interface PropertyFilters {
  query: string
  location: string
  type: string
  minPrice: number | null
  maxPrice: number | null
  beds: number | null
  baths: number | null
  sort: SortKey
  savedOnly: boolean
}

export const defaultFilters: PropertyFilters = {
  query: '',
  location: 'all',
  type: 'all',
  minPrice: null,
  maxPrice: null,
  beds: null,
  baths: null,
  sort: 'featured',
  savedOnly: false,
}

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'newest', label: 'Newest first' },
  { value: 'largest', label: 'Largest first' },
]

export const priceOptions: { value: string; label: string; min: number; max: number | null }[] = [
  { value: 'any', label: 'Any price', min: 0, max: null },
  { value: 'under-2m', label: 'Under $2 Million', min: 0, max: 2_000_000 },
  { value: '2m-3m', label: '$2 – $3 Million', min: 2_000_000, max: 3_000_000 },
  { value: '3m-5m', label: '$3 – $5 Million', min: 3_000_000, max: 5_000_000 },
  { value: '5m-plus', label: '$5 Million +', min: 5_000_000, max: null },
]

export const bedOptions: { value: string; label: string; min: number | null }[] = [
  { value: 'any', label: 'Any beds', min: null },
  { value: '2', label: '2+ beds', min: 2 },
  { value: '3', label: '3+ beds', min: 3 },
  { value: '4', label: '4+ beds', min: 4 },
  { value: '5', label: '5+ beds', min: 5 },
]

export const bathOptions: { value: string; label: string; min: number | null }[] = [
  { value: 'any', label: 'Any baths', min: null },
  { value: '2', label: '2+ baths', min: 2 },
  { value: '3', label: '3+ baths', min: 3 },
  { value: '4', label: '4+ baths', min: 4 },
  { value: '5', label: '5+ baths', min: 5 },
]

export function propertyTypes(): string[] {
  return Array.from(new Set(properties.map((property) => property.type))).sort()
}

export function propertyLocations(): { value: string; label: string }[] {
  const seen = new Map<string, string>()
  properties.forEach((property) => {
    const value = `${property.city}|${property.region}`
    if (!seen.has(value)) {
      seen.set(value, `${property.city}, ${property.region}`)
    }
  })
  return [{ value: 'all', label: 'All locations' }, ...Array.from(seen, ([value, label]) => ({ value, label }))]
}

export function filterAndSortProperties(
  source: Property[],
  filters: PropertyFilters,
  savedIds: string[] = [],
): Property[] {
  const query = filters.query.trim().toLowerCase()

  const filtered = source.filter((property) => {
    if (filters.savedOnly && !savedIds.includes(property.id)) return false

    if (filters.location !== 'all') {
      const [city, region] = filters.location.split('|')
      if (property.city !== city || property.region !== region) return false
    }

    if (filters.type !== 'all' && property.type !== filters.type) return false
    if (filters.minPrice !== null && property.price < filters.minPrice) return false
    if (filters.maxPrice !== null && property.price > filters.maxPrice) return false
    if (filters.beds !== null && property.beds < filters.beds) return false
    if (filters.baths !== null && property.baths < filters.baths) return false

    if (query) {
      const haystack = [
        property.name,
        property.city,
        property.region,
        property.country,
        property.type,
        property.summary,
        ...property.features,
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(query)) return false
    }

    return true
  })

  const sorted = [...filtered]
  switch (filters.sort) {
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'newest':
      sorted.sort((a, b) => b.year - a.year)
      break
    case 'largest':
      sorted.sort((a, b) => b.sqft - a.sqft)
      break
    case 'featured':
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price)
      break
  }

  return sorted
}
