"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import type { ApiResult } from "@/lib/api";
import { addDays, manilaToday } from "@/lib/dates";
import { useNow } from "@/hooks/use-now";
import { WAIT_WINDOW_DAYS } from "@/lib/wait-stats";
import { Honeypot, SubmitButton, FieldError, fieldClass } from "@/components/reports/form-bits";

const HOURS = Array.from({ length: 13 }, (_, h) => h);
const MINUTES = [0, 15, 30, 45];

export function WaitTimeForm({
  slug,
  offices,
  onSubmitted,
}: {
  slug: string;
  offices: { id: string; name: string }[];
  onSubmitted: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Dates depend on the visitor's clock, so the form renders in the browser only.
  const now = useNow();
  if (!now) return null;
  const today = manilaToday(now);
  const earliest = addDays(today, -WAIT_WINDOW_DAYS);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const waitMinutes = Number(form.get("hours")) * 60 + Number(form.get("minutes"));
    if (waitMinutes < 1) {
      setFieldErrors({ waitMinutes: "Enter how long you waited." });
      return;
    }

    setPending(true);
    setError(null);
    setFieldErrors({});
    try {
      const res = await fetch("/api/wait-times", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: slug,
          officeId: form.get("officeId"),
          visitDate: form.get("visitDate"),
          waitMinutes,
          website: form.get("website") || undefined,
        }),
      });
      const body = (await res.json()) as ApiResult;
      if (body.ok) {
        setDone(true);
        onSubmitted();
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

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-success" role="status">
        <CircleCheck className="size-4" aria-hidden />
        Thanks! Your report helps others plan their trip.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="wt-office" className="text-sm font-medium">
          Branch
        </label>
        <select
          id="wt-office"
          name="officeId"
          required
          defaultValue={offices.length === 1 ? offices[0].id : ""}
          className={fieldClass}
        >
          {offices.length > 1 && (
            <option value="" disabled>
              Choose a branch
            </option>
          )}
          {offices.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
        <FieldError message={fieldErrors.officeId} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="wt-date" className="text-sm font-medium">
          Date of your visit
        </label>
        <input
          id="wt-date"
          name="visitDate"
          type="date"
          required
          min={earliest}
          max={today}
          defaultValue={today}
          className={fieldClass}
        />
        <FieldError message={fieldErrors.visitDate} />
      </div>

      <fieldset className="space-y-1.5">
        <legend className="text-sm font-medium">How long did you wait in total?</legend>
        <div className="flex gap-2">
          <select name="hours" defaultValue="1" aria-label="Hours" className={fieldClass}>
            {HOURS.map((h) => (
              <option key={h} value={h}>
                {h} {h === 1 ? "hour" : "hours"}
              </option>
            ))}
          </select>
          <select name="minutes" defaultValue="0" aria-label="Minutes" className={fieldClass}>
            {MINUTES.map((m) => (
              <option key={m} value={m}>
                {m} min
              </option>
            ))}
          </select>
        </div>
        <FieldError message={fieldErrors.waitMinutes} />
      </fieldset>

      <Honeypot />
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <SubmitButton pending={pending}>Submit wait time</SubmitButton>
      <p className="text-xs text-muted-foreground">
        Anonymous. We don&apos;t ask for your name, and your IP address is only stored scrambled
        (hashed) to block spam.
      </p>
    </form>
  );
}
