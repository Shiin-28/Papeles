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

/** Anything with a verification date that may apply only to some variants. */
export interface Dated {
  lastVerified: ISODate | null;
  appliesTo?: string[];
}

/** Variant ids to evaluate a section for; `[null]` when the guide has no variant picker. */
export function variantKeys(service: Service): (string | null)[] {
  return service.variants && service.variants.length > 1
    ? service.variants.map((v) => v.id)
    : [null];
}

export function sectionCounts(items: Dated[], variant: string | null) {
  const visible = forVariant(items, variant);
  const verifiedDates = visible.flatMap((i) => (i.lastVerified ? [i.lastVerified] : []));
  return {
    total: visible.length,
    unverified: visible.length - verifiedDates.length,
    verifiedDates,
  };
}

/**
 * Whether an item should carry its own "Not yet verified" note. Only needed when its section is
 * partly verified (for a variant the item belongs to); otherwise the section title says it all.
 */
export function needsItemNote(item: Dated, items: Dated[], keys: (string | null)[]): boolean {
  if (item.lastVerified !== null) return false;
  const relevant = item.appliesTo ? keys.filter((k) => k && item.appliesTo!.includes(k)) : keys;
  return relevant.some((k) => {
    const { total, unverified } = sectionCounts(items, k);
    return unverified > 0 && unverified < total;
  });
}

/** Ids of the items in a section that need their own note. */
export function itemsNeedingNote<T extends Dated & { id: string }>(
  items: T[],
  keys: (string | null)[],
  extra: Dated[] = [],
): Set<string> {
  const all = [...items, ...extra];
  return new Set(items.filter((i) => needsItemNote(i, all, keys)).map((i) => i.id));
}
