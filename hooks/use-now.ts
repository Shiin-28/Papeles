"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
let cachedNow: number | null = null;
const getSnapshot = () => (cachedNow ??= Date.now());
const getServerSnapshot = () => null;

/**
 * The current time, or `null` during prerender and hydration.
 * Pages are static, so anything relative to "today" (days ago, stale warnings) must be
 * computed in the browser rather than frozen at build time.
 */
export function useNow(): Date | null {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return now === null ? null : new Date(now);
}
