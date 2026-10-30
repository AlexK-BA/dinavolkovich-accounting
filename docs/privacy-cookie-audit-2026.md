# FINBIZ CENTRUM — cookie and privacy implementation audit (2026-10-30)

## Verified from source code (main)
- `index.html` has no Google Analytics, Google Tag Manager, Meta Pixel or similar embedded scripts.
- `src/main.tsx` mounts the React app; no analytics bootstrap is present.
- `src/components/Contact.tsx` opens a `mailto:` draft addressed to `grossbuh23@gmail.com`; there is no server-side contact submission. A user must explicitly send the draft from their mail client.
- The tax calculator calculates client-side in React; its form is not submitted to a backend.
- CSS imports Google Fonts from `fonts.googleapis.com`. External font loading is a separate privacy consideration even if no cookies are set.
- No consent manager was identified in the inspected application entry points or package dependencies.

## Not yet verified
- Browser network requests, response headers, actual cookies, localStorage/sessionStorage and third-party resources on the deployed site.
- Whether DNS, CDN, hosting or embedded external content adds tracking independently of the app source.
- Which processors and retention periods FINBIZ uses for received emails.
- Whether CRM/API integrations will add tracking or transmit personal data.

## Release decision
Do not add a misleading generic “Accept all cookies” banner without identifying nonessential storage. If browser testing confirms strictly necessary storage only, provide the cookie policy and no opt-in banner. If analytics/marketing or other nonessential access is added, block it before consent and implement equally accessible Accept, Reject and Preferences actions, with withdrawal support. Legal drafts require FINBIZ approval before release.
