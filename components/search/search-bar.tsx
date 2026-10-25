"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";
import { ArrowRight, Search, X } from "lucide-react";
import type { SearchEntry } from "@/data/services";
import { ServiceIcon } from "@/components/service/service-icon";
import { cn } from "@/lib/utils";

const FUSE_OPTIONS: IFuseOptions<SearchEntry> = {
  keys: [
    { name: "shortName", weight: 3 },
    { name: "name", weight: 3 },
    { name: "keywords", weight: 2 },
    { name: "agency", weight: 1.5 },
    { name: "agencyName", weight: 1 },
    { name: "summary", weight: 0.3 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
};

/** Plain substring match, used for the moment before Fuse.js has loaded. */
function simpleMatch(entries: SearchEntry[], q: string) {
  const needle = q.toLowerCase();
  return entries.filter((e) =>
    [e.name, e.shortName, e.agency, e.agencyName, ...e.keywords].some((t) =>
      t.toLowerCase().includes(needle),
    ),
  );
}

export function SearchBar({ entries, autoFocus }: { entries: SearchEntry[]; autoFocus?: boolean }) {
  const router = useRouter();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  // Fuse.js is only downloaded once someone interacts with the search box.
  const [fuse, setFuse] = useState<Fuse<SearchEntry> | null>(null);
  const loading = useRef(false);
  function loadFuse() {
    if (loading.current) return;
    loading.current = true;
    import("fuse.js").then(({ default: FuseClass }) =>
      setFuse(new FuseClass(entries, FUSE_OPTIONS)),
    );
  }

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (!trimmed) return [];
    if (!fuse) return simpleMatch(entries, trimmed).slice(0, 6);
    return fuse.search(trimmed, { limit: 6 }).map((r) => r.item);
  }, [fuse, entries, trimmed]);
  const showPanel = open && trimmed.length > 0;
  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));

  function go(slug: string) {
    setOpen(false);
    router.push(`/services/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      const target = results[activeIndex];
      if (target) {
        e.preventDefault();
        go(target.slug);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "flex h-13 items-center gap-3 rounded-lg border border-input bg-background px-4 sm:h-14",
          "focus-within:border-ring focus-within:ring-4 focus-within:ring-ring/20",
        )}
      >
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-label="Search government services"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            showPanel && results[activeIndex] ? `${listId}-${activeIndex}` : undefined
          }
          autoFocus={autoFocus}
          autoComplete="off"
          enterKeyHint="search"
          placeholder="Try “passport”, “NBI”, “birth certificate”…"
          className="h-full w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground sm:text-lg [&::-webkit-search-cancel-button]:hidden"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => {
            loadFuse();
            setOpen(true);
          }}
          onPointerEnter={loadFuse}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {showPanel && (
        <div className="animate-pop-in absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-lg border bg-popover p-1.5 shadow-lg">
          {results.length > 0 ? (
            <ul id={listId} role="listbox" aria-label="Matching services">
              {results.map((r, i) => (
                <li
                  key={r.slug}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === activeIndex}
                  // mousedown fires before the input's blur closes the panel
                  onMouseDown={(e) => {
                    e.preventDefault();
                    go(r.slug);
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5",
                    i === activeIndex && "bg-accent",
                  )}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ServiceIcon slug={r.slug} className="size-4.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{r.name}</span>
                    <span className="block truncate text-sm text-muted-foreground">
                      {r.agencyName}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                </li>
              ))}
            </ul>
          ) : (
            <div id={listId} className="px-3 py-4 text-sm">
              <p className="font-medium">No guide for “{trimmed}” yet.</p>
              <p className="mt-1 text-muted-foreground">
                We&apos;re starting with a few services and adding more.{" "}
                <Link
                  href="/services"
                  className="text-primary underline underline-offset-4"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  See all guides
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
