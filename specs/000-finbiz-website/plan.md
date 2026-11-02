# FINBIZ Website — Implementation Plan

## Architecture and delivery
Keep existing React/Vite/TypeScript stack. Avoid adding infrastructure or analytics vendors without a concrete requirement and privacy review. Use a preview-first release strategy.

### Workstreams
A. Audit and baseline: inventory routes, components, assets, translations, dependencies, scripts, cookies, open PRs and deployments. Document defects with screenshots and reproducible steps.
B. Design system: reconcile `/design-preview` with brand and accessibility; approved responsive components and page hierarchy.
C. Information architecture/content: final navigation, content matrix PL/RU/EN, pricing and claims review, trust and partner links.
D. Lead conversion: real form delivery, validation, anti-spam, consent, success/error and accountant handoff from calculator.
E. Privacy/legal: client-approved policies, cookies inventory and granular consent manager, no premature tracking.
F. Tax: full `001-jdg-tax-configurator` delivery with separate source and numerical gates.
G. Technical quality: SEO, accessibility, performance, security, CI, monitoring and rollback.
H. Release: UAT, staging verification, approval, merge and post-deploy smoke tests.

### Decisions requiring stakeholder input
- Preferred final visual direction and exact branding.
- Approved legal texts and authoritative company details.
- Lead destination: email, CRM, or provider; access control and retention.
- Analytics vendors and consent categories.
- Scope of supported tax cases and accountant review sign-off.

### Gates
G0 Baseline and source inventory recorded.
G1 Design/content and legal approvals.
G2 Functional form, consent and navigation verified.
G3 Calculator legal sources and independent fixtures pass.
G4 Accessibility, security, SEO, performance and CI checked.
G5 Production approval, deployment, smoke test and rollback readiness.
