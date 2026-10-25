import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/schema";
import { ServiceIcon } from "@/components/service/service-icon";
import { VerifiedDate } from "@/components/service/verified-badge";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col gap-4 rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ServiceIcon slug={service.slug} />
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
          {service.agency.acronym}
        </span>
      </div>
      <div className="flex-1 space-y-1.5">
        <h3 className="font-semibold leading-snug">{service.name}</h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{service.summary}</p>
      </div>
      <div className="flex items-center justify-between gap-2 text-xs">
        <VerifiedDate date={service.lastVerified} />
        <ArrowRight
          className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </div>
    </Link>
  );
}
