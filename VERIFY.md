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

### Offices that aren't verified at all
These were seeded so wait-time reports have somewhere to point. Their names come from general knowledge, not an official page: DFA ASEANA, PSA East Avenue, LTO Central Office East Avenue. Confirm each one, or remove it.
