"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { TerminalEcho } from "./terminal-echo";

const Ctx = createContext<{ start: (href: string) => void } | null>(null);

export function usePageTransition() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("TransitionProvider missing");
  return ctx;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const start = useCallback((href: string) => setActiveHref(href), []);
  const onDone = useCallback(() => setActiveHref(null), []);

  return (
    <Ctx.Provider value={{ start }}>
      {children}
      {activeHref && <TerminalEcho href={activeHref} onDone={onDone} />}
    </Ctx.Provider>
  );
}
