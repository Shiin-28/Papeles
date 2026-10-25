import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isTodo, type Requirement } from "@/data/schema";
import { ItemMeta } from "@/components/service/item-meta";
import { FormDownload } from "@/components/service/form-download";
import { formatCopy } from "@/lib/format";
import { reportKey } from "@/lib/verification";

/** Content of one requirement. The checklist adds the checkbox around it. */
export function RequirementRow({ req, note }: { req: Requirement; note?: boolean }) {
  // Unknown values are simply left out; the section title shows the verification status.
  const copy =
    req.copy === undefined || isTodo(req.copy)
      ? null
      : formatCopy(req.copy, isTodo(req.copies) ? undefined : req.copies);

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
      {req.form && <FormDownload form={req.form} className="mt-1" />}

      {req.acceptableIds !== undefined &&
        (isTodo(req.acceptableIds) ? (
          <p className="text-sm text-muted-foreground">
            The list of accepted IDs isn&apos;t here yet.{" "}
            <Link
              href="/about#common-ids"
              className="text-primary underline-offset-4 hover:underline print:hidden"
            >
              See common government IDs
            </Link>
          </p>
        ) : (
          <details className="group text-sm">
            <summary className="cursor-pointer font-medium text-primary marker:text-muted-foreground print:hidden">
              {req.acceptableIdsAreExamples ? "Examples of accepted IDs" : "Accepted IDs"} (
              {req.acceptableIds.length})
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
        note={note}
        className="pt-0.5 print:hidden"
      />
    </div>
  );
}
