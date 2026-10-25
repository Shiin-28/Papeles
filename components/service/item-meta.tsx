import { ExternalLink } from "lucide-react";
import { isTodo, type Verifiable } from "@/data/schema";
import { ItemVerifiedChip } from "@/components/service/verified-badge";
import { cn } from "@/lib/utils";

/** Verification chip + "Source" link shown under each requirement, fee, step, etc. */
export function ItemMeta({ item, className }: { item: Verifiable; className?: string }) {
  const hasSource = !isTodo(item.sourceUrl);
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 empty:hidden", className)}>
      <ItemVerifiedChip date={item.lastVerified} />
      {hasSource && <SourceLink href={item.sourceUrl} />}
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

/** Placeholder for any value that is still `TODO: verify`. */
export function TodoValue({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-sm font-normal text-muted-foreground italic",
        className,
      )}
    >
      Not yet verified
    </span>
  );
}
