# Data verification checklist

Seed data was researched on 2026-10-25. A value only has `lastVerified: "2026-10-25"` if it was read
directly on an official page. Everything else is `TODO: verify` or has `lastVerified: null`, and the
site shows it as **Not yet verified**.

When you confirm a value, set its `sourceUrl` to the page you checked and `lastVerified` to that date.

## Status by service

| Service | Source read | Status |
|---|---|---|
| BIR TIN | [BIR Citizen's Charter 2026](https://bir-cdn.bir.gov.ph/BIR/pdf/BIR%20Citizen%27s%20Charter%20(2026%20Edition)%20final.pdf) | Verified. Only the RDO address and the RDO locator link are TODO. |
| PSA birth certificate | [psaserbilis.com.ph](https://www.psaserbilis.com.ph/) FAQ, payment, and delivery text | Online path verified. **Walk-in outlet path is all TODO.** |
| NBI clearance | [How to apply](https://nbi.gov.ph/how-to-apply-nbi-clearance/), [Citizen's Charter](https://nbi.gov.ph/citizens-charter/nbi-clearance-application/) | Verified. **Fee conflict** (see below). |
| DFA passport | Blocked (dfa.gov.ph, consular.dfa.gov.ph, passport.gov.ph return 403 to automated requests) | **Nothing verified.** |
| LTO driver's license | Blocked (lto.gov.ph returns 403) | **Nothing verified.** |
| MySSS Card (SSS, replaces UMID) | [MySSS Card page](https://www.sss.gov.ph/mysss-card/), [SSS Citizen's Charter 2026](https://www.sss.gov.ph/wp-content/uploads/2026/07/2026-SSS-Citizens-Charter-1st-Edition-External-Services.pdf) | Verified. Only the bank's card fee is TODO (it varies by bank). |
| PRC ID renewal | [Renewal page](https://www.prc.gov.ph/renewal-professional-id-card), [Citizen's Charter 2025](https://www.prc.gov.ph/sites/default/files/PRC%20Citizens%20Charter%202025%201st%20Edition_03312025_R.pdf), [2026 fee tables](https://www.prc.gov.ph/sites/default/files/ASSESSMENT%20OF%20ANNUAL%20REGISTRATION%20FEESARF%20FOR%20CY%202026-2-3.pdf) | Verified. Payment channels, delivery fee, and PRC office list are TODO. |
| Postal ID | PHLPost press releases on [Circular 25-48](https://phlpost.gov.ph/cpt-press-releases/phlpost-simplifies-postal-id-application-for-all/), [fees](https://phlpost.gov.ph/cpt-press-releases/batangas-mega-job-fair-applicants-get-their-postal-id/), [process](https://phlpost.gov.ph/cpt-press-releases/phlpost-announces-the-resumption-on-the-issuance-of-postal-id-as-functional-card/); the application form | Verified. Payment methods, processing time, and the capturing-site list are TODO. |
| Voter's Certification (COMELEC) | [2021 notice](https://comelec.gov.ph/?r=References/Announcements/08May2021IssuanceOfVoterCert), [Voter ID page](https://comelec.gov.ph/?r=VoterRegistration/WhatisVoterRegistration/VoterIDIssuance), [Voter ID FAQ](https://comelec.gov.ph/?r=VoterRegistration/WhatisVoterRegistration/VoterIDIssuance/VoterIDFaqs), [Citizen's Charter](https://www.comelec.gov.ph/php-tpls-attachments/AboutCOMELEC/Citizens_Charter_.pdf) | Verified, but the **sources are old** (2010 to 2021). Re-check fee, appointment process, office hours, and release time. |
| National ID (PhilSys) | philsys.gov.ph was under maintenance; psa.gov.ph blocks automated access | **Nothing verified.** Requirement names come from search excerpts of philsys.gov.ph. |
| GSIS e-Card / Digital ID | gsis.gov.ph rejects automated access | **No guide yet.** No usable official source was found. |

## Leads to confirm

These came from **search-engine excerpts** of official pages. They are **not** in the data files as values.
Open the page yourself before you copy any of them into the data.

### DFA passport (`data/services/dfa-passport.ts`)
- Fees: excerpts of the [DFA Passport FAQ](https://consular.dfa.gov.ph/passport-faq/) mention **₱950 regular** and **₱1,200 expedited** for applications in the Philippines, plus a ₱350 penalty for a lost or mutilated ePassport. The excerpt said the page is old.
- Requirements for a new adult application ([adult-new](https://consular.dfa.gov.ph/adult-new/)): confirmed appointment, personal appearance, accomplished form, PSA birth certificate (original + photocopy), one acceptable ID + 1 photocopy, PSA marriage certificate if using spouse's surname.
- Renewal ([adult-renewal-epassport](https://consular.dfa.gov.ph/adult-renewal-epassport/)): current ePassport + photocopy of the data page, PSA documents if the name changed.
- Exemptions: excerpts say seniors, PWDs, pregnant women, and children 7 and below with parents don't need an appointment. This isn't in the data yet.
- Still needed: processing times, payment methods, acceptable ID list, the ASEANA address and hours, the consular office list URL, and the claim/delivery step.

### LTO driver's license (`data/services/lto-drivers-license.ts`)
- The [LTO Citizen's Charter 2025](https://lto.gov.ph/wp-content/uploads/2025/09/LTO-CC-2025-External.pdf) excerpt mentioned a ₱510 application fee and a ₱150 permit fee, but the table was garbled. Treat these as unconfirmed.
- An [LTO FAQ](https://lto.gov.ph/rsu-monitoring/17-frequently-asked-questions/14-faq-on-license-and-permit-issuance.html) excerpt lists **₱585 for a 10-year renewal**. That's for renewals only; renewal isn't in the data yet.
- Eligibility (excerpts): age 17+ (18 for foreigners), can read and write Filipino or English, Student Permit at least 1 month old, PDC from an accredited school, medical certificate sent electronically. An older order says medical certificates are valid for 15 days.
- Still needed: all fees, processing time, payment methods, the step-by-step at the licensing office, the office address and hours, and the office list URL.

### NBI clearance
- **Fee conflict:** the how-to guide says **₱130**, while the Citizen's Charter page lists **₱115 / ₱165 / ₱415**. The data uses ₱130 with a note. Confirm in the clearance portal.
- Only the main U.N. Avenue office is seeded. The [office locator](https://nbi.gov.ph/clearance-office-locator/) is a JavaScript map, so branches need to be added by hand.

### PSA birth certificate
- The walk-in outlet requirements, fee, and processing time are TODO.
- The East Avenue outlet address and hours are TODO. The official directory is <https://psa.gov.ph/directory/census-serbilis-center-metro-manila>.
- Pick-up at a PSA outlet (₱155) appears in the Serbilis text, but the site config currently hides that option (`ShowPickUpOption: false`), so it was left out.
- Foreign delivery prices conflict (USD 6.00 vs USD 20.30 per copy), so they were left out.

### National ID (`data/services/national-id.ts`)
- Search excerpts of [philsys.gov.ph/supporting-documents](https://philsys.gov.ph/supporting-documents/) list primary documents as: PSA birth certificate + one government ID with photo and signature, or a Philippine passport, or UMID, or driver's license. Secondary documents must show photo, signature/thumbmark, full name, permanent address, and birth date.
- Registration is described as online pre-registration → validation and biometrics at a center → PhilID delivery.
- Still needed: fee (if any), secondary document list, processing time, the online registration URL, and registration center info.

### Voter's Certification
- The fee went from ₱100 (2016 FAQ) to ₱75 (2021 notice). Confirm it's still ₱75, and whether the main office still requires an appointment.
- The office hours and address are from May 2021.

### Offices removed for accuracy
DFA ASEANA, PSA East Avenue, and LTO Central Office East Avenue were removed on 2026-10-25 because their names came from general knowledge, not an official page. Add offices back (with `sourceUrl`) once you can read the agencies' office lists. Guides without offices don't show the wait-times section.

## Sites that blocked automated access (as of 2026-10-25)

| Site | What it returned | What we needed it for |
|---|---|---|
| `passport.gov.ph`, `dfa.gov.ph`, `consular.dfa.gov.ph` | 403 (bot protection) | **Passport:** requirements for new and renewal applicants, accepted ID list, fees (regular/expedited), processing times, payment methods, the steps after booking, consular office list |
| `lto.gov.ph` (incl. the 2025 Citizen's Charter PDF) | 403 (bot protection) | **Driver's license:** requirements, fees, processing time, payment methods, step-by-step at the licensing office, office list |
| `psa.gov.ph` (incl. regional `*.psa.gov.ph` PDFs) | 403 (bot protection) | **PSA birth certificate:** walk-in outlet requirements, fee, processing time, outlet directory. **National ID:** PSA's PhilSys citizen's charter |
| `philsys.gov.ph` | Redirects to a maintenance page | **National ID:** supporting documents, registration steps, fee, processing time, registration centers |
| `gsis.gov.ph` | "Request Rejected" (firewall) | **GSIS e-Card / Digital ID:** no guide yet, nothing could be read |
| `officialgazette.gov.ph` | 403 | **National ID:** the PhilSys law (RA 11055), as a fallback source |

Readable official sources used: `nbi.gov.ph`, `bir.gov.ph` / `bir-cdn.bir.gov.ph`, `psaserbilis.com.ph` (PSA's official online portal), `sss.gov.ph`, `prc.gov.ph`, `phlpost.gov.ph`, `comelec.gov.ph`.
