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
    <footer id="contact" className="bg-navy-900 text-white">
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
                    aria-label={`${brand.name} on ${social.label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors duration-300 hover:border-champagne hover:text-champagne"
                  >
                    {Icon ? <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" /> : null}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-champagne">
            Explore
          </h2>
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
          <h2 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-champagne">
            Contact
          </h2>
          <ul className="mt-5 flex flex-col gap-4 text-sm text-white/70">
            <li>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-champagne/80" strokeWidth={1.7} aria-hidden="true" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-champagne/80" strokeWidth={1.7} aria-hidden="true" />
                {contact.email}
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
          <h2 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-champagne">
            Stay in touch
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/65">
            New listings and off-market opportunities, sent occasionally.
          </p>
          <div className="mt-5">
            <NewsletterForm tone="dark" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p>Licensed real estate brokerage — Austin, Texas.</p>
        </div>
      </div>
    </footer>
  )
}
