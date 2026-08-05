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

  aboutSkillsWrapperRef: React.RefObject<HTMLDivElement | null>

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

  aboutSkillsWrapperRef,

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
        !trackRef.current ||
        !aboutSkillsWrapperRef.current
      ) {
        return
      }

      const hero = heroRef.current
      const work = workRef.current
      const track = trackRef.current
      const aboutSkillsWrapper = aboutSkillsWrapperRef.current

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

      // 🔧 FIX: distance calculado dentro de funções, não uma vez só.
      // Isto permite que invalidateOnRefresh recalcule os valores reais
      // sempre que ScrollTrigger.refresh() correr (ex: depois das imagens
      // do WorkSection carregarem e track.scrollWidth mudar).
      const getDistance = () => track.scrollWidth - work.clientWidth

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: work,
          start: "top top",
          end: () => "+=" + getDistance(),
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      //--------------------------------------
      // About / Skills snap
      //--------------------------------------
      // O wrapper contém 2 secções (About, Skills), cada uma com h-screen.
      // snapTo é fracionário: 1 / (nº de secções - 1) = 1 passo entre as duas.
      // Sem "pin" — o scroll continua a ser o da página, isto só faz o
      // scroll "encaixar" quando o utilizador solta dentro desta zona.

      const aboutSkillsSections =
        aboutSkillsWrapper.children.length > 0
          ? aboutSkillsWrapper.children.length
          : 1

      ScrollTrigger.create({
        trigger: aboutSkillsWrapper,
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: 1 / (aboutSkillsSections - 1 || 1),
          duration: { min: 0.4, max: 1 },
          delay: 0.15,
          ease: "power2.inOut",
          inertia: true,
        },
      })

      ScrollTrigger.refresh()
    },
    {
      dependencies: [ready],
    }
  )
}
