import { useState } from 'react'
import { Menu } from 'lucide-react'
import { NavLink, Link } from 'react-router'
import { site } from '@/data/site'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center justify-between border-b bg-card px-4 py-3 lg:hidden">
      <Link to="/" className="text-sm font-semibold">
        {site.shortName}
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>{site.shortName}</SheetTitle>
          </SheetHeader>
          <nav className="mt-4 flex flex-col gap-1 px-4 text-sm">
            {site.nav.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-foreground/80 hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-3 py-2 text-foreground/80 hover:bg-muted hover:text-foreground',
                      isActive && 'bg-muted font-medium text-foreground',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
