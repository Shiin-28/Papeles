import { TODO, type Service } from "@/data/schema";

// BIR Citizen's Charter 2026 (1st edition), Revenue District Office external services.
const CHARTER =
  "https://bir-cdn.bir.gov.ph/BIR/pdf/BIR%20Citizen%27s%20Charter%20(2026%20Edition)%20final.pdf";
const ORUS = "https://orus.bir.gov.ph";

const ONLINE = ["eo98-online", "employee-online"];
const WALK_IN = ["eo98-walkin", "employee-walkin"];
const EO98 = ["eo98-online", "eo98-walkin"];

const ACCEPTABLE_IDS = [
  "PhilID / ePhilID (PSA)",
  "Driver's License (LTO)",
  "UMID (SSS, GSIS)",
  "Voter's ID (COMELEC)",
  "Passport (DFA)",
  "Digitized Postal ID (Post Office)",
  "PRC ID (PRC)",
  "OWWA ID (OWWA)",
];

export const birTin = {
  slug: "bir-tin",
  category: "tax",
  name: "TIN (Taxpayer Identification Number)",
  shortName: "TIN",
  agency: {
    name: "Bureau of Internal Revenue",
    acronym: "BIR",
    officialUrl: "https://www.bir.gov.ph",
  },
  summary:
    "Get a TIN online through BIR's ORUS or at your Revenue District Office (RDO). This guide covers individuals under EO 98 (people who need a TIN for government transactions, including first-time job seekers) and newly hired employees. There is no fee.",
  keywords: [
    "tin",
    "tin id",
    "tin number",
    "tin card",
    "tax identification number",
    "bir",
    "orus",
    "1904",
    "1902",
    "eo 98",
    "first time job seeker",
  ],
  lastVerified: "2026-10-25",
  sourceUrl: CHARTER,
  appointment: { url: ORUS, label: "Apply online (ORUS)" },
  online: {
    availability: "full",
    notes:
      "Both EO 98 applicants and new employees (through their employer) can apply fully online through ORUS.",
    lastVerified: "2026-10-25",
    sourceUrl: CHARTER,
  },
  variants: [
    { id: "eo98-online", label: "EO 98 · Online" },
    { id: "eo98-walkin", label: "EO 98 · Walk-in" },
    { id: "employee-online", label: "New employee · Online" },
    { id: "employee-walkin", label: "New employee · Walk-in" },
  ],
  requirements: [
    {
      id: "gov-id-online",
      name: "Government-issued ID showing your name, address, and birthdate",
      copy: "scanned",
      copies: 1,
      notes:
        "If the ID has no address, add any proof of residence. You'll also upload a selfie of you holding the ID.",
      acceptableIds: ACCEPTABLE_IDS,
      acceptableIdsAreExamples: true,
      appliesTo: ONLINE,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "gov-id-walkin",
      name: "Government-issued ID showing your name, address, and birthdate",
      copy: "photocopy",
      copies: 1,
      notes: "If the ID has no address, add any proof of residence or business address.",
      acceptableIds: ACCEPTABLE_IDS,
      acceptableIdsAreExamples: true,
      appliesTo: WALK_IN,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "form-1904",
      name: "BIR Form No. 1904",
      copy: "original",
      copies: 2,
      notes: "Downloadable from the BIR website.",
      form: {
        name: "BIR Form 1904",
        url: "https://bir-cdn.bir.gov.ph/BIR/pdf/1904%20October%202025%20ENCS%20Final.pdf",
        format: "PDF",
        sizeKB: 478,
      },
      appliesTo: ["eo98-walkin"],
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "form-1902",
      name: "BIR Form No. 1902",
      copy: "original",
      copies: 2,
      notes: "Downloadable from the BIR website.",
      form: {
        name: "BIR Form 1902",
        url: "https://bir-cdn.bir.gov.ph/BIR/pdf/1902%20October%202025%20(ENCS)%20Final.pdf",
        format: "PDF",
        sizeKB: 583,
      },
      appliesTo: ["employee-walkin"],
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "marriage-contract",
      name: "Marriage contract (married women)",
      conditional: true,
      copies: 1,
      notes: "1 scanned copy if applying online, 1 photocopy if walk-in.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "ftjs-barangay-certification",
      name: "Barangay Certification that you're a resident and a first-time job seeker",
      conditional: true,
      copies: 1,
      notes: "1 scanned copy if online, 1 certified true copy if walk-in.",
      appliesTo: EO98,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "spa-representative",
      name: "Special Power of Attorney (SPA) + IDs of you and your representative",
      conditional: true,
      notes:
        "Only if someone applies for you. The SPA states the purpose and your representative's name. Walk-in: original SPA plus ID photocopies, both with a wet specimen signature. Online: scanned copies.",
      appliesTo: EO98,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
  ],
  steps: [
    {
      id: "eo98-orus-apply",
      title: "Create an ORUS account and submit the online form",
      description: "Fill out the online registration form and upload the required documents.",
      online: true,
      url: ORUS,
      appliesTo: ["eo98-online"],
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "employer-registers",
      title: "Your employer registers you in ORUS",
      description:
        "Your employer enrolls you through ORUS's Employer Service Link. You'll receive a link from ORUS.",
      online: true,
      appliesTo: ["employee-online"],
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "employee-orus-apply",
      title: "Open the ORUS link and complete your application",
      description:
        "Create an account, enter your personal information, upload your scanned documents, and submit.",
      online: true,
      url: ORUS,
      appliesTo: ["employee-online"],
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "orus-result",
      title: "Check your email and view your TIN in ORUS",
      description:
        "You'll get an email about your application status. If approved, view your TIN in your ORUS profile.",
      online: true,
      url: ORUS,
      appliesTo: ["eo98-online"],
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "employee-orus-result",
      title: "Check your email and view your TIN in ORUS",
      description:
        "You'll get an email about your application status. If approved, log in to ORUS to see your TIN. ORUS approves most applications automatically; only possible duplicate records are sent to the RDO for review.",
      online: true,
      url: ORUS,
      appliesTo: ["employee-online"],
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "walkin-queue",
      title: "Get a queue number at your RDO",
      description:
        "Go to the Revenue District Office with jurisdiction over where you live. Get one queue number per application.",
      appliesTo: WALK_IN,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "walkin-submit",
      title: "Submit your documents at the Registration Officer counter",
      description:
        "The officer checks that your documents are complete. If something is missing, they'll return your documents and tell you what's lacking.",
      appliesTo: WALK_IN,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "walkin-release",
      title: "Receive your TIN",
      description: "Your TIN is written on your receiving copy of the BIR form.",
      appliesTo: WALK_IN,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
  ],
  fees: [
    {
      id: "tin-application",
      label: "TIN application",
      amount: 0,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "tin-card-first",
      label: "TIN card (paper), first time",
      amount: 0,
      notes:
        "Optional. Apply in person at your RDO with BIR Form 1905, a recent 1x1 photo, and a photocopy of a government ID.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "tin-card-replacement",
      label: "TIN card replacement (lost or damaged)",
      amount: 100,
      notes: "Bring an Affidavit of Loss if the card was lost.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
  ],
  payment: {
    methods: [],
    notes: "No payment needed to get a TIN.",
    lastVerified: "2026-10-25",
    sourceUrl: CHARTER,
  },
  processingTimes: [
    {
      id: "online",
      label: "Online (ORUS)",
      duration: "3 days",
      notes: "Not counting delays from system or technical issues.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "walk-in",
      label: "Walk-in at the RDO",
      duration: "6 hours",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "tin-card",
      label: "TIN card",
      duration: "1 day",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
  ],
  offices: [
    {
      id: "rdo-39-south-qc",
      name: "RDO No. 39 – South Quezon City",
      address: TODO,
      city: "Quezon City",
      region: "NCR",
      hours: "8:00 AM to 5:00 PM",
      notes:
        "BIR's Citizen's Charter names this RDO for nonresident applicants (e.g. nonresident Filipino citizens and some foreign nationals). Most walk-in applicants go to the RDO that covers where they live instead.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
  ],
  officeLocatorUrl: TODO,
  tips: [
    "If you're newly hired, you must register within 10 days from your first day of employment.",
    "Foreign nationals and nonresident applicants have different requirements. Check the BIR Citizen's Charter.",
  ],
} satisfies Service;
