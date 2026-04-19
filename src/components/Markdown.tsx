import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

type Props = {
  children: string
  className?: string
  inline?: boolean
}

const blockComponents: Components = {
  a: ({ href, children }) => {
    const isExternal = /^https?:\/\//.test(href ?? '')
    return (
      <a
        href={href}
        className="text-[color:var(--accent)] underline-offset-2 hover:underline"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  },
}

const inlineComponents: Components = {
  ...blockComponents,
  p: ({ children }) => <>{children}</>,
}

export function Markdown({ children, className, inline = false }: Props) {
  const rendered = (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={inline ? inlineComponents : blockComponents}
    >
      {children}
    </ReactMarkdown>
  )

  if (inline) {
    return <span className={className}>{rendered}</span>
  }

  return (
    <div
      className={cn(
        'prose prose-stone max-w-none',
        'prose-p:leading-relaxed prose-p:my-3',
        'prose-li:my-1',
        'prose-headings:font-semibold',
        className,
      )}
    >
      {rendered}
    </div>
  )
}
