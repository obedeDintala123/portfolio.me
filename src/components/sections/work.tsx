import type { ComponentPropsWithRef } from "react"
import WorkCard from "../work-card"
import project1 from "../../assets/thumbnail/project1.png"
import project1_2 from "../../assets/images/project1-2.png"
import project1_3 from "../../assets/images/project1-3.png"

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

const works: Work[] = [
  {
    id: 1,
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
  {
    id: 2,
    title: "Clothing",
    category: "Landing Page",
    year: "2026",
    images: [`${project1.src}`, `${project1_2.src}`, `${project1_3.src}`],
  },
]

type Props = {
  workRef: React.RefObject<HTMLElement | null>
  trackRef: React.RefObject<HTMLDivElement | null>
} & ComponentPropsWithRef<"section">

export default function WorkSection({ workRef, trackRef, ...props }: Props) {
  return (
    <section
      {...props}
      ref={workRef}
      data-section="work"
      className="relative z-20 h-screen overflow-hidden bg-primary shadow-2xl"
    >
      <div ref={trackRef} className="flex h-full w-max will-change-transform">
        {/* Slide 1 */}
        <div className="flex h-full w-screen shrink-0 items-center justify-center">
          <h1 className="text-[clamp(3rem,12vw,12rem)] font-semibold text-background2">
            Works
          </h1>
        </div>

        {/* Projetos */}
        {works.map((work, index) => (
          <div
            key={work.id}
            className="mt-8 flex h-full w-screen shrink-0 items-center justify-center"
          >
            <WorkCard work={work} index={index} />
          </div>
        ))}
      </div>
    </section>
  )
}
