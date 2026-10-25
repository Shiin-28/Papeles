import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isTodo, type Requirement } from "@/data/schema";
import { ItemMeta, TodoValue } from "@/components/service/item-meta";
import { formatCopy } from "@/lib/format";
import { reportKey } from "@/lib/verification";

/** Content of one requirement. The checklist adds the checkbox around it. */
export function RequirementRow({ req }: { req: Requirement }) {
  // An unverified item already shows a "Not yet verified" chip, so skip its TODO copy line.
  const copy =
    req.copy === undefined || (isTodo(req.copy) && req.lastVerified === null) ? null : isTodo(
        req.copy,
      ) ? (
      <TodoValue />
    ) : (
      formatCopy(req.copy, isTodo(req.copies) ? undefined : req.copies)
    );

  return (
    <div className="min-w-0 flex-1 space-y-1.5">
      <p className="font-medium leading-snug">
        {req.name}
        {req.conditional && (
          <span className="ml-2 inline-block rounded-full bg-secondary px-2 py-0.5 align-middle text-xs font-medium text-secondary-foreground">
            If applicable
          </span>
        )}
      </p>
      {copy && <p className="text-sm text-muted-foreground">{copy}</p>}
      {req.notes && <p className="text-sm text-muted-foreground">{req.notes}</p>}

      {req.acceptableIds !== undefined &&
        (isTodo(req.acceptableIds) ? (
          <p className="text-sm text-muted-foreground">
            Accepted IDs: <TodoValue />
          </p>
        ) : (
          <details className="group text-sm">
            <summary className="cursor-pointer font-medium text-primary marker:text-muted-foreground print:hidden">
              Accepted IDs ({req.acceptableIds.length})
            </summary>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {req.acceptableIds.map((id) => (
                <li key={id} className="rounded-md border bg-background px-2 py-0.5 text-xs">
                  {id}
                </li>
              ))}
            </ul>
          </details>
        ))}

      {req.relatedService && (
        <Link
          href={`/services/${req.relatedService}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline print:hidden"
        >
          How to get this
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      )}
      <ItemMeta
        item={req}
        report={reportKey("requirement", req.id)}
        className="pt-0.5 print:hidden"
      />
    </div>
  );
}
