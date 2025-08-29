"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ✅ Register ScrollTrigger once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function decodeHtmlEntities(str: string) {
  if (!str) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export function VerseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const verseRefEl = useRef<HTMLDivElement>(null);

  const pathRef = useRef<SVGPathElement>(null);
  const pencilRef = useRef<SVGGElement>(null);
  const maskRectRef = useRef<SVGRectElement>(null);

  const [verseText, setVerseText] = useState("Loading Verse of the Day...");
  const [verseCitation, setVerseCitation] = useState("");

  // Fetch verse
  useEffect(() => {
    let isMounted = true;
    async function fetchVerse() {
      try {
        const res = await fetch("/api/votd");
        const data = await res.json();
        if (!isMounted) return;
        setVerseText(
          decodeHtmlEntities(data?.votd?.text || "Verse unavailable")
        );
        setVerseCitation(decodeHtmlEntities(data?.votd?.display_ref || ""));
      } catch (err) {
        console.error("Error fetching verse:", err);
        if (!isMounted) return;
        setVerseText("Unable to load Verse of the Day");
      }
    }
    fetchVerse();
    return () => {
      isMounted = false;
    };
  }, []);

  // GSAP animation
  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const pencil = pencilRef.current;
    const maskRect = maskRectRef.current;
    if (!section || !path || !pencil || !maskRect) return;

    const length = path.getTotalLength();

    // Prepare the line
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    // Position pencil at start
    const start = path.getPointAtLength(0);
    gsap.set(pencil, {
      x: start.x,
      y: start.y,
      rotate: 0,
      transformOrigin: "50% 50%",
    });

    // Kill old triggers
    ScrollTrigger.getAll().forEach((t) => {
      if ((t as any)._createdByVerseSection) t.kill();
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        scrub: true,
        // markers: true,
      } as any,
    }) as gsap.core.Timeline & { scrollTrigger?: ScrollTrigger };

    if (tl.scrollTrigger) (tl.scrollTrigger as any)._createdByVerseSection = true;

    // Draw line
    tl.to(path, { strokeDashoffset: 0, ease: "none" }, 0);

    // Pencil along path
    tl.to(
      { p: 0 },
      {
        p: length,
        ease: "none",
        onUpdate() {
          const l = (this as any).targets()[0].p as number;
          const point = path.getPointAtLength(l);
          const prev = path.getPointAtLength(Math.max(0, l - 1));
          const angle =
            Math.atan2(point.y - prev.y, point.x - prev.x) * (180 / Math.PI);
          gsap.set(pencil, { x: point.x, y: point.y, rotate: angle });
        },
      },
      0
    );

    // ✅ Reveal text mask (animate rect width from 0% → 100%)
    gsap.set(maskRect, { attr: { width: "0%" } });
    tl.to(maskRect, { attr: { width: "100%" }, ease: "none" }, 0);

    // Floating pencil
    gsap.to(pencil, {
      y: "+=6",
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut",
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [verseText]);

  // Keep layout stable
  const textForLayout = useMemo(
    () => (verseText || " ").slice(0, 300),
    [verseText]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-muted/30 py-20"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/10 bg-card/50 p-8 text-center backdrop-blur-lg md:p-12">
          <div className="space-y-8">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
                <Quote className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Masked text */}
            <div className="relative mx-auto max-w-3xl">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1200 360"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <defs>
                  {/* ✅ Mask now uses 100% height and animates width */}
                  <mask id="verse-reveal-mask">
                    <rect
                      ref={maskRectRef}
                      x="0"
                      y="0"
                      width="0%"
                      height="100%"
                      fill="white"
                    />
                  </mask>
                </defs>

                {/* Writing path */}
                <path
                  ref={pathRef}
                  d="M1050 10
                     c -40 40 -60 80 -60 120
                     c 0 70 60 90 60 150
                     c 0 70 -80 80 -120 80
                     c -100 0 -140 -60 -220 -60
                     c -120 0 -200 80 -320 80
                     "
                  fill="none"
                  stroke="currentColor"
                  className="text-primary/50"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Pencil */}
                <g ref={pencilRef} className="drop-shadow-md">
                  <g>
                    <rect
                      x="-2"
                      y="-24"
                      width="120"
                      height="18"
                      rx="9"
                      ry="9"
                      fill="#F4A261"
                    />
                    <rect
                      x="100"
                      y="-24"
                      width="14"
                      height="18"
                      rx="3"
                      fill="#E76F51"
                    />
                    <polygon
                      points="-10,-24 0,-15 0,-9 -10,-24"
                      fill="#F6C89F"
                    />
                    <polygon points="0,-15 -20,-16 -10,-24" fill="#2A2A2A" />
                  </g>
                </g>
              </svg>

              {/* Verse text */}
              <div
                ref={verseRefEl}
                style={{
                  mask: "url(#verse-reveal-mask)",
                  WebkitMask: "url(#verse-reveal-mask)",
                }}
                className="relative"
              >
                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-foreground">
                  “{textForLayout}”
                </blockquote>
              </div>
            </div>

            {verseCitation && (
              <cite className="not-italic text-lg md:text-xl text-muted-foreground font-semibold block">
                — {verseCitation}
              </cite>
            )}
          </div>
        </div>
      </div>

      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </section>
  );
}
