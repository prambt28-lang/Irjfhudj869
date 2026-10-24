import { useState, type FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'

import { cn } from '../../lib/cn'

const STORAGE_KEY = 'horizon:newsletter'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

interface NewsletterFormProps {
  /** `dark` sits on the navy footer. */
  tone?: 'dark' | 'light'
}

export function NewsletterForm({ tone = 'dark' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'error' | 'done'>('idle')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = email.trim()

    if (!emailPattern.test(value)) {
      setStatus('error')
      return
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      const list = raw ? (JSON.parse(raw) as string[]) : []
      if (!list.includes(value)) list.push(value)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    } catch {
      // Storage unavailable — the confirmation below still stands.
    }

    setStatus('done')
  }

  if (status === 'done') {
    return (
      <p
        className={cn(
          'flex items-center gap-2.5 text-sm',
          tone === 'dark' ? 'text-white/85' : 'text-ink-muted',
        )}
        role="status"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-champagne/20 text-champagne-light">
          <Check className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </span>
        You’re on the list — new listings will arrive first.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (status === 'error') setStatus('idle')
          }}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
          className={cn(
            'h-12 min-w-0 flex-1 rounded-full px-5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-champagne/40 focus-visible:outline-none',
            tone === 'dark'
              ? 'border border-white/20 bg-white/[0.06] text-white placeholder:text-white/45 hover:border-white/35'
              : 'border border-line bg-white text-ink placeholder:text-ink-soft',
          )}
        />
        <button
          type="submit"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 font-display text-[0.8rem] font-semibold text-navy transition-colors duration-300 hover:bg-champagne-light"
        >
          Subscribe
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
      {status === 'error' && (
        <p id="newsletter-error" role="alert" className="text-xs text-champagne-light">
          Please enter a valid email address.
        </p>
      )}
    </form>
  )
}
