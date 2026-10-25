import type { Metadata } from "next";
import { STALE_AFTER_DAYS } from "@/lib/dates";

export const metadata: Metadata = {
  title: "About",
  description: "How Papeles collects and verifies government requirements.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">About Papeles</h1>
        <p className="text-muted-foreground">
          A plain-language guide to Philippine government requirements.
        </p>
      </div>

      <div className="rounded-2xl border border-warning-border bg-warning p-5 text-sm text-warning-foreground">
        <p className="font-semibold">Papeles is not a government website.</p>
        <p className="mt-1">
          We aren&apos;t affiliated with DFA, NBI, PSA, LTO, BIR, or any agency. We never ask for
          payments or personal documents. Always book and pay only through the agency&apos;s
          official site.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How we verify information</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            We only use official sources: government websites (usually ending in .gov.ph) and the
            agency&apos;s own online portals. Each item links to its source.
          </li>
          <li>
            Every requirement, fee, and step has a &ldquo;last verified&rdquo; date: the day someone
            last checked it against that source.
          </li>
          <li>
            If something hasn&apos;t been checked in {STALE_AFTER_DAYS} days, we show a yellow
            warning. Items marked &ldquo;Not yet verified&rdquo; haven&apos;t been confirmed at all.
          </li>
          <li>We would rather leave something blank than guess.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Help keep it accurate</h2>
        <p className="text-muted-foreground">
          See something that changed? Use &ldquo;Report outdated info&rdquo; on any guide. Waited at
          a branch? Share your wait time so others can plan their trip.
        </p>
      </section>
    </div>
  );
}
