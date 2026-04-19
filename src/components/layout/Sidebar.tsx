import { NavLink } from 'react-router'
import { Mail, GraduationCap } from 'lucide-react'
import { site } from '@/data/site'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { GitHubIcon, LinkedInIcon } from '@/components/BrandIcons'
import { cn } from '@/lib/utils'

export function Sidebar() {
  return (
    <aside className="flex h-full flex-col gap-5 border-r bg-card p-6">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-28 w-28 ring-2 ring-border">
          <AvatarImage src={site.avatar} alt={site.name} />
          <AvatarFallback>HW</AvatarFallback>
        </Avatar>
        <h1 className="mt-3 text-lg font-semibold leading-tight">{site.name}</h1>
        <p className="mt-1 text-xs italic text-muted-foreground">{site.tagline}</p>
        <p className="mt-3 text-xs text-muted-foreground">{site.affiliation}</p>
        <p className="mt-1 text-xs text-muted-foreground">{site.location}</p>
      </div>

      <div className="flex justify-center gap-3 text-muted-foreground">
        <a
          href={`mailto:${site.socials.email}`}
          aria-label="Email"
          className="hover:text-foreground"
        >
          <Mail className="h-5 w-5" />
        </a>
        <a
          href={site.socials.scholar}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Scholar"
          className="hover:text-foreground"
        >
          <GraduationCap className="h-5 w-5" />
        </a>
        <a
          href={site.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-foreground"
        >
          <GitHubIcon className="h-5 w-5" />
        </a>
        <a
          href={site.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-foreground"
        >
          <LinkedInIcon className="h-5 w-5" />
        </a>
      </div>

      <nav className="mt-2 flex flex-col gap-0.5 text-sm">
        {site.nav.map((item) =>
          item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-2 text-foreground/80 hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ) : (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
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
    </aside>
  )
}
