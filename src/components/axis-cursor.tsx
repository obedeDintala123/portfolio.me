"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";

interface AxisCursorProps {
  verticalColor?: string;
  verticalThickness?: number;
  horizontalColor?: string;
  horizontalThickness?: number;
  dotColor?: string;
  dotSize?: number;
  dotDisabled?: boolean;
  showPosition?: boolean;
  labelMode?: "position" | "custom";
  labelText?: string;
  labelFont?: CSSProperties;
  labelColor?: string;
  labelBg?: string;
  labelPaddingX?: number;
  labelPaddingY?: number;
  labelRadius?: number;
  className?: string;
}

export default function AxisCursor({
  verticalColor = "white",
  verticalThickness = 1,
  horizontalColor = "white",
  horizontalThickness = 1,
  dotColor = "#19FA2F",
  dotSize = 12,
  dotDisabled = false,
  showPosition = true,
  labelMode = "position",
  labelText = "Aim",
  labelFont = {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "1.5em",
    letterSpacing: "0em",
    textAlign: "left",
  },
  labelColor = "#000000",
  labelBg = "#ffffff",
  labelPaddingX = 6,
  labelPaddingY = 4,
  labelRadius = 1,
  className = "",
}: AxisCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineVRef = useRef<HTMLDivElement>(null);
  const lineHRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const lineV = lineVRef.current;
    const lineH = lineHRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!container || !lineV || !lineH) return;

    const quickConf = { duration: 0.15, ease: "power2.out" };
    const moveLineV = gsap.quickTo(lineV, "left", quickConf);
    const moveLineH = gsap.quickTo(lineH, "top", quickConf);
    const moveDotX = dot ? gsap.quickTo(dot, "left", quickConf) : null;
    const moveDotY = dot ? gsap.quickTo(dot, "top", quickConf) : null;
    const moveLabelX = label ? gsap.quickTo(label, "left", quickConf) : null;
    const moveLabelY = label ? gsap.quickTo(label, "top", quickConf) : null;

    const fadeConf = { duration: 0.2, ease: "power1.inOut", overwrite: "auto" as const };

    let isInside = false;
    let hasValidPosition = false;
    let isVisible = false;

    const targets = [lineV, lineH, dot, label].filter(Boolean) as HTMLDivElement[];

    const setVisible = (visible: boolean) => {
      if (visible === isVisible) return;
      isVisible = visible;
      gsap.to(targets, { opacity: visible ? 1 : 0, ...fadeConf });
    };

    const updatePosition = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const mouseInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      hasValidPosition = true;

      moveLineV(x);
      moveLineH(y);
      moveDotX?.(x);
      moveDotY?.(y);
      moveLabelX?.(x);
      moveLabelY?.(y);

      if (showPosition && label) {
        label.textContent =
          labelMode === "custom" ? labelText : `X: ${Math.round(x)}  Y: ${Math.round(y)}`;
      }

      const wasInside = isInside;
      isInside = mouseInside;
      const shouldBeVisible = isInside && hasValidPosition;
      if (wasInside !== isInside || shouldBeVisible !== isVisible) {
        setVisible(shouldBeVisible);
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      if (touch) updatePosition(touch.clientX, touch.clientY);
    };
    const handleMouseEnter = () => {
      isInside = true;
      setVisible(hasValidPosition);
    };
    const handleMouseLeave = () => {
      isInside = false;
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(targets);
    };
  }, [showPosition, labelMode, labelText]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden cursor-none ${className}`}
    >
      <div
        ref={lineVRef}
        className="pointer-events-none absolute top-0 h-screen opacity-0 -translate-x-1/2"
        style={{ width: verticalThickness, backgroundColor: verticalColor }}
      />
      <div
        ref={lineHRef}
        className="pointer-events-none absolute left-0 w-screen opacity-0 -translate-y-1/2"
        style={{ height: horizontalThickness, backgroundColor: horizontalColor }}
      />
      {!dotDisabled && (
        <div
          ref={dotRef}
          className="pointer-events-none absolute opacity-0 p-2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent border border-black"
          style={{ width: dotSize, height: dotSize}}
        >
          <div className="bg-background2 w-4 h-4 p-2"></div>
        </div>
      )}
      {showPosition && (
        <div
          ref={labelRef}
          className="pointer-events-none absolute whitespace-nowrap opacity-0 leading-none translate-x-3 translate-y-3"
          style={{
            color: labelColor,
            padding: `${labelPaddingY}px ${labelPaddingX}px`,
            borderRadius: labelRadius,
          }}
        />
      )}
    </div>
  );
}