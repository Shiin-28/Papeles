import type { NextRequest } from "next/server";
import { getService } from "@/data/services";
import { db } from "@/lib/db";
import { fail, ok, readJson } from "@/lib/api";
import { addDays, manilaToday, parseISODate } from "@/lib/dates";
import { clientIp, hashIp, isRateLimited } from "@/lib/rate-limit";
import { WAIT_WINDOW_DAYS, fieldErrors, waitReportSchema } from "@/lib/validation";
import { MIN_REPORTS_FOR_AVERAGE, type OfficeWaitStats } from "@/lib/wait-stats";

/** Average and median wait per branch over the last 30 days. */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("service") ?? "";
  const service = getService(slug);
  if (!service) return fail("Unknown service.", 404);

  const since = parseISODate(addDays(manilaToday(new Date()), -WAIT_WINDOW_DAYS));
  const reports = await db.waitReport.findMany({
    where: { serviceSlug: slug, visitDate: { gte: since } },
    select: { officeId: true, waitMinutes: true, visitDate: true },
  });

  const offices: OfficeWaitStats[] = service.offices.map((office) => {
    const mine = reports.filter((r) => r.officeId === office.id);
    const minutes = mine.map((r) => r.waitMinutes).sort((a, b) => a - b);
    const enough = minutes.length >= MIN_REPORTS_FOR_AVERAGE;
    const latest = mine.reduce<Date | null>(
      (max, r) => (max === null || r.visitDate > max ? r.visitDate : max),
      null,
    );
    return {
      officeId: office.id,
      count: minutes.length,
      averageMinutes: enough
        ? Math.round(minutes.reduce((a, b) => a + b, 0) / minutes.length)
        : null,
      medianMinutes: enough ? median(minutes) : null,
      latestVisit: latest ? latest.toISOString().slice(0, 10) : null,
    };
  });

  return ok({ offices, windowDays: WAIT_WINDOW_DAYS, minReports: MIN_REPORTS_FOR_AVERAGE }, 200, {
    "Cache-Control": "no-store",
  });
}

/** Submit "I waited X at [branch] on [date]". */
export async function POST(request: NextRequest) {
  const body = await readJson(request);
  if (body === null) return fail("Invalid request.", 400);

  const parsed = waitReportSchema.safeParse(body);
  if (!parsed.success) {
    return fail("Please check the form.", 400, fieldErrors(parsed.error));
  }
  const { serviceSlug, officeId, waitMinutes, visitDate } = parsed.data;

  const ipHash = hashIp(clientIp(request));
  if (await isRateLimited("waitReport", ipHash)) {
    return fail("You've sent a few reports already. Please try again in an hour.", 429);
  }

  const date = new Date(`${visitDate}T00:00:00Z`);
  const duplicate = await db.waitReport.findFirst({
    where: { ipHash, serviceSlug, officeId, visitDate: date },
    select: { id: true },
  });
  if (duplicate) {
    return fail("You've already reported a wait time for this branch on that day.", 409);
  }

  await db.waitReport.create({
    data: { serviceSlug, officeId, waitMinutes, visitDate: date, ipHash },
  });
  return ok({}, 201);
}

function median(sorted: number[]): number {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}
