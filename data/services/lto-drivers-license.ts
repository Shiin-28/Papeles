import { TODO, type Service } from "@/data/schema";

// lto.gov.ph blocks automated access, so nothing on this page has been verified yet.
// Everything is lastVerified: null. See VERIFY.md for figures to confirm.
const CHARTER = "https://lto.gov.ph/wp-content/uploads/2025/09/LTO-CC-2025-External.pdf";
const LTMS = "https://portal.lto.gov.ph";

export const ltoDriversLicense = {
  slug: "lto-drivers-license",
  name: "Driver's License (New, Non-Professional)",
  shortName: "Driver's License",
  agency: {
    name: "Land Transportation Office",
    acronym: "LTO",
    officialUrl: "https://lto.gov.ph",
  },
  summary:
    "Turn your Student Permit into a non-professional driver's license: complete a Practical Driving Course, get a medical certificate, then pass the theoretical exam and driving test at an LTO licensing office.",
  keywords: [
    "lisensya",
    "drivers license",
    "driver's license",
    "non pro",
    "non-professional",
    "student permit",
    "ltms",
    "lto",
    "pdc",
    "driving test",
  ],
  popular: true,
  lastVerified: null,
  sourceUrl: CHARTER,
  appointment: { url: LTMS, label: "Open LTMS portal" },
  online: {
    availability: TODO,
    lastVerified: null,
    sourceUrl: TODO,
  },
  requirements: [
    {
      id: "student-permit",
      name: "Student Permit (held for at least 1 month)",
      copy: TODO,
      lastVerified: null,
      sourceUrl: CHARTER,
    },
    {
      id: "pdc-certificate",
      name: "Practical Driving Course (PDC) certificate",
      notes: "Transmitted electronically to LTO by an LTO-accredited driving school.",
      lastVerified: null,
      sourceUrl: CHARTER,
    },
    {
      id: "medical-certificate",
      name: "Medical certificate from an LTO-accredited clinic",
      notes: "Transmitted electronically to LTO by the clinic.",
      lastVerified: null,
      sourceUrl: CHARTER,
    },
    {
      id: "application-form",
      name: "Application form",
      copy: TODO,
      lastVerified: null,
      sourceUrl: CHARTER,
    },
    {
      id: "parental-consent",
      name: "Parent or guardian consent, with their valid ID",
      conditional: true,
      notes: "If you're 17.",
      lastVerified: null,
      sourceUrl: CHARTER,
    },
    {
      id: "tin",
      name: "TIN",
      conditional: true,
      notes: "If you're employed.",
      relatedService: "bir-tin",
      lastVerified: null,
      sourceUrl: CHARTER,
    },
  ],
  steps: [
    {
      id: "medical",
      title: "Get a medical exam at an LTO-accredited clinic",
      description: "The clinic sends your medical certificate to LTO electronically.",
      lastVerified: null,
      sourceUrl: TODO,
    },
    {
      id: "pdc",
      title: "Make sure your PDC certificate is uploaded",
      description: "Your driving school uploads your Practical Driving Course certificate to LTO.",
      lastVerified: null,
      sourceUrl: TODO,
    },
    {
      id: "submit",
      title: "Submit your requirements at an LTO licensing office",
      description: TODO,
      lastVerified: null,
      sourceUrl: TODO,
    },
    {
      id: "theory-exam",
      title: "Take the theoretical exam",
      description: TODO,
      lastVerified: null,
      sourceUrl: TODO,
    },
    {
      id: "practical-test",
      title: "Take the practical driving test",
      description: TODO,
      lastVerified: null,
      sourceUrl: TODO,
    },
    {
      id: "pay-release",
      title: "Pay and get your license",
      description: TODO,
      lastVerified: null,
      sourceUrl: TODO,
    },
  ],
  fees: [
    { id: "application", label: "Application fee", amount: TODO, lastVerified: null, sourceUrl: TODO },
    { id: "license", label: "License fee", amount: TODO, lastVerified: null, sourceUrl: TODO },
  ],
  payment: { methods: TODO, lastVerified: null, sourceUrl: TODO },
  processingTimes: [
    { id: "release", label: "License release", duration: TODO, lastVerified: null, sourceUrl: TODO },
  ],
  offices: [
    {
      id: "lto-central-east-avenue",
      name: "LTO Central Office – East Avenue",
      address: TODO,
      city: "Quezon City",
      region: "NCR",
      hours: TODO,
      lastVerified: null,
      sourceUrl: TODO,
    },
  ],
  officeLocatorUrl: TODO,
} satisfies Service;
