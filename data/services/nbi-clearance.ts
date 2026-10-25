import type { Service } from "@/data/schema";

const HOW_TO = "https://nbi.gov.ph/how-to-apply-nbi-clearance/";
const CHARTER = "https://nbi.gov.ph/citizens-charter/nbi-clearance-application/";

export const nbiClearance = {
  slug: "nbi-clearance",
  name: "NBI Clearance",
  shortName: "NBI Clearance",
  agency: {
    name: "National Bureau of Investigation",
    acronym: "NBI",
    officialUrl: "https://nbi.gov.ph",
  },
  summary:
    'Apply and pay online, then visit your chosen NBI branch once for photo and fingerprints. If there\'s no name match ("HIT"), you get the clearance the same day.',
  keywords: [
    "nbi",
    "clearance",
    "nbi clearance renewal",
    "police record",
    "employment requirement",
    "first time job seeker",
    "ra 11261",
  ],
  popular: true,
  lastVerified: "2026-10-25",
  sourceUrl: HOW_TO,
  appointment: { url: "https://clearance.nbi.gov.ph/", label: "Apply online" },
  online: {
    availability: "partial",
    notes:
      "Registration, scheduling, and payment are online. You still visit a branch for biometrics, unless you qualify for online renewal (a clearance issued after 2014 with no changes to your details).",
    lastVerified: "2026-10-25",
    sourceUrl: HOW_TO,
  },
  variants: [
    { id: "regular", label: "Regular" },
    { id: "ftjs", label: "First-time job seeker (free)" },
  ],
  requirements: [
    {
      id: "reference-number",
      name: "Reference number or QR code",
      notes: "Printed or on your phone. It's generated when you choose a payment method online.",
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "proof-of-payment",
      name: "Proof of payment / receipt",
      appliesTo: ["regular"],
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "two-valid-ids",
      name: "Two (2) valid government-issued IDs",
      copy: "original",
      notes:
        "Must be original and not expired. Your name in the online form must match your IDs exactly.",
      acceptableIds: [
        "Passport",
        "Driver's License",
        "National ID",
        "UMID",
        "Postal ID",
        "PSA Birth Certificate",
      ],
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "ftjs-barangay-certificate",
      name: "Barangay Certificate stating first-time job seeker status",
      copy: "original",
      appliesTo: ["ftjs"],
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "ftjs-oath",
      name: "Signed Oath of Undertaking",
      appliesTo: ["ftjs"],
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
  ],
  steps: [
    {
      id: "register",
      title: "Register or log in on the NBI Clearance portal",
      description:
        "Use an active mobile number and email: you'll need a one-time password (OTP) to verify your account. First-time job seekers use the separate First-Time Job Seekers portal instead.",
      online: true,
      url: "https://clearance.nbi.gov.ph/",
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "profile",
      title: "Complete your applicant information",
      description:
        "Fill in all mandatory fields (personal details, family background, education/employment). Make sure the spelling matches your valid IDs, then click Save Information and review your profile.",
      online: true,
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "apply",
      title: 'Click "Apply for Clearance" and pick your ID',
      description: "A pop-up asks which valid government ID you'll bring to the branch.",
      online: true,
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "schedule",
      title: "Choose a branch, date, and time slot",
      description:
        "Pick the branch closest to you and an AM or PM slot. Once your transaction is marked PAID, there's a 15-day grace period if you miss the exact date.",
      online: true,
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "pay",
      title: "Pay the fee",
      description:
        "Choose a payment method and the system generates a reference number. Save a screenshot: you use it to pay and as your gate pass at the branch.",
      online: true,
      appliesTo: ["regular"],
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "biometrics",
      title: "Visit the branch for biometrics",
      description:
        "Show your reference number. Staff take your photo, fingerprints, and e-signature, then ask you to check your details on a monitor before printing.",
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "release",
      title: "Get your clearance",
      description:
        "No HIT: it's printed in minutes. With a HIT (a similar name in the database), you'll be asked to come back on a set date after manual review, at no extra cost.",
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
  ],
  fees: [
    {
      id: "clearance-fee",
      label: "NBI clearance fee",
      amount: 130,
      notes:
        "From NBI's how-to guide. The older Citizen's Charter page lists ₱115 / ₱165 / ₱415, so check the amount shown in the portal before paying.",
      appliesTo: ["regular"],
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "e-payment-charge",
      label: "E-payment service charge",
      amount: { min: 25, max: 30 },
      notes: '"Usually around" this amount, depending on the payment channel.',
      appliesTo: ["regular"],
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "ftjs-fee",
      label: "First-time job seeker clearance",
      amount: 0,
      notes: "Free under RA 11261 when you apply through the First-Time Job Seekers portal.",
      appliesTo: ["ftjs"],
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
  ],
  payment: {
    methods: ["GCash", "Maya", "7-Eleven", "Bayad Center", "Online banking"],
    lastVerified: "2026-10-25",
    sourceUrl: HOW_TO,
  },
  processingTimes: [
    {
      id: "no-hit",
      label: "No HIT",
      duration: "Same day, within minutes",
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
    {
      id: "with-hit",
      label: "With a HIT",
      duration: "Usually 5 to 10 working days",
      notes: "Your name is manually cleared by reviewers. Return on the date given to claim it.",
      lastVerified: "2026-10-25",
      sourceUrl: HOW_TO,
    },
  ],
  offices: [
    {
      id: "nbi-main-un-avenue",
      name: "NBI Clearance and Identification Center (Main)",
      address: "NBI Clearance Building, U.N. Avenue, Manila",
      city: "Manila",
      region: "NCR",
      hours: "Monday to Friday, 7:00 AM to 5:00 PM",
      notes:
        "Hours are from NBI's Citizen's Charter page, which may be older than the how-to guide.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
  ],
  officeLocatorUrl: "https://nbi.gov.ph/clearance-office-locator/",
  tips: [
    "Dress for the photo: avoid sandos, tank tops, shorts, and slippers. Smart casual or a collared shirt is recommended.",
    "A HIT is common if you share a name with someone in the database. It only means a manual check, not that you have a record.",
    'Online renewal: if your last clearance was issued after 2014 and nothing changed, choose "NBI Clearance Online Renewal" on the portal home page to skip the branch and get it delivered.',
  ],
} satisfies Service;
