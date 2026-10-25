import { Building2, ExternalLink, Laptop, MapPin } from "lucide-react";
import { isTodo, type OnlineAvailability, type Service } from "@/data/schema";
import { ItemMeta, TodoValue } from "@/components/service/item-meta";

const ONLINE_LABEL: Record<OnlineAvailability, string> = {
  full: "Can be done fully online",
  partial: "Partly online, with an in-person visit",
  none: "In person only",
};

export function WhereToGo({ service }: { service: Service }) {
  const { online, offices, officeLocatorUrl } = service;

  return (
    <div className="space-y-4">
      <div className="flex gap-3 rounded-2xl border bg-card p-4">
        <Laptop className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
        <div className="min-w-0 space-y-1">
          <p className="font-medium">
            {isTodo(online.availability) ? (
              <>
                Online availability: <TodoValue />
              </>
            ) : (
              ONLINE_LABEL[online.availability]
            )}
          </p>
          {online.notes && <p className="text-sm text-muted-foreground">{online.notes}</p>}
          <ItemMeta item={online} />
        </div>
      </div>

      {offices.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {offices.map((o) => (
            <li key={o.id} className="space-y-1.5 rounded-2xl border bg-card p-4">
              <p className="flex items-start gap-2 font-medium leading-snug">
                <Building2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {o.name}
              </p>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  {isTodo(o.address) ? <TodoValue /> : o.address}
                  <span className="block text-xs">
                    {o.city}, {o.region}
                  </span>
                </span>
              </p>
              {o.hours && (
                <p className="text-sm text-muted-foreground">
                  Hours: {isTodo(o.hours) ? <TodoValue /> : o.hours}
                </p>
              )}
              {o.notes && <p className="text-sm text-muted-foreground">{o.notes}</p>}
              {!isTodo(o.address) && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Open in Maps
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
              )}
              <ItemMeta item={o} />
            </li>
          ))}
        </ul>
      )}

      {officeLocatorUrl && !isTodo(officeLocatorUrl) && (
        <a
          href={officeLocatorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          See all branches on the official site
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      )}
    </div>
  );
}
