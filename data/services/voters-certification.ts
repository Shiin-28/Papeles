import type { Service } from "@/data/schema";

// COMELEC announcement, 8 May 2021: resumption of voter's certification (latest official fee and process).
const NOTICE_2021 =
  "https://comelec.gov.ph/?r=References/Announcements/08May2021IssuanceOfVoterCert";
// COMELEC Citizen's Charter (older edition, around 2010): "Issuance of Certification as Registered Voter".
const CHARTER =
  "https://www.comelec.gov.ph/php-tpls-attachments/AboutCOMELEC/Citizens_Charter_.pdf";
const VOTER_ID_FAQ =
  "https://comelec.gov.ph/?r=VoterRegistration/WhatisVoterRegistration/VoterIDIssuance/VoterIDFaqs";

export const votersCertification = {
  slug: "voters-certification",
  category: "ids",
  name: "Voter's Certification (COMELEC)",
  shortName: "Voter's Certification",
  agency: {
    name: "Commission on Elections",
    acronym: "COMELEC",
    officialUrl: "https://comelec.gov.ph",
  },
  summary:
    "Official proof that you're a registered voter. COMELEC has put new voter ID cards on hold, so the voter's certification is what you can get. Some sources here are older; confirm with COMELEC before you go.",
  keywords: [
    "voter's id",
    "voters id",
    "voter id",
    "voter's certification",
    "voter certification",
    "comelec",
    "registered voter",
  ],
  lastVerified: "2026-10-25",
  sourceUrl: NOTICE_2021,
  online: {
    availability: "none",
    notes: "Apply in person, or through an authorized representative.",
    lastVerified: "2026-10-25",
    sourceUrl: CHARTER,
  },
  requirements: [
    {
      id: "valid-id",
      name: "One valid ID + a photocopy",
      copy: "original-and-photocopy",
      copies: 1,
      notes: "COMELEC's charter asks for an ID with your picture, signature, age, and residence.",
      lastVerified: "2026-10-25",
      sourceUrl: NOTICE_2021,
    },
    {
      id: "representative",
      name: "Authorization letter + representative's valid ID and photocopy",
      conditional: true,
      notes:
        "Only if someone applies for you. The charter also asks for the voter's own valid ID when the representative claims the certification.",
      lastVerified: "2026-10-25",
      sourceUrl: NOTICE_2021,
    },
  ],
  steps: [
    {
      id: "request",
      title: "Request the certification at a COMELEC office",
      description:
        "Go to your local COMELEC office (Office of the Election Officer) or the National Central File Division at the COMELEC main office in Intramuros, Manila, and fill out the request form. In 2021 the main office required an appointment; check whether that still applies.",
      lastVerified: "2026-10-25",
      sourceUrl: VOTER_ID_FAQ,
    },
    {
      id: "pay",
      title: "Pay the fee at the cashier",
      description: "Keep the official receipt; you'll need it to claim the certification.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "claim",
      title: "Claim your certification",
      description:
        "Bring your valid ID and the official receipt. A representative needs the authorization letter, their own valid ID, and your valid ID.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
  ],
  fees: [
    {
      id: "certification",
      label: "Voter's certification",
      amount: 75,
      notes:
        "Free for senior citizens, persons with disability, Indigenous Peoples (IPs/ICCs), and solo parents. COMELEC's 2016 FAQ listed ₱100; the 2021 notice says ₱75.",
      lastVerified: "2026-10-25",
      sourceUrl: NOTICE_2021,
    },
  ],
  payment: {
    methods: ["Pay at the COMELEC cashier"],
    lastVerified: "2026-10-25",
    sourceUrl: CHARTER,
  },
  processingTimes: [
    {
      id: "main-office",
      label: "COMELEC main office",
      duration: "Released 1 PM to 5 PM the next day",
      notes: "From COMELEC's older Citizen's Charter. Local offices may differ.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
  ],
  offices: [
    {
      id: "comelec-ncfd-intramuros",
      name: "COMELEC National Central File Division (NCFD) satellite office",
      address:
        "FEMII Building, Extension Cabildo Street cor. A. Soriano Avenue, Intramuros, Manila (behind Chowking)",
      city: "Manila",
      region: "NCR",
      hours: "Mondays to Thursdays, 8:00 AM to 4:30 PM",
      notes: "Location and hours as announced in May 2021.",
      lastVerified: "2026-10-25",
      sourceUrl: NOTICE_2021,
    },
  ],
  tips: [
    "COMELEC put the printing and distribution of voter ID cards on hold because of the National ID system (COMELEC Voter ID page, updated June 2018).",
    "You don't need a voter ID to vote. If asked at the polls, you can show your voter ID or any other valid ID.",
  ],
} satisfies Service;
