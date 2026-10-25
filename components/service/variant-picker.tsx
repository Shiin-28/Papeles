"use client";

import type { Variant } from "@/data/schema";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { VARIANT_INPUT, variantStorageKey } from "@/components/service/variants";

/** Native radios; CSS does the filtering. JS only remembers the choice. */
export function VariantPicker({ slug, variants }: { slug: string; variants: Variant[] }) {
  const [selected, setSelected] = useLocalStorage(variantStorageKey(slug), variants[0].id);
  const current = variants.some((v) => v.id === selected) ? selected : variants[0].id;

  return (
    <fieldset className="min-w-0 print:hidden">
      <legend className="mb-2 text-sm font-medium">Which applies to you?</legend>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:flex-col lg:pb-0">
        {variants.map((v) => (
          <label
            key={v.id}
            className="relative shrink-0 cursor-pointer rounded-full border bg-card px-3.5 py-2 text-sm font-medium lg:rounded-md transition-colors hover:bg-accent has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground has-focus-visible:ring-4 has-focus-visible:ring-ring/30"
          >
            <input
              type="radio"
              name={VARIANT_INPUT}
              value={v.id}
              checked={current === v.id}
              onChange={() => setSelected(v.id)}
              className="sr-only"
            />
            {v.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
