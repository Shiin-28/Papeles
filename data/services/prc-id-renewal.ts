import { TODO, type Service } from "@/data/schema";

const RENEWAL_PAGE = "https://www.prc.gov.ph/renewal-professional-id-card";
// PRC Citizen's Charter 2025 (1st edition), service 8: Application for Renewal of PIC.
const CHARTER =
  "https://www.prc.gov.ph/sites/default/files/PRC%20Citizens%20Charter%202025%201st%20Edition_03312025_R.pdf";
// "Renewal of Fees for 2026", linked from the renewal page.
const FEES_2026 =
  "https://www.prc.gov.ph/sites/default/files/ASSESSMENT%20OF%20ANNUAL%20REGISTRATION%20FEESARF%20FOR%20CY%202026-2-3.pdf";
const LERIS = "https://online.prc.gov.ph";

export const prcIdRenewal = {
  slug: "prc-id-renewal",
  category: "ids",
  name: "PRC ID Renewal (Professional ID Card)",
  shortName: "PRC ID",
  agency: {
    name: "Professional Regulation Commission",
    acronym: "PRC",
    officialUrl: "https://www.prc.gov.ph",
  },
  summary:
    "Renew your Professional Identification Card (PIC) if it has expired or expires within a year. Apply and pay through PRC's LERIS portal, then submit your requirements at a PRC office on your appointment, or choose delivery.",
  keywords: [
    "prc",
    "prc id",
    "prc license",
    "professional id",
    "pic",
    "leris",
    "license renewal",
    "cpd",
    "board passer",
  ],
  lastVerified: "2026-10-25",
  sourceUrl: CHARTER,
  appointment: { url: LERIS, label: "Apply online (LERIS)" },
  online: {
    availability: "partial",
    notes:
      "Application, appointment, and payment are online in LERIS. You then submit documents at the PRC office on your appointment date.",
    lastVerified: "2026-10-25",
    sourceUrl: CHARTER,
  },
  variants: [
    { id: "bacc", label: "Baccalaureate profession" },
    { id: "non-bacc", label: "Non-baccalaureate profession" },
  ],
  requirements: [
    {
      id: "leris-application",
      name: "Proof of your system-generated renewal application (from LERIS)",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "cpd-certificates",
      name: "CPD certificates or CPDAS screenshots showing your earned CPD units",
      notes:
        "If you don't have enough CPD units, you can renew by signing the CPD undertaking included in the renewal application.",
      form: {
        name: "PRC renewal application (includes CPD undertaking)",
        url: "https://www.prc.gov.ph/sites/default/files/PRD-27%20Rev%2002%20Application%20for%20Renewal%20of%20Professional%20ID%20Card_feb%2015%202024.docx",
        format: "Word",
        sizeKB: 71,
      },
      lastVerified: "2026-10-25",
      sourceUrl: RENEWAL_PAGE,
    },
    {
      id: "profession-documents",
      name: "Certificate of good standing (or other document your profession requires)",
      conditional: true,
      notes:
        "Only for some professions, e.g. criminologists, interior designers, and pharmacists; real estate professionals need a surety bond. PRC's renewal page lists the professions that need a certificate from their accredited professional organization.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "ofw-proof",
      name: "Proof that you work overseas (instead of CPD certificates)",
      conditional: true,
      notes:
        "For Overseas Filipino Professionals. Any of: OEC from DMW, passport with work visa or permit, overseas employment contract, foreign company ID, or residence permit.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "citizenship-proof",
      name: "Proof of Philippine citizenship",
      conditional: true,
      notes:
        "For dual citizens: e.g. a valid Philippine passport, or Oath of Allegiance with Identification Certificate, or Certificate of Retention/Re-acquisition from the Bureau of Immigration.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "representative",
      name: "Representative's documents",
      conditional: true,
      notes:
        "If someone transacts for you. A non-professional needs a valid government ID and an original SPA you signed. A PRC-registered professional needs their PRC ID and an original authorization letter you signed.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
  ],
  steps: [
    {
      id: "leris",
      title: "Apply in LERIS and book an appointment",
      description:
        "Log in to your LERIS account, file the renewal, pick an appointment date and place, and choose a payment option. If you want the printed ID delivered, choose shipping and enter your address.",
      online: true,
      url: LERIS,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "submit",
      title: "Submit your requirements on your appointment",
      description:
        "Present the proof of your renewal application and your other documents at the designated window for checking.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "release",
      title: "Receive your new PRC ID",
      description: "Claim your ID and sign the releasing log sheet.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
  ],
  fees: [
    {
      id: "bacc-on-time",
      label: "Renewal for 3 years, on time",
      amount: 450,
      notes:
        "₱150 per year. If you renew late, the fee grows with the years unpaid; see PRC's 2026 fee table for your case.",
      appliesTo: ["bacc"],
      lastVerified: "2026-10-25",
      sourceUrl: FEES_2026,
    },
    {
      id: "bacc-surcharge",
      label: "Extra surcharge if renewing 20+ days after your birth month",
      amount: 30,
      appliesTo: ["bacc"],
      lastVerified: "2026-10-25",
      sourceUrl: FEES_2026,
    },
    {
      id: "non-bacc-on-time",
      label: "Renewal for 3 years, on time",
      amount: 420,
      notes:
        "₱140 per year. If you renew late, the fee grows with the years unpaid; see PRC's 2026 fee table for your case.",
      appliesTo: ["non-bacc"],
      lastVerified: "2026-10-25",
      sourceUrl: FEES_2026,
    },
    {
      id: "non-bacc-surcharge",
      label: "Extra surcharge if renewing 20+ days after your birth month",
      amount: 28,
      appliesTo: ["non-bacc"],
      lastVerified: "2026-10-25",
      sourceUrl: FEES_2026,
    },
    {
      id: "delivery",
      label: "Delivery of the printed ID (optional)",
      amount: TODO,
      lastVerified: null,
      sourceUrl: TODO,
    },
  ],
  payment: {
    methods: TODO,
    notes: "You choose a payment channel in LERIS when you file the renewal.",
    lastVerified: null,
    sourceUrl: CHARTER,
  },
  processingTimes: [
    {
      id: "at-office",
      label: "At the PRC office",
      duration: "About 1 hour 15 minutes",
      notes:
        "From PRC's Citizen's Charter: about 30 minutes to check documents, then printing and release.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
  ],
  offices: [],
  officeLocatorUrl: TODO,
  tips: [
    "You can renew if your PRC ID has already expired or will expire in less than a year.",
    "This guide covers renewal. Your first PRC ID is issued when you register as a professional after passing the licensure exam.",
  ],
} satisfies Service;
