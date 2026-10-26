import { Outlet } from 'react-router-dom'

import { Footer } from './Footer'
import { Header } from './Header'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:text-white focus:shadow-depth-lg"
      >
        رفتن به محتوای اصلی
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
