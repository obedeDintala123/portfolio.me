import React, { useEffect } from "react"
import { Equal } from "lucide-react"
import AxisCursor from "../axis-cursor"
import MenuOverlay from "../menu"

type HeroProps = {
  isLoading: boolean
  headerRef: React.RefObject<HTMLHeadElement | null>
  heroRef: React.RefObject<HTMLDivElement | null>
  builtRef: React.RefObject<HTMLHeadingElement | null>
  nameRef: React.RefObject<HTMLElement | null>
  poweredRef: React.RefObject<HTMLHeadingElement | null>
}

export default function HeroSection({
  isLoading = true,
  headerRef,
  builtRef,
  heroRef,
  nameRef,
  poweredRef,
}: HeroProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)

  useEffect(() => {
    if (isLoading) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }
  }, [isLoading])

  return (
    <div id="home" className="relative">
      <header
        ref={headerRef}
        className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-colors duration-300 sm:px-8 sm:py-8 md:px-12"
      >
        <a href="/">
          <h1 className="text-2xl uppercase">OD</h1>
        </a>
        <button onClick={() => setMenuOpen(true)}>
          <Equal className="size-8" />
        </button>
      </header>
      <div
        ref={heroRef}
        data-theme="light"
        className="relative min-h-screen overflow-hidden bg-background2 px-6 sm:px-8 md:px-12"
      >
        <AxisCursor
          verticalColor="#000000"
          horizontalColor="#000000"
          dotColor="#000000"
          labelMode="custom"
          labelText="Creative Developer"
          className="absolute inset-0 z-10"
        />
        <main>
          <div className="absolute bottom-18 md:bottom-10 left-0 w-full px-6 sm:px-8 md:px-12">
            <h1
              ref={builtRef}
              className="text-[clamp(1.5rem,5vw,7.25rem)] font-medium"
            >
              Built for people.
            </h1>
            <div className="flex flex-col-reverse justify-between md:flex-row md:items-center">
              <span ref={nameRef} className="uppercase">
                Obede Dintala | Frontend Developer
              </span>
              <h1
                ref={poweredRef}
                className="text-[clamp(0.5rem,5vw,5.3125rem)] font-medium"
              >
                Powered by code.
              </h1>
            </div>
          </div>
        </main>
      </div>
      <MenuOverlay open={menuOpen} onOpenChange={setMenuOpen} />
    </div>
  )
}
