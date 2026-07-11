const express = require("express");
const { all } = require("../db");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.use(authenticate);

// SEC-003: Broken Access Control / IDOR.
// Any unauthenticated or normal user can request any user by ID.
// Remediation: require authentication and check role/ownership.
router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  const rows = await all(
    "SELECT id, username, role FROM users WHERE id = ?",
    [userId]
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(rows[0]);
});

module.exports = router;
