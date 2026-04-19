import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'

export default function Projects() {
  return (
    <div>
      <header>
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Click any card for more details on the publication page.
        </p>
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  )
}
