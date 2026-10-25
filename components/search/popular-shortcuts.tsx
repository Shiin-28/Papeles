import Link from "next/link";
import type { SearchEntry } from "@/data/services";
import { ServiceIcon } from "@/components/service/service-icon";

export function PopularShortcuts({ entries }: { entries: SearchEntry[] }) {
  const popular = entries.filter((e) => e.popular);
  if (popular.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="mr-1 text-sm text-muted-foreground">Popular:</span>
      {popular.map((e) => (
        <Link
          key={e.slug}
          href={`/services/${e.slug}`}
          className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
        >
          <ServiceIcon slug={e.slug} className="size-4 text-primary" />
          {e.shortName}
        </Link>
      ))}
    </div>
  );
}
