# AIHUB Secure Development Baseline v1.0

## Scope
Default policy for AIHUB-owned GitHub repositories. This document is a proposed reusable policy; adoption by other repositories requires an individual review and explicit rollout. Spec Kit and AI skills are not automatically trusted.

## Installation and provenance
1. Inventory project languages, dependencies, CI workflows, existing agent instructions, secrets handling, licensing and production release path.
2. Adopt GitHub Spec Kit from official github/spec-kit only, pin a reviewed release/commit and record the version, checksum and provenance. Do not execute unreviewed remote install scripts.
3. Install the CLI in a controlled developer environment rather than embedding it as a production runtime dependency. Initialize each repository once, then create separate feature specifications as needed.
4. Maintain an allowlist of reviewed skills with exact source, version, hash, purpose and permissions. Do not copy every globally installed skill into every project.
5. Treat skill Markdown, shell scripts, hooks, external prompts and retrieved documents as untrusted input. Review before execution. Disable unsolicited network calls, destructive shell commands and access to unrelated credentials.
6. Grant minimum necessary GitHub permissions, use short-lived credentials and isolate production deployment secrets. No autonomous force-push, production deployment, credential access or destructive cleanup.

## Security gates
- Secret scan (history and working tree), dependency audit, license review, static analysis, workflow/action pinning, test suite and build checks.
- Review supply-chain risks: transitive dependencies, postinstall hooks, GitHub Actions, agent hooks, third-party extensions and external catalogs.
- Run unfamiliar tools in a sandbox without production secrets; pin versions and document updates.
- Require a human review before merging security-sensitive or financial/legal calculation changes.
- Publish a dated audit report. Do not claim zero vulnerabilities or guaranteed safety.

## Data minimization and cleanup
- Identify PII, health/financial data, tokens, customer records, real credentials and internal infrastructure information.
- Remove unnecessary sample data and artifacts from future commits; sanitize fixtures and logs.
- If secrets or sensitive data have entered Git history, revoke/rotate credentials first and plan history rewrite separately with owner approval; deleting a file does not erase Git history.
- Never auto-delete project files or rewrite history. Back up, prepare a deletion manifest, and obtain approval for irreversible changes.

## Standard development workflow
Constitution -> Specify -> Clarify -> Plan -> Tasks -> Implement -> Test -> Security review -> Converge -> Human approval -> Deploy.
For small fixes use scoped bug-assessment/fix/test; do not force the full process for trivial changes.

## Acceptance for rollout
Per-repository checklist must show provenance, reviewed skill allowlist, security findings, mitigations, CI result, and explicit owner approval. Any unresolved high/critical issue blocks automatic adoption or production release.
