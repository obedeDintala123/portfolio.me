import type { ComponentPropsWithRef } from "react"
import WorkCard from "../work-card"
import { Button } from "../ui/button"
import { ArrowUpRight } from "lucide-react"

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

const works: Work[] = [
  {
    id: 1,
    title: "Clothing",
    category: "e-commerce",
    type: "video",
    year: "2026",
    video: "/videos/project1.webm",
    link: "https://clothing-alpha-five.vercel.app",
  },
  {
    id: 2,
    title: "Blog",
    category: "blog",
    type: "video",
    year: "2026",
    video: "/videos/project2.webm",
    link: "https://blog-obede.vercel.app",
  },
    {
    id: 3,
    title: "Produtech",
    category: "Management",
    type: "video",
    year: "2026",
    video: "/videos/project3.webm",
    link: "https://produ-tech-6v2s.vercel.app",
  },

      {
    id: 4,
    title: "Yummy - Restaurant",
    category: "Management",
    type: "video",
    year: "2026",
    video: "/videos/project4.webm",
    link: "https://yummy-restaurant-five.vercel.app",
  },
]

type Props = {
  workRef: React.RefObject<HTMLElement | null>
  titleRef: React.RefObject<HTMLHeadingElement | null>
} & ComponentPropsWithRef<"section">

export default function WorkSection({ workRef, titleRef, ...props }: Props) {
  return (
    <section
      {...props}
      ref={workRef}
      data-section="work"
      className="relative z-20 bg-primary shadow-2xl"
      id="works"
    >
      <div className="flex h-screen items-center justify-center">
        <h1
          ref={titleRef}
          className="text-[clamp(3rem,12vw,12rem)] font-semibold text-background2"
        >
          Works
        </h1>
      </div>

      <div className="place-content-center place-items-center px-6 pb-16">
        <div className="grid max-w-400 grid-cols-1 gap-8 md:grid-cols-2">
          {works.map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} />
          ))}
        </div>
      </div>
      <div className="flex justify-center pb-16">
        <Button className="text-background2" variant="link">
          View All
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
