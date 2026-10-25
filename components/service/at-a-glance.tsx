import { Clock, CircleDollarSign, Laptop } from "lucide-react";
import { isTodo, type OnlineAvailability, type Service } from "@/data/schema";
import { appliesAttr } from "@/components/service/variants";
import { formatPeso } from "@/lib/format";

const ONLINE_SHORT: Record<OnlineAvailability, string> = {
  full: "Fully online",
  partial: "Partly online",
  none: "In person only",
};

function Unverified() {
  return <span className="text-muted-foreground italic">Not yet verified</span>;
}

/**
 * Desktop-only summary column. Plain server HTML; fee rows carry `data-applies`, so the same
 * CSS variant filter that drives the main content applies here too.
 */
export function AtAGlance({ service }: { service: Service }) {
  return (
    <section
      aria-label="At a glance"
      className="max-h-[calc(100vh-6rem)] space-y-5 overflow-y-auto rounded-lg border bg-card p-5 text-sm"
    >
      <h2 className="font-semibold">At a glance</h2>

      <div className="space-y-2">
        <h3 className="flex items-center gap-1.5 font-medium text-muted-foreground">
          <CircleDollarSign className="size-4" aria-hidden />
          Cost
        </h3>
        <ul className="space-y-1.5">
          {service.fees.map((fee) => (
            <li key={fee.id} {...appliesAttr(fee)} className="flex justify-between gap-3">
              <span className="min-w-0">{fee.label}</span>
              <span className="shrink-0 font-semibold tabular-nums">
                {isTodo(fee.amount) ? <Unverified /> : formatPeso(fee.amount)}
              </span>
            </li>
          ))}
        </ul>
        <a href="#fees" className="inline-block text-primary hover:underline">
          Fee details
        </a>
      </div>

      <div className="space-y-2 border-t pt-4">
        <h3 className="flex items-center gap-1.5 font-medium text-muted-foreground">
          <Clock className="size-4" aria-hidden />
          Processing time
        </h3>
        <ul className="space-y-1.5">
          {service.processingTimes.map((p) => (
            <li key={p.id}>
              <span className="block text-muted-foreground">{p.label}</span>
              <span className="font-medium">
                {isTodo(p.duration) ? <Unverified /> : p.duration}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-1 border-t pt-4">
        <h3 className="flex items-center gap-1.5 font-medium text-muted-foreground">
          <Laptop className="size-4" aria-hidden />
          Online
        </h3>
        <p className="font-medium">
          {isTodo(service.online.availability) ? (
            <Unverified />
          ) : (
            ONLINE_SHORT[service.online.availability]
          )}
        </p>
        <a href="#where" className="inline-block text-primary hover:underline">
          Where to go
        </a>
      </div>
    </section>
  );
}
