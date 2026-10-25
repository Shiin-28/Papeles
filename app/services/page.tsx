import type { Metadata } from "next";
import { getSearchEntries, services } from "@/data/services";
import { SearchBar } from "@/components/search/search-bar";
import { ServiceCard } from "@/components/service/service-card";

export const metadata: Metadata = {
  title: "All guides",
  description: "Every Philippine government service guide on Papeles.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">All guides</h1>
        <p className="text-muted-foreground">
          {services.length} services so far. More are on the way.
        </p>
      </div>
      <div className="max-w-2xl">
        <SearchBar entries={getSearchEntries()} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </div>
  );
}
