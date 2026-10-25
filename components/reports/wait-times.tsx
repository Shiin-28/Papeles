"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Timer } from "lucide-react";
import type { ApiResult } from "@/lib/api";
import { formatMinutes, type WaitStatsResponse } from "@/lib/wait-stats";
import { WaitTimeForm } from "@/components/reports/wait-time-form";

type State =
  | { status: "idle" | "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: WaitStatsResponse };

export function WaitTimes({
  slug,
  offices,
}: {
  slug: string;
  offices: { id: string; name: string }[];
}) {
  const [state, setState] = useState<State>({ status: "idle" });
  const rootRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const res = await fetch(`/api/wait-times?service=${encodeURIComponent(slug)}`);
      const body = (await res.json()) as ApiResult<WaitStatsResponse>;
      if (!body.ok) throw new Error(body.error);
      setState({ status: "ready", data: body });
    } catch {
      setState({ status: "error", message: "Couldn't load wait times." });
    }
  }, [slug]);

  // Only hit the server once the section is about to be seen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void load();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <div ref={rootRef} className="space-y-4">
      <div className="rounded-lg border bg-card">
        {state.status === "ready" ? (
          <ul className="divide-y">
            {offices.map((office) => {
              const stats = state.data.offices.find((o) => o.officeId === office.id);
              return (
                <li key={office.id} className="flex items-center gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium leading-snug">{office.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {!stats || stats.count === 0
                        ? "No reports yet"
                        : stats.averageMinutes === null
                          ? "1 report so far. Not enough for an average yet."
                          : `Median ${formatMinutes(stats.medianMinutes ?? 0)} · ${stats.count} reports`}
                    </p>
                  </div>
                  {stats?.averageMinutes != null && (
                    <div className="shrink-0 text-right">
                      <p className="text-lg font-semibold tabular-nums">
                        {formatMinutes(stats.averageMinutes)}
                      </p>
                      <p className="text-xs text-muted-foreground">average</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : state.status === "error" ? (
          <div className="flex items-center justify-between gap-3 p-4 text-sm">
            <p className="text-muted-foreground">{state.message}</p>
            <button
              type="button"
              onClick={() => void load()}
              className="rounded-lg border px-3 py-1.5 font-medium hover:bg-accent"
            >
              Try again
            </button>
          </div>
        ) : (
          <p className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Loading wait times…
          </p>
        )}
      </div>

      <details className="group rounded-lg border bg-card">
        <summary className="flex cursor-pointer list-none items-center gap-2 p-4 font-medium [&::-webkit-details-marker]:hidden">
          <Timer className="size-4 text-primary" aria-hidden />
          Share your wait time
          <span className="ml-auto text-sm font-normal text-muted-foreground group-open:hidden">
            Takes 10 seconds
          </span>
        </summary>
        <div className="border-t p-4">
          <WaitTimeForm slug={slug} offices={offices} onSubmitted={() => void load()} />
        </div>
      </details>
    </div>
  );
}
