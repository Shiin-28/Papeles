import { ExternalLink, Flag } from "lucide-react";
import { isTodo, type Verifiable } from "@/data/schema";
import { cn } from "@/lib/utils";

/**
 * "Source" link and "Report" button under each requirement, fee, etc. Verification status lives
 * on the section title; an item only gets its own note when its section is partly verified.
 * Everything here is plain HTML: the report dialog listens for clicks on `data-report`.
 */
export function ItemMeta({
  item,
  report,
  note,
  className,
}: {
  item: Verifiable;
  /** reportKey(type, id) for this item. */
  report?: string;
  /** Show "Not yet verified" on this item (see needsItemNote). */
  note?: boolean;
  className?: string;
}) {
  const hasSource = !isTodo(item.sourceUrl);
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 empty:hidden", className)}>
      {note && (
        <span className="text-xs font-medium text-warning-foreground">Not yet verified</span>
      )}
      {hasSource && <SourceLink href={item.sourceUrl} />}
      {report && (
        <button
          type="button"
          data-report={report}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline print:hidden"
        >
          <Flag className="size-3" aria-hidden />
          Report
        </button>
      )}
    </div>
  );
}

export function SourceLink({ href, label = "Source" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
    >
      {label}
      <ExternalLink className="size-3" aria-hidden />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/**
 * Placeholder for a value that is still `TODO: verify`: a plain dash. The section title already
 * says the section isn't verified, so we don't repeat it on every value.
 */
export function TodoValue({ className }: { className?: string }) {
  return (
    <span className={cn("font-normal text-muted-foreground", className)} title="Not yet verified">
      —<span className="sr-only">not yet verified</span>
    </span>
  );
}
