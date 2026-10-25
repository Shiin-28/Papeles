import { isTodo, type Fee, type Payment } from "@/data/schema";
import { ItemMeta, TodoValue } from "@/components/service/item-meta";
import { appliesAttr } from "@/components/service/variants";
import { formatPeso } from "@/lib/format";
import { reportKey } from "@/lib/verification";

export function FeesList({ fees, payment }: { fees: Fee[]; payment: Payment }) {
  return (
    <div className="space-y-4">
      <ul className="divide-y rounded-2xl border bg-card">
        {fees.map((fee) => (
          <li key={fee.id} {...appliesAttr(fee)} className="flex gap-4 p-4">
            <div className="min-w-0 flex-1 space-y-1">
              <p className="font-medium leading-snug">{fee.label}</p>
              {fee.notes && <p className="text-sm text-muted-foreground">{fee.notes}</p>}
              <ItemMeta item={fee} report={reportKey("fee", fee.id)} />
            </div>
            <p className="shrink-0 text-right text-lg font-semibold tabular-nums">
              {isTodo(fee.amount) ? <TodoValue /> : formatPeso(fee.amount)}
            </p>
          </li>
        ))}
      </ul>

      <div className="space-y-2 rounded-2xl border bg-card p-4">
        <p className="font-medium">How to pay</p>
        {isTodo(payment.methods) ? (
          <TodoValue />
        ) : (
          payment.methods.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {payment.methods.map((m) => (
                <li key={m} className="rounded-lg bg-secondary px-2.5 py-1 text-sm">
                  {m}
                </li>
              ))}
            </ul>
          )
        )}
        {payment.notes && <p className="text-sm text-muted-foreground">{payment.notes}</p>}
        <ItemMeta item={payment} report={reportKey("payment")} />
      </div>
    </div>
  );
}
