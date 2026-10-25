import { isTodo, type FlagItemType, type ISODate, type Maybe, type Service } from "@/data/schema";

/** Any data item a user can see, verify, or flag. */
export interface ItemRef {
  type: FlagItemType;
  /** null for single, id-less items (the service itself, payment, online availability). */
  id: string | null;
  label: string;
  lastVerified: ISODate | null;
  sourceUrl: Maybe<string>;
}

export function collectItems(service: Service): ItemRef[] {
  return [
    {
      type: "service",
      id: null,
      label: "General info",
      lastVerified: service.lastVerified,
      sourceUrl: service.sourceUrl,
    },
    { type: "online", id: null, label: "Online availability", ...meta(service.online) },
    ...service.requirements.map((r) => ({
      type: "requirement" as const,
      id: r.id,
      label: r.name,
      ...meta(r),
    })),
    ...service.steps.map((s) => ({ type: "step" as const, id: s.id, label: s.title, ...meta(s) })),
    ...service.fees.map((f) => ({ type: "fee" as const, id: f.id, label: f.label, ...meta(f) })),
    { type: "payment", id: null, label: "Payment methods", ...meta(service.payment) },
    ...service.processingTimes.map((p) => ({
      type: "processingTime" as const,
      id: p.id,
      label: `Processing time: ${p.label}`,
      ...meta(p),
    })),
    ...service.offices.map((o) => ({
      type: "office" as const,
      id: o.id,
      label: o.name,
      ...meta(o),
    })),
  ];
}

function meta(item: { lastVerified: ISODate | null; sourceUrl: Maybe<string> }) {
  return { lastVerified: item.lastVerified, sourceUrl: item.sourceUrl };
}

/** Items with no `appliesTo` apply to every variant. */
export function forVariant<T extends { appliesTo?: string[] }>(
  items: T[],
  variant: string | null,
): T[] {
  if (variant === null) return items;
  return items.filter((i) => !i.appliesTo || i.appliesTo.includes(variant));
}

export function countUnverified(service: Service): number {
  return collectItems(service).filter((i) => i.lastVerified === null).length;
}

/** Unique source URLs, each with the labels of the items that cite it. */
export function groupSources(service: Service): { url: string; items: string[] }[] {
  const map = new Map<string, string[]>();
  for (const item of collectItems(service)) {
    if (isTodo(item.sourceUrl)) continue;
    const list = map.get(item.sourceUrl) ?? [];
    list.push(item.label);
    map.set(item.sourceUrl, list);
  }
  return [...map].map(([url, items]) => ({ url, items }));
}

/** Value used by per-item "Report" buttons and the report dialog: "type:id". */
export function reportKey(type: FlagItemType, id: string | null = null): string {
  return `${type}:${id ?? ""}`;
}

const GROUP_LABEL: Record<FlagItemType, string> = {
  service: "General",
  online: "General",
  requirement: "Requirements",
  step: "Steps",
  fee: "Fees",
  payment: "Fees",
  processingTime: "Processing time",
  office: "Offices",
};

export function reportOptions(service: Service) {
  return collectItems(service).map((i) => ({
    value: reportKey(i.type, i.id),
    label: i.label,
    group: GROUP_LABEL[i.type],
  }));
}
