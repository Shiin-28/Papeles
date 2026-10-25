"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SHOW_NEAR_TOP = 120;

/**
 * On pages with a sticky main search bar (`data-primary-search`), the header fades away while
 * scrolling down and fades back in on any scroll up. The search bar reads `--header-offset`
 * to sit right under the header, or at the very top when the header is hidden.
 * One passive scroll listener, throttled to one update per frame.
 */
export function HeaderAutoHide() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const root = document.documentElement;
    const setHidden = (hidden: boolean) => {
      if (!header || header.dataset.hidden === String(hidden)) return;
      header.dataset.hidden = String(hidden);
      header.inert = hidden;
      root.style.setProperty("--header-offset", hidden ? "0px" : "3.5rem");
    };
    setHidden(false);
    if (!header || !document.querySelector("[data-primary-search]")) return;

    let lastY = window.scrollY;
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const y = window.scrollY;
        if (y < SHOW_NEAR_TOP || y < lastY - 4) setHidden(false);
        else if (y > lastY + 4) setHidden(true);
        lastY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      setHidden(false);
    };
  }, [pathname]);

  return null;
}
