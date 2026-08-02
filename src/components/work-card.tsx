import { useEffect, useRef, useState } from "react"
import { WorkDialog } from "@/components/work-dialog"

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

export default function WorkCard({
  work,
  index,
}: {
  work: Work
  index: number
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slides = work.images

  function handleEnter() {
    if (slides.length <= 1) return
    setIsHovering(true)
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 2000)
  }

  function handleLeave() {
    setIsHovering(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    setActiveIndex(0)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <>
      <div
        className="group relative h-[80vh] w-[90vw] shrink-0 cursor-pointer overflow-hidden rounded-sm ring-1 ring-white/10 sm:w-[80vw]"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={() => setDialogOpen(true)}
      >
        {slides.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={work.title}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover grayscale-40 transition-opacity duration-500 ease-out group-hover:grayscale-0 ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            } ${isHovering ? "" : "group-hover:scale-105"}`}
          />
        ))}

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

        <span className="absolute top-6 left-6 font-mono text-sm text-white/60">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between p-6">
          <div>
            <p className="mb-1 text-xs tracking-widest text-white/60 uppercase">
              {work.category} — {work.year}
            </p>
            <h3 className="text-2xl font-semibold text-white">{work.title}</h3>
          </div>

          <span className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        </div>
      </div>

      <WorkDialog work={work} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}
