import { AnimationSplash } from "@/components/gsap-animations"
import { useSplashAnimation } from "@/hooks/use-splash-animation"

interface SplashProps {
  onComplete?: () => void
  duration?: number
}

export default function Splash({ onComplete, duration = 2 }: SplashProps) {
  const { progress, hidden, containerRef, circleRef } = useSplashAnimation({
    duration,
    onComplete,
  })

  if (hidden) return null

  return (
    <div
      ref={containerRef}
      className="sticky inset-0 z-50 min-h-screen flex items-center justify-center bg-background2 pointer-events-none"
    >
      <AnimationSplash ref={circleRef} progress={progress} />
    </div>
  )
}