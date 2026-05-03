"use client";

import Link from "next/link";
import { usePageTransition } from "./provider";

export function BackLink() {
  const { start } = usePageTransition();
  return (
    <Link
      href="/"
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
          return;
        e.preventDefault();
        start("/");
      }}
      className="text-sm opacity-60 hover:opacity-100 transition-opacity"
      aria-label="Back to home"
    >
      &larr;
    </Link>
  );
}
