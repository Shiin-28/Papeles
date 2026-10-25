/** Shared between the wait-times API and the client. No server imports here. */

/** Wait-time averages cover this many days. Older visits can't be reported. */
export const WAIT_WINDOW_DAYS = 30;

/** Fewer reports than this and we show the count but no average. */
export const MIN_REPORTS_FOR_AVERAGE = 2;

export interface OfficeWaitStats {
  officeId: string;
  count: number;
  averageMinutes: number | null;
  medianMinutes: number | null;
  latestVisit: string | null;
}

export interface WaitStatsResponse {
  offices: OfficeWaitStats[];
  windowDays: number;
  minReports: number;
}

/** "45 min", "1 hr 30 min", "2 hr". */
export function formatMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}
