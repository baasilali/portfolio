"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function TerminalEcho({
  href,
  onDone,
}: {
  href: string;
  onDone: () => void;
}) {
  const router = useRouter();
  const [typed, setTyped] = useState("");
  const [cursor, setCursor] = useState(true);
  const [fading, setFading] = useState(false);
  const cmd = `~ $ cd ${href}`;

  useEffect(() => {
    let i = 0;
    const typeTimer = setInterval(() => {
      i += 1;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) clearInterval(typeTimer);
    }, 22);

    const blinkTimer = setInterval(() => setCursor((c) => !c), 180);
    const navTimer = setTimeout(() => router.push(href), 22 * cmd.length + 120);
    const fadeTimer = setTimeout(
      () => setFading(true),
      22 * cmd.length + 220
    );
    const doneTimer = setTimeout(() => {
      clearInterval(blinkTimer);
      onDone();
    }, 22 * cmd.length + 500);

    return () => {
      clearInterval(typeTimer);
      clearInterval(blinkTimer);
      clearTimeout(navTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [cmd, href, router, onDone]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-50 bg-black pointer-events-none"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 220ms ease-out",
      }}
    >
      <span
        className="text-white"
        style={{
          display: "inline-block",
          padding: "1.5rem",
          fontFamily: "ui-monospace, monospace",
          fontSize: "1rem",
          whiteSpace: "pre",
        }}
      >
        {typed}
        {cursor ? "\u2588" : " "}
      </span>
    </div>
  );
}
