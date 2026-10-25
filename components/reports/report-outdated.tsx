"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { CircleCheck, Flag, X } from "lucide-react";
import type { ApiResult } from "@/lib/api";
import { FieldError, Honeypot, SubmitButton, fieldClass } from "@/components/reports/form-bits";

export interface ReportOption {
  /** "type:id", e.g. "fee:clearance-fee" or "payment:". */
  value: string;
  label: string;
  group: string;
}

const MAX_MESSAGE = 500;

/**
 * "Report outdated info" button + native <dialog>.
 * Per-item "Report" buttons are plain HTML with `data-report="type:id"`; one listener here
 * opens the dialog with that item preselected, so there's no per-item JavaScript.
 */
export function ReportOutdated({ slug, options }: { slug: string; options: ReportOption[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(options[0]?.value ?? "");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function open(value?: string) {
    if (value && options.some((o) => o.value === value)) setSelected(value);
    setDone(false);
    setError(null);
    setFieldErrors({});
    dialogRef.current?.showModal();
  }

  const onDocumentClick = useEffectEvent((e: MouseEvent) => {
    const trigger = (e.target as Element | null)?.closest<HTMLElement>("[data-report]");
    if (trigger) open(trigger.dataset.report);
  });
  useEffect(() => {
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const [itemType, itemId] = selected.split(":");
    setPending(true);
    setError(null);
    setFieldErrors({});
    try {
      const res = await fetch("/api/flags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: slug,
          itemType,
          itemId: itemId || null,
          message: message.trim() || undefined,
          website: new FormData(e.currentTarget).get("website") || undefined,
        }),
      });
      const body = (await res.json()) as ApiResult;
      if (body.ok) {
        setDone(true);
        setMessage("");
      } else {
        setError(body.error);
        setFieldErrors(body.fieldErrors ?? {});
      }
    } catch {
      setError("Couldn't send your report. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  const groups = [...new Set(options.map((o) => o.group))];

  return (
    <>
      <button
        type="button"
        onClick={() => open()}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-none"
      >
        <Flag className="size-4" aria-hidden />
        Report outdated info
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="report-title"
        className="m-auto w-[calc(100%-2rem)] max-w-md animate-pop-in rounded-2xl border bg-popover p-0 text-popover-foreground shadow-xl backdrop:bg-black/50"
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 id="report-title" className="font-semibold">
            Report outdated info
          </h2>
          <form method="dialog">
            <button
              type="submit"
              aria-label="Close"
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </form>
        </div>

        {done ? (
          <div className="space-y-4 p-5">
            <p className="flex items-center gap-2 font-medium text-success" role="status">
              <CircleCheck className="size-5" aria-hidden />
              Thanks! We&apos;ll check it against the official source.
            </p>
            <form method="dialog">
              <button
                type="submit"
                className="h-11 w-full rounded-xl border text-sm font-semibold hover:bg-accent"
              >
                Close
              </button>
            </form>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="relative space-y-4 p-5">
            <div className="space-y-1.5">
              <label htmlFor="report-item" className="text-sm font-medium">
                What looks wrong?
              </label>
              <select
                id="report-item"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className={fieldClass}
              >
                {groups.map((g) => (
                  <optgroup key={g} label={g}>
                    {options
                      .filter((o) => o.group === g)
                      .map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
              <FieldError message={fieldErrors.itemId ?? fieldErrors.itemType} />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="report-message" className="text-sm font-medium">
                What changed? <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <textarea
                id="report-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={MAX_MESSAGE}
                rows={3}
                placeholder="e.g. The fee is now ₱155 on the official site."
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-base outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20"
              />
              <p className="text-right text-xs text-muted-foreground">
                {message.length}/{MAX_MESSAGE}
              </p>
              <FieldError message={fieldErrors.message} />
            </div>

            <Honeypot />
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <SubmitButton pending={pending}>Send report</SubmitButton>
          </form>
        )}
      </dialog>
    </>
  );
}
