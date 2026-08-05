import { useEffect, useRef, useState } from "react"
import { WorkDialog } from "@/components/work-dialog"
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

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <>
      <div className="w-7/12">
        <Safari
          url={work.link ?? "localhost:3000"}
          imageSrc={work.images[activeIndex]}
          className="h-full w-full"
          mode="simple"
          onClick={() => setDialogOpen(true)}
        />
      </div>
      <WorkDialog work={work} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}
