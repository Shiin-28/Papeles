import { isTodo, type ProcessingTime } from "@/data/schema";
import { ItemMeta, TodoValue } from "@/components/service/item-meta";

export function ProcessingList({ items }: { items: ProcessingTime[] }) {
  return (
    <ul className="divide-y rounded-2xl border bg-card">
      {items.map((p) => (
        <li key={p.id} className="space-y-1 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-medium">{p.label}</p>
            <p className="font-semibold">{isTodo(p.duration) ? <TodoValue /> : p.duration}</p>
          </div>
          {p.notes && <p className="text-sm text-muted-foreground">{p.notes}</p>}
          <ItemMeta item={p} />
        </li>
      ))}
    </ul>
  );
}
