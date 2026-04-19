import { AspectRatio } from '@/components/ui/aspect-ratio'

type Props = {
  id: string
  title: string
}

export function YouTubeEmbed({ id, title }: Props) {
  return (
    <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border bg-black">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
        loading="lazy"
      />
    </AspectRatio>
  )
}
