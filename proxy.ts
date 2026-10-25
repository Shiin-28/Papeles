import { NextResponse, type NextRequest } from "next/server";
import { services } from "@/data/services";

const slugs = new Set(services.map((s) => s.slug));

/**
 * Service pages use Partial Prerendering, so an unknown slug would stream the not-found UI
 * with a 200 status. Rewriting to a route that doesn't exist returns a real 404 instead.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !slugs.has(slug)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/services/:slug",
};
