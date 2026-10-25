import { createHash } from "node:crypto";
import { db } from "@/lib/db";

const HOUR_MS = 60 * 60 * 1000;

export const LIMITS = {
  waitReport: { max: 5, windowMs: HOUR_MS },
  flag: { max: 10, windowMs: HOUR_MS },
} as const;

/** Best-effort client IP. Behind a proxy/CDN, make sure it sets X-Forwarded-For. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Salted hash so raw IPs are never stored. */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT;
  if (!salt && process.env.NODE_ENV === "production") {
    throw new Error("IP_HASH_SALT must be set in production.");
  }
  return createHash("sha256")
    .update(`${salt ?? "dev-salt"}:${ip}`)
    .digest("hex");
}

/**
 * Counts this IP's recent submissions in the database, so limits survive restarts and work
 * across server instances that share the database.
 */
export async function isRateLimited(kind: keyof typeof LIMITS, ipHash: string): Promise<boolean> {
  const { max, windowMs } = LIMITS[kind];
  const since = new Date(Date.now() - windowMs);
  const where = { ipHash, createdAt: { gte: since } };
  const count =
    kind === "waitReport"
      ? await db.waitReport.count({ where })
      : await db.outdatedFlag.count({ where });
  return count >= max;
}
