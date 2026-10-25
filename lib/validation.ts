import { z } from "zod";
import { FLAG_ITEM_TYPES, type ISODate } from "@/data/schema";
import { getService } from "@/data/services";
import { addDays, manilaToday } from "@/lib/dates";
import { collectItems } from "@/lib/verification";
import { WAIT_WINDOW_DAYS } from "@/lib/wait-stats";

export { WAIT_WINDOW_DAYS };
export const MAX_WAIT_MINUTES = 12 * 60;
export const MAX_FLAG_MESSAGE = 500;

const slug = z.string().trim().min(1).max(80);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use the format YYYY-MM-DD.");
/** Hidden form field real people never fill in. */
const honeypot = z.string().max(0, "Spam detected.").optional();

export const waitReportSchema = z
  .object({
    serviceSlug: slug,
    officeId: z.string().trim().min(1).max(80),
    waitMinutes: z.coerce
      .number()
      .int("Wait time must be whole minutes.")
      .min(1, "Wait time must be at least 1 minute.")
      .max(MAX_WAIT_MINUTES, "Wait times over 12 hours aren't accepted."),
    visitDate: isoDate,
    website: honeypot,
  })
  .superRefine((data, ctx) => {
    const service = getService(data.serviceSlug);
    if (!service) {
      ctx.addIssue({ code: "custom", path: ["serviceSlug"], message: "Unknown service." });
      return;
    }
    if (!service.offices.some((o) => o.id === data.officeId)) {
      ctx.addIssue({ code: "custom", path: ["officeId"], message: "Pick a branch from the list." });
    }
    const today = manilaToday(new Date());
    const earliest = addDays(today, -WAIT_WINDOW_DAYS);
    const date = data.visitDate as ISODate;
    if (Number.isNaN(Date.parse(date)) || date > today || date < earliest) {
      ctx.addIssue({
        code: "custom",
        path: ["visitDate"],
        message: `Pick a date within the last ${WAIT_WINDOW_DAYS} days.`,
      });
    }
  });

export const flagSchema = z
  .object({
    serviceSlug: slug,
    itemType: z.enum(FLAG_ITEM_TYPES),
    itemId: z.string().trim().max(80).nullish(),
    message: z.string().trim().max(MAX_FLAG_MESSAGE).optional(),
    website: honeypot,
  })
  .superRefine((data, ctx) => {
    const service = getService(data.serviceSlug);
    if (!service) {
      ctx.addIssue({ code: "custom", path: ["serviceSlug"], message: "Unknown service." });
      return;
    }
    const exists = collectItems(service).some(
      (i) => i.type === data.itemType && i.id === (data.itemId || null),
    );
    if (!exists) {
      ctx.addIssue({ code: "custom", path: ["itemId"], message: "Unknown item." });
    }
  });

/** First error message per field, for showing next to form inputs. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
