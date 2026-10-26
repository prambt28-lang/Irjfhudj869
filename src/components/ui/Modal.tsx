import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

import { useScrollLock } from '../../hooks/useScrollLock'
import { cn } from '../../lib/cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  size?: 'md' | 'lg'
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function Modal({ open, onClose, title, description, children, size = 'md' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useScrollLock(open)

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current
      const target = panel?.querySelector<HTMLElement>(FOCUSABLE)
      target?.focus()
    }, 40)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(focusTimer)
      previouslyFocused.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    // RTL layout: the dialog is centred by flex, so no side-specific assumptions here.
    <div className="fixed inset-0 z-[70] overflow-y-auto" dir="rtl">
      <div
        className="fixed inset-0 animate-fade-in bg-navy-900/70 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-6">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby={description ? 'modal-description' : undefined}
          className={cn(
            'relative z-10 w-full animate-sheet-in rounded-t-panel bg-white shadow-depth-xl sm:rounded-panel',
            size === 'lg' ? 'sm:max-w-2xl' : 'sm:max-w-lg',
          )}
        >
          <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:px-8 sm:py-6">
            <div>
              <h2 id="modal-title" className="font-display text-lg font-semibold text-navy">
                {title}
              </h2>
              {description && (
                <p id="modal-description" className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن پنجره"
              className="-me-1 -mt-1 rounded-full p-2 text-ink-muted transition-all duration-300 hover:-translate-y-px hover:bg-mist hover:text-navy hover:shadow-depth-sm"
            >
              <X className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <div className="px-6 py-6 sm:px-8 sm:py-7">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
