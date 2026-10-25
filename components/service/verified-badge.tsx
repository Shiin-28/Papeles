"use client";

import { BadgeCheck, CircleHelp, Clock } from "lucide-react";
import type { ISODate } from "@/data/schema";
import { useNow } from "@/hooks/use-now";
import { daysSince, formatDate, formatDaysAgo, isStale } from "@/lib/dates";
import { cn } from "@/lib/utils";

/**
 * "Last verified: Oct 20, 2026 · 5 days ago".
 * The date renders on the server; the relative part fills in after hydration.
 */
export function VerifiedDate({ date, className }: { date: ISODate | null; className?: string }) {
  const now = useNow();

  if (date === null) {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-warning-foreground", className)}>
        <CircleHelp className="size-4 shrink-0" aria-hidden />
        Not yet verified
      </span>
    );
  }

  const stale = now !== null && isStale(date, now);
  const Icon = stale ? Clock : BadgeCheck;
  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-center gap-x-1.5",
        stale ? "text-warning-foreground" : "text-muted-foreground",
        className,
      )}
    >
      <Icon className={cn("size-4 shrink-0", !stale && "text-success")} aria-hidden />
      <span>
        Last verified: <time dateTime={date}>{formatDate(date)}</time>
      </span>
      {now && <span aria-hidden>·</span>}
      {now && <span>{formatDaysAgo(daysSince(date, now))}</span>}
    </span>
  );
}

/** Small chip for individual items (requirements, fees, …). */
export function ItemVerifiedChip({ date }: { date: ISODate | null }) {
  const now = useNow();

  if (date === null) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-warning-border bg-warning px-2 py-0.5 text-xs font-medium text-warning-foreground">
        <CircleHelp className="size-3" aria-hidden />
        Not yet verified
      </span>
    );
  }
  if (now && isStale(date, now)) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-warning-border bg-warning px-2 py-0.5 text-xs font-medium text-warning-foreground">
        <Clock className="size-3" aria-hidden />
        Checked {formatDate(date)}
      </span>
    );
  }
  return null;
}
