const express = require("express");
const crypto = require("crypto");
const { run } = require("../db");

const router = express.Router();

// SEC-009: Weak password hashing.
// Uses unsalted MD5.
// Remediation: use bcrypt/argon2 with suitable cost factor.
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const passwordHash = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  await run(
    "INSERT INTO users (username, passwordHash, role) VALUES (?, ?, ?)",
    [username, passwordHash, "user"]
  );

  res.status(201).json({ message: "User registered" });
});

module.exports = router;
