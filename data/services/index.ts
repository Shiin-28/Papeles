import type { Service } from "@/data/schema";
import { birTin } from "./bir-tin";
import { dfaPassport } from "./dfa-passport";
import { ltoDriversLicense } from "./lto-drivers-license";
import { nbiClearance } from "./nbi-clearance";
import { psaBirthCertificate } from "./psa-birth-certificate";
import { nationalId } from "./national-id";
import { sssMysssCard } from "./sss-mysss-card";
import { prcIdRenewal } from "./prc-id-renewal";
import { postalId } from "./postal-id";
import { votersCertification } from "./voters-certification";

/** Add new service files here. Order is the display order. */
export const services: Service[] = [
  dfaPassport,
  nbiClearance,
  psaBirthCertificate,
  ltoDriversLicense,
  birTin,
  nationalId,
  postalId,
  sssMysssCard,
  prcIdRenewal,
  votersCertification,
];

assertUniqueIds(services);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Small, serializable shape sent to the client for fuzzy search. */
export interface SearchEntry {
  slug: string;
  name: string;
  shortName: string;
  agency: string;
  agencyName: string;
  summary: string;
  keywords: string[];
}

export function getSearchEntries(): SearchEntry[] {
  return services.map((s) => ({
    slug: s.slug,
    name: s.name,
    shortName: s.shortName,
    agency: s.agency.acronym,
    agencyName: s.agency.name,
    summary: s.summary,
    keywords: s.keywords,
  }));
}

/** Ids are stored in localStorage and the database, so a duplicate would mix up reports. */
function assertUniqueIds(list: Service[]) {
  const slugs = new Set<string>();
  for (const s of list) {
    if (slugs.has(s.slug)) throw new Error(`Duplicate service slug: ${s.slug}`);
    slugs.add(s.slug);
    const groups = {
      requirements: s.requirements,
      steps: s.steps,
      fees: s.fees,
      processingTimes: s.processingTimes,
      offices: s.offices,
    };
    for (const [group, items] of Object.entries(groups)) {
      const ids = new Set<string>();
      for (const { id } of items) {
        if (ids.has(id)) throw new Error(`Duplicate id "${id}" in ${s.slug}.${group}`);
        ids.add(id);
      }
    }
    const variantIds = new Set(s.variants?.map((v) => v.id));
    for (const v of variantIds) {
      // Variant ids are used in CSS selectors on the service page.
      if (!/^[a-z0-9-]+$/.test(v))
        throw new Error(`Variant id "${v}" in ${s.slug} must be kebab-case`);
    }
    for (const items of Object.values(groups)) {
      for (const item of items as { id: string; appliesTo?: string[] }[]) {
        for (const v of item.appliesTo ?? []) {
          if (!variantIds.has(v)) throw new Error(`Unknown variant "${v}" on ${s.slug}/${item.id}`);
        }
      }
    }
  }
}
