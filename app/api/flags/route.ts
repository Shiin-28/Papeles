import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { fail, ok, readJson } from "@/lib/api";
import { clientIp, hashIp, isRateLimited } from "@/lib/rate-limit";
import { fieldErrors, flagSchema } from "@/lib/validation";

/** Flag a service, requirement, fee, etc. as outdated. */
export async function POST(request: NextRequest) {
  const body = await readJson(request);
  if (body === null) return fail("Invalid request.", 400);

  const parsed = flagSchema.safeParse(body);
  if (!parsed.success) {
    return fail("Please check the form.", 400, fieldErrors(parsed.error));
  }
  const { serviceSlug, itemType, itemId, message } = parsed.data;

  const ipHash = hashIp(clientIp(request));
  if (await isRateLimited("flag", ipHash)) {
    return fail("You've sent several reports already. Please try again in an hour.", 429);
  }

  await db.outdatedFlag.create({
    data: {
      serviceSlug,
      itemType,
      itemId: itemId || null,
      message: message || null,
      ipHash,
    },
  });
  return ok({}, 201);
}
