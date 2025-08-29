"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once
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

  // Fetch Verse of the Day
  useEffect(() => {
    let isMounted = true;
    async function fetchVerse() {
      try {
        const res = await fetch("/api/votd");
        const data = await res.json();
        if (!isMounted) return;
        setVerseText(decodeHtmlEntities(data?.votd?.text || "Verse unavailable"));
        setVerseCitation(decodeHtmlEntities(data?.votd?.display_ref || ""));
      } catch {
        if (!isMounted) return;
        setVerseText("Unable to load Verse of the Day");
      }
    }
    fetchVerse();
    return () => { isMounted = false; };
  }, []);

  // GSAP animation
  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const pencil = pencilRef.current;
    const maskRect = maskRectRef.current;
    if (!section || !path || !pencil || !maskRect) return;

    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const setPencil = gsap.quickSetter(pencil, "attr", "x,y,transform");

    const start = path.getPointAtLength(0);
    gsap.set(pencil, {
      x: start.x,
      y: start.y,
      rotate: 0,
      transformOrigin: "50% 50%",
    });

    ScrollTrigger.getAll().forEach((t) => {
      if ((t as any)._verse) t.kill();
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    }) as gsap.core.Timeline & { scrollTrigger?: ScrollTrigger };

    if (tl.scrollTrigger) (tl.scrollTrigger as any)._verse = true;

    // Draw path
    tl.to(path, { strokeDashoffset: 0, ease: "none" }, 0);

    // Pencil along path
    tl.to({ p: 0 }, {
      p: length,
      ease: "none",
      onUpdate() {
        const l = (this as any).targets()[0].p as number;
        const point = path.getPointAtLength(l);
        const prev = path.getPointAtLength(Math.max(0, l - 1));
        const angle = Math.atan2(point.y - prev.y, point.x - prev.x) * (180 / Math.PI);
        setPencil({ x: point.x, y: point.y, transform: `rotate(${angle})` });
      }
    }, 0);

    // Reveal text
    gsap.set(maskRect, { attr: { width: "0%" } });
    tl.to(maskRect, { attr: { width: "100%" }, ease: "none" }, 0);

    // Floating pencil
    gsap.to(pencil, {
      y: "+=3",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [verseText]);

  const textForLayout = useMemo(() => (verseText || " ").slice(0, 300), [verseText]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-20">
      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Quote icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black ring-0">
            <Quote className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Masked verse */}
        <div className="relative mx-auto max-w-3xl">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 200"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <mask id="verse-reveal-mask">
                <rect ref={maskRectRef} x="0" y="0" width="0%" height="100%" fill="white" />
              </mask>
            </defs>

            <path
              ref={pathRef}
              d="M950 20
                 c -50 40 -80 70 -80 120
                 c 0 70 80 90 80 140
                 c 0 50 -100 70 -160 70
                 c -100 0 -160 -50 -260 -50
                 c -120 0 -220 70 -340 70"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Pencil */}
            <g ref={pencilRef}>
              <rect x="-2" y="-20" width="90" height="14" rx="7" ry="7" fill="#F4A261" />
              <rect x="70" y="-20" width="12" height="14" rx="3" fill="#E76F51" />
              <polygon points="-8,-20 0,-12 0,-8 -8,-20" fill="#F6C89F" />
              <polygon points="0,-12 -15,-14 -8,-20" fill="#2A2A2A" />
            </g>
          </svg>

          <div
            ref={verseRefEl}
            style={{ mask: "url(#verse-reveal-mask)", WebkitMask: "url(#verse-reveal-mask)" }}
            className="relative"
          >
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-medium leading-relaxed text-white">
              “{textForLayout}”
            </blockquote>
          </div>
        </div>

        {/* Citation */}
        {verseCitation && (
          <cite className="not-italic text-lg md:text-xl text-gray-400 font-semibold block mt-4">
            — {verseCitation}
          </cite>
        )}
      </div>
    </section>
  );
}
