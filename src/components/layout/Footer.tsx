import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'

import { Logo } from '../brand/Logo'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../brand/SocialIcons'
import { NewsletterForm } from './NewsletterForm'
import { brand, contact, navLinks, socials } from '../../data/site'

const socialIcons = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedinIcon,
  Facebook: FacebookIcon,
} as const

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden bg-navy-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      {/* Depth wash: the footer reads as a dim plane receding behind the page. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/35 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 -z-10 h-64 w-[120%] -translate-x-1/2 rounded-[50%] bg-champagne/[0.07] blur-[60px]"
        aria-hidden="true"
      />

      <div className="shell grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">{brand.description}</p>
          <ul className="mt-7 flex items-center gap-3">
            {socials.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons]
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${brand.name} در ${social.label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 shadow-[0_14px_30px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 ease-premium hover:-translate-y-px hover:border-champagne hover:text-champagne"
                  >
                    {Icon ? <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" /> : null}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <nav aria-label="پیوندهای پانویس" className="lg:col-span-2">
          <h2 className="font-display text-[0.8rem] font-semibold text-champagne">گشت‌وگذار</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-display text-[0.8rem] font-semibold text-champagne">تماس</h2>
          <ul className="mt-5 flex flex-col gap-4 text-sm text-white/70">
            <li>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-champagne/80" strokeWidth={1.7} aria-hidden="true" />
                <span className="ltr-inline">{contact.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-champagne/80" strokeWidth={1.7} aria-hidden="true" />
                <span className="ltr-inline">{contact.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne/80" strokeWidth={1.7} aria-hidden="true" />
              <address className="not-italic leading-relaxed">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
          </ul>
          <p className="mt-4 text-xs text-white/45">{contact.hours}</p>
        </div>

        <div className="min-w-0 lg:col-span-3">
          <h2 className="font-display text-[0.8rem] font-semibold text-champagne">در جریان بمانید</h2>
          <p className="mt-5 text-sm leading-relaxed text-white/65">
            فهرست‌های تازه و فرصت‌های خارج از فهرست عمومی، هر چند وقت یک‌بار.
          </p>
          <div className="mt-5">
            <NewsletterForm tone="dark" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {brand.name} — تمام حقوق محفوظ است. {new Date().getFullYear()}
          </p>
          <p>دفتر املاک دارای مجوز — آستین، تگزاس.</p>
        </div>
      </div>
    </footer>
  )
}
