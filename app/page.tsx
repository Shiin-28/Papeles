import { BadgeCheck, ListChecks, MapPin, Search } from "lucide-react";
import { getSearchEntries, services } from "@/data/services";
import { SearchBar } from "@/components/search/search-bar";
import { ServiceList } from "@/components/service/service-list";

const HOW_IT_WORKS = [
  {
    icon: Search,
    title: "Find your document",
    body: "Search for the ID, clearance, or certificate you need.",
  },
  {
    icon: ListChecks,
    title: "Prepare your requirements",
    body: "Tick off a checklist of what to bring, and print it if you like.",
  },
  {
    icon: MapPin,
    title: "Go once, go prepared",
    body: "Know the fees, the steps, where to go, and how long people waited.",
  },
];

export default function Home() {
  return (
    <>
      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:py-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:px-8 lg:py-16">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              What do you need to get done?
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-muted-foreground lg:text-lg">
              Step-by-step guides to Philippine government IDs, clearances, and certificates: what
              to bring, how much it costs, and where to go.
            </p>
            <div className="mt-6 max-w-2xl" data-primary-search>
              <SearchBar entries={getSearchEntries()} />
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <BadgeCheck className="size-4 shrink-0 text-success" aria-hidden />
              Checked against official government sources. Each guide shows when.
            </p>
          </div>

          <ol className="hidden space-y-5 rounded-lg border bg-background p-6 lg:block">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <step.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold">
                    {i + 1}. {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <ServiceList services={services} />
      </div>
    </>
  );
}
