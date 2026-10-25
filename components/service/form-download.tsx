import { FileDown } from "lucide-react";
import type { FormFile } from "@/data/schema";
import { cn } from "@/lib/utils";

export function formatSize(kb: number): string {
  return kb < 1000 ? `${Math.round(kb)} KB` : `${(kb / 1024).toFixed(1)} MB`;
}

/** Download button for an official form, with format and size for people on mobile data. */
export function FormDownload({ form, className }: { form: FormFile; className?: string }) {
  return (
    <a
      href={form.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-md border border-primary/30 bg-accent px-3 py-2 text-sm font-medium text-accent-foreground hover:border-primary/60 print:hidden",
        className,
      )}
    >
      <FileDown className="size-4 shrink-0" aria-hidden />
      <span className="min-w-0">
        Download {form.name}
        <span className="ml-1.5 text-xs font-normal text-muted-foreground">
          {form.format}
          {form.sizeKB ? ` · ${formatSize(form.sizeKB)}` : ""}
        </span>
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
