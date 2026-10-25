import type { Service } from "@/data/schema";

export const GUIDE_ID = "guide";
export const VARIANT_INPUT = "variant";

export function variantStorageKey(slug: string) {
  return `papeles:variant:${slug}`;
}

/** Spread onto any element whose item has `appliesTo`, so CSS can hide it for other variants. */
export function appliesAttr(item: { appliesTo?: string[] }) {
  return item.appliesTo ? { "data-applies": item.appliesTo.join(" ") } : {};
}

/**
 * Variant filtering is pure CSS: when a variant's radio is checked, items that don't apply to
 * it are hidden. Works before (and without) JavaScript. Ids are validated as kebab-case.
 */
export function VariantStyles({ service }: { service: Service }) {
  if (!service.variants?.length) return null;
  const css = service.variants
    .map(
      (v) =>
        `#${GUIDE_ID}:has(input[name="${VARIANT_INPUT}"][value="${v.id}"]:checked) [data-applies]:not([data-applies~="${v.id}"]){display:none}`,
    )
    .join("\n");
  return <style>{css}</style>;
}
