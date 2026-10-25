/** Shape of every API response. Shared with the client, so no server imports here. */
export type ApiResult<T = object> =
  ({ ok: true } & T) | { ok: false; error: string; fieldErrors?: Record<string, string> };

export function ok<T extends object>(data: T, status = 200, headers?: HeadersInit) {
  return Response.json({ ok: true, ...data }, { status, headers });
}

export function fail(error: string, status: number, fieldErrors?: Record<string, string>) {
  return Response.json({ ok: false, error, fieldErrors }, { status });
}

/** Parses a JSON body, capped at a few KB (these forms are tiny). */
export async function readJson(request: Request): Promise<unknown | null> {
  const text = await request.text();
  if (text.length > 4_000) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
