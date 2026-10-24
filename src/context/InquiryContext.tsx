import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

import { InquiryDialog } from '../components/forms/InquiryDialog'
import type { Property } from '../data/properties'

export interface InquiryTarget {
  kind: 'contact' | 'viewing'
  property?: Property
  agentId?: string
}

interface InquiryValue {
  /** General enquiry from the CTA banner, header or footer. */
  openContact: (options?: { property?: Property; agentId?: string }) => void
  /** "Schedule a viewing" — adds the preferred date and time fields. */
  openViewing: (property: Property, agentId?: string) => void
}

const InquiryContext = createContext<InquiryValue | null>(null)

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<InquiryTarget | null>(null)

  const openContact = useCallback<InquiryValue['openContact']>((options) => {
    setTarget({ kind: 'contact', property: options?.property, agentId: options?.agentId })
  }, [])

  const openViewing = useCallback<InquiryValue['openViewing']>((property, agentId) => {
    setTarget({ kind: 'viewing', property, agentId: agentId ?? property.agentId })
  }, [])

  const close = useCallback(() => setTarget(null), [])

  const value = useMemo<InquiryValue>(() => ({ openContact, openViewing }), [openContact, openViewing])

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <InquiryDialog open={target !== null} target={target} onClose={close} />
    </InquiryContext.Provider>
  )
}

export function useInquiry(): InquiryValue {
  const context = useContext(InquiryContext)
  if (!context) {
    throw new Error('useInquiry must be used inside an InquiryProvider')
  }
  return context
}
