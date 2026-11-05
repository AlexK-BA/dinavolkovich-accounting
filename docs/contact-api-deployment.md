# FINBIZ contact API — deployment checklist

The frontend is currently deployed to GitHub Pages. The contact API must run in a **separate Vercel project**, ideally from the same repository with the root directory unchanged and the frontend build disabled or configured for API-only deployment.

## Required configuration

Vercel server-side environment variables (never prefix with VITE_):
- `RESEND_API_KEY`: Resend API key with sending permission.
- `CONTACT_FROM_EMAIL`: verified sending identity on a domain verified with Resend, e.g. `FINBIZ <kontakt@finbizcentrum.pl>` only after the address/domain is verified.
- `CONTACT_RECIPIENT`: `grossbuh23@gmail.com`.
- `CONTACT_ALLOWED_ORIGIN`: `https://finbizcentrum.pl` (must match browser Origin exactly).
- `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile secret.

GitHub Pages frontend build environment variables:
- `VITE_CONTACT_ENDPOINT`: full HTTPS URL to deployed Vercel `/api/contact`.
- `VITE_TURNSTILE_SITE_KEY`: public Turnstile site key registered for `finbizcentrum.pl`.

**Important:** Vite variables are embedded at build time. Configure them in the GitHub Actions build environment before building the site. If `VITE_CONTACT_ENDPOINT` is missing, the form retains an explicitly labeled mailto fallback. Never publish the API key or Turnstile secret in the repository or Vite variables.

## Launch verification

1. Verify sender domain in Resend and configure SPF/DKIM as instructed by the provider.
2. Create a Turnstile widget allowing the production site hostname.
3. Deploy Vercel API; verify OPTIONS preflight and CORS behavior from the actual site.
4. Confirm server-side validation rejects invalid submissions, missing consent, and invalid/expired Turnstile tokens.
5. Submit a real test enquiry from the website; verify delivery to the recipient and success state.
6. Test API downtime, mobile layout, PL/RU/EN, and keyboard navigation.
7. Add durable rate limiting at the API edge (e.g. WAF rules or a shared rate-limit store) before broad public launch. Turnstile and a honeypot do not replace rate limiting.
8. Obtain legal approval for privacy notice and personal-data retention/deletion policies before public release.

No deployment, sender verification, or end-to-end delivery test has been performed as part of this PR.
