import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

import { priceOptions, propertyLocations, propertyTypes } from '../../data/properties'
import { Button } from '../ui/Button'
import { Field, selectClass } from '../ui/Field'

/**
 * Hero search. Deliberately narrow: three refinements that matter on first contact,
 * handed to the properties page as URL parameters so the result set is shareable.
 */
export function HeroSearch() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('all')
  const [type, setType] = useState('all')
  const [price, setPrice] = useState('any')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const params = new URLSearchParams()
    if (location !== 'all') params.set('location', location)
    if (type !== 'all') params.set('type', type)
    if (price !== 'any') params.set('price', price)

    const query = params.toString()
    navigate(query ? `/properties?${query}` : '/properties')
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-panel border border-white/60 bg-white/95 p-5 shadow-lift backdrop-blur-md sm:p-7"
      aria-label="Search properties"
    >
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-end">
        <Field label="Location" id="hero-location">
          <select
            id="hero-location"
            className={selectClass}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          >
            {propertyLocations().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Property type" id="hero-type">
          <select id="hero-type" className={selectClass} value={type} onChange={(event) => setType(event.target.value)}>
            <option value="all">All types</option>
            {propertyTypes().map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Price range" id="hero-price">
          <select
            id="hero-price"
            className={selectClass}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          >
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          className="lg:w-auto"
          iconLeft={<Search className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />}
        >
          Search
        </Button>
      </div>
    </form>
  )
}
