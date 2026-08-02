"use client";

import {
    useCallback,
    useLayoutEffect,
    useRef,
    type CSSProperties,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

type SplitType = "chars" | "words";

interface AboutSectionProps {
    /** Optional background image. If omitted, the section stays transparent. */
    imageSrc?: string;
    heading?: string;
    paragraphs?: string[];
    splitType?: SplitType;
    /** Blur applied to the background image, in px (only used if imageSrc is set). */
    blur?: number;
    /** Darkness of the overlay on top of the image, 0..1 (only used if imageSrc is set). */
    overlayOpacity?: number;
    /** How many viewport-heights of scroll the text sequence takes. */
    scrollLengthVh?: number;
    style?: CSSProperties;
}

const DEFAULT_PARAGRAPHS = [
    "I'm a Frontend Developer from Angola \uD83C\uDDE6\uD83C\uDDF4 passionate about creating modern, responsive and user-friendly web applications.",
    "I enjoy turning ideas into polished digital products while continuously improving my knowledge of software architecture and backend development.",
];

const SPACE = "\u00A0";

/** Wrap text into masked units (word or char) for a translateY reveal. */
function buildUnits(text: string, mode: SplitType) {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline";
    const units: HTMLSpanElement[] = [];

    const pushUnit = (content: string, isSpace: boolean) => {
        const mask = document.createElement("span");
        mask.style.display = "inline-block";
        mask.style.overflow = "hidden";
        mask.style.verticalAlign = "bottom";
        mask.style.lineHeight = "inherit";

        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.style.willChange = "transform";
        inner.textContent = isSpace ? SPACE : content;

        mask.appendChild(inner);
        wrapper.appendChild(mask);
        if (!isSpace) units.push(inner);
    };

    if (mode === "words") {
        text.split(/(\s+)/).forEach((part) => {
            if (part === "") return;
            pushUnit(part, /^\s+$/.test(part));
        });
    } else {
        Array.from(text).forEach((ch) => pushUnit(ch, ch === " "));
    }

    return { wrapper, units };
}

export default function AboutSection({
    imageSrc,
    heading: headingText = "ABOUT ME",
    paragraphs = DEFAULT_PARAGRAPHS,
    splitType = "words",
    blur = 0,
    overlayOpacity = 0.5,
    scrollLengthVh = 300,
    style,
}: AboutSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRefs = useRef<HTMLParagraphElement[]>([]);

    const setParaRef = useCallback(
        (el: HTMLParagraphElement | null, i: number) => {
            if (el) paraRefs.current[i] = el;
        },
        []
    );

    // ---- Pinned scroll sequence: heading out, paragraphs in ----
    useLayoutEffect(() => {
        const section = sectionRef.current;
        const pin = pinRef.current;
        const headingEl = headingRef.current;
        if (!section || !pin || !headingEl) return;

        const prefersReduced =
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        const paraUnits: HTMLSpanElement[][] = paraRefs.current.map((p, i) => {
            if (!p) return [];
            p.textContent = "";
            const { wrapper, units } = buildUnits(paragraphs[i] ?? "", splitType);
            p.appendChild(wrapper);
            return units;
        });

        headingEl.replaceChildren();
        const { wrapper: headingWrapper, units: headingUnits } = buildUnits(
            headingText,
            splitType
        );
        headingEl.appendChild(headingWrapper);

        if (prefersReduced) {
            gsap.set(paraUnits.flat(), { yPercent: 0, opacity: 1 });
            gsap.set(headingUnits, { yPercent: 0, opacity: 1 });
            gsap.set(headingEl, { opacity: 1, y: 0 });
            return;
        }

        gsap.set(paraUnits.flat(), { yPercent: 120, opacity: 0 });
        paraRefs.current.forEach((p) => p && gsap.set(p, { opacity: 1 }));
        gsap.set(headingUnits, { yPercent: 120, opacity: 0 });
        gsap.set(headingEl, { opacity: 1, y: 0 });

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: `+=${scrollLengthVh}%`,
                    scrub: 1,
                    pin,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(
                headingUnits,
                { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.035, ease: "power2.out" },
                "+=0.1"
            );
            tl.to(headingEl, { opacity: 0, y: -24, duration: 0.6, ease: "power2.out" }, "+=0.2");

            paraUnits.forEach((units, i) => {
                if (!units.length) return;
                tl.to(
                    units,
                    { yPercent: 0, opacity: 1, duration: 1, stagger: 0.035 },
                    i === 0 ? "+=0.15" : "+=0.25"
                );
            });
        }, section);

        const refreshTrigger = () => ScrollTrigger.refresh();
        const frame = window.requestAnimationFrame(() => {
            refreshTrigger();
        });

        const resizeObserver = new ResizeObserver(refreshTrigger);
        resizeObserver.observe(section);
        window.addEventListener("load", refreshTrigger);

        return () => {
            window.cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            window.removeEventListener("load", refreshTrigger);
            ctx.revert();
            refreshTrigger();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headingText, paragraphs.join("\u0000"), splitType, scrollLengthVh]);

    return (
        <section
            ref={sectionRef}
            style={{ position: "relative", width: "100%", ...style }}
        >
            <div
                ref={pinRef}
                style={{
                    position: "relative",
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                }}
            >
                {/* Background image — only rendered if imageSrc is provided */}
                {imageSrc && (
                    <>
                        <img
                            src={imageSrc}
                            alt=""
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: `blur(${blur}px)`,
                                transform: "scale(1.08)", // hide blurred edges
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: `linear-gradient(180deg, rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${
                                    overlayOpacity + 0.15
                                }))`,
                            }}
                        />
                    </>
                )}

                {/* Foreground text */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        width: "min(720px, 88vw)",
                        textAlign: "center",
                        color: imageSrc ? "#fff" : "inherit",
                    }}
                >
                    <h1
                        ref={headingRef}
                        style={{
                            position: "absolute",
                            inset: 0,
                            margin: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "clamp(5rem, 12vw, 8rem)",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                        }}
                    >
                        {headingText}
                    </h1>

                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        {paragraphs.map((_, i) => (
                            <p
                                key={i}
                                ref={(el) => setParaRef(el, i)}
                                style={{
                                    margin: 0,
                                    fontSize: "clamp(1.1rem, 2.4vw, 1.6rem)",
                                    lineHeight: 1.6,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}