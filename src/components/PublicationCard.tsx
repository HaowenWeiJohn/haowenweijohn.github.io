import type { ComponentType, SVGProps } from 'react'
import { ExternalLink, FileText, Video, Database, Presentation, BookOpen } from 'lucide-react'
import { GitHubIcon } from '@/components/BrandIcons'
import type { Publication } from '@/data/publications'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Markdown } from '@/components/Markdown'

type Props = { pub: Publication }
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

const linkButtons: Array<{
  key: keyof NonNullable<Publication['links']>
  label: string
  Icon: IconComponent
}> = [
  { key: 'pdf',      label: 'PDF',     Icon: FileText as IconComponent },
  { key: 'arxiv',    label: 'arXiv',   Icon: BookOpen as IconComponent },
  { key: 'video',    label: 'Video',   Icon: Video as IconComponent },
  { key: 'code',     label: 'Code',    Icon: GitHubIcon },
  { key: 'dataset',  label: 'Dataset', Icon: Database as IconComponent },
  { key: 'slides',   label: 'Slides',  Icon: Presentation as IconComponent },
  { key: 'external', label: 'Venue',   Icon: ExternalLink as IconComponent },
]

export function PublicationCard({ pub }: Props) {
  const titleHref = pub.links?.pdf ?? pub.links?.external

  return (
    <article
      id={pub.slug}
      className="scroll-mt-24 flex flex-col gap-4 border-b py-6 first:pt-0 last:border-b-0 md:flex-row"
    >
      <div className="w-full shrink-0 md:w-56">
        <AspectRatio
          ratio={16 / 9}
          className="overflow-hidden rounded-md bg-muted"
        >
          {pub.teaser && (
            <img
              src={pub.teaser}
              alt=""
              loading="lazy"
              className="h-full w-full object-contain"
            />
          )}
        </AspectRatio>
      </div>

      <div className="flex-1">
        <header className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold leading-snug">
            {titleHref ? (
              <a
                href={titleHref}
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

        <div className="mt-1 text-sm italic text-muted-foreground">
          <Markdown inline>{pub.venue}</Markdown>
        </div>
        <div className="mt-0.5 text-sm text-muted-foreground">
          <Markdown inline>{pub.authors}</Markdown>
        </div>

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
      </div>
    </article>
  )
}
