"use client"

import React from "react"

import Splash from "./splash"
import { AboutSection, HeroSection, SkillSection, WorkSection } from "./sections"
import { useHeaderThemeSwitch, useHomeAnimations } from "./gsap-animations"

export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(true)

  const heroRef = React.useRef<HTMLDivElement>(null)

  const headerRef = React.useRef<HTMLElement>(null)

  const builtRef = React.useRef<HTMLHeadingElement>(null)

  const poweredRef = React.useRef<HTMLHeadingElement>(null)

  const nameRef = React.useRef<HTMLSpanElement>(null)

  const workRef = React.useRef<HTMLElement>(null)

  const trackRef = React.useRef<HTMLDivElement>(null)

  useHomeAnimations({
    heroRef,

    headerRef,
    builtRef,
    poweredRef,
    nameRef,

    workRef,
    trackRef,

    ready: !isLoading,
  })

  useHeaderThemeSwitch({ headerRef, ready: !isLoading })

  if (isLoading) {
    return <Splash onComplete={() => setIsLoading(false)} />
  }

  return (
    <main className="relative overflow-x-hidden">
      <HeroSection
        isLoading={isLoading}
        heroRef={heroRef}
        headerRef={headerRef}
        builtRef={builtRef}
        poweredRef={poweredRef}
        nameRef={nameRef}
      />

      <WorkSection workRef={workRef} trackRef={trackRef} data-theme="dark" />

      <AboutSection />

      <SkillSection />
    </main>
  )
}
