import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CATEGORIES, type Service } from "@/data/schema";
import { ServiceIcon } from "@/components/service/service-icon";
import { formatDate } from "@/lib/dates";

/**
 * Guides grouped by category, as plain links. Rendered entirely on the server: no client
 * components per row, so the list costs nothing to hydrate on low-end phones.
 */
export function ServiceList({ services }: { services: Service[] }) {
  return (
    <div className="space-y-8">
      {CATEGORIES.map((cat) => {
        const items = services.filter((s) => s.category === cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
            <h2
              id={`cat-${cat.id}`}
              className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
            >
              {cat.label}
            </h2>
            <ul className="divide-y overflow-hidden rounded-lg border bg-card">
              {items.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-3 px-4 py-3.5 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <ServiceIcon slug={s.slug} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium leading-snug">{s.name}</span>
                      <span className="block text-sm text-muted-foreground">
                        {s.agency.acronym}
                        {" · "}
                        {s.lastVerified ? (
                          <>Checked {formatDate(s.lastVerified)}</>
                        ) : (
                          <span className="text-warning-foreground dark:text-warning-foreground">
                            Not yet verified
                          </span>
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
