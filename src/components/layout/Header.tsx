import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Phone, Search, X } from 'lucide-react'

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
    if (link.to === '/search') return pathname.startsWith('/search')
    return pathname === '/' && !hash
  }

  const linkTone = solid ? 'text-ink hover:text-navy' : 'text-white/80 hover:text-white'

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500 ease-premium',
        solid
          ? 'border-b border-line/70 bg-white/95 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_10px_30px_-24px_rgba(11,36,71,0.45),0_30px_60px_-50px_rgba(11,36,71,0.5)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="shell flex h-[76px] items-center justify-between gap-6">
        <Link to="/" aria-label="Horizon Properties — خانه" className="shrink-0">
          <Logo tone={solid ? 'dark' : 'light'} />
        </Link>

        <nav aria-label="منوی اصلی" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => {
            const active = isActive(link)
            return (
              <Link
                key={link.label}
                to={link.to}
                data-active={active}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'link-underline font-display text-[0.83rem] font-medium transition-colors duration-300',
                  linkTone,
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* The moved search lives one tap away from every page. */}
          <Link
            to="/search"
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ease-premium hover:-translate-y-px sm:h-10 sm:w-auto sm:gap-2 sm:px-4',
              solid
                ? 'border-navy/20 text-navy shadow-depth-sm hover:border-navy hover:shadow-depth'
                : 'border-white/35 text-white shadow-[0_10px_24px_-18px_rgba(0,0,0,0.7)] hover:border-white hover:bg-white/10',
            )}
            aria-label="جست‌وجوی املاک"
          >
            <Search className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
            <span className="hidden font-display text-[0.8rem] font-semibold sm:inline">جست‌وجوی املاک</span>
          </Link>

          <Button
            href={contact.phoneHref}
            size="sm"
            variant={solid ? 'outline' : 'outline-light'}
            className="hidden xl:inline-flex"
            iconLeft={<Phone className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />}
          >
            <span className="ltr-inline">{contact.phoneDisplay}</span>
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ease-premium hover:-translate-y-px lg:hidden',
              solid
                ? 'border-navy/15 text-navy shadow-depth-sm hover:shadow-depth'
                : 'border-white/35 text-white hover:bg-white/10',
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

      {/* Mobile navigation — collapses smoothly rather than snapping open, and sits
          on its own raised plane below the bar. */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          'grid overflow-hidden bg-white transition-[grid-template-rows,opacity] duration-500 ease-premium lg:hidden',
          menuOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="min-h-0">
          <nav
            aria-label="منوی موبایل"
            className="shell flex flex-col gap-1 border-t border-line pb-6 pt-4 shadow-[0_30px_60px_-40px_rgba(11,36,71,0.5)]"
          >
            {navLinks.map((link) => {
              const active = isActive(link)
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  tabIndex={menuOpen ? undefined : -1}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-[0.95rem] font-medium transition-all duration-300 ease-premium',
                    active ? 'bg-ivory text-navy shadow-inner-depth' : 'text-ink hover:bg-mist hover:shadow-depth-sm',
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
              <span className="ltr-inline">{contact.phoneDisplay}</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
