import { useEffect, useRef, useState } from "react"
// @ts-ignore — matter-js may not ship bundled type declarations
import Matter from "matter-js"

/* ------------------------------------------------------------------ */
/* Skill icons (used instead of DEFAULT_IMAGES)                        */
/* ------------------------------------------------------------------ */

const SKILL_IMAGES = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    alt: "HTML5",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    alt: "CSS3",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    alt: "JavaScript",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    alt: "React",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    alt: "Next.js",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    alt: "Node.js",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    alt: "Express",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    alt: "NestJS",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    alt: "MySQL",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    alt: "PostgreSQL",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    alt: "Figma",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    alt: "Git",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    alt: "VS Code",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    alt: "Linux",
  },
  { src: "https://skillicons.dev/icons?i=prisma", alt: "Prisma" },
  { src: "https://skillicons.dev/icons?i=tailwind", alt: "Tailwind CSS" },
  { src: "https://skillicons.dev/icons?i=vite", alt: "Vite" },
  { src: "https://skillicons.dev/icons?i=astro", alt: "Astro" },
  { src: "https://skillicons.dev/icons?i=c", alt: "C" },
  { src: "https://skillicons.dev/icons?i=postman", alt: "Postman" },
]

/**
 * SkillsGravity
 * Same mechanic as the original Gravity Gallery: drops a set of bodies
 * (circles or squares) into a Matter.js world — gravity, walls, click-drag
 * with the mouse. Bodies are filled with skill icons instead of photos,
 * and a heading sits behind everything (z-index 0) so it shows through
 * the gaps as the icons settle.
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */

const M: any = Matter

// Static boundary walls around the container (thick, just outside the edges).
function makeWalls(
  bounding: { width: number; height: number },
  world: any,
  opts: any
) {
  const { width: w, height: h } = bounding
  const t = 200
  const walls: any[] = []
  if (opts.top)
    walls.push(
      M.Bodies.rectangle(w / 2, -t / 2, w + 2 * t, t, { isStatic: true })
    )
  if (opts.bottom)
    walls.push(
      M.Bodies.rectangle(w / 2, h + t / 2, w + 2 * t, t, {
        isStatic: true,
      })
    )
  if (opts.left)
    walls.push(
      M.Bodies.rectangle(-t / 2, h / 2, t, h + 2 * t, { isStatic: true })
    )
  if (opts.right)
    walls.push(
      M.Bodies.rectangle(w + t / 2, h / 2, t, h + 2 * t, {
        isStatic: true,
      })
    )
  M.Composite.add(world, walls)
  return walls
}

