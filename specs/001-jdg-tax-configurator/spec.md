# Feature specification: FINBIZ JDG Tax Configurator 2026

## Objective
Replace the generic estimator with a guided, explainable Polish sole-proprietor (JDG) tax comparison and accountant consultation funnel. Preserve the existing production homepage until validated.

## User journeys
1. New JDG: user specifies actual start date, first-ever activity, prior business history, former/current employer, employment overlaps, and ZUS relief history. System checks relief eligibility, explains restrictions and requests missing information.
2. Existing/restarted JDG: user specifies opening/restart dates, current ZUS category, prior relief usage, other insurance titles and tax regime; system does not assume eligibility.
3. Business classification: user selects activities, describes actual services, and supplies PKWiU when known. Multiple revenue streams can carry different ryczałt rates. PKD/profession alone never conclusively determines a ryczałt rate.
4. Financial inputs: monthly or annual revenues, deductible expenses, VAT status (net/gross), start month, deductions with regime-specific eligibility, sickness insurance and social contributions.
5. Results: compare skala, liniowy and ryczałt when legally available, separately show PIT, social ZUS, FP/FS, health contributions, net cash, monthly payments and annual health settlement; highlight assumptions and unverified classifications.
6. Opportunities: offer conditional checks for IP Box, B+R and applicable ZUS reliefs. IP Box is not a fourth taxation regime; show potential 5% PIT only on eligible qualified IP income after nexus and evidence checks, with year-end settlement distinguished from advance payments.
7. Consultation: user can download a report or, after explicit consent, submit contact details and calculation profile to FINBIZ accountant. Never send personal/financial data without consent.

## Explainability and sources
Every non-trivial input, exclusion, calculation rule, recommendation and result includes plain-language Polish help text and a dated official government source link (ZUS, podatki.gov.pl, biznes.gov.pl, ISAP where applicable). RU/EN translations follow existing site localization. Record source URL, effective date, and verification date per rule; do not invent citations.

## Eligibility and safety
- Unsupported, disputed or unverified scenarios must be marked as requiring accountant confirmation, not silently assigned a rate.
- Missing mandatory facts block precise estimates, but users may view explicitly labeled scenarios.
- IP Box recommendation requires screening for B+R activity, qualified IP, rights, qualifying income, nexus calculation and separate records.
- Tax rates and thresholds are year-versioned; calculator must not silently apply 2026 rules to other years.
- Respect GDPR purpose limitation, data minimization, explicit consent and deletion policy for leads.

## Acceptance criteria
- Each selection has a comprehensible explanation and a verified official source.
- A new JDG cannot receive preferential ZUS automatically solely from a start-date selection.
- Mixed PKWiU revenues can use separate ryczałt rates; uncertain rates are flagged.
- Annual health reconciliation is distinct from monthly paid contributions.
- IP Box is shown as a conditional opportunity, never an automatic 5% tax on total revenue.
- Tax result export includes all assumptions, classification uncertainties and calculation version.
- Consultation submission requires affirmative consent and transmits the same report user sees.
- Independent, official-source-backed numerical fixtures test all three regimes, threshold boundaries, start/restart transitions and ZUS variants.
- No production homepage replacement until tests, source audit and client acceptance.
