"use client";

import { TriangleAlert } from "lucide-react";
import type { ISODate } from "@/data/schema";
import { useNow } from "@/hooks/use-now";
import { isStale, STALE_AFTER_DAYS } from "@/lib/dates";

export function StaleWarning({
  lastVerified,
  unverifiedCount,
  officialUrl,
}: {
  lastVerified: ISODate | null;
  unverifiedCount: number;
  officialUrl: string | null;
}) {
  const now = useNow();
  // Before hydration we can't know today's date; "never verified" doesn't depend on it.
  const stale = lastVerified === null || (now !== null && isStale(lastVerified, now));
  if (!stale && unverifiedCount === 0) return null;

  const title =
    lastVerified === null
      ? "This guide hasn't been verified yet"
      : stale
        ? "May be outdated"
        : `${unverifiedCount} ${unverifiedCount === 1 ? "item" : "items"} not yet verified`;
  const body =
    lastVerified === null
      ? "We couldn't confirm these details on the official site yet. Double-check before you go."
      : stale
        ? `Last checked more than ${STALE_AFTER_DAYS} days ago. Double-check the official site before you go.`
        : "Items marked “Not yet verified” haven't been confirmed. Double-check them on the official site.";

  return (
    <div
      role="note"
      className="flex gap-3 rounded-md border border-warning-border bg-warning p-4 text-sm text-warning-foreground"
    >
      <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5">
          {body}{" "}
          {officialUrl && (
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Official site
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
