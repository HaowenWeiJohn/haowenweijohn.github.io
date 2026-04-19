import { Link } from 'react-router'
import { ExternalLink, Github, Video, FileText } from 'lucide-react'
import type { Project } from '@/data/projects'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'

type Props = { project: Project }

export function ProjectCard({ project }: Props) {
  return (
    <Card className="overflow-hidden pt-0 transition-transform hover:-translate-y-0.5 hover:shadow-md">
      <AspectRatio ratio={16 / 9} className="overflow-hidden bg-muted">
        <img
          src={project.media.src}
          alt={project.media.alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </AspectRatio>

      <CardContent className="pt-4">
        <h3 className="text-base font-semibold leading-snug">
          {project.links?.publication ? (
            <Link to={project.links.publication} className="hover:underline">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{project.blurb}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      {project.links && (
        <CardFooter className="flex flex-wrap gap-3 pt-0 text-xs text-muted-foreground">
          {project.links.paper && (
            <a href={project.links.paper} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
              <FileText className="h-3.5 w-3.5" aria-hidden /> Paper
            </a>
          )}
          {project.links.video && (
            <a href={project.links.video} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
              <Video className="h-3.5 w-3.5" aria-hidden /> Video
            </a>
          )}
          {project.links.code && (
            <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
              <Github className="h-3.5 w-3.5" aria-hidden /> Code
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
              <ExternalLink className="h-3.5 w-3.5" aria-hidden /> Demo
            </a>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
