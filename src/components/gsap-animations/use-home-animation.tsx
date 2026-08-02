import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type HomeAnimationsProps = {
  heroRef: React.RefObject<HTMLDivElement | null>

  headerRef: React.RefObject<HTMLElement | null>
  builtRef: React.RefObject<HTMLHeadingElement | null>
  poweredRef: React.RefObject<HTMLHeadingElement | null>
  nameRef: React.RefObject<HTMLSpanElement | null>

  workRef: React.RefObject<HTMLElement | null>
  trackRef: React.RefObject<HTMLDivElement | null>

  ready: boolean
}

export function useHomeAnimations({
  heroRef,

  headerRef,
  builtRef,
  poweredRef,
  nameRef,

  workRef,
  trackRef,

  ready,
}: HomeAnimationsProps) {
  useGSAP(
    () => {
      if (!ready) return

      if (
        !heroRef.current ||
        !headerRef.current ||
        !builtRef.current ||
        !poweredRef.current ||
        !nameRef.current ||
        !workRef.current ||
        !trackRef.current
      ) {
        return
      }

      const hero = heroRef.current
      const work = workRef.current
      const track = trackRef.current

      //--------------------------------------
      // Intro
      //--------------------------------------

      const intro = gsap.timeline()

      intro
        .from(headerRef.current, {
          y: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          builtRef.current,
          {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .from(
          nameRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.7"
        )
        .from(
          poweredRef.current,
          {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.8"
        )

      //--------------------------------------
      // Hero
      //--------------------------------------

      gsap.to(hero, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: `bottom center`,
          scrub: true,
          pinSpacing: false,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      //--------------------------------------
      // Horizontal
      //--------------------------------------

      const distance = track.scrollWidth - work.clientWidth

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: work,
          start: "top top",
          end: `+=${distance}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      ScrollTrigger.refresh()
    },
    {
      dependencies: [ready],
    }
  )
}
