import { music, musicIntro } from '@/data/music'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { Markdown } from '@/components/Markdown'
import { Separator } from '@/components/ui/separator'

export default function Music() {
  return (
    <div>
      <header>
        <h2 className="text-2xl font-bold">Music</h2>
      </header>

      <div className="mt-6">
        <Markdown>{musicIntro}</Markdown>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {music.map((item, i) => (
          <section key={item.youtubeId}>
            {i > 0 && <Separator className="mb-8" />}
            <h3 className="text-base font-semibold">{item.title}</h3>
            {item.context && (
              <p className="mt-0.5 text-xs italic text-muted-foreground">
                {item.context}
              </p>
            )}
            <div className="mt-3">
              <YouTubeEmbed id={item.youtubeId} title={item.title} />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
