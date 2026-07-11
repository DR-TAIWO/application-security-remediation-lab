# AppSec Remediation Lab - Intentionally Vulnerable Node.js API

This project is a **local training lab** for practising Application Security Engineer responsibilities:

1. Run an application in VS Code.
2. Identify findings using SAST/SCA-style review.
3. Create remediation tickets.
4. Discuss remediation with developers.
5. Fix vulnerabilities.
6. Add tests.
7. Re-run checks.
8. Produce remediation evidence.

> WARNING: This app is intentionally vulnerable. Do not deploy it to the internet.

## Tech stack

- Node.js
- Express
- SQLite
- Jest + Supertest
- GitHub Actions example
- Semgrep config example
- npm audit for SCA-style dependency checks

## Vulnerabilities included

| ID | Vulnerability | File |
|---|---|---|
| SEC-001 | SQL Injection | `src/routes/customers.js` |
| SEC-002 | Reflected XSS | `src/routes/search.js` |
| SEC-003 | Broken Access Control / IDOR | `src/routes/admin.js` |
| SEC-004 | Hardcoded Secret | `src/config.js` |
| SEC-005 | Weak JWT Secret / Insecure Auth | `src/middleware/auth.js` |
| SEC-006 | Sensitive Data Logging | `src/routes/login.js` |
| SEC-007 | Insecure CORS | `src/app.js` |
| SEC-008 | Missing Security Headers | `src/app.js` |
| SEC-009 | Weak Password Hashing | `src/routes/register.js` |
| SEC-010 | Vulnerable Dependency Practice | `package.json` |

## How to run in VS Code

### 1. Open folder

Open this folder in VS Code.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

### 4. Seed database

The database seeds automatically on startup.

## Try the vulnerable endpoints

### SQL Injection

```bash
curl "http://localhost:3000/customers?name=Alice"
```

Try injection:

```bash
curl "http://localhost:3000/customers?name=' OR 1=1--"
```

### XSS

```bash
curl "http://localhost:3000/search?q=<script>alert(1)</script>"
```

### Login with sensitive logging

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Password123!"}'
```

### Broken access control

```bash
curl "http://localhost:3000/admin/users/1"
```

## Run tests

```bash
npm test
```

Some tests intentionally demonstrate insecure behaviour.

## Run SCA-style dependency check

```bash
npm audit
```

## Optional: Run Semgrep locally

Install Semgrep:

```bash
python3 -m pip install semgrep
```

Run scan:

```bash
semgrep scan --config semgrep-rules.yml .
```

## Your AppSec workflow

For each vulnerability:

1. Review the finding.
2. Confirm whether it is valid.
3. Create a Jira-style ticket using `tickets/`.
4. Recommend remediation.
5. Developer fixes code.
6. Review PR.
7. QA validates test evidence.
8. Re-run scan/tests.
9. Save evidence in `evidence/`.
10. Close ticket.

## Suggested interview explanation

“I practised an end-to-end application security remediation workflow using a deliberately vulnerable API. I reviewed SAST/SCA-style findings, validated issues such as SQL injection, XSS, hardcoded secrets and broken access control, created remediation tickets, recommended secure coding fixes, verified remediation through tests and rescans, and documented evidence for audit and BAU handover.”
