import type { Metadata } from "next";
import { getSearchEntries, services } from "@/data/services";
import { StickySearch } from "@/components/search/sticky-search";
import { ServiceList } from "@/components/service/service-list";

export const metadata: Metadata = {
  title: "All guides",
  description: "Every Philippine government service guide on Papeles.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="bg-card">
        <div className="mx-auto max-w-7xl space-y-2 px-4 pt-8 pb-6 sm:pt-10 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">All guides</h1>
          <p className="text-muted-foreground">
            {services.length} guides so far. More are on the way.
          </p>
        </div>
      </div>
      <StickySearch entries={getSearchEntries()} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:px-8">
        <ServiceList services={services} />
      </div>
    </>
  );
}
