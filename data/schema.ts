/**
 * Data schema for Papeles service guides.
 *
 * Accuracy rules:
 * - Only official sources: government domains (usually .gov.ph) or the agency's own portal.
 * - Never guess. Any value not confirmed on an official page is `TODO` and the UI shows it as
 *   "Not yet verified" rather than a made-up value.
 * - `lastVerified` is the date someone last checked the value against `sourceUrl`.
 *   `null` means it has never been checked.
 */

export const TODO = "TODO: verify" as const;
export type Todo = typeof TODO;

/** A value that is either confirmed or still waiting for verification. */
export type Maybe<T> = T | Todo;

/** Calendar date, "YYYY-MM-DD". */
export type ISODate = `${number}-${number}-${number}`;

export interface Verifiable {
  lastVerified: ISODate | null;
  sourceUrl: Maybe<string>;
}

export interface Agency {
  name: string;
  acronym: string;
  officialUrl: Maybe<string>;
}

/** A path through the service, e.g. "New application" vs "Renewal". */
export interface Variant {
  id: string;
  label: string;
}

export type CopyType = "original" | "photocopy" | "original-and-photocopy" | "scanned";

export interface Requirement extends Verifiable {
  /** Stable id: used for checklist progress and outdated-info reports. Don't rename casually. */
  id: string;
  name: string;
  copy?: Maybe<CopyType>;
  copies?: Maybe<number>;
  notes?: string;
  /** Variant ids this applies to. Omit when it applies to everyone. */
  appliesTo?: string[];
  /** Only some applicants need this (e.g. "if married"). */
  conditional?: boolean;
  /** For "valid ID" style requirements. */
  acceptableIds?: Maybe<string[]>;
  /** Slug of another Papeles guide that explains how to get this document. */
  relatedService?: string;
}

export interface Step extends Verifiable {
  id: string;
  title: string;
  description: Maybe<string>;
  /** Can this step be done online? */
  online?: boolean;
  url?: Maybe<string>;
  appliesTo?: string[];
}

export type FeeAmount = number | { min: number; max: number };

export interface Fee extends Verifiable {
  id: string;
  label: string;
  /** Amount in PHP. 0 means free. */
  amount: Maybe<FeeAmount>;
  notes?: string;
  appliesTo?: string[];
}

export interface ProcessingTime extends Verifiable {
  id: string;
  label: string;
  duration: Maybe<string>;
  notes?: string;
}

export interface Payment extends Verifiable {
  methods: Maybe<string[]>;
  notes?: string;
}

export interface Office extends Verifiable {
  /** Stable id: wait-time reports reference it. Don't rename casually. */
  id: string;
  name: string;
  address: Maybe<string>;
  city: string;
  region: string;
  hours?: Maybe<string>;
  notes?: string;
}

export type OnlineAvailability = "full" | "partial" | "none";

export interface Service extends Verifiable {
  slug: string;
  name: string;
  /** Short label for chips and cards, e.g. "Passport". */
  shortName: string;
  agency: Agency;
  summary: string;
  /** Extra search terms: Filipino words, common misspellings, related phrases. */
  keywords: string[];
  popular?: boolean;
  /** Shown as the "online" button next to "Official website", e.g. booking or online application. */
  appointment?: { url: Maybe<string>; label: string };
  online: Verifiable & { availability: Maybe<OnlineAvailability>; notes?: string };
  variants?: Variant[];
  requirements: Requirement[];
  steps: Step[];
  fees: Fee[];
  payment: Payment;
  processingTimes: ProcessingTime[];
  offices: Office[];
  /** The agency's own list of all branches. */
  officeLocatorUrl?: Maybe<string>;
  tips?: string[];
}

/** Item kinds a user can flag as outdated. */
export const FLAG_ITEM_TYPES = [
  "service",
  "requirement",
  "step",
  "fee",
  "processingTime",
  "payment",
  "office",
] as const;
export type FlagItemType = (typeof FLAG_ITEM_TYPES)[number];

export function isTodo(value: unknown): value is Todo {
  return value === TODO;
}
