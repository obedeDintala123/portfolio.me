import { useEffect } from "react"

export function useHeaderThemeSwitch({
  headerRef,
  ready,
}: {
  headerRef: React.RefObject<HTMLElement | null>
  ready: boolean
}) {
  useEffect(() => {
    if (!ready || !headerRef.current) return

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-theme]")
    )
    if (sections.length === 0) return

    const state = new Map<HTMLElement, boolean>(
      sections.map((section) => [section, false])
    )

    function updateHeaderColor() {
      let activeTheme = sections[0].dataset.theme 

      for (const section of sections) {
        if (state.get(section)) {
          activeTheme = section.dataset.theme
        }
      }

      if (headerRef.current) {
        headerRef.current.style.color =
          activeTheme === "dark" ? "#ececd0" : "#171717"
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          state.set(entry.target as HTMLElement, entry.isIntersecting)
        })
        updateHeaderColor()
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    )

    sections.forEach((section) => observer.observe(section))

    // Define o estado inicial (Hero é o padrão ao carregar)
    updateHeaderColor()

    return () => observer.disconnect()
  }, [ready, headerRef])
}
