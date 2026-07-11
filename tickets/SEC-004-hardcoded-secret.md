# SEC-004 - Hardcoded Secrets

## Severity
High

## Source
SAST / Secret scanning

## Description
Secrets are hardcoded in application configuration.

## Risk
Anyone with repository access can view credentials and API keys.

## Acceptance criteria
- Secrets removed from source code.
- Secrets loaded from environment variables or Key Vault.
- `.env` is not committed.
- Secret scanning passes.
