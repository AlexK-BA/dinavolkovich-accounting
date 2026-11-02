# FINBIZ CENTRUM — Website Completion Specification

Status: draft for stakeholder validation. Source: repository audit on 2026-11-02 and previously agreed project scope. This is a Spec Kit-compatible specification, not evidence of a full CLI installation.

## Product outcome
A trustworthy, accessible, responsive, multilingual (PL primary, RU/EN supported) accounting-service website that converts visitors into qualified consultation leads. The 2026 JDG calculator is a guided, legally cautious decision-support tool and lead source. Preserve production until release gates pass.

## Confirmed current-state observations
- Main route renders `src/components/TaxCalculator.tsx`, while `TaxCalculatorV2.tsx` is exposed only at `/calculator-preview`.
- `/design-preview` is a separate comparison route.
- `src/components/Contact.tsx` sends a `mailto:` URL: it does not guarantee a submitted or stored lead.
- `src/App.tsx` has no legal-document routes.
- Footer displays company identifiers and Gmail address; these must be verified by client before publication.
- `README.md` still contains generic Lovable template and placeholder instructions.
- Existing header links to client area and wFirma; these require functional and security validation.
- Previous work: wFirma logo added; legal-document draft exists in separate PR #12 and needs client approval; design preview and calculator preview deployed separately.

## User journeys
1. Discover services, pricing, process, team, trust signals and partner services in PL/RU/EN.
2. Navigate reliably from desktop/mobile, keyboard and assistive technologies; no hidden essential content.
3. Understand service scope, exclusions, price assumptions, and consultation CTA.
4. Use JDG calculator, see sources, assumptions, conditional recommendations and contact accountant with consent.
5. Submit contact form with clear validation, success/error states and privacy information; receive a reliable lead delivery.
6. Access privacy policy, cookies policy, applicable terms and legally required company details.
7. Make granular non-essential cookie choices and change/withdraw them later.

## Functional and nonfunctional requirements
- Design: compare approved light-theme design preview against live site; establish consistent typography, spacing, contrast, buttons, cards, forms, icons and brand assets. Responsive at mobile/tablet/desktop, keyboard focus, WCAG-oriented accessibility, reduced-motion behavior.
- Information architecture: validate navigation, anchors, section order, mobile menu, footer, legal links, client-area links, external partner links and 404.
- Content: accurate PL-first copy, RU/EN parity, proofreading, business claims, service descriptions, pricing caveats, founder credentials, contact and company registry verification.
- Forms: replace mailto-only submission with a consent-aware backend or approved provider; anti-spam, server-side validation, reliable delivery, no exposed API secrets, explicit status and logging without unnecessary PII.
- Cookies/privacy: inventory all scripts, cookies, storage and analytics; block non-essential categories before consent; granular accept/reject/preferences; persist choices, re-open settings, document vendors, purposes, retention and withdrawal. Do not invent a consent requirement for strictly necessary storage.
- Legal: review and approve privacy policy, cookie policy and applicable terms with client/legal counsel; identify controller, processors, purposes, lawful bases, data subject rights, contact method, retention and cross-border transfers where relevant; avoid publishing unapproved drafts.
- SEO: unique localized titles/descriptions, semantic headings, canonical/hreflang where applicable, sitemap/robots, OpenGraph, favicon, structured data only if grounded, search indexing checks.
- Performance: image optimization, responsive assets, bundle budget, Core Web Vitals testing and mobile audits.
- Security: dependency/secret audit, pinned CI actions, CSP and security headers appropriate to hosting, external link safety, form abuse controls, privacy-preserving analytics, backup/rollback plan.
- QA: functional tests, accessibility review, cross-browser and device matrix, production smoke tests, owner sign-off.

## Tax configurator
See `specs/001-jdg-tax-configurator/spec.md`. Tax correctness and accountant verification are release blockers for replacing the live calculator.

## Acceptance
- Every visible CTA and form has an observable tested outcome.
- Every non-essential cookie is consent-gated, with working reject and withdrawal.
- All approved legal pages load and link from footer and relevant forms.
- PL/RU/EN content has no placeholders or untranslated critical strings.
- Mobile and desktop navigation, contrast and keyboard flows pass documented checks.
- All production URLs and redirects are tested, no broken links or exposed test routes without appropriate labeling.
- Calculator uses independent fixtures and source-verified rules; results disclose limitations.
- CI build, lint, tests, security scans and human UAT pass before production switch.
