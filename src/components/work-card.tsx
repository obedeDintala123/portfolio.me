import { Card, CardContent } from "@/components/ui/card"

import React from "react"

type Work = {
  id: number
  title: string
  type?: "video" | "image"
  video?: string
  category: string
  year: string
  image?: string
  description?: string
  technologies?: string[]
  link?: string
}

type Props = {
  work: Work
  index: number
}

export default function WorkCard({ work }: Props) {
  const cardVideoRef = React.useRef<HTMLVideoElement>(null)

  const isVideo = work.type === "video" && work.video

  const handleMouseEnter = () => {
    cardVideoRef.current?.play()
  }

  const handleMouseLeave = () => {
    const video = cardVideoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  const handleLink = (url: string | undefined) => {
    window.open(url, "_blank")
  }

  return (
    <Card className="group cursor-pointer gap-3 overflow-hidden border-none bg-transparent p-0 shadow-none">
      <CardContent className="p-0">
        <div
          onClick={() => handleLink(work.link)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}

          className="relative aspect-4/3 w-full place-content-center place-items-center overflow-hidden rounded-2xl bg-[#212121] p-4 md:p-8"
        >
          {isVideo ? (
            <video
              ref={cardVideoRef}
              src={work.video}
              loop
              muted
              playsInline
              preload="auto"
              className="w-full rounded-md object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <img
              src={work.image}
              alt={work.title}
              loading="lazy"
              className="rounded-md transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-base font-medium text-background2">
            {work.title}
          </h3>
          <span className="text-sm text-background2">{work.category}</span>
        </div>
      </CardContent>
    </Card>
  )
}
