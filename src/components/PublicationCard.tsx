import { ExternalLink, FileText, Github, Video, Database, Presentation } from 'lucide-react'
import type { Publication } from '@/data/publications'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Markdown } from '@/components/Markdown'

type Props = { pub: Publication }

const linkButtons: Array<{
  key: keyof NonNullable<Publication['links']>
  label: string
  Icon: typeof FileText
}> = [
  { key: 'pdf',      label: 'PDF',     Icon: FileText },
  { key: 'video',    label: 'Video',   Icon: Video },
  { key: 'code',     label: 'Code',    Icon: Github },
  { key: 'dataset',  label: 'Dataset', Icon: Database },
  { key: 'slides',   label: 'Slides',  Icon: Presentation },
  { key: 'external', label: 'Venue',   Icon: ExternalLink },
]

export function PublicationCard({ pub }: Props) {
  return (
    <article
      id={pub.slug}
      className="scroll-mt-24 border-b py-6 first:pt-0 last:border-b-0"
    >
      <header className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold leading-snug">
          {pub.links?.pdf || pub.links?.external ? (
            <a
              href={pub.links.pdf ?? pub.links.external}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {pub.title}
            </a>
          ) : (
            pub.title
          )}
        </h3>
        <Badge variant="secondary" className="shrink-0">
          {pub.year}
        </Badge>
      </header>

      <div className="mt-1 text-sm text-muted-foreground">
        <Markdown inline>{pub.authors}</Markdown>
      </div>
      <div className="mt-0.5 text-sm italic text-muted-foreground">
        <Markdown inline>{pub.venue}</Markdown>
      </div>

      <p className="mt-3 text-sm leading-relaxed">{pub.abstract}</p>

      {pub.links && (
        <div className="mt-3 flex flex-wrap gap-2">
          {linkButtons.map(({ key, label, Icon }) => {
            const href = pub.links?.[key]
            if (!href) return null
            return (
              <Button
                key={key}
                asChild
                variant="outline"
                size="sm"
                className="h-7 gap-1 text-xs"
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </a>
              </Button>
            )
          })}
        </div>
      )}
    </article>
  )
}
