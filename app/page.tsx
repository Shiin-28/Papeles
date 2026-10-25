import { BadgeCheck, ListChecks, Timer } from "lucide-react";
import { getSearchEntries, services } from "@/data/services";
import { SearchBar } from "@/components/search/search-bar";
import { PopularShortcuts } from "@/components/search/popular-shortcuts";
import { ServiceCard } from "@/components/service/service-card";

const FEATURES = [
  {
    icon: BadgeCheck,
    title: "Checked against official sources",
    body: "Every requirement and fee links to the agency page it came from, with the date we last checked it.",
  },
  {
    icon: ListChecks,
    title: "A checklist you can tick off",
    body: "Mark what you already have. Your progress stays on your phone, and you can print it.",
  },
  {
    icon: Timer,
    title: "Real wait times",
    body: "See how long people actually waited at each branch in the last 30 days, and share your own.",
  },
];

export default function Home() {
  const entries = getSearchEntries();

  return (
    <div className="mx-auto max-w-5xl px-4">
      <section className="flex flex-col items-center pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
        <p className="mb-4 inline-flex animate-fade-up rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          Philippine government requirements, step by step
        </p>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Know exactly what to bring.
        </h1>
        <p className="mt-4 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          Requirements, fees, steps, and wait times for government documents, so you get it done in
          one trip.
        </p>
        <div className="mt-8 w-full max-w-2xl">
          <SearchBar entries={entries} />
        </div>
        <div className="mt-5 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <PopularShortcuts entries={entries} />
        </div>
      </section>

      <section aria-labelledby="all-guides" className="pb-14">
        <h2 id="all-guides" className="mb-4 text-lg font-semibold">
          All guides
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <section
        aria-label="How Papeles works"
        className="grid defer-render gap-6 border-t py-12 sm:grid-cols-3"
      >
        {FEATURES.map((f) => (
          <div key={f.title} className="space-y-2">
            <f.icon className="size-6 text-primary" aria-hidden />
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
