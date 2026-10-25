import type { ISODate } from "@/data/schema";

export const STALE_AFTER_DAYS = 90;
const DAY_MS = 24 * 60 * 60 * 1000;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** Parses "YYYY-MM-DD" as a UTC calendar date. */
export function parseISODate(date: ISODate): Date {
  return new Date(`${date}T00:00:00Z`);
}

/** "Oct 20, 2026". Same output on server and client. */
export function formatDate(date: ISODate): string {
  return dateFormatter.format(parseISODate(date));
}

/** Whole days between `date` and `now`, using Philippine calendar days. */
export function daysSince(date: ISODate, now: Date): number {
  const manilaToday = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const todayUTC = Date.UTC(
    manilaToday.getUTCFullYear(),
    manilaToday.getUTCMonth(),
    manilaToday.getUTCDate(),
  );
  return Math.max(0, Math.floor((todayUTC - parseISODate(date).getTime()) / DAY_MS));
}

export function formatDaysAgo(days: number): string {
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 60) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 24) return `${months} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export function isStale(date: ISODate | null, now: Date): boolean {
  return date === null || daysSince(date, now) > STALE_AFTER_DAYS;
}

/** Today's date in the Philippines (UTC+8), as "YYYY-MM-DD". */
export function manilaToday(now: Date): ISODate {
  return new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10) as ISODate;
}

/** Adds (or subtracts) whole days to a "YYYY-MM-DD" date. */
export function addDays(date: ISODate, days: number): ISODate {
  return new Date(parseISODate(date).getTime() + days * DAY_MS)
    .toISOString()
    .slice(0, 10) as ISODate;
}
