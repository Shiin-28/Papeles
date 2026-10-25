import { TODO, type Service } from "@/data/schema";

// Press release on PHLPost Circular No. 25-48 (20 March 2025): official requirements.
const REQUIREMENTS =
  "https://phlpost.gov.ph/cpt-press-releases/phlpost-simplifies-postal-id-application-for-all/";
// Press release, 10 March 2025: fees.
const FEES =
  "https://phlpost.gov.ph/cpt-press-releases/batangas-mega-job-fair-applicants-get-their-postal-id/";
// Press release, 17 October 2024: process (on-site capture, delivery to mailing address).
const PROCESS =
  "https://phlpost.gov.ph/cpt-press-releases/phlpost-announces-the-resumption-on-the-issuance-of-postal-id-as-functional-card/";
// Press release, 27 November 2024: forms are at capturing stations and downloadable online.
const FORMS_AVAILABLE =
  "https://phlpost.gov.ph/cpt-press-releases/dfa-reaffirm-acceptance-of-postal-id/";
const FORM =
  "https://phlpost.gov.ph/wp-content/uploads/2024/10/PID-Application-Form_101024-1-1.pdf";

export const postalId = {
  slug: "postal-id",
  category: "ids",
  name: "Postal ID",
  shortName: "Postal ID",
  agency: {
    name: "Philippine Postal Corporation",
    acronym: "PHLPost",
    officialUrl: "https://phlpost.gov.ph",
  },
  summary:
    "A government-issued ID that also verifies your address. Apply in person at a Post Office capturing site, and the card is delivered to your mailing address.",
  keywords: ["postal id", "phlpost", "post office id", "improved postal id", "pid"],
  lastVerified: "2026-10-25",
  sourceUrl: REQUIREMENTS,
  online: {
    availability: "none",
    notes:
      "You must appear in person to have your photo, fingerprints, and signature taken. You can download the application form online.",
    lastVerified: "2026-10-25",
    sourceUrl: PROCESS,
  },
  requirements: [
    {
      id: "application-form",
      name: "Accomplished Postal ID application form",
      form: { name: "Postal ID application form", url: FORM, format: "PDF", sizeKB: 1376 },
      notes:
        "Write in capital letters. PHLPost's announcement allows black or blue ink, but the form itself says black ink only, so use black.",
      lastVerified: "2026-10-25",
      sourceUrl: REQUIREMENTS,
    },
    {
      id: "proof-of-identity",
      name: "One valid proof of identity",
      acceptableIds: [
        "PSA-issued Birth Certificate",
        "National ID",
        "UMID card",
        "Driver's License",
        "Passport",
        "Any other government-issued ID with your photo and signature",
      ],
      lastVerified: "2026-10-25",
      sourceUrl: REQUIREMENTS,
    },
    {
      id: "proof-of-address",
      name: "Proof of address",
      notes:
        "E.g. Barangay Certificate of Residency, utility bill, lease contract, land title, school billing statement, or other recognized proof of residence.",
      lastVerified: "2026-10-25",
      sourceUrl: REQUIREMENTS,
    },
    {
      id: "marriage-certificate",
      name: "Marriage Certificate",
      conditional: true,
      notes: "For married women using their spouse's surname.",
      lastVerified: "2026-10-25",
      sourceUrl: REQUIREMENTS,
    },
    {
      id: "death-or-annulment",
      name: "Death Certificate or Annulment Decree",
      conditional: true,
      notes: "For widowed or annulled applicants.",
      lastVerified: "2026-10-25",
      sourceUrl: REQUIREMENTS,
    },
    {
      id: "divorce-decree",
      name: "Divorce Decree",
      conditional: true,
      notes: "For divorced applicants.",
      lastVerified: "2026-10-25",
      sourceUrl: REQUIREMENTS,
    },
    {
      id: "naturalization-certificate",
      name: "Naturalization Certificate",
      conditional: true,
      notes: "For naturalized Filipinos.",
      lastVerified: "2026-10-25",
      sourceUrl: REQUIREMENTS,
    },
  ],
  steps: [
    {
      id: "form",
      title: "Get the application form",
      description:
        "Download it from PHLPost's website or get one at a capturing station, and fill it out before you go.",
      online: true,
      form: { name: "Postal ID application form", url: FORM, format: "PDF", sizeKB: 1376 },
      lastVerified: "2026-10-25",
      sourceUrl: FORMS_AVAILABLE,
    },
    {
      id: "submit-pay",
      title: "Go to a Post Office capturing site",
      description:
        "Submit your form and documents and pay the fee at the designated capturing site.",
      lastVerified: "2026-10-25",
      sourceUrl: PROCESS,
    },
    {
      id: "capture",
      title: "Have your photo, fingerprints, and signature taken",
      description: "This is done on-site, so you must appear in person.",
      lastVerified: "2026-10-25",
      sourceUrl: PROCESS,
    },
    {
      id: "delivery",
      title: "Wait for delivery",
      description:
        "The card is delivered to your mailing address, which also confirms your address.",
      lastVerified: "2026-10-25",
      sourceUrl: PROCESS,
    },
  ],
  fees: [
    {
      id: "regular",
      label: "Regular issuance",
      amount: 550,
      notes: "Includes tax and delivery. From PHLPost press releases of Nov 2024 and Mar 2025.",
      lastVerified: "2026-10-25",
      sourceUrl: FEES,
    },
    {
      id: "rush",
      label: "Rush issuance",
      amount: 650,
      notes: "From PHLPost press releases of Nov 2024 and Mar 2025.",
      lastVerified: "2026-10-25",
      sourceUrl: FEES,
    },
  ],
  payment: { methods: TODO, lastVerified: null, sourceUrl: TODO },
  processingTimes: [
    { id: "regular", label: "Regular", duration: TODO, lastVerified: null, sourceUrl: TODO },
    { id: "rush", label: "Rush", duration: TODO, lastVerified: null, sourceUrl: TODO },
  ],
  offices: [],
  officeLocatorUrl: TODO,
  tips: [
    "Valid for 3 years for Filipinos (shorter for some foreign residents).",
    "PHLPost says the listed requirements are standard nationwide and no other documents should be demanded.",
    "Apply only at PHLPost offices. PHLPost warns against people offering Postal ID processing on Facebook and other social media.",
  ],
} satisfies Service;
