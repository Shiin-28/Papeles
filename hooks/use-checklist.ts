"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

type Checked = Record<string, true>;
const EMPTY: Checked = {};

/** Ticked requirement ids for one service, saved on this device. */
export function useChecklist(slug: string) {
  const [checked, setChecked] = useLocalStorage<Checked>(`papeles:checklist:${slug}`, EMPTY);

  const toggle = useCallback(
    (id: string, on: boolean) =>
      setChecked((prev) => {
        const next = { ...prev };
        if (on) next[id] = true;
        else delete next[id];
        return next;
      }),
    [setChecked],
  );
  const reset = useCallback(() => setChecked(EMPTY), [setChecked]);

  return { checked, toggle, reset };
}
