"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const EVENT = "papeles:storage";
/** Used when localStorage throws (blocked storage), so the UI still works for this visit. */
const memory = new Map<string, string>();

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key) ?? memory.get(key) ?? null;
  } catch {
    return memory.get(key) ?? null;
  }
}

function parse<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

/**
 * JSON value persisted in localStorage. Renders `fallback` on the server and during hydration,
 * then the stored value. Falls back to memory for this visit when storage is unavailable.
 * Pass a stable `fallback` (a primitive or a module-level constant).
 */
export function useLocalStorage<T>(key: string, fallback: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );
  const value = useMemo(() => parse(raw, fallback), [raw, fallback]);

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const current = parse(read(key), fallback);
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(current) : next;
      const json = JSON.stringify(resolved);
      try {
        window.localStorage.setItem(key, json);
        memory.delete(key);
      } catch {
        memory.set(key, json);
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [key, fallback],
  );

  return [value, setValue] as const;
}
