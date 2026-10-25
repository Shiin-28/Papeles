import { ExternalLink } from "lucide-react";
import type { Service } from "@/data/schema";
import { groupSources } from "@/lib/verification";
import { prettyUrl } from "@/lib/format";

export function SourcesList({ service }: { service: Service }) {
  const sources = groupSources(service);
  if (sources.length === 0) {
    return <p className="text-sm text-muted-foreground">No official sources confirmed yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {sources.map((s) => (
        <li key={s.url} className="rounded-xl border bg-card p-3 text-sm">
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-1.5 font-medium break-all text-primary hover:underline"
          >
            {prettyUrl(s.url)}
            <ExternalLink className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          </a>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Used for {s.items.length} {s.items.length === 1 ? "item" : "items"}
          </p>
        </li>
      ))}
    </ul>
  );
}
