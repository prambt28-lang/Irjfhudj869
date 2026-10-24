export const brand = {
  name: 'Horizon Properties',
  short: 'Horizon',
  tagline: 'Premium properties in prime locations.',
  description:
    'Horizon Properties represents exceptional homes and considered investments across the United States, working with a small number of clients at a time.',
}

export interface NavLink {
  label: string
  to: string
  /** Section id used for active-state matching on the home page. */
  section?: string
}

export const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/#about', section: 'about' },
  { label: 'Services', to: '/#services', section: 'services' },
  { label: 'Team', to: '/#team', section: 'team' },
  { label: 'Contact', to: '/#contact', section: 'contact' },
]

export const contact = {
  phoneDisplay: '(555) 246-7890',
  phoneHref: 'tel:+15552467890',
  email: 'hello@horizonproperties.com',
  addressLines: ['Horizon Properties', '2400 Congress Avenue, Suite 12', 'Austin, Texas 78701'],
  hours: 'Monday – Saturday, 9am – 6pm CT',
}

/** Swap these three URLs for the real profiles before launch. */
export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Facebook', href: 'https://www.facebook.com' },
]

export interface Service {
  title: string
  description: string
  meta: string
}

export const services: Service[] = [
  {
    title: 'Luxury Home Sales',
    description:
      'Representation for architecturally significant homes — from a discreet off-market introduction through to completion.',
    meta: 'Buyer & seller representation',
  },
  {
    title: 'Property Investment',
    description:
      'Portfolio strategy, yield analysis and acquisition sourcing for income-producing residential assets.',
    meta: 'Acquisition & portfolio strategy',
  },
  {
    title: 'Property Marketing',
    description:
      'Film, photography and editorial production that positions a home in front of the right buyers, not the largest number.',
    meta: 'Photography, film & press',
  },
  {
    title: 'Real Estate Advisory',
    description:
      'Independent advice on timing, structure and negotiation before you commit capital to a property.',
    meta: 'Pre-acquisition advice',
  },
  {
    title: 'Property Valuation',
    description:
      'Evidence-based appraisals grounded in comparable sales, land value, and the quality of the build.',
    meta: 'Appraisals & market evidence',
  },
  {
    title: 'Relocation Services',
    description:
      'Neighbourhood orientation, school introductions and settlement support for clients moving internationally.',
    meta: 'Relocation & settling in',
  },
]

export const whyUs = {
  label: 'Why Horizon',
  title: 'A quieter way to buy and sell property',
  body: 'We take on a limited number of clients each year. That means the person you meet is the person who negotiates on your behalf, and every property we present has been visited, measured and priced by us first.',
  reasons: [
    {
      title: 'Architectural literacy',
      description:
        'We read plans and materials, so we can speak about what a building actually is — not only what it measures.',
    },
    {
      title: 'Discretion as standard',
      description:
        'A significant share of what we transact never appears on a public listing. Privacy is part of the service.',
    },
    {
      title: 'One advisor, end to end',
      description:
        'The advisor who shows you the property negotiates it and stays with you through completion.',
    },
  ],
  stats: [
    { value: '18', label: 'Years in prime markets' },
    { value: '1,240+', label: 'Residences represented' },
    { value: '$1.4B', label: 'Transaction volume' },
    { value: '98%', label: 'Clients who would refer us' },
  ],
}

export const heroCopy = {
  headline: ['Discover Exceptional', 'Homes & Investments'],
  standfirst:
    'Premium properties in prime locations. Find your dream home or the perfect investment with confidence.',
}

export const aboutCopy = {
  label: 'About Us',
  title: 'Who We Are',
  body: 'At Horizon Properties, we connect people with extraordinary homes and smart investments. Integrity, transparency, and client satisfaction are at the heart of everything we do.',
  secondary:
    'Founded in Austin and working across the United States, we advise buyers, sellers and investors on residential property — from first viewings to final signatures.',
  stats: [
    { value: '18', label: 'Years advising clients' },
    { value: '6', label: 'Agents, no more' },
  ],
}

export const ctaCopy = {
  title: 'Ready to Find Your Perfect Property?',
  body: 'Let our experts guide you to the right home or investment.',
  action: 'Get in Touch',
}
