import { Home, Search } from 'lucide-react'

import { Button } from '../components/ui/Button'
import { SectionLabel } from '../components/ui/SectionLabel'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('صفحه پیدا نشد')

  return (
    <section className="bg-ivory pt-[76px]">
      <div className="shell flex min-h-[75vh] flex-col justify-center py-20">
        <div className="max-w-xl">
          <SectionLabel>۴۰۴</SectionLabel>
          <h1 className="mt-5 font-display text-display-lg font-bold">این صفحه دیگر اینجا نیست</h1>
          <p className="mt-6 text-[0.98rem] leading-relaxed text-ink-muted">
            نشانی‌ای که باز کرده‌اید با چیزی که ما نمایندگی می‌کنیم هم‌خوان نیست. مجموعهٔ املاک همیشه یک کلیک
            فاصله دارد — یا تماس بگیرید تا شما را به درست راهنمایی کنیم.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button
              to="/search"
              variant="primary"
              size="lg"
              iconLeft={<Search className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
            >
              جست‌وجوی املاک
            </Button>
            <Button
              to="/"
              variant="outline"
              size="lg"
              iconLeft={<Home className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
            >
              بازگشت به خانه
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
