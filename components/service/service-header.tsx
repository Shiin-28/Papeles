import Link from "next/link";
import { CalendarCheck, ChevronLeft, ExternalLink, Globe } from "lucide-react";
import { isTodo, type Service } from "@/data/schema";
import { ServiceIcon } from "@/components/service/service-icon";
import { VerifiedDate } from "@/components/service/verified-badge";
import { StaleWarning } from "@/components/service/stale-warning";
import { countUnverified } from "@/lib/verification";
import { cn } from "@/lib/utils";

const buttonBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-none";

export function ServiceHeader({
  service,
  actions,
}: {
  service: Service;
  /** Extra buttons (share, report) rendered next to the official links. */
  actions?: React.ReactNode;
}) {
  const officialUrl = isTodo(service.agency.officialUrl) ? null : service.agency.officialUrl;
  const appointmentUrl =
    service.appointment && !isTodo(service.appointment.url) ? service.appointment.url : null;

  return (
    <header className="space-y-5">
      <Link
        href="/services"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground print:hidden"
      >
        <ChevronLeft className="size-4" aria-hidden />
        All guides
      </Link>

      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary print:hidden">
          <ServiceIcon slug={service.slug} className="size-6" />
        </span>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            {service.agency.name} ({service.agency.acronym})
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {service.name}
          </h1>
        </div>
      </div>

      <p className="text-pretty text-muted-foreground">{service.summary}</p>

      <VerifiedDate date={service.lastVerified} className="text-sm" />

      <StaleWarning
        lastVerified={service.lastVerified}
        unverifiedCount={countUnverified(service)}
        officialUrl={officialUrl}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap print:hidden">
        {officialUrl ? (
          <a
            href={officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonBase, "bg-primary text-primary-foreground hover:bg-primary/90")}
          >
            <Globe className="size-4" aria-hidden />
            Official website
            <ExternalLink className="size-3.5 opacity-70" aria-hidden />
          </a>
        ) : (
          <span className={cn(buttonBase, "bg-muted text-muted-foreground")}>
            Official website: not yet verified
          </span>
        )}
        {appointmentUrl && (
          <a
            href={appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonBase,
              "border bg-card hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <CalendarCheck className="size-4" aria-hidden />
            {service.appointment?.label}
            <ExternalLink className="size-3.5 opacity-70" aria-hidden />
          </a>
        )}
        {actions}
      </div>
    </header>
  );
}
