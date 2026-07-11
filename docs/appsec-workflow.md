# Application Security Engineer Workflow

## Workflow

Developer writes code

↓

Developer creates Pull Request

↓

CI/CD pipeline runs automatically

↓

SAST/SCA identifies vulnerabilities

↓

Application Security Engineer reviews findings

↓

Validates true positive or false positive

↓

Creates or reviews remediation ticket

↓

Discusses remediation with developer

↓

Developer fixes code

↓

Security reviews Pull Request

↓

QA validates functionality and regression

↓

Pipeline reruns SAST/SCA/tests

↓

Evidence is attached

↓

Ticket is closed

## Your responsibility

As the Application Security Engineer, you are responsible for:

- Reviewing SAST/DAST/SCA findings
- Triage and false-positive validation
- Explaining risks to developers
- Recommending secure coding remediation
- Reviewing security aspects of pull requests
- Verifying fixes using rescans and tests
- Ensuring traceability from ticket to PR to release
- Producing evidence for audit and BAU handover
