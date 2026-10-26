import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { CheckCircle2, Phone, Send } from 'lucide-react'

import type { InquiryTarget } from '../../context/InquiryContext'
import { agents, getAgentById } from '../../data/agents'
import { locationLabel } from '../../data/properties'
import { contact } from '../../data/site'
import { submitInquiry } from '../../lib/inquiries'
import { Button } from '../ui/Button'
import { Field, controlClass } from '../ui/Field'
import { Modal } from '../ui/Modal'

interface InquiryDialogProps {
  open: boolean
  target: InquiryTarget | null
  onClose: () => void
}

interface FormValues {
  name: string
  email: string
  phone: string
  message: string
  preferredDate: string
  preferredTime: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function initialValues(target: InquiryTarget | null): FormValues {
  const property = target?.property
  const message = property
    ? `دربارهٔ ${property.name} (${locationLabel(property)}) اطلاعات بیشتری می‌خواهم.`
    : ''

  return { name: '', email: '', phone: '', message, preferredDate: '', preferredTime: 'morning' }
}

export function InquiryDialog({ open, target, onClose }: InquiryDialogProps) {
  const isViewing = target?.kind === 'viewing'
  const property = target?.property
  const agent = useMemo(
    () => getAgentById(target?.agentId ?? property?.agentId ?? agents[0].id),
    [target?.agentId, property?.agentId],
  )

  const [values, setValues] = useState<FormValues>(() => initialValues(target))
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle')
  const [reference, setReference] = useState('')
  const [formError, setFormError] = useState('')

  // Re-seed the form whenever the dialog opens for a new target.
  useEffect(() => {
    if (!open) return
    setValues(initialValues(target))
    setErrors({})
    setStatus('idle')
    setReference('')
    setFormError('')
  }, [open, target])

  const update = (key: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormValues, string>> = {}
    if (!values.name.trim()) next.name = 'لطفاً نام خود را وارد کنید.'
    if (!values.email.trim()) next.email = 'نشانی ایمیل الزامی است.'
    else if (!emailPattern.test(values.email.trim())) next.email = 'لطفاً نشانی ایمیل را بررسی کنید.'
    if (values.phone.trim() && values.phone.replace(/\D/g, '').length < 7) {
      next.phone = 'لطفاً شمارهٔ تلفن را بررسی کنید.'
    }
    if (isViewing && !values.preferredDate) next.preferredDate = 'تاریخ مورد نظر را انتخاب کنید.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError('')
    if (!validate()) return

    setStatus('submitting')
    try {
      const receipt = await submitInquiry({
        kind: isViewing ? 'viewing' : 'contact',
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
        agentId: agent.id,
        propertyId: property?.id,
        propertyName: property?.name,
        ...(isViewing ? { preferredDate: values.preferredDate, preferredTime: values.preferredTime } : {}),
      })
      setReference(receipt.reference)
      setStatus('sent')
    } catch {
      setStatus('idle')
      setFormError('ارسال درخواست شما با خطا روبه‌رو شد. لطفاً دوباره تلاش کنید یا مستقیم تلفنی تماس بگیرید.')
    }
  }

  const firstName = values.name.trim().split(' ')[0]

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={isViewing ? 'تعیین زمان بازدید' : 'تماس با مشاور'}
      description={
        property
          ? `${property.name} — ${locationLabel(property)}`
          : 'بگویید دنبال چه چیزی هستید؛ مشاور ما ظرف یک روز کاری پاسخ می‌دهد.'
      }
    >
      {status === 'sent' ? (
        <div className="flex flex-col items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne-tint text-champagne-dark shadow-depth-sm">
            <CheckCircle2 className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-navy">
              سپاسگزاریم{firstName ? `، ${firstName}` : ''}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {isViewing ? (
                <>
                  درخواست بازدید شما با کد پیگیری <span className="ltr-inline font-medium">{reference}</span> ثبت
                  شد. {agent.name} به‌زودی زمان آن را با شما نهایی می‌کند.
                </>
              ) : (
                <>
                  درخواست شما با کد پیگیری <span className="ltr-inline font-medium">{reference}</span> ثبت شد.{' '}
                  {agent.name} ظرف یک روز کاری با شما تماس می‌گیرد.
                </>
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              variant="primary"
              size="sm"
              href={contact.phoneHref}
              iconLeft={<Phone className="h-4 w-4" strokeWidth={1.8} />}
            >
              <span className="ltr-inline">{contact.phoneDisplay}</span>
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              بستن
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex items-center gap-4 rounded-card border border-line bg-ivory px-4 py-3.5 shadow-inner-depth">
            <img
              src={agent.photo}
              alt=""
              width={48}
              height={48}
              loading="lazy"
              className="h-12 w-12 rounded-full object-cover shadow-depth-sm"
            />
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold text-navy">{agent.name}</p>
              <p className="truncate text-xs text-ink-muted">{agent.role}</p>
            </div>
            <a
              href={`tel:${agent.phone.replace(/\D/g, '')}`}
              className="ms-auto hidden shrink-0 text-xs font-medium text-navy underline-offset-4 hover:text-champagne-dark hover:underline sm:block"
            >
              <span className="ltr-inline">{agent.phone}</span>
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="نام و نام خانوادگی" id="inquiry-name" error={errors.name}>
              <input
                id="inquiry-name"
                name="name"
                type="text"
                autoComplete="name"
                className={controlClass}
                value={values.name}
                onChange={(event) => update('name', event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
              />
            </Field>
            <Field label="ایمیل" id="inquiry-email" error={errors.email}>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                dir="ltr"
                autoComplete="email"
                className={controlClass}
                value={values.email}
                onChange={(event) => update('email', event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
              />
            </Field>
          </div>

          <Field label="تلفن (اختیاری)" id="inquiry-phone" error={errors.phone}>
            <input
              id="inquiry-phone"
              name="phone"
              type="tel"
              dir="ltr"
              autoComplete="tel"
              className={controlClass}
              value={values.phone}
              onChange={(event) => update('phone', event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'inquiry-phone-error' : undefined}
            />
          </Field>

          {isViewing && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="تاریخ مورد نظر" id="inquiry-date" error={errors.preferredDate}>
                <input
                  id="inquiry-date"
                  name="preferredDate"
                  type="date"
                  min={todayISO()}
                  className={controlClass}
                  value={values.preferredDate}
                  onChange={(event) => update('preferredDate', event.target.value)}
                  aria-invalid={Boolean(errors.preferredDate)}
                  aria-describedby={errors.preferredDate ? 'inquiry-date-error' : undefined}
                />
              </Field>
              <Field label="ساعت مورد نظر" id="inquiry-time">
                <select
                  id="inquiry-time"
                  name="preferredTime"
                  className={controlClass}
                  value={values.preferredTime}
                  onChange={(event) => update('preferredTime', event.target.value)}
                >
                  <option value="morning">صبح (۹ تا ۱۲)</option>
                  <option value="afternoon">بعدازظهر (۱۲ تا ۱۶)</option>
                  <option value="evening">عصر (۱۶ تا ۱۸)</option>
                </select>
              </Field>
            </div>
          )}

          <Field label="پیام" id="inquiry-message" hint="اختیاری — هر چیزی که به آماده‌شدن ما کمک کند.">
            <textarea
              id="inquiry-message"
              name="message"
              rows={4}
              className={controlClass}
              value={values.message}
              onChange={(event) => update('message', event.target.value)}
            />
          </Field>

          {formError && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 shadow-depth-sm">
              {formError}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-ink-soft">
              از اطلاعات شما فقط برای پاسخ به همین درخواست استفاده می‌کنیم.
            </p>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="sm:w-auto"
              disabled={status === 'submitting'}
              iconRight={<Send className="h-4 w-4 rtl:rotate-180" strokeWidth={1.8} aria-hidden="true" />}
            >
              {status === 'submitting' ? 'در حال ارسال…' : isViewing ? 'درخواست بازدید' : 'ارسال درخواست'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}
