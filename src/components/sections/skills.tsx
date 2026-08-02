"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface SkillIcon {
    src: string;
    alt: string;
    angle: number; // position along the arc, in degrees (0 = straight up)
}

interface SkillArc {
    radius: number; // px on desktop
    radiusMobile: number; // px on small screens
    swing: number; // degrees the whole arc sways to each side
    duration: number; // seconds for one direction of the swing
    iconSize: number; // px
    icons: SkillIcon[];
}

/** Evenly spaces `count` icons across [-spread, +spread] degrees. */
function fan(spread: number, sources: { src: string; alt: string }[]): SkillIcon[] {
    const count = sources.length;
    const step = count > 1 ? (spread * 2) / (count - 1) : 0;
    return sources.map((s, i) => ({
        ...s,
        angle: count > 1 ? -spread + i * step : 0,
    }));
}

const SKILL_ARCS: SkillArc[] = [
    {
        radius: 300,
        radiusMobile: 180,
        swing: 22,
        duration: 7,
        iconSize: 56,
        icons: fan(96, [
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML5" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS3" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
        ]),
    },
    {
        radius: 390,
        radiusMobile: 250,
        swing: 16,
        duration: 9,
        iconSize: 54,
        icons: fan(86, [
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", alt: "Express" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg", alt: "NestJS" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "MySQL" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", alt: "PostgreSQL" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", alt: "VS Code" },
        ]),
    },
    {
        radius: 480,
        radiusMobile: 320,
        swing: 12,
        duration: 11,
        iconSize: 52,
        icons: fan(100, [
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", alt: "Linux" },
            { src: "https://skillicons.dev/icons?i=prisma", alt: "Prisma" },
            { src: "https://skillicons.dev/icons?i=tailwind", alt: "Tailwind CSS" },
            { src: "https://skillicons.dev/icons?i=vite", alt: "Vite" },
            { src: "https://skillicons.dev/icons?i=astro", alt: "Astro" },
            { src: "https://skillicons.dev/icons?i=c", alt: "C" },
            { src: "https://skillicons.dev/icons?i=postman", alt: "Postman" },
        ]),
    },
];

const SPACE = "\u00A0";

/* ------------------------------------------------------------------ */
/* Text mask helper (same technique as AboutSection)                  */
/* ------------------------------------------------------------------ */

function buildUnits(text: string) {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline";
    const units: HTMLSpanElement[] = [];

    text.split(/(\s+)/).forEach((part) => {
        if (part === "") return;
        const isSpace = /^\s+$/.test(part);

        const mask = document.createElement("span");
        mask.style.display = "inline-block";
        mask.style.overflow = "hidden";
        mask.style.verticalAlign = "bottom";
        mask.style.lineHeight = "inherit";

        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.style.willChange = "transform";
        inner.textContent = isSpace ? SPACE : part;

        mask.appendChild(inner);
        wrapper.appendChild(mask);
        if (!isSpace) units.push(inner);
    });

    return { wrapper, units };
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

interface SkillsArcSectionProps {
    heading?: string;
    style?: CSSProperties;
}

export default function SkillSection({
    heading: headingText = "SKILLS",
    style,
}: SkillsArcSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const arcsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const headingEl = headingRef.current;
        const arcsEl = arcsRef.current;
        if (!section || !headingEl || !arcsEl) return;

        const prefersReduced = window.matchMedia?.(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        headingEl.replaceChildren();
        const { wrapper, units } = buildUnits(headingText);
        headingEl.appendChild(wrapper);

        const iconEls = Array.from(
            arcsEl.querySelectorAll<HTMLElement>("[data-skill-icon]")
        );

        if (prefersReduced) {
            gsap.set(units, { yPercent: 0, opacity: 1 });
            gsap.set(iconEls, { opacity: 1, scale: 1 });
            return;
        }

        gsap.set(units, { yPercent: 120, opacity: 0 });
        gsap.set(iconEls, { opacity: 0, scale: 0.4 });

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.to(units, {
                yPercent: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.04,
                ease: "power2.out",
            }).to(
                iconEls,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: { each: 0.025, from: "center" },
                    ease: "back.out(1.6)",
                },
                "-=0.25"
            );
        }, section);

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headingText]);

    return (
        <section
            ref={sectionRef}
            style={{
                position: "relative",
                width: "100%",
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: "4rem",
                overflow: "hidden",
                ...style,
            }}
        >
            <style>{`
        @keyframes arc-swing {
          from { transform: rotate(calc(var(--start-angle) - var(--swing) * 1deg)); }
          to   { transform: rotate(calc(var(--start-angle) + var(--swing) * 1deg)); }
        }
        @keyframes arc-counter-swing {
          from { transform: rotate(calc(-1 * (var(--start-angle) - var(--swing) * 1deg))); }
          to   { transform: rotate(calc(-1 * (var(--start-angle) + var(--swing) * 1deg))); }
        }
        .skill-icon-bubble {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .skill-icon-bubble:hover {
          transform: scale(1.18) !important;
          box-shadow: 0 6px 20px rgba(0,0,0,0.18);
        }
        @media (prefers-reduced-motion: reduce) {
          .skill-arm { animation: none !important; }
        }
      `}</style>

            <h2
                ref={headingRef}
                style={{
                    position: "relative",
                    margin: 0,
                    fontSize: "clamp(5rem,12vw,12rem)",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textAlign: "center",
                }}
            />

            <div
                ref={arcsRef}
                style={{
                    position: "relative",
                    width: "100%",
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {SKILL_ARCS.map((arc, arcIndex) => (
                    <div
                        key={arcIndex}
                        className="skills-arc"
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: "50%",
                            width: `min(${arc.radius * 2}px, 92vw)`,
                            height: `min(${arc.radius}px, 46vw)`,
                            transform: "translateX(-50%)",
                            pointerEvents: "none",
                        }}
                    >
                        {arc.icons.map((icon, iconIndex) => (
                            <div
                                key={iconIndex}
                                className="skill-arm"
                                style={
                                    {
                                        position: "absolute",
                                        bottom: 0,
                                        left: "50%",
                                        height: "100%",
                                        width: 0,
                                        transformOrigin: "bottom center",
                                        "--start-angle": `${icon.angle}deg`,
                                        "--swing": arc.swing,
                                        animation: `arc-swing ${arc.duration}s ease-in-out infinite alternate`,
                                        animationDelay: `${iconIndex * 0.15}s`,
                                    } as CSSProperties
                                }
                            >
                                <div
                                    data-skill-icon
                                    className="skill-icon-bubble"
                                    style={
                                        {
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            transform: "translate(-50%, -50%)",
                                            transformOrigin: "center",
                                            "--start-angle": `${icon.angle}deg`,
                                            "--swing": arc.swing,
                                            animation: `arc-counter-swing ${arc.duration}s ease-in-out infinite alternate`,
                                            animationDelay: `${iconIndex * 0.15}s`,
                                            width: arc.iconSize + 36,
                                            height: arc.iconSize + 36,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        } as CSSProperties
                                    }
                                >
                                    <img
                                        src={icon.src}
                                        alt={icon.alt}
                                        width={arc.iconSize}
                                        height={arc.iconSize}
                                        style={{ width: arc.iconSize, height: arc.iconSize, objectFit: "contain" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}