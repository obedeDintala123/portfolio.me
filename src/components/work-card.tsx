import { ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import React from "react"

type Work = {
  id: number
  title: string
  category: string
  year: string
  images: string[]
  type: "video" | "image"
  video?: string
  description?: string
  technologies?: string[]
  link?: string
}

type Props = {
  work: Work
  index: number
}

export default function WorkCard({ work }: Props) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const cover = work.images[0]
  const isVideo = work.type === "video" && work.video

  const handleMouseEnter = () => {
    videoRef.current?.play()
  }

  const handleMouseLeave = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  return (
    <Card className="group cursor-pointer gap-3 overflow-hidden border-none bg-transparent p-0 shadow-none">
      <CardContent className="p-0">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative aspect-4/2 w-full place-content-center place-items-center overflow-hidden rounded-2xl bg-[#212121] p-8"
        >
          {/* Capa */}
          {isVideo ? (
            <video
              ref={videoRef}
              src={work.video}
              poster={cover}
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-md object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <img
              src={cover}
              alt={work.title}
              className="rounded-md transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Type badge */}
          <span className="absolute top-3 left-3 rounded-full bg-background2/80 text-foreground px-3 py-1 text-xs font-medium tracking-wide uppercase backdrop-blur-sm">
            {work.type}
          </span>

          {/* Link icon */}
          {work.link && (
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${work.title} numa nova aba`}
              className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-background2/80 text-foreground backdrop-blur-sm transition-transform duration-300 hover:scale-110"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Nome + ano */}
        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-base font-medium text-background2">
            {work.title}
          </h3>
          <span className="text-sm text-background2">{work.year}</span>
        </div>
      </CardContent>
    </Card>
  )
}
