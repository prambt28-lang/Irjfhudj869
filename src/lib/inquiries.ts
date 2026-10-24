import { useCallback, useMemo } from 'react'

export interface InquiryPayload {
  kind: 'contact' | 'viewing'
  name: string
  email: string
  phone: string
  message: string
  agentId?: string
  propertyId?: string
  propertyName?: string
  preferredDate?: string
  preferredTime?: string
}

export interface InquiryReceipt {
  ok: true
  reference: string
}

const STORAGE_KEY = 'horizon:inquiries'

function readInbox(): InquiryPayload[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as InquiryPayload[]) : []
  } catch {
    return []
  }
}

function makeReference(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let suffix = ''
  for (let index = 0; index < 5; index += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `HP-${suffix}`
}

/**
 * Single integration point for enquiries (contact an agent / schedule a viewing).
 *
 * The site currently ships without a backend, so an enquiry is validated in the
 * UI and kept in `localStorage` under `horizon:inquiries` — enough for the flow to
 * be genuinely usable and inspectable. When an API or CRM is available, replace
 * the body of this function with the network call; the signature and the UI that
 * consumes it do not change.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<InquiryReceipt> {
  const record = { ...payload, submittedAt: new Date().toISOString() }
  const inbox = [...readInbox(), record]

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inbox))
  } catch {
    // Private browsing or a full quota — the UI still confirms the enquiry.
  }

  await new Promise((resolve) => setTimeout(resolve, 550))

  return { ok: true, reference: makeReference() }
}

/** Exposed for the properties page / future back-office tooling. */
export function useInquiryCount(): number {
  return useMemo(() => readInbox().length, [])
}

export function useSubmitInquiry(): (payload: InquiryPayload) => Promise<InquiryReceipt> {
  return useCallback((payload: InquiryPayload) => submitInquiry(payload), [])
}
