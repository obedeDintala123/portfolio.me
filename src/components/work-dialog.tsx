import { useEffect, useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Safari } from "./ui/safari"

type Work = {
  id: number
  title: string
  category: string
  year: string
  images: string[]
  description?: string
  technologies?: string[]
  link?: string
}

export function WorkDialog({
  work,
  open,
  onOpenChange,
}: {
  work: Work
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slides = work.images

  function startAutoplay() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (slides.length <= 1) return
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 2500)
  }

  useEffect(() => {
    if (open) {
      setActiveIndex(0)
      startAutoplay()
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-none p-0 sm:max-w-6xl">
        <div className="flex flex-col sm:flex-row">
          {/* Carrossel */}
          <div className="w-7/12 p-8">
            <Safari
              url={work.link ?? "localhost:3000"}
              imageSrc={work.images[activeIndex]}
              className="h-full w-full"
              mode="simple"
            />
          </div>
          {/* Informações */}
          <div className="flex flex-1 flex-col gap-4 p-6 sm:w-1/2">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                {work.title}
              </DialogTitle>
              <DialogDescription className="text-xs tracking-widest uppercase">
                {work.category} — {work.year}
              </DialogDescription>
            </DialogHeader>

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
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-sm bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-80"
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
      </DialogContent>
    </Dialog>
  )
}
