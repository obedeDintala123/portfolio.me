const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/moreira_dintala",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.16.5.49.9 1.11 1.16 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.16 1.77 4.9 4.9 0 0 1-1.77 1.16c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.16-1.77a4.9 4.9 0 0 1 1.77-1.16c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.72.36-1.03.67-.31.31-.51.61-.67 1.03-.12.31-.26.78-.3 1.65C4.26 8.51 4.25 8.83 4.25 11.5v1c0 2.67.01 2.99.06 4.04.04.87.18 1.34.3 1.65.16.42.36.72.67 1.03.31.31.61.51 1.03.67.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.3.42-.16.72-.36 1.03-.67.31-.31.51-.61.67-1.03.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.87-.18-1.34-.3-1.65a2.78 2.78 0 0 0-.67-1.03 2.78 2.78 0 0 0-1.03-.67c-.31-.12-.78-.26-1.65-.3C14.99 3.81 14.67 3.8 12 3.8Zm0 3.05a5.15 5.15 0 1 1 0 10.3 5.15 5.15 0 0 1 0-10.3Zm0 1.8a3.35 3.35 0 1 0 0 6.7 3.35 3.35 0 0 0 0-6.7Zm5.35-1.98a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
      </svg>
    ),
  },

  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/obede-dintala",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M6.94 5.5a2.44 2.44 0 1 1-4.88 0 2.44 2.44 0 0 1 4.88 0ZM2.4 8.9h4.28V21H2.4V8.9Zm7.13 0h4.1v1.66h.06c.57-1.08 1.97-2.22 4.05-2.22 4.33 0 5.13 2.85 5.13 6.56V21h-4.28v-5.34c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21H9.53V8.9Z" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: "mailto:obededintala@gmail.com",
    width: true,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </svg>
    ),
  },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
    id="contact"
      data-theme="dark"
      className="flex min-h-screen items-end justify-center bg-[#060508] px-6 sm:px-8 md:px-12 py-4 sm:py-8 text-background2"
    >
      <div className="w-full space-y-24">
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-lg">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-background2 text-xs">
              ©
            </span>
            <span>2026</span>
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-4"
          >
            <span className="font-medium tracking-wide">BACK TO TOP</span>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background2 transition-colors group-hover:bg-background2/80">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#09090b"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-light tracking-wide md:text-2xl">
              HAVE A PROJECT IN MIND?
            </h2>
            <h1 className="text-7xl font-bold tracking-tight md:text-9xl">
              LET'S TALK
            </h1>
          </div>

          {/* Social buttons and credits */}
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.name}
                  className="transition-opacity hover:opacity-70"
                >
                  <item.icon className={item.width ? "h-6 w-6" : "h-5 w-5"} />
                </a>
              ))}
            </div>
            <div className="space-y-1 text-right text-sm">
              <p>
                Development by{" "}
                <span className="font-semibold">Obede Dintala</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
