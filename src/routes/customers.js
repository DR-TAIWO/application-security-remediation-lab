const express = require("express");
const { all } = require("../db");

const router = express.Router();

// SEC-001: SQL Injection.
// User input is concatenated directly into SQL.
// Remediation: use parameterised queries.
router.get("/", async (req, res) => {
  const name = req.query.name || "";

  const sql = "SELECT id, name, email, accountBalance FROM customers WHERE name = '" + name + "'";

  try {
    const rows = await all(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
