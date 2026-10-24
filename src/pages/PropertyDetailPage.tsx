import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Mail, MapPin, Phone } from 'lucide-react'

import { PropertyCard } from '../components/property/PropertyCard'
import { PropertyGallery } from '../components/property/PropertyGallery'
import { Button } from '../components/ui/Button'
import { FavoriteButton } from '../components/property/FavoriteButton'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { useInquiry } from '../context/InquiryContext'
import { getAgentById } from '../data/agents'
import { formatPrice, formatSqft, getPropertyById, getSimilarProperties, locationLabel } from '../data/properties'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function PropertyDetailPage() {
  const { propertyId } = useParams()
  const property = propertyId ? getPropertyById(propertyId) : undefined
  const { openViewing, openContact } = useInquiry()

  useDocumentTitle(property ? property.name : 'Property not found')

  if (!property) {
    return (
      <section className="bg-ivory pt-[76px]">
        <div className="shell flex min-h-[70vh] flex-col justify-center py-20">
          <div className="max-w-xl">
            <SectionLabel>Not available</SectionLabel>
            <h1 className="mt-5 font-display text-display-lg font-bold">This listing is no longer published</h1>
            <p className="mt-6 text-[0.98rem] leading-relaxed text-ink-muted">
              The property may have completed or been withdrawn. Our current collection is below, and we can
              share off-market opportunities on request.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button to="/properties" variant="primary" size="lg">
                View all properties
              </Button>
              <Button to="/" variant="outline" size="lg">
                Back to home
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const agent = getAgentById(property.agentId)
  const similar = getSimilarProperties(property, 3)

  const specs = [
    { label: 'Bedrooms', value: String(property.beds) },
    { label: 'Bathrooms', value: String(property.baths) },
    { label: 'Interior', value: formatSqft(property.sqft) },
    { label: 'Lot', value: property.lot },
    { label: 'Year built', value: String(property.year) },
    { label: 'Type', value: property.type },
  ]

  return (
    <>
      <section className="bg-white pt-[76px]">
        <div className="shell pt-8 lg:pt-10">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-ink-muted transition-colors duration-300 hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            All properties
          </Link>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-navy px-3.5 py-1.5 font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-champagne-light">
                  {property.status}
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">{property.type}</span>
              </div>

              <h1 className="mt-5 font-display text-display-lg font-bold">{property.name}</h1>
              <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
                <MapPin className="h-4 w-4 shrink-0 text-champagne-dark" strokeWidth={1.8} aria-hidden="true" />
                {locationLabel(property)}
              </p>
            </div>

            <div className="lg:text-right">
              <p className="font-display text-display-md font-bold text-navy">{formatPrice(property.price)}</p>
              <p className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">Guide price</p>
            </div>
          </div>
        </div>

        <div className="shell pb-12 pt-10">
          <PropertyGallery name={property.name} images={property.images} />
        </div>
      </section>

      <section className="bg-white pb-20 sm:pb-24">
        <div className="shell grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <dl className="grid grid-cols-2 gap-y-8 border-y border-line py-8 sm:grid-cols-3 lg:grid-cols-6">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft">{spec.label}</dt>
                  <dd className="mt-2 font-display text-[1.05rem] font-semibold text-navy">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-[1.02rem] leading-relaxed text-ink">{property.summary}</p>

            <h2 className="mt-12 font-display text-display-sm font-semibold">About this property</h2>
            {property.description.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-5 text-[0.96rem] leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}

            <h2 className="mt-12 font-display text-display-sm font-semibold">Features</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {property.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne-dark" strokeWidth={2} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-display-sm font-semibold">Amenities</h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {property.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="rounded-full border border-line bg-ivory px-4 py-2 text-[0.72rem] uppercase tracking-[0.12em] text-ink-muted"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-[104px] lg:self-start">
            <div className="rounded-panel border border-line bg-ivory p-7 shadow-soft">
              <div className="flex items-center gap-4">
                <img
                  src={agent.photo}
                  alt=""
                  width={112}
                  height={112}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold text-navy">{agent.name}</p>
                  <p className="text-xs text-ink-muted">{agent.role}</p>
                </div>
              </div>

              <p className="mt-5 text-[0.88rem] leading-relaxed text-ink-muted">{agent.focus}</p>

              <div className="mt-6 flex flex-col gap-3">
                <Button variant="primary" size="md" fullWidth onClick={() => openViewing(property)}>
                  Schedule a viewing
                </Button>
                <Button variant="outline" size="md" fullWidth onClick={() => openContact({ property })}>
                  Ask a question
                </Button>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5">
                <a
                  href={`tel:${agent.phone.replace(/\D/g, '')}`}
                  className="inline-flex items-center gap-3 text-sm text-ink-muted transition-colors duration-300 hover:text-navy"
                >
                  <Phone className="h-4 w-4 shrink-0 text-champagne-dark" strokeWidth={1.7} aria-hidden="true" />
                  {agent.phone}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="inline-flex items-center gap-3 break-all text-sm text-ink-muted transition-colors duration-300 hover:text-navy"
                >
                  <Mail className="h-4 w-4 shrink-0 text-champagne-dark" strokeWidth={1.7} aria-hidden="true" />
                  {agent.email}
                </a>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
                <span className="text-xs uppercase tracking-[0.14em] text-ink-soft">Save to shortlist</span>
                <FavoriteButton property={property} tone="light" />
              </div>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-ink-soft">
              Viewings are accompanied and typically run 45 minutes. Reference {property.id.toUpperCase()}.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Similar properties</SectionLabel>
              <h2 className="mt-5 font-display text-display-lg font-bold">You may also like</h2>
            </div>
            <Button
              to="/properties"
              variant="outline"
              size="sm"
              iconRight={<ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
            >
              View all
            </Button>
          </Reveal>

          <ul className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((item, index) => (
              <Reveal as="li" key={item.id} delay={index * 70}>
                <PropertyCard property={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
