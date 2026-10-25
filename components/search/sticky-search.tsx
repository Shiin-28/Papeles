"use client";

import { useEffect, useRef, useState } from "react";
import type { SearchEntry } from "@/data/services";
import { SearchBar } from "@/components/search/search-bar";
import { cn } from "@/lib/utils";

/** Header height: the bar counts as "stuck" once it's within this distance of the top. */
const STICK_MARGIN = 57;

/**
 * The page's main search bar. It stays in the page body and sticks to the top while scrolling,
 * shrinking to a compact bar. It sits under the header, or at the very top when the header
 * hides on scroll down (see HeaderAutoHide, which sets --header-offset).
 * A zero-height marker plus one IntersectionObserver detects the stuck state (no scroll math).
 */
export function StickySearch({ entries }: { entries: SearchEntry[] }) {
  const marker = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = marker.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting && entry.boundingClientRect.top < STICK_MARGIN),
      { rootMargin: `-${STICK_MARGIN}px 0px 0px 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={marker} aria-hidden />
      <div
        data-primary-search
        data-stuck={stuck}
        className={cn(
          "sticky z-30 border-b bg-card transition-[top] duration-200 print:hidden",
          stuck && "shadow-sm",
        )}
        style={{ top: "var(--header-offset, 3.5rem)" }}
      >
        <div
          className={cn(
            "mx-auto max-w-7xl px-4 lg:px-8",
            stuck ? "py-2" : "pb-8 sm:pb-10 lg:pb-14",
          )}
        >
          <div className={stuck ? "max-w-xl" : "max-w-2xl"}>
            <SearchBar entries={entries} size={stuck ? "sm" : "md"} />
          </div>
        </div>
      </div>
    </>
  );
}
