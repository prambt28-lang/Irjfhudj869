import type { SVGProps } from 'react'

/**
 * Brand glyphs. lucide-react (v1) no longer ships social trademarks, so the three
 * profiles linked in the footer are drawn here on the same 24px grid as the rest.
 */
type SocialIconProps = SVGProps<SVGSVGElement>

export function InstagramIcon(props: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LinkedinIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M5 3.6a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8ZM3.1 9.4h3.8V21H3.1zM9.2 9.4h3.6v1.6h.05c.5-.9 1.75-1.85 3.6-1.85 3.85 0 4.55 2.35 4.55 5.4V21h-3.8v-5.3c0-1.27-.03-2.9-1.8-2.9-1.8 0-2.08 1.37-2.08 2.8V21H9.2z" />
    </svg>
  )
}

export function FacebookIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M13.6 21v-7.9h2.7l.4-3.1h-3.1V8.05c0-.9.25-1.5 1.55-1.5h1.65V3.75c-.29-.04-1.27-.13-2.4-.13-2.37 0-4 1.45-4 4.1V10H7.6v3.1h2.8V21z" />
    </svg>
  )
}
