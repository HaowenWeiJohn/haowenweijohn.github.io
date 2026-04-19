import { publications } from '@/data/publications'
import { site } from '@/data/site'
import { PublicationCard } from '@/components/PublicationCard'

export default function Publications() {
  const sorted = [...publications].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      <header>
        <h2 className="text-2xl font-bold">Publications</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          For more, see my{' '}
          <a
            href={site.socials.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            Google Scholar
          </a>
          . <span className="italic">* denotes equal contribution.</span>
        </p>
      </header>

      <div className="mt-8">
        {sorted.map((pub) => (
          <PublicationCard key={pub.slug} pub={pub} />
        ))}
      </div>
    </div>
  )
}
