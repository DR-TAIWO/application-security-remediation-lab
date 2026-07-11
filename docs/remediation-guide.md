# Remediation Guide

## SEC-001 SQL Injection

Vulnerable:

```js
const sql = "SELECT * FROM customers WHERE name = '" + name + "'";
```

Secure:

```js
const rows = await all(
  "SELECT id, name, email, accountBalance FROM customers WHERE name = ?",
  [name]
);
```

## SEC-002 Reflected XSS

Vulnerable:

```js
res.send(`<h1>${q}</h1>`);
```

Secure option 1:

```js
res.json({ query: q, results: [] });
```

Secure option 2:

Encode user output before rendering HTML.

## SEC-003 Broken Access Control

Vulnerable:
No role check.

Secure:

```js
if (!req.user) return res.status(401).json({ error: "Unauthenticated" });
if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
```

## SEC-004 Hardcoded Secrets

Vulnerable:

```js
jwtSecret: "SuperSecretHardcodedJwtKey123!"
```

Secure:

```js
jwtSecret: process.env.JWT_SECRET
```

For Azure:
Use Azure Key Vault and Managed Identity.

## SEC-006 Sensitive Logging

Vulnerable:

```js
console.log("Login attempt", { username, password });
```

Secure:

```js
console.log("Login attempt", { username });
```

Never log passwords, tokens, secrets or full sensitive data.

## SEC-009 Weak Password Hashing

Vulnerable:

```js
crypto.createHash("md5")
```

Secure:

```js
const bcrypt = require("bcryptjs");
const passwordHash = await bcrypt.hash(password, 12);
```
