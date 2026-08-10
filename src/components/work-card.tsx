import { ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
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
  const cardVideoRef = React.useRef<HTMLVideoElement>(null)
  const drawerVideoRef = React.useRef<HTMLVideoElement>(null)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const cover = work.images[0]
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

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // Autoplay do vídeo dentro do drawer, quando abre
  React.useEffect(() => {
    if (drawerOpen) {
      drawerVideoRef.current?.play()
    }
  }, [drawerOpen])

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Card className="group cursor-pointer gap-3 overflow-hidden border-none bg-transparent p-0 shadow-none">
          <CardContent className="p-0">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-4/3 w-full place-content-center place-items-center overflow-hidden rounded-2xl bg-[#212121] p-4 md:p-8"
            >
              {isVideo ? (
                <video
                  ref={cardVideoRef}
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

              <span className="absolute top-3 left-3 rounded-full bg-background2/80 px-3 py-1 text-xs font-medium tracking-wide text-foreground uppercase backdrop-blur-sm">
                {work.type}
              </span>

              {work.link && (
                <a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  aria-label={`Abrir ${work.title} numa nova aba`}
                  className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-background2/80 text-foreground backdrop-blur-sm transition-transform duration-300 hover:scale-110"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <h3 className="text-base font-medium text-background2">
                {work.title}
              </h3>
              <span className="text-sm text-background2">{work.year}</span>
            </div>
          </CardContent>
        </Card>
      </DrawerTrigger>

      <DrawerContent className="max-h-[92vh]">
        <div className="mx-auto flex w-full max-w-3xl flex-col overflow-y-auto px-6 pb-8">
          <div className="aspect-4/3 w-full place-content-center place-items-center overflow-hidden rounded-2xl bg-[#212121] p-4 md:p-8">
            {isVideo ? (
              <video
                ref={drawerVideoRef}
                src={work.video}
                poster={cover}
                loop
                muted
                playsInline
                className="w-full rounded-md object-cover"
              />
            ) : (
              <img src={cover} alt={work.title} className="rounded-md" />
            )}
          </div>

          {/* Informações, por baixo */}
          <div className="flex flex-col gap-4 pt-6">
            <DrawerHeader className="p-0 text-left">
              <DrawerTitle className="text-2xl font-semibold">
                {work.title}
              </DrawerTitle>
              <DrawerDescription className="text-xs tracking-widest uppercase">
                {work.category} — {work.year}
              </DrawerDescription>
            </DrawerHeader>

            {work.description && (
              <p className="text-sm leading-relaxed">{work.description}</p>
            )}

            {work.technologies && work.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {work.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {work.link && (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-sm bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-80"
              >
                Open
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
