"use client"

import { forwardRef } from "react"
import { SIZE, STROKE, RADIUS, CIRCUMFERENCE } from "@/hooks/use-splash-animation"

interface AnimationSplashProps {
  progress: number
}

export const AnimationSplash = forwardRef<
  SVGCircleElement,
  AnimationSplashProps
>(function AnimationSplash({ progress }, circleRef) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: SIZE, height: SIZE }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 -rotate-90"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          className="stroke-primary/15"
        />
        <circle
          ref={circleRef}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          className="stroke-primary"
        />
      </svg>

      <span className="font-sprira text-4xl font-semibold text-primary">
        {progress}
      </span>
      <span className="text-xl">%</span>
    </div>
  )
})