# SEC-002 - Reflected XSS in Search Endpoint

## Severity
High

## Source
SAST / Manual validation

## Description
The search endpoint reflects user input into HTML without output encoding.

## Risk
An attacker could inject JavaScript into a victim's browser.

## Acceptance criteria
- User input is encoded before rendering.
- Endpoint preferably returns JSON instead of raw HTML.
- XSS payload is not executed/reflected as HTML.
- Tests pass.
