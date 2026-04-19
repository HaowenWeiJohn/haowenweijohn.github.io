import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

export function RootLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return (
    <div className="min-h-screen bg-background">
      <MobileNav />
      <div className="lg:flex">
        <div className="hidden lg:block lg:w-[280px] lg:shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <Sidebar />
          </div>
        </div>
        <main className="flex-1 px-5 py-8 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-3xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
