# SEC-001 - SQL Injection in Customer Search

## Severity
High

## Source
SAST

## Description
The customer search endpoint concatenates untrusted user input directly into a SQL query.

## Risk
An attacker may manipulate the query to return unauthorised customer records or modify database behaviour.

## Evidence before remediation
- File: `src/routes/customers.js`
- Endpoint: `/customers?name=' OR 1=1--`
- Result: returns multiple customers

## Acceptance criteria
- SQL query uses parameterised query.
- Injection payload no longer returns multiple records.
- SAST finding resolved.
- Regression tests pass.
- Evidence attached.
