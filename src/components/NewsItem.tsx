import type { NewsItem as NewsItemT } from '@/data/news'
import { Markdown } from '@/components/Markdown'

type Props = { item: NewsItemT }

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export function NewsItem({ item }: Props) {
  return (
    <li className="flex gap-3 py-2 text-sm">
      <span className="shrink-0 tabular-nums text-muted-foreground">
        {formatter.format(new Date(item.date))}
      </span>
      <span>
        {item.emoji && (
          <span className="mr-1" aria-hidden>
            {item.emoji}
          </span>
        )}
        <Markdown inline>{item.text}</Markdown>
      </span>
    </li>
  )
}
