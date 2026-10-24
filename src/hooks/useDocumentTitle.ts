import { useEffect } from 'react'

import { brand } from '../data/site'

/** Keeps the document title in step with the current page. */
export function useDocumentTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} — ${brand.name}` : `${brand.name} — Exceptional Homes & Investments`
  }, [title])
}
