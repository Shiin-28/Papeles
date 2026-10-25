import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CATEGORIES, type Service } from "@/data/schema";
import { ServiceIcon } from "@/components/service/service-icon";
import { formatDate } from "@/lib/dates";

/**
 * Guides grouped by category: one column on phones, up to four on wide screens.
 * Rendered entirely on the server: no client components per tile, so nothing to hydrate.
 */
export function ServiceList({ services }: { services: Service[] }) {
  return (
    <div className="space-y-10">
      {CATEGORIES.map((cat) => {
        const items = services.filter((s) => s.category === cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
            <h2
              id={`cat-${cat.id}`}
              className="mb-3 flex items-baseline gap-2 text-lg font-semibold"
            >
              {cat.label}
              <span className="text-sm font-normal text-muted-foreground">{items.length}</span>
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex h-full items-center gap-3 rounded-lg border bg-card p-4 hover:border-primary/50 hover:bg-accent focus-visible:border-primary focus-visible:outline-none"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <ServiceIcon slug={s.slug} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium leading-snug">{s.name}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {s.agency.acronym}
                        {" · "}
                        {s.lastVerified ? (
                          <>Checked {formatDate(s.lastVerified)}</>
                        ) : (
                          <span className="text-warning-foreground">Not yet verified</span>
                        )}
                      </span>
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
