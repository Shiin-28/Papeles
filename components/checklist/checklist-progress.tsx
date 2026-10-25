"use client";

import { CircleCheck, Printer, RotateCcw } from "lucide-react";
import type { Variant } from "@/data/schema";
import { useChecklist } from "@/hooks/use-checklist";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { variantStorageKey } from "@/components/service/variants";
import { forVariant } from "@/lib/verification";

interface ChecklistItem {
  id: string;
  appliesTo?: string[];
  conditional?: boolean;
}

export function ChecklistProgress({
  slug,
  items,
  variants,
}: {
  slug: string;
  items: ChecklistItem[];
  variants?: Variant[];
}) {
  const { checked, reset } = useChecklist(slug);
  const [storedVariant] = useLocalStorage<string | null>(
    variantStorageKey(slug),
    variants?.[0]?.id ?? null,
  );
  const variant = variants?.find((v) => v.id === storedVariant) ?? variants?.[0] ?? null;

  const visible = forVariant(items, variant?.id ?? null);
  const required = visible.filter((i) => !i.conditional);
  const done = required.filter((i) => checked[i.id]).length;
  const optional = visible.length - required.length;
  const anyChecked = visible.some((i) => checked[i.id]);
  const complete = required.length > 0 && done === required.length;
  const percent = required.length ? Math.round((done / required.length) * 100) : 0;

  function print() {
    // Expand "Accepted IDs" lists so they appear on paper.
    document.querySelectorAll<HTMLDetailsElement>("#requirements details").forEach((d) => {
      d.open = true;
    });
    window.print();
  }

  return (
    <div className="space-y-3 rounded-lg border bg-card p-4 print:border-0 print:p-0">
      {variant && (
        <p className="hidden text-sm font-medium print:block">Checklist for: {variant.label}</p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 print:hidden">
        <p className="text-sm font-medium" aria-live="polite">
          {complete ? (
            <span className="inline-flex items-center gap-1.5 text-success">
              <CircleCheck className="size-4" aria-hidden />
              You have everything you need
            </span>
          ) : required.length === 0 ? (
            <span className="font-normal text-muted-foreground">
              Nothing is required from everyone. Tick the items that apply to you.
            </span>
          ) : (
            <>
              {done} of {required.length} ready
              {optional > 0 && (
                <span className="font-normal text-muted-foreground">
                  {" "}
                  · {optional} more if they apply to you
                </span>
              )}
            </>
          )}
        </p>
        <div className="flex gap-1">
          {anyChecked && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <RotateCcw className="size-4" aria-hidden />
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={print}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <Printer className="size-4" aria-hidden />
            Print / Save as PDF
          </button>
        </div>
      </div>
      {required.length > 0 && (
        <div
          className="h-2 overflow-hidden rounded-full bg-muted print:hidden"
          role="progressbar"
          aria-label="Checklist progress"
          aria-valuemin={0}
          aria-valuemax={required.length}
          aria-valuenow={done}
        >
          <div
            className="h-full rounded-full bg-success transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
      <p className="text-xs text-muted-foreground print:hidden">Saved on this device only.</p>
    </div>
  );
}
