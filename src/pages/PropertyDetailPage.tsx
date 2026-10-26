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
import { faDigits, faInt } from '../lib/format'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function PropertyDetailPage() {
  const { propertyId } = useParams()
  const property = propertyId ? getPropertyById(propertyId) : undefined
  const { openViewing, openContact } = useInquiry()

  useDocumentTitle(property ? property.name : 'ملک پیدا نشد')

  if (!property) {
    return (
      <section className="bg-ivory pt-[76px]">
        <div className="shell flex min-h-[70vh] flex-col justify-center py-20">
          <div className="max-w-xl">
            <SectionLabel>در دسترس نیست</SectionLabel>
            <h1 className="mt-5 font-display text-display-lg font-bold">این ملک دیگر منتشر نمی‌شود</h1>
            <p className="mt-6 text-[0.98rem] leading-relaxed text-ink-muted">
              ممکن است معاملهٔ آن نهایی شده یا از فهرست برداشته شده باشد. مجموعهٔ فعلی ما در پایین است و در صورت
              درخواست، فرصت‌های خارج از فهرست را هم در اختیارتان می‌گذاریم.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button to="/properties" variant="primary" size="lg">
                مشاهدهٔ همهٔ املاک
              </Button>
              <Button to="/" variant="outline" size="lg">
                بازگشت به خانه
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
    { label: 'اتاق خواب', value: faInt(property.beds) },
    { label: 'سرویس بهداشتی', value: faInt(property.baths) },
    { label: 'زیربنا', value: formatSqft(property.sqft) },
    { label: 'زمین', value: property.lot },
    { label: 'سال ساخت', value: faDigits(property.year) },
    { label: 'نوع ملک', value: property.type },
  ]

  return (
    <>
      <section className="bg-white pt-[76px]">
        <div className="shell pt-8 lg:pt-10">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-xs text-ink-muted transition-colors duration-300 hover:text-navy"
          >
            {/* Back points right in RTL. */}
            <ArrowLeft className="h-4 w-4 rotate-180" strokeWidth={1.8} aria-hidden="true" />
            همهٔ املاک
          </Link>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-navy px-3.5 py-1.5 font-display text-[0.68rem] font-semibold text-champagne-light shadow-depth-sm">
                  {property.status}
                </span>
                <span className="text-[0.78rem] text-ink-soft">{property.type}</span>
              </div>

              <h1 className="mt-5 font-display text-display-lg font-bold">{property.name}</h1>
              <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
                <MapPin className="h-4 w-4 shrink-0 text-champagne-dark" strokeWidth={1.8} aria-hidden="true" />
                {locationLabel(property)}
              </p>
            </div>

            <div className="rounded-panel border border-line bg-ivory px-6 py-5 shadow-depth-sm lg:justify-self-end lg:text-end">
              <p className="font-display text-display-md font-bold text-navy">{formatPrice(property.price)}</p>
              <p className="mt-2 text-[0.74rem] text-ink-soft">قیمت راهنما</p>
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
            {/* Spec tiles on their own planes — the depth keeps a dense row readable. */}
            <dl className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-card border border-line bg-ivory px-4 py-4 shadow-depth-sm transition-[transform,box-shadow] duration-500 ease-premium hover:-translate-y-1 hover:shadow-depth"
                >
                  <dt className="text-[0.72rem] text-ink-soft">{spec.label}</dt>
                  <dd className="mt-1.5 font-display text-[1rem] font-semibold text-navy">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-[1.04rem] leading-relaxed text-ink">{property.summary}</p>

            <h2 className="mt-12 font-display text-display-sm font-semibold">دربارهٔ این ملک</h2>
            {property.description.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-5 text-[0.98rem] leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}

            <h2 className="mt-12 font-display text-display-sm font-semibold">ویژگی‌ها</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {property.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-[0.94rem] leading-relaxed text-ink-muted">
                  <Check className="mt-1.5 h-4 w-4 shrink-0 text-champagne-dark" strokeWidth={2} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-display-sm font-semibold">امکانات</h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {property.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="rounded-full border border-line bg-ivory px-4 py-2 text-[0.8rem] text-ink-muted shadow-depth-sm transition-transform duration-300 ease-premium hover:-translate-y-0.5"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-[104px] lg:self-start">
            <div className="rounded-panel border border-line bg-ivory p-7 shadow-depth-lg">
              <div className="flex items-center gap-4">
                <img
                  src={agent.photo}
                  alt=""
                  width={112}
                  height={112}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover shadow-depth-sm"
                />
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold text-navy">{agent.name}</p>
                  <p className="text-xs text-ink-muted">{agent.role}</p>
                </div>
              </div>

              <p className="mt-5 text-[0.9rem] leading-relaxed text-ink-muted">{agent.focus}</p>

              <div className="mt-6 flex flex-col gap-3">
                <Button variant="primary" size="md" fullWidth onClick={() => openViewing(property)}>
                  تعیین زمان بازدید
                </Button>
                <Button variant="outline" size="md" fullWidth onClick={() => openContact({ property })}>
                  پرسش خود را بپرسید
                </Button>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5">
                <a
                  href={`tel:${agent.phone.replace(/\D/g, '')}`}
                  className="inline-flex items-center gap-3 text-sm text-ink-muted transition-colors duration-300 hover:text-navy"
                >
                  <Phone className="h-4 w-4 shrink-0 text-champagne-dark" strokeWidth={1.7} aria-hidden="true" />
                  <span className="ltr-inline">{agent.phone}</span>
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="inline-flex items-center gap-3 break-all text-sm text-ink-muted transition-colors duration-300 hover:text-navy"
                >
                  <Mail className="h-4 w-4 shrink-0 text-champagne-dark" strokeWidth={1.7} aria-hidden="true" />
                  <span className="ltr-inline">{agent.email}</span>
                </a>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
                <span className="text-xs text-ink-soft">ذخیره در فهرست کوتاه</span>
                <FavoriteButton property={property} tone="light" />
              </div>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-ink-soft">
              بازدیدها همراه با مشاور برگزار می‌شود و معمولاً ۴۵ دقیقه طول می‌کشد. کد مرجع:{' '}
              <span className="ltr-inline">{property.id.toUpperCase()}</span>
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>املاک مشابه</SectionLabel>
              <h2 className="mt-5 font-display text-display-lg font-bold">شاید این‌ها را هم بپسندید</h2>
            </div>
            <Button
              to="/properties"
              variant="outline"
              size="sm"
              iconRight={<ArrowRight className="h-4 w-4 rotate-180" strokeWidth={1.8} aria-hidden="true" />}
            >
              مشاهدهٔ همه
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
