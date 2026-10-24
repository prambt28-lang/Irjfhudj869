import { Home, Search } from 'lucide-react'

import { Button } from '../components/ui/Button'
import { SectionLabel } from '../components/ui/SectionLabel'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <section className="bg-ivory pt-[76px]">
      <div className="shell flex min-h-[75vh] flex-col justify-center py-20">
        <div className="max-w-xl">
          <SectionLabel>404</SectionLabel>
          <h1 className="mt-5 font-display text-display-lg font-bold">This page has moved on</h1>
          <p className="mt-6 text-[0.98rem] leading-relaxed text-ink-muted">
            The address you followed does not match anything we represent. The collection is always a
            click away — or call us and we will point you to the right door.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button
              to="/properties"
              variant="primary"
              size="lg"
              iconLeft={<Search className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
            >
              Browse properties
            </Button>
            <Button
              to="/"
              variant="outline"
              size="lg"
              iconLeft={<Home className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
            >
              Back to home
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
