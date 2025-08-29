"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const verseRef = useRef<HTMLDivElement>(null);

  const [verseText, setVerseText] = useState("Loading Verse of the Day...");
  const [verseCitation, setVerseCitation] = useState("");

  // Fetch Verse
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

  // Scroll animation
  useEffect(() => {
    const verseEl = verseRef.current;
    if (!verseEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    tl.fromTo(
      verseEl,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [verseText]);

  const textForLayout = useMemo(() => (verseText || " ").slice(0, 300), [verseText]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black
                 pt-12 sm:pt-16 md:pt-20 lg:pt-24
                 pb-12 sm:pb-16 md:pb-20"
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Quote Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-black ring-0 border border-white/20">
            <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
        </div>

        {/* Verse */}
        <div ref={verseRef} className="mx-auto max-w-3xl">
          <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-white">
            “{textForLayout}”
          </blockquote>
          {verseCitation && (
            <cite className="not-italic text-sm sm:text-base md:text-lg text-gray-400 font-medium block mt-3">
              — {verseCitation}
            </cite>
          )}
        </div>
      </div>
    </section>
  );
}
