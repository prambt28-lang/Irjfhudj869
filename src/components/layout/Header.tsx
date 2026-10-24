import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Phone, X } from 'lucide-react'

import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { contact, navLinks, type NavLink } from '../../data/site'
import { useScrollLock } from '../../hooks/useScrollLock'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/cn'

export function Header() {
  const scrolled = useScrolled(28)
  const { pathname, hash } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const onHome = pathname === '/'

  // Transparent only while the hero is directly beneath the header.
  const solid = scrolled || !onHome || menuOpen

  useScrollLock(menuOpen)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const isActive = (link: NavLink): boolean => {
    if (link.section) return onHome && hash === `#${link.section}`
    if (link.to === '/properties') return pathname.startsWith('/properties')
    return pathname === '/' && !hash
  }

  const linkTone = solid ? 'text-ink hover:text-navy' : 'text-white/80 hover:text-white'

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-premium',
        solid ? 'bg-white/95 shadow-nav backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="shell flex h-[76px] items-center justify-between gap-6">
        <Link to="/" aria-label={`${'Horizon Properties'} — home`} className="shrink-0">
          <Logo tone={solid ? 'dark' : 'light'} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link)
            return (
              <Link
                key={link.label}
                to={link.to}
                data-active={active}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'link-underline font-display text-[0.78rem] font-medium tracking-[0.08em] transition-colors duration-300',
                  linkTone,
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            href={contact.phoneHref}
            size="sm"
            variant={solid ? 'outline' : 'outline-light'}
            className="hidden sm:inline-flex"
            iconLeft={<Phone className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />}
          >
            {contact.phoneDisplay}
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden',
              solid ? 'border-navy/15 text-navy hover:bg-mist' : 'border-white/35 text-white hover:bg-white/10',
            )}
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation — collapses smoothly rather than snapping open. */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          'grid overflow-hidden bg-white transition-[grid-template-rows,opacity] duration-500 ease-premium lg:hidden',
          menuOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="min-h-0">
          <nav aria-label="Mobile" className="shell flex flex-col gap-1 border-t border-line pb-6 pt-4">
            {navLinks.map((link) => {
              const active = isActive(link)
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  tabIndex={menuOpen ? undefined : -1}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-[0.95rem] font-medium transition-colors',
                    active ? 'bg-ivory text-navy' : 'text-ink hover:bg-mist',
                  )}
                >
                  {link.label}
                  <span
                    className={cn('h-1.5 w-1.5 rounded-full bg-champagne transition-opacity', active ? 'opacity-100' : 'opacity-0')}
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
            <Button
              href={contact.phoneHref}
              variant="primary"
              size="md"
              fullWidth
              className="mt-3"
              tabIndex={menuOpen ? undefined : -1}
              iconLeft={<Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
            >
              {contact.phoneDisplay}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
