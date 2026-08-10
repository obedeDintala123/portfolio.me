import type { ComponentPropsWithRef } from "react"
import WorkCard from "../work-card"
import project1 from "../../assets/thumbnail/project1.png"
import project1_2 from "../../assets/images/project1-2.png"
import project1_3 from "../../assets/images/project1-3.png"
import { Button } from "../ui/button"
import { ArrowUpRight } from "lucide-react"

type Work = {
  id: number
  title: string
  type?: "video" | "image"
  video?: string
  category: string
  year: string
  images: string[]
  description?: string
  technologies?: string[]
  link?: string
}

const works: Work[] = [
  {
    id: 1,
    title: "Clothing",
    category: "Landing Page",
    type: "video",
    video: "/videos/video1.webm",
    year: "2026",
    images: [`${project1.src}`, `${project1_2.src}`, `${project1_3.src}`],
    description:
      "Clothing e-commerce site built around an immersive shopping experience. Features interactive 3D product views (Three.js), pinned scroll-driven sections (GSAP), a product carousel with pricing and details, and a 'try it on' virtual preview before purchase. Built with Next.js and Tailwind, with cart and authentication support.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Three.js",
      "shadcn/ui",
    ],
    link: "https://clothing-alpha-five.vercel.app",
  },

  {
    id: 2,
    title: "Clothing",
    type: "video",
    category: "Landing Page",
    year: "2026",
    images: [`${project1.src}`, `${project1_2.src}`, `${project1_3.src}`],
    description:
      "Clothing e-commerce site built around an immersive shopping experience. Features interactive 3D product views (Three.js), pinned scroll-driven sections (GSAP), a product carousel with pricing and details, and a 'try it on' virtual preview before purchase. Built with Next.js and Tailwind, with cart and authentication support.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Three.js",
      "shadcn/ui",
    ],
    link: "https://clothing-alpha-five.vercel.app",
  },

  {
    id: 3,
    title: "Clothing",
    category: "Landing Page",
    year: "2026",
    images: [`${project1.src}`, `${project1_2.src}`, `${project1_3.src}`],
    description:
      "Clothing e-commerce site built around an immersive shopping experience. Features interactive 3D product views (Three.js), pinned scroll-driven sections (GSAP), a product carousel with pricing and details, and a 'try it on' virtual preview before purchase. Built with Next.js and Tailwind, with cart and authentication support.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Three.js",
      "shadcn/ui",
    ],
    link: "https://clothing-alpha-five.vercel.app",
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

      <div className="px-6 pb-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
