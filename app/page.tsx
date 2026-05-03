"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { usePageTransition } from "./_transitions/provider";

const NAV = [
  { label: "WORKS", href: "/works" },
  { label: "ART", href: "/art" },
  { label: "WRITINGS", href: "/writings" },
] as const;

const TITLE = "BAASIL";
const DITHER_CHARS = ".:-=+*#%@";
const DITHER_MS = 900;

function DitheredTitle() {
  const [chars, setChars] = useState<string[]>(() => TITLE.split(""));

  useEffect(() => {
    const order = TITLE.split("").map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const lockAt: number[] = [];
    order.forEach((cellIdx, k) => {
      lockAt[cellIdx] = ((k + 1) / TITLE.length) * DITHER_MS;
    });

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      setChars(
        TITLE.split("").map((c, i) =>
          elapsed >= lockAt[i]
            ? c
            : DITHER_CHARS[Math.floor(Math.random() * DITHER_CHARS.length)]
        )
      );
      if (elapsed < DITHER_MS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <h1 className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.25] py-1">
      {TITLE.split("").map((target, i) => (
        <span key={i} className="relative inline-block">
          <span className="invisible">{target}</span>
          <span className="absolute inset-0 text-center">{chars[i]}</span>
        </span>
      ))}
    </h1>
  );
}

export default function Home() {
  const { start } = usePageTransition();
  const [active, setActive] = useState<number | null>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i === active ? 1 : 0.35,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        setActive((i) => (i === null ? 0 : (i + 1) % NAV.length));
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        setActive((i) => (i === null ? NAV.length - 1 : (i - 1 + NAV.length) % NAV.length));
      } else if (e.key === "Enter" && active !== null) {
        e.preventDefault();
        start(NAV[active].href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, start]);

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 md:py-16 flex flex-col">
      <DitheredTitle />
      <nav>
        <ul className="flex flex-col">
          {NAV.map((item, i) => (
            <li
              key={item.href}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              style={{ opacity: 0.35 }}
            >
              <Link
                href={item.href}
                onClick={(e) => {
                  if (
                    e.button !== 0 ||
                    e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey
                  )
                    return;
                  e.preventDefault();
                  start(item.href);
                }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="inline-block text-2xl md:text-4xl font-medium tracking-tight leading-[1.25] py-1 outline-none"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
