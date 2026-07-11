const express = require("express");
const jwt = require("jsonwebtoken");
const { all } = require("../db");
const config = require("../config");

const router = express.Router();

// SEC-006: Sensitive data logging.
// Logs username and password.
// Remediation: never log passwords, tokens, secrets or full PII.
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt", { username, password });

  const users = await all(
    "SELECT id, username, passwordHash, role FROM users WHERE username = ?",
    [username]
  );

  const user = users[0];

  // SEC-009 related: plaintext password comparison because passwords are stored weakly.
  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    config.jwtSecret,
    { expiresIn: "8h" }
  );

  res.json({ token });
});

module.exports = router;
