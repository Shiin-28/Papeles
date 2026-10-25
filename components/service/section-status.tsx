import { CircleHelp } from "lucide-react";
import { StaleBadge } from "@/components/service/verified-badge";
import { sectionCounts, type Dated } from "@/lib/verification";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-warning-border bg-warning px-2 py-0.5 text-xs font-medium text-warning-foreground">
      <CircleHelp className="size-3" aria-hidden />
      {children}
    </span>
  );
}

/**
 * One verification label next to a section title, instead of one on every item.
 * Rendered once per variant with `data-applies`, so the CSS variant filter shows the right one.
 */
export function SectionStatus({ items, keys }: { items: Dated[]; keys: (string | null)[] }) {
  return keys.map((key) => {
    const { total, unverified, verifiedDates } = sectionCounts(items, key);
    if (total === 0) return null;
    const label =
      unverified === total ? (
        <Pill>Not yet verified</Pill>
      ) : unverified > 0 ? (
        <Pill>Partly verified</Pill>
      ) : (
        <StaleBadge dates={verifiedDates} />
      );
    return (
      <span key={key ?? "all"} className="inline-flex" {...(key ? { "data-applies": key } : {})}>
        {label}
      </span>
    );
  });
}
