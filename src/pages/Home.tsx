import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import {
  aboutHero,
  aboutBody,
  researchInterests,
  otherInterests,
  featuredProjectSlugs,
} from '@/data/about'
import { news } from '@/data/news'
import { projects } from '@/data/projects'
import { Markdown } from '@/components/Markdown'
import { ProjectCard } from '@/components/ProjectCard'
import { NewsItem } from '@/components/NewsItem'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  const featured = featuredProjectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold">Hello There, I am John</h2>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start">
          <div className="flex-1">
            <Markdown>{aboutHero}</Markdown>
          </div>
          <img
            src="/images/performance.png"
            alt="Haowen performing piano"
            className="h-40 w-auto self-center rounded-md object-cover md:order-2 md:h-48"
            loading="lazy"
          />
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start">
          <img
            src="/images/in-vr.png"
            alt="Haowen in VR"
            className="h-56 w-auto self-center rounded-md object-cover md:h-64"
            loading="lazy"
          />
          <div className="flex-1">
            <Markdown>{aboutBody}</Markdown>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Research Interests
        </h3>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {researchInterests.map((item) => (
            <li
              key={item}
              className="after:ml-3 after:text-muted-foreground after:content-['·'] last:after:content-['']"
            >
              {item}
            </li>
          ))}
        </ul>

        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Other Interests
        </h3>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {otherInterests.map((item) => (
            <li
              key={item}
              className="after:ml-3 after:text-muted-foreground after:content-['·'] last:after:content-['']"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <Separator />

      <section>
        <h3 className="text-lg font-semibold">Featured Projects</h3>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-lg font-semibold">Recent News</h3>
        <ul className="mt-3 divide-y">
          {news.map((item) => (
            <NewsItem key={item.date + item.text.slice(0, 20)} item={item} />
          ))}
        </ul>
      </section>

      <Separator />

      <section className="flex flex-wrap gap-6 text-sm">
        <Link
          to="/publications"
          className="inline-flex items-center gap-1 hover:underline"
        >
          See all publications <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1 hover:underline"
        >
          See all projects <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>
    </div>
  )
}
