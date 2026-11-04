# FINBIZ — Lovable preview release checklist

## Current state (2026-11-04)

- Source of preview changes: `feature/spec-kit-tax-configurator`; draft PR #21.
- Production homepage `/` is deliberately unchanged in the feature branch.
- Preview routes: `/design-preview`, `/design-preview/uslugi/jdg-basic`, `/design-preview/uslugi/jdg-vat`, `/design-preview/uslugi/sp-zoo`, `/calculator-preview`, and preview legal pages.
- GitHub Actions `Preview quality checks` validates TypeScript, unit tests and Vite build. A green workflow does **not** publish changes to Lovable.
- Do not merge this branch into `main` or publish to the live domain without explicit approval.

## Publishing a test build on Lovable

1. Open the FINBIZ project in Lovable and inspect **Settings → GitHub** to confirm the connected repository and synchronized branch. Confirm whether Lovable is linked to `AlexK-BA/dinavolkovich-accounting`; do not assume GitHub changes in another branch appear automatically.
2. Use a separate Lovable project/preview environment linked to the feature branch, or another explicitly isolated deployment, to inspect changes without changing the live homepage. If Lovable only syncs the default branch, **do not merge merely to see a preview**; arrange a separate preview deployment.
3. Publish the test project using Lovable's publish controls, then open its actual preview URL. Publishing a project and syncing GitHub are distinct operations.
4. Smoke-test every preview route, mobile layout, PL/RU/EN language changes, pricing CTA, calculator and legal links. Check that draft preview pages are not indexed.
5. Do not enable real enquiry submissions until the backend below is deployed and tested.

## Important: backend compatibility

The repository contains `api/contact.js`, implemented as a **Vercel Node.js serverless function**. A Lovable-hosted Vite frontend does not by itself establish that this function is deployed at `/api/contact`. Without a compatible backend or a rewrite/proxy to an existing API, the forms may return 404/405 or fail even when the frontend build is successful.

Choose and verify one backend path before accepting leads:

- Deploy the function to a compatible serverless platform and configure the frontend's API URL securely, with CORS/origin checks adapted to the deployed hosts; **or**
- Replace the endpoint with a Lovable-compatible backend (e.g. an authenticated/limited Edge Function), with equivalent server-side validation and anti-spam protection.

For the existing Vercel function, configure `RESEND_API_KEY`, a verified `RESEND_FROM_EMAIL`, and optionally `CONTACT_RECIPIENT_EMAIL`. Never put the Resend secret in Vite `VITE_*` variables or frontend source. Perform a real test enquiry and confirm receipt at the approved destination address.

## Release gates

- Regenerate `package-lock.json` and restore `npm ci` in CI.
- Independently verify 2026 Polish ZUS, health and PIT calculations with a qualified accountant and authoritative rules.
- Confirm pricing, phone/email, privacy policy, cookie disclosures and terms with the client.
- Verify actual Lovable preview deployment and end-to-end contact delivery.
- Only after sign-off, plan a controlled production release and rollback.
