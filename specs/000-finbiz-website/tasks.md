# FINBIZ CENTRUM — Master Delivery Backlog
Legend: P0 = blocks trustworthy production release; P1 = important for launch quality; P2 = enhancement. All tasks initially open; previous implementation is not acceptance.

## A. Audit / foundations
- [ ] WEB-001 P0 Inventory deployed site, source routes, branches, open PRs, assets, dependencies and analytics scripts; establish evidence and screenshots.
- [ ] WEB-002 P0 Consolidate overlapping PRs #5, #6, #12, #18-#21 without overwriting newer changes; document merge plan.
- [ ] WEB-003 P1 Replace Lovable template README with real setup, scripts, architecture, environment, deployment and rollback instructions.
- [ ] WEB-004 P0 Verify authoritative company identity, NIP/KRS/REGON, address, contact details, legal operator and ownership with client.
- [ ] WEB-005 P1 Record product constitution, decision log, scope boundaries and acceptance checklist.

## B. Design / UX
- [ ] WEB-010 P0 Review `/design-preview` against homepage; obtain approval for final light-theme design and brand usage.
- [ ] WEB-011 P1 Unify design tokens, typography, colors, CTA, card, form and spacing patterns.
- [ ] WEB-012 P0 Test responsive header, mobile navigation, anchors, client-area dropdown, footer and breakpoints.
- [ ] WEB-013 P1 Review all sections: hero, services, process, pricing, about, founder, FAQ, calculator, contact, partners.
- [ ] WEB-014 P1 Implement keyboard navigation, focus states, contrast, reduced motion, accessible labels and error messaging.
- [ ] WEB-015 P1 Validate logo/partner assets, image sizing, SVG accessibility, no broken images and consistent branding.
- [ ] WEB-016 P1 Add user-oriented navigation to calculator and consultation, with clear distinction between preview and released features.

## C. Structure / content / localization
- [ ] WEB-020 P0 Approve information architecture, menu/section order, footer navigation and cross-links.
- [ ] WEB-021 P0 Audit PL/RU/EN copy, missing translations, language switch, legal-language availability and mobile text overflow.
- [ ] WEB-022 P1 Validate service descriptions, prices, exclusions, VAT wording, CTA promises and accountant credentials.
- [ ] WEB-023 P1 Check external URLs: client panel, wFirma, Telegram, mail, phone, partner services and social links.
- [ ] WEB-024 P1 Build appropriate not-found, fallback and user-facing error experiences.

## D. Forms / conversion / operations
- [ ] WEB-030 P0 Replace mailto-only contact flow with reliable approved delivery to email/CRM; server-side validation and delivery status.
- [ ] WEB-031 P0 Add anti-spam, rate limiting, abuse handling, minimum PII and secure secrets management.
- [ ] WEB-032 P0 Add privacy notice and appropriate legal basis/consent handling to lead forms; record only necessary evidence.
- [ ] WEB-033 P1 Test lead receipt, failures, duplicate submission, spam, mobile form and accessibility.
- [ ] WEB-034 P0 Connect calculator report to 'Skonsultuj wynik z księgowym' with explicit user action and consent.
- [ ] WEB-035 P1 Define lead schema, data retention, access control, delivery failure alerts and deletion workflow.

## E. Cookies / legal / GDPR
- [ ] WEB-040 P0 Inventory cookies, local/session storage, third-party embeds, tracking and analytics before selecting consent implementation.
- [ ] WEB-041 P0 Implement prior blocking of non-essential categories and granular Accept/Reject/Customize controls.
- [ ] WEB-042 P0 Provide persistent cookie preferences entry, withdrawal/re-consent, choice persistence and accessibility.
- [ ] WEB-043 P0 Review PR #12 legal drafts with client/legal owner and confirm correct company/controller details.
- [ ] WEB-044 P0 Publish approved privacy and cookie policies and applicable terms on real routes with footer/form links.
- [ ] WEB-045 P1 Document processors, purposes, legal bases, retention, transfers and cookie table; verify claims against actual implementation.
- [ ] WEB-046 P1 Verify consent works on PL/RU/EN, across navigation and analytics activation/deactivation.

## F. JDG tax configurator — see 001 spec
- [ ] TAX-001 P0 Audit and independently verify all 2026 PIT, ZUS, FP/FS, zdrowotna and ryczałt rules and source citations.
- [ ] TAX-002 P0 Create guided profile: new/existing/restarted JDG, dates, prior relief, employment overlap and insurance titles.
- [ ] TAX-003 P0 Add PKWiU-driven activity classification and multiple revenue streams; flag unconfirmed rates.
- [ ] TAX-004 P0 Separate monthly paid health/social contributions from annual liability and reconciliation.
- [ ] TAX-005 P0 Model skala/liniowy/ryczałt eligibility, deductions, ZUS transitions, boundaries and yearly versioning.
- [ ] TAX-006 P1 Add contextual explanations and official source links for each input, rule and recommendation in PL/RU/EN.
- [ ] TAX-007 P1 Add conditional IP Box and B+R screening, qualifying-income/nexus caveats and accountant handoff.
- [ ] TAX-008 P0 Build independently calculated numeric fixtures, edge cases, regression and cross-regime tests.
- [ ] TAX-009 P1 Add printable/exportable result with assumptions, rule version, source list and consultation CTA.
- [ ] TAX-010 P0 Replace old homepage calculator only after accountant sign-off and release tests.

## G. SEO / accessibility / performance
- [ ] WEB-050 P1 Verify per-language metadata, canonical/hreflang, OpenGraph, favicon, sitemap, robots and structured data.
- [ ] WEB-051 P1 Validate heading hierarchy, semantic landmarks, forms, alt text and accessible interactive controls.
- [ ] WEB-052 P1 Optimize images, loading, bundle sizes, font delivery and Core Web Vitals.
- [ ] WEB-053 P1 Run mobile/desktop cross-browser, keyboard and assistive technology smoke tests.

## H. Security / CI / release
- [ ] WEB-060 P0 Audit dependencies, secret exposure, GitHub Actions permissions, external scripts and supply-chain risks.
- [ ] WEB-061 P0 Add/verify CI gates: build, lint, unit tests, integration tests and dependency/security scans.
- [ ] WEB-062 P1 Configure appropriate hosting security headers, HTTPS redirects, CSP review and safe outbound links.
- [ ] WEB-063 P0 Document preview/staging release, backups, rollback and production change approval.
- [ ] WEB-064 P0 Conduct end-to-end UAT: all links, forms, cookie flows, calculator, legal pages and locales.
- [ ] WEB-065 P0 Deploy approved version and confirm live smoke tests; log defects and ownership.
- [ ] WEB-066 P2 Post-launch analytics and conversion monitoring only after privacy/consent checks.
- [ ] WEB-067 P1 Audit and remove unnecessary sample data, test artifacts and placeholders; review history separately before any destructive cleanup.
