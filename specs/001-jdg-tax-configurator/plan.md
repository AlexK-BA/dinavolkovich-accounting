# Implementation plan — FINBIZ JDG 2026

## Approach
Use specification-driven delivery with independent verification gates. This directory is a Spec Kit-compatible feature workspace, not a claim that the full Spec Kit CLI has been installed.

1. Audit existing `src/lib/taxCalculatorV2.ts` and `src/components/TaxCalculatorV2.tsx`; identify every formula, assumption, missing legal rule and existing test.
2. Create a versioned, cited tax rules registry for 2026. Verify ZUS, health insurance, PIT, ryczałt and IP Box rules against primary sources.
3. Define typed profile and eligibility decision engine; separate questions, eligibility, classification, calculations and UI.
4. Implement stepwise intake: business status, insurance titles, activity/PKWiU, finances, reliefs, results.
5. Build independent monthly cash-flow and annual settlement calculators. Do not use a single annualized number for both.
6. Add explainers and official-source links for each option and recommendation.
7. Add conditional opportunity engine (IP Box/B+R/ZUS) and accountant lead handoff with explicit consent.
8. Add independently derived fixtures and boundary tests; run CI, review results with accountant, then release behind preview.

## Release gates
G1: Tax source register independently verified.
G2: Eligibility and rate selection scenarios approved.
G3: Numerical fixtures and unit/integration tests pass.
G4: Privacy/consent and report flow validated.
G5: Accountant review and production promotion approved.

## Non-goals for first release
Automatic binding PKWiU classification, automatic legal determination of IP Box eligibility, comprehensive international taxation and unrestricted tax-advice claims.