export default function SkillsGravity(props: any) {
  props = { ...COMPONENT_DEFAULTS, ...props }
  const {
    heading = "SKILLS",
    images = SKILL_IMAGES,
    count = 21,
    size = 90,
    shape = "circle",
    color = "#FFFFFF",
    friction = 10,
    mouseEnable = true,
    mouseStiffness = 0.9,
    mouseAngularStiffness = 0,
    gravX = -0.25,
    gravY = 2.5,
    wallOptions = { top: true, bottom: true, right: true, left: true },
    style,
  } = props

  const [responsiveSize, setResponsiveSize] = useState(size)
  const n = Math.max(1, Math.min(40, Math.round(count)))
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const updateSize = () => {
      setResponsiveSize(window.innerWidth <= 640 ? 70 : size)
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [size])

  const depKey = JSON.stringify({
    n,
    responsiveSize,
    shape,
    gravX,
    gravY,
    wallOptions,
    friction,
    mouseEnable,
    mouseStiffness,
    mouseAngularStiffness,
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const engine = M.Engine.create({
      enableSleeping: true,
      gravity: { x: gravX, y: gravY },
    })

    const bounding = container.getBoundingClientRect()
    makeWalls(bounding, engine.world, wallOptions)

    let mouseConstraint: any = null
    const onLeave = () => mouseConstraint?.mouse?.mouseup(new Event("mouseup"))
    if (mouseEnable) {
      const mouse = M.Mouse.create(container)
      mouseConstraint = M.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          angularStiffness: mouseAngularStiffness,
          stiffness: mouseStiffness,
        },
      })
      M.Composite.add(engine.world, mouseConstraint)
      const el = mouseConstraint.mouse.element
      el.removeEventListener("wheel", mouseConstraint.mouse.mousewheel)
      container.addEventListener("mouseleave", onLeave)
    }

    // Build the generated bodies, spread across the top so they fall in.
    // Friction 1–10 → 0.1–1; a little air friction keeps motion settled.
    const bodyOpts = {
      friction: Math.max(1, Math.min(10, friction)) / 10,
      frictionAir: 0.02,
    }
    const made: any[] = []
    for (let i = 0; i < n; i++) {
      const x = ((i + 0.5) / n) * bounding.width
      const y = responsiveSize / 2 + i * (responsiveSize * 0.15 + 10)
      const body =
        shape === "square"
          ? M.Bodies.rectangle(x, y, responsiveSize, responsiveSize, bodyOpts)
          : M.Bodies.circle(x, y, responsiveSize / 2, bodyOpts)
      made.push(body)
    }
    M.Composite.add(engine.world, made)

    const els = Array.from(
      container.querySelectorAll<HTMLElement>("[data-physics-body]")
    )

    const update = () => {
      rafRef.current = requestAnimationFrame(update)
      for (let i = 0; i < made.length; i++) {
        const el = els[i]
        if (!el) continue
        const { position, angle } = made[i]
        el.style.visibility = "visible"
        el.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) rotate(${angle}rad)`
      }
      M.Engine.update(engine)
    }
    update()

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (mouseEnable) container.removeEventListener("mouseleave", onLeave)
      M.World.clear(engine.world, false)
      M.Engine.clear(engine)
    }
  }, [depKey])

  // Cycle the icons across the bodies (repeats if count > images.length).
  const imgFor = (i: number) => {
    const imgs =
      Array.isArray(images) && images.length > 0 ? images : SKILL_IMAGES
    if (!imgs.length) return undefined
    return imgs[i % imgs.length]?.src
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: style?.height ?? "100vh",
        overflow: "hidden",
      }}
      data-theme="dark"
    >
      {/* Heading behind everything */}
      <h2
        className="text-background2"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(3rem, 12vw, 12rem)",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textAlign: "center",
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {heading}
      </h2>

      {/* Physics container, on top of the heading */}
      <div
        ref={containerRef}
        style={{
          ...style,
          position: "relative",
          zIndex: 1,
          height: "100%",
          width: "100%",
          overflow: "hidden",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "pan-y",
        }}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
      >
        {Array.from({ length: n }).map((_, i) => {
          const src = imgFor(i)
          return (
            <div
              className="bg-background2/30"
              key={i}
              data-physics-body=""
              style={{
                position: "absolute",
                visibility: "hidden",
                left: 0,
                top: 0,
                width: responsiveSize,
                height: responsiveSize,
                borderRadius: shape === "circle" ? "50%" : 0,
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "grab",
                userSelect: "none",
                WebkitUserSelect: "none",
                willChange: "transform",
              }}
              draggable={false}
            >
              {src && (
                <img
                  src={src}
                  alt=""
                  draggable={false}
                  style={{
                    width: responsiveSize * 0.55,
                    height: responsiveSize * 0.55,
                    objectFit: "cover",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const COMPONENT_DEFAULTS = {
  heading: "SKILLS",
  images: SKILL_IMAGES,
  count: 21,
  size: 90,
  shape: "circle",
  color: "#FFFFFF",
  gravY: 2.5,
  gravX: -0.25,
  wallOptions: {
    top: true,
    bottom: true,
    left: true,
    right: true,
  },
  friction: 10,
  mouseEnable: true,
  mouseStiffness: 0.9,
  mouseAngularStiffness: 0,
}

SkillsGravity.displayName = "SkillsGravity"