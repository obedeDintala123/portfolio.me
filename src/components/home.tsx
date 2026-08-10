import React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import meImage from "../assets/images/me.png"
import Splash from "./splash"
import {
  AboutSection,
  HeroSection,
  SkillsGravitySection,
  WorkSection,
} from "./sections"
import { useHeaderThemeSwitch, useHomeAnimations } from "./gsap-animations"
import Footer from "./footer"

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(true)

  const heroRef = React.useRef<HTMLDivElement>(null)

  const headerRef = React.useRef<HTMLElement>(null)

  const builtRef = React.useRef<HTMLHeadingElement>(null)

  const poweredRef = React.useRef<HTMLHeadingElement>(null)

  const nameRef = React.useRef<HTMLSpanElement>(null)

  const workRef = React.useRef<HTMLElement>(null)

  const workTitleRef = React.useRef<HTMLHeadingElement>(null)

  const aboutSkillsWrapperRef = React.useRef<HTMLDivElement>(null)

  useHomeAnimations({
    heroRef,

    headerRef,
    builtRef,
    poweredRef,
    nameRef,

    workRef,
    workTitleRef,

    aboutSkillsWrapperRef,

    ready: !isLoading,
  })

  useHeaderThemeSwitch({ headerRef, ready: !isLoading })

  React.useEffect(() => {
    if (isLoading) return

    const imgs = Array.from(document.images)
    const pending = imgs.filter((img) => !img.complete)

    if (pending.length === 0) {
      ScrollTrigger.refresh()
      return
    }

    let remaining = pending.length
    const onImgLoad = () => {
      remaining -= 1
      if (remaining === 0) {
        ScrollTrigger.refresh()
      }
    }

    pending.forEach((img) =>
      img.addEventListener("load", onImgLoad, { once: true })
    )

    const fallback = setTimeout(() => ScrollTrigger.refresh(), 2000)

    return () => {
      pending.forEach((img) => img.removeEventListener("load", onImgLoad))
      clearTimeout(fallback)
    }
  }, [isLoading])

  if (isLoading) {
    return <Splash onComplete={() => setIsLoading(false)} />
  }

  return (
    <main className="relative overflow-x-hidden overflow-y-visible">
      <HeroSection
        isLoading={isLoading}
        heroRef={heroRef}
        headerRef={headerRef}
        builtRef={builtRef}
        poweredRef={poweredRef}
        nameRef={nameRef}
      />

      <WorkSection
        workRef={workRef}
        titleRef={workTitleRef}
        data-theme="dark"
      />

      <div
        ref={aboutSkillsWrapperRef}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${meImage.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="relative z-10"
      >
        <AboutSection data-theme="dark" />
        <SkillsGravitySection />
        <Footer />
      </div>
    </main>
  )
}