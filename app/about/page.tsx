import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { STALE_AFTER_DAYS } from "@/lib/dates";

export const metadata: Metadata = {
  title: "About",
  description: "How Papeles collects and verifies government requirements.",
};

/** General reference only: not tied to any one agency's accepted-ID rules. */
const COMMON_IDS: { name: string; issuer: string; guide?: string }[] = [
  {
    name: "Philippine National ID (PhilSys ID, ePhilID, Digital National ID)",
    issuer: "Philippine Statistics Authority (PSA)",
    guide: "national-id",
  },
  {
    name: "Philippine Passport",
    issuer: "Department of Foreign Affairs (DFA)",
    guide: "dfa-passport",
  },
  {
    name: "Driver's License",
    issuer: "Land Transportation Office (LTO)",
    guide: "lto-drivers-license",
  },
  {
    name: "PRC ID (professional license)",
    issuer: "Professional Regulation Commission (PRC)",
    guide: "prc-id-renewal",
  },
  {
    name: "UMID / SSS card (now the MySSS Card)",
    issuer: "Social Security System (SSS)",
    guide: "sss-mysss-card",
  },
  { name: "GSIS e-Card / GSIS Digital ID", issuer: "Government Service Insurance System (GSIS)" },
  { name: "Postal ID", issuer: "Philippine Postal Corporation (PHLPost)", guide: "postal-id" },
  {
    name: "Voter's ID or Voter's Certification",
    issuer: "Commission on Elections (COMELEC)",
    guide: "voters-certification",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-2 lg:gap-16 lg:px-8">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">About Papeles</h1>
          <p className="text-muted-foreground">
            A plain-language guide to Philippine government requirements.
          </p>
        </div>

        <div className="rounded-lg border border-warning-border bg-warning p-5 text-sm text-warning-foreground">
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
              Every requirement, fee, and step has a &ldquo;last verified&rdquo; date: the day
              someone last checked it against that source.
            </li>
            <li>
              If something hasn&apos;t been checked in {STALE_AFTER_DAYS} days, we show a yellow
              warning. Items marked &ldquo;Not yet verified&rdquo; haven&apos;t been confirmed at
              all.
            </li>
            <li>We would rather leave something blank than guess.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Help keep it accurate</h2>
          <p className="text-muted-foreground">
            See something that changed? Use &ldquo;Report outdated info&rdquo; on any guide. Waited
            at a branch? Share your wait time so others can plan their trip.
          </p>
        </section>
      </div>
      <div>
        <section id="common-ids" className="scroll-mt-20 space-y-3">
          <h2 className="text-xl font-semibold">Common government-issued IDs</h2>
          <p className="text-muted-foreground">
            These are widely used primary IDs in the Philippines. This is general information, not
            any agency&apos;s official list. Each agency decides which IDs it accepts, so always
            check the accepted-ID list in the guide or on the agency&apos;s official website.
          </p>
          <ul className="divide-y rounded-lg border bg-card text-sm">
            {COMMON_IDS.map((id) => (
              <li key={id.name} className="space-y-1 p-3">
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
                  <span className="font-medium">{id.name}</span>
                  <span className="text-muted-foreground">{id.issuer}</span>
                </div>
                {id.guide ? (
                  <Link
                    href={`/services/${id.guide}`}
                    className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                  >
                    How to get it
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                ) : (
                  <p className="text-xs text-muted-foreground">No guide yet.</p>
                )}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            A COMELEC Voter&apos;s Certification is a certificate rather than an ID card. Some
            agencies accept it and others don&apos;t.
          </p>
        </section>
      </div>
    </div>
  );
}
