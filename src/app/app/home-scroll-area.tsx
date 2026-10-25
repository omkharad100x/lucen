"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

export default function HomeScrollArea({ children }: { children: ReactNode }) {
  const scrollArea = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // Next.js Activity recreates this effect when the cached Home page reappears.
    // An empty dependency list leaves ordinary re-renders and scrolling alone.
    scrollArea.current?.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return <main id="lh-home" className="lh-content" tabIndex={-1} ref={scrollArea}>{children}</main>;
}
