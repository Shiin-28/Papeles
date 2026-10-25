import type { Metadata } from "next";
import { getSearchEntries, services } from "@/data/services";
import { SearchBar } from "@/components/search/search-bar";
import { ServiceList } from "@/components/service/service-list";

export const metadata: Metadata = {
  title: "All guides",
  description: "Every Philippine government service guide on Papeles.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:py-10 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">All guides</h1>
          <p className="text-muted-foreground">
            {services.length} guides so far. More are on the way.
          </p>
        </div>
        <div className="w-full lg:max-w-md">
          <SearchBar entries={getSearchEntries()} />
        </div>
      </div>
      <ServiceList services={services} />
    </div>
  );
}
