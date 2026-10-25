import { TODO, type Service } from "@/data/schema";

// philsys.gov.ph was under maintenance and psa.gov.ph blocks automated access, so nothing on
// this page has been verified yet. Everything is lastVerified: null. See VERIFY.md.
const REGISTRATION = "https://philsys.gov.ph/registration-process/";
const SUPPORTING_DOCS = "https://philsys.gov.ph/supporting-documents/";

export const nationalId = {
  slug: "national-id",
  name: "National ID (PhilSys / PhilID / ePhilID)",
  shortName: "National ID",
  agency: {
    name: "Philippine Statistics Authority",
    acronym: "PSA",
    officialUrl: "https://philsys.gov.ph",
  },
  summary:
    "Register for the Philippine Identification System (PhilSys) to get your National ID. Other agencies, like SSS for the MySSS Card, use it to verify your identity.",
  keywords: [
    "national id",
    "philsys",
    "philid",
    "ephilid",
    "digital national id",
    "psa id",
    "national identification",
  ],
  popular: true,
  lastVerified: null,
  sourceUrl: REGISTRATION,
  online: { availability: TODO, lastVerified: null, sourceUrl: TODO },
  requirements: [
    {
      id: "primary-document",
      name: "One primary document (original)",
      acceptableIds: [
        "PSA-issued birth certificate + one government ID with your full name, photo, and signature or thumbmark",
        "Philippine passport",
        "UMID card",
        "Driver's license",
      ],
      lastVerified: null,
      sourceUrl: SUPPORTING_DOCS,
    },
    {
      id: "secondary-documents",
      name: "Secondary documents (if you have no primary document)",
      conditional: true,
      notes:
        "Must show your photo, signature or thumbmark, full name, permanent address, and date of birth.",
      acceptableIds: TODO,
      lastVerified: null,
      sourceUrl: SUPPORTING_DOCS,
    },
  ],
  steps: [
    {
      id: "pre-register",
      title: "Pre-register and set an appointment",
      description: TODO,
      online: true,
      lastVerified: null,
      sourceUrl: REGISTRATION,
    },
    {
      id: "registration-center",
      title: "Go to a registration center for validation and biometrics",
      description: TODO,
      lastVerified: null,
      sourceUrl: REGISTRATION,
    },
    {
      id: "receive",
      title: "Receive your PhilID or ePhilID",
      description: TODO,
      lastVerified: null,
      sourceUrl: TODO,
    },
  ],
  fees: [
    {
      id: "registration",
      label: "Registration",
      amount: TODO,
      lastVerified: null,
      sourceUrl: TODO,
    },
  ],
  payment: { methods: TODO, lastVerified: null, sourceUrl: TODO },
  processingTimes: [
    { id: "philid", label: "PhilID card", duration: TODO, lastVerified: null, sourceUrl: TODO },
  ],
  offices: [],
  officeLocatorUrl: TODO,
  tips: [
    "PhilSys hotline: 1388, or email info@philsys.gov.ph (from the PhilSys website's maintenance page, Oct 2026).",
  ],
} satisfies Service;
