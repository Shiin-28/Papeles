import { TODO, type Service } from "@/data/schema";

// The DFA sites (dfa.gov.ph, consular.dfa.gov.ph, passport.gov.ph) block automated access, so
// nothing on this page has been verified against them yet. Everything is lastVerified: null.
// See VERIFY.md for figures to confirm.
const ADULT_NEW = "https://consular.dfa.gov.ph/adult-new/";
const ADULT_RENEWAL = "https://consular.dfa.gov.ph/adult-renewal-epassport/";
const APPOINTMENT = "https://www.passport.gov.ph";

export const dfaPassport = {
  slug: "dfa-passport",
  name: "Philippine Passport",
  shortName: "Passport",
  agency: {
    name: "Department of Foreign Affairs",
    acronym: "DFA",
    officialUrl: "https://dfa.gov.ph",
  },
  summary:
    "Book an appointment online, pay, and appear in person at a DFA consular office for a new passport or a renewal. Book only through the official appointment site.",
  keywords: [
    "passport",
    "pasaporte",
    "passport renewal",
    "renew passport",
    "dfa appointment",
    "epassport",
    "consular",
    "travel",
  ],
  popular: true,
  lastVerified: null,
  sourceUrl: ADULT_NEW,
  appointment: { url: APPOINTMENT, label: "Book appointment online" },
  online: {
    availability: "partial",
    notes: "Appointment booking is online. Personal appearance at a consular office is required.",
    lastVerified: null,
    sourceUrl: TODO,
  },
  variants: [
    { id: "new", label: "New (adult)" },
    { id: "renewal", label: "Renewal (adult)" },
  ],
  requirements: [
    {
      id: "confirmed-appointment",
      name: "Confirmed online appointment",
      lastVerified: null,
      sourceUrl: ADULT_NEW,
    },
    {
      id: "application-form",
      name: "Accomplished application form",
      copy: TODO,
      lastVerified: null,
      sourceUrl: ADULT_NEW,
    },
    {
      id: "psa-birth-certificate",
      name: "PSA Certificate of Live Birth (on security paper)",
      copy: "original-and-photocopy",
      appliesTo: ["new"],
      relatedService: "psa-birth-certificate",
      lastVerified: null,
      sourceUrl: ADULT_NEW,
    },
    {
      id: "valid-id",
      name: "Acceptable valid ID",
      copy: "original-and-photocopy",
      copies: 1,
      acceptableIds: TODO,
      appliesTo: ["new"],
      lastVerified: null,
      sourceUrl: ADULT_NEW,
    },
    {
      id: "current-passport",
      name: "Current ePassport + photocopy of the data page",
      copy: "original-and-photocopy",
      appliesTo: ["renewal"],
      lastVerified: null,
      sourceUrl: ADULT_RENEWAL,
    },
    {
      id: "psa-marriage-certificate",
      name: "PSA Marriage Certificate or Report of Marriage",
      copy: "original-and-photocopy",
      conditional: true,
      notes: "If you're a married woman using your spouse's surname, or your name has changed.",
      lastVerified: null,
      sourceUrl: ADULT_NEW,
    },
  ],
  steps: [
    {
      id: "book",
      title: "Book an appointment on the official site",
      description:
        "Choose a DFA consular office and a date and time, then fill in the form. Appointments made anywhere else (social media, fixers) aren't valid.",
      online: true,
      url: APPOINTMENT,
      lastVerified: null,
      sourceUrl: TODO,
    },
    {
      id: "pay",
      title: "Pay the passport fee",
      description: "Pay using one of the options shown during booking.",
      online: true,
      lastVerified: null,
      sourceUrl: TODO,
    },
    {
      id: "confirmation",
      title: "Print your appointment packet",
      description: "After paying, you'll receive a confirmation email with your appointment packet.",
      lastVerified: null,
      sourceUrl: TODO,
    },
    {
      id: "appear",
      title: "Go to the consular office on your schedule",
      description: "Bring all your requirements. Personal appearance is required.",
      lastVerified: null,
      sourceUrl: TODO,
    },
    {
      id: "claim",
      title: "Claim your passport",
      description: TODO,
      lastVerified: null,
      sourceUrl: TODO,
    },
  ],
  fees: [
    {
      id: "regular",
      label: "Regular processing",
      amount: TODO,
      lastVerified: null,
      sourceUrl: TODO,
    },
    {
      id: "expedited",
      label: "Expedited processing",
      amount: TODO,
      lastVerified: null,
      sourceUrl: TODO,
    },
  ],
  payment: {
    methods: TODO,
    lastVerified: null,
    sourceUrl: TODO,
  },
  processingTimes: [
    { id: "regular", label: "Regular", duration: TODO, lastVerified: null, sourceUrl: TODO },
    { id: "expedited", label: "Expedited", duration: TODO, lastVerified: null, sourceUrl: TODO },
  ],
  offices: [
    {
      id: "dfa-aseana",
      name: "DFA Office of Consular Affairs – ASEANA",
      address: TODO,
      city: "Parañaque",
      region: "NCR",
      hours: TODO,
      lastVerified: null,
      sourceUrl: TODO,
    },
  ],
  officeLocatorUrl: TODO,
} satisfies Service;
