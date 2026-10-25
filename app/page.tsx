import { BadgeCheck } from "lucide-react";
import { getSearchEntries, services } from "@/data/services";
import { SearchBar } from "@/components/search/search-bar";
import { ServiceList } from "@/components/service/service-list";

export default function Home() {
  return (
    <>
      <section className="border-b bg-card">
        <div className="mx-auto max-w-3xl px-4 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            What do you need to get done?
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
            Step-by-step guides to Philippine government IDs, clearances, and certificates: what to
            bring, how much it costs, and where to go.
          </p>
          <div className="mt-6">
            <SearchBar entries={getSearchEntries()} />
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <BadgeCheck className="size-4 shrink-0 text-success" aria-hidden />
            Checked against official government sources. Each guide shows when.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <ServiceList services={services} />
      </div>
    </>
  );
}
