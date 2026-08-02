import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

export const SIZE = 160
export const STROKE = 3
export const RADIUS = (SIZE - STROKE) / 2
export const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface UseSplashAnimationParams {
  duration?: number
  onComplete?: () => void
}

// Toda a timeline, o contador e o fade out vivem aqui.
// Splash.tsx só chama esse hook e recebe o resultado pronto.
export function useSplashAnimation({
  duration = 5,
  onComplete,
}: UseSplashAnimationParams) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)

  const durationRef = useRef(duration)
  const onCompleteRef = useRef(onComplete)
  durationRef.current = duration
  onCompleteRef.current = onComplete

  useGSAP(
    () => {
      const counter = { value: 0 }
      const tl = gsap.timeline()

      tl.to(counter, {
        value: 100,
        duration: durationRef.current,
        ease: "power2.out",
        onUpdate: () => {
          const v = counter.value
          setProgress(Math.round(v))
          if (circleRef.current) {
            circleRef.current.style.strokeDashoffset = String(
              CIRCUMFERENCE * (1 - v / 100)
            )
          }
        },
      }).to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        delay: 0.3,
        onComplete: () => {
          setHidden(true)
          onCompleteRef.current?.()
        },
      })
    },
    { scope: containerRef }
  )

  return { progress, hidden, containerRef, circleRef }
}