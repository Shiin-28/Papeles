import { TODO, type Service } from "@/data/schema";

const MYSSS_PAGE = "https://www.sss.gov.ph/mysss-card/";
// SSS Citizen's Charter 2026 (1st edition), External Services: "MySSS Card Application Through My.SSS Portal".
const CHARTER =
  "https://www.sss.gov.ph/wp-content/uploads/2026/07/2026-SSS-Citizens-Charter-1st-Edition-External-Services.pdf";
const PORTAL = "https://member.sss.gov.ph";

export const sssMysssCard = {
  slug: "sss-mysss-card",
  category: "ids",
  name: "MySSS Card (SSS ID, replaces UMID)",
  shortName: "MySSS Card",
  agency: {
    name: "Social Security System",
    acronym: "SSS",
    officialUrl: "https://www.sss.gov.ph",
  },
  summary:
    "The MySSS Card is SSS's new ID card and replaces the old UMID card. You apply in the My.SSS portal, verify your identity with your National ID, then open an account with an SSS partner bank, which issues the card.",
  keywords: [
    "umid",
    "sss id",
    "sss card",
    "mysss",
    "my sss card",
    "umid card",
    "sss umid",
    "social security",
  ],
  lastVerified: "2026-10-25",
  sourceUrl: MYSSS_PAGE,
  appointment: { url: PORTAL, label: "Apply in My.SSS" },
  online: {
    availability: "partial",
    notes:
      "The SSS part is fully online, with no branch visit for biometrics (your National ID photo is used). Opening the bank account is done in the bank's app or at a branch, depending on the bank.",
    lastVerified: "2026-10-25",
    sourceUrl: MYSSS_PAGE,
  },
  requirements: [
    {
      id: "permanent-ss-number",
      name: "SS number tagged as permanent",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "mysss-account",
      name: "Registered My.SSS account",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "updated-contact-details",
      name: "Up-to-date local address, mobile number, and email in your SSS record",
      notes:
        "Applicants living abroad without a local address may still qualify if their chosen bank offers the service.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "national-id-registered",
      name: "Registered with the National ID (PhilSys)",
      notes:
        "You can apply even without the physical National ID card, as long as you're registered.",
      relatedService: "national-id",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "matching-records",
      name: "Same name and date of birth in your SSS and National ID records",
      notes:
        "The identity check needs an exact match. Fix any difference with the agency whose record is wrong before applying.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "close-unionbank-umid",
      name: "Closed UnionBank account for your old UMID Pay Card",
      conditional: true,
      notes:
        "Only if you have a UMID Pay Card with UnionBank. Request the account closure at any UnionBank branch before applying.",
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
  ],
  steps: [
    {
      id: "login",
      title: "Log in to your My.SSS account",
      description: "Go to the My.SSS member portal on the SSS website.",
      online: true,
      url: PORTAL,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "open-mysss-card",
      title: "Open Services → MySSS Card and check your details",
      description:
        "Review your contact details. If anything needs updating, do that first before continuing.",
      online: true,
      lastVerified: "2026-10-25",
      sourceUrl: MYSSS_PAGE,
    },
    {
      id: "verify-identity",
      title: "Verify your identity with the National ID",
      description:
        "Consent to National ID eVerify authentication and the use of your National ID photo, then complete the liveness (face scan) check.",
      online: true,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "choose-bank",
      title: "Choose a partner bank and submit",
      description:
        "Pick your preferred SSS partner bank, agree to the data sharing terms, and submit. You'll get a transaction number, an email, and a My.SSS inbox notification.",
      online: true,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "open-bank-account",
      title: "Open your account with the bank",
      description:
        "Use the bank's app or visit a branch, depending on the bank. Complete its verification and pay any card fee it charges. If you don't pay within the bank's deadline, your application is canceled.",
      lastVerified: "2026-10-25",
      sourceUrl: MYSSS_PAGE,
    },
    {
      id: "receive-card",
      title: "Get your card",
      description:
        "The bank notifies you by SMS or in its app when the card is ready for pickup or delivery. Ask the bank whether a representative may claim it for you.",
      lastVerified: "2026-10-25",
      sourceUrl: MYSSS_PAGE,
    },
  ],
  fees: [
    {
      id: "sss-fee",
      label: "SSS application",
      amount: 0,
      lastVerified: "2026-10-25",
      sourceUrl: CHARTER,
    },
    {
      id: "bank-card-fee",
      label: "Card fee charged by your partner bank",
      amount: TODO,
      notes: "Set by each bank and disclosed in its terms and conditions.",
      lastVerified: "2026-10-25",
      sourceUrl: MYSSS_PAGE,
    },
  ],
  payment: {
    methods: [],
    notes: "No SSS fee. Any card fee is paid to your chosen bank, following its own terms.",
    lastVerified: "2026-10-25",
    sourceUrl: MYSSS_PAGE,
  },
  processingTimes: [
    {
      id: "metro-manila",
      label: "Metro Manila",
      duration: "Within 15 working days after your bank account is opened",
      lastVerified: "2026-10-25",
      sourceUrl: MYSSS_PAGE,
    },
    {
      id: "outside-metro-manila",
      label: "Outside Metro Manila",
      duration: "Within 20 working days after your bank account is opened",
      lastVerified: "2026-10-25",
      sourceUrl: MYSSS_PAGE,
    },
  ],
  offices: [],
  tips: [
    "Old SSS cards, including the UMID, are still valid. You only need a MySSS Card if you want one, or to replace a lost or damaged card or update your details.",
    "SSS says other government agencies and private institutions aren't required to accept the MySSS Card as an ID; each decides for itself.",
    "The MySSS Card account automatically becomes the account where SSS sends your benefits and loan proceeds.",
    "You can only have one MySSS Card with one bank at a time. To switch banks, close your current MySSS Card account first.",
  ],
} satisfies Service;
