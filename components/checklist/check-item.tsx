"use client";

import { useChecklist } from "@/hooks/use-checklist";

/** Native checkbox; the row's checked styling is done in CSS with :has(). */
export function CheckItem({ slug, id, label }: { slug: string; id: string; label: string }) {
  const { checked, toggle } = useChecklist(slug);

  return (
    <input
      type="checkbox"
      aria-label={`I have: ${label}`}
      checked={checked[id] === true}
      onChange={(e) => toggle(id, e.target.checked)}
      className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-primary"
    />
  );
}
