"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { SearchEntry } from "@/data/services";
import { SearchBar } from "@/components/search/search-bar";
import { cn } from "@/lib/utils";

const HEADER_HEIGHT = 56;

/**
 * Compact search that fades into the header once the page's main search bar (marked
 * `data-primary-search`) scrolls out of view. The logo and links stay put.
 *
 * It floats over the page (absolute) instead of taking up space, so showing or hiding it never
 * moves the content; that's what keeps scrolling smooth. One IntersectionObserver, no scroll
 * listener, and the search is only built the first time it's needed.
 */
export function HeaderSearch({ entries }: { entries: SearchEntry[] }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [built, setBuilt] = useState(false);

  useEffect(() => {
    const target = document.querySelector("[data-primary-search]");
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < HEADER_HEIGHT;
        setShow(scrolledPast);
        if (scrolledPast) setBuilt(true);
      },
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px` },
    );
    io.observe(target);
    return () => {
      io.disconnect();
      setShow(false);
    };
  }, [pathname]);

  return (
    <div
      inert={!show}
      className={cn(
        "transition-[opacity,transform] duration-200",
        // Phones: a thin row attached under the header bar. Desktop: centered in the bar.
        "absolute inset-x-0 top-full border-b bg-card px-4 py-2",
        "md:inset-x-auto md:top-0 md:right-60 md:left-48 md:flex md:h-14 md:items-center md:justify-center md:border-0 md:bg-transparent md:p-0 lg:right-64 lg:left-56",
        show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
      )}
    >
      {built && (
        <div className="w-full md:max-w-md">
          <SearchBar entries={entries} size="sm" />
        </div>
      )}
    </div>
  );
}
