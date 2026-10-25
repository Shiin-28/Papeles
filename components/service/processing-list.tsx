import { isTodo, type ProcessingTime } from "@/data/schema";
import { ItemMeta, TodoValue } from "@/components/service/item-meta";
import { reportKey } from "@/lib/verification";

export function ProcessingList({ items, notes }: { items: ProcessingTime[]; notes?: Set<string> }) {
  return (
    <ul className="divide-y rounded-lg border bg-card">
      {items.map((p) => (
        <li key={p.id} className="space-y-1 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-medium">{p.label}</p>
            <p className="font-semibold">{isTodo(p.duration) ? <TodoValue /> : p.duration}</p>
          </div>
          {p.notes && <p className="text-sm text-muted-foreground">{p.notes}</p>}
          <ItemMeta item={p} report={reportKey("processingTime", p.id)} note={notes?.has(p.id)} />
        </li>
      ))}
    </ul>
  );
}
