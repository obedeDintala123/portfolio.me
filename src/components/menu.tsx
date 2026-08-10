import { useEffect } from "react"
import { X } from "lucide-react"

type NavLink = {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function MenuOverlay({ open, onOpenChange }: Props) {
  // Fecha com Escape
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  // Bloqueia o scroll da página enquanto o menu está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleLinkClick = (href: string) => {
    onOpenChange(false)
    // pequeno delay para deixar o overlay começar a fechar antes do scroll
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }, 150)
  }

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 flex flex-col bg-background2 text-foreground transition-transform duration-500 ease-in-out ${
        open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Botão fechar */}
      <div className="flex items-center justify-end px-6 py-6 md:px-12">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Fechar menu"
          className="flex h-10 w-10 items-center justify-center"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-1 flex-col items-center justify-center gap-6">
        {navLinks.map((link) => (
          <button
            key={link.href}
            type="button"
            onClick={() => handleLinkClick(link.href)}
            className="text-[clamp(2rem,6vw,4rem)] font-semibold text-foreground  transition-opacity hover:opacity-60"
          >
            {link.label}
          </button>
        ))}
      </nav>
    </div>
  )
}