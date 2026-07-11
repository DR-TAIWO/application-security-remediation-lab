# SEC-003 - Broken Access Control in Admin User Lookup

## Severity
High

## Source
Manual review / SAST

## Description
The admin endpoint allows unauthenticated or non-admin users to access user details by ID.

## Risk
Unauthorised users may access restricted user records.

## Acceptance criteria
- Endpoint requires authentication.
- Endpoint verifies admin role before returning records.
- Unauthenticated users receive 401.
- Non-admin users receive 403.
- Admin users receive expected response.
