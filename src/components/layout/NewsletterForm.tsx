import { useState, type FormEvent } from 'react'
import { ArrowLeft, Check } from 'lucide-react'

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
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-champagne/20 text-champagne-light shadow-[0_10px_24px_-16px_rgba(197,160,112,0.8)]">
          <Check className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </span>
        ثبت شد — فهرست‌های تازه را اول از همه دریافت می‌کنید.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <label htmlFor="newsletter-email" className="sr-only">
        نشانی ایمیل
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          dir="ltr"
          placeholder="you@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (status === 'error') setStatus('idle')
          }}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
          className={cn(
            'h-12 min-w-0 flex-1 rounded-full px-5 text-sm shadow-inner-depth transition-[border-color,box-shadow,transform] duration-300 focus:-translate-y-px focus:outline-none focus:shadow-glow focus-visible:outline-none',
            tone === 'dark'
              ? 'border border-white/20 bg-white/[0.06] text-white placeholder:text-white/45 hover:border-white/35 focus:border-champagne'
              : 'border border-line bg-white text-ink placeholder:text-ink-soft',
          )}
        />
        <button
          type="submit"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 font-display text-[0.82rem] font-semibold text-navy shadow-depth transition-all duration-300 ease-premium hover:-translate-y-px hover:bg-champagne-light hover:shadow-depth-lg active:translate-y-[1px]"
        >
          عضویت
          {/* «بعدی» points left in RTL, so the arrow is mirrored. */}
          <ArrowLeft className="h-4 w-4 rotate-180" strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
      {status === 'error' && (
        <p id="newsletter-error" role="alert" className="text-xs text-champagne-light">
          لطفاً یک نشانی ایمیل معتبر وارد کنید.
        </p>
      )}
    </form>
  )
}
