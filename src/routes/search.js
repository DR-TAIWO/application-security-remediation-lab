const express = require("express");

const router = express.Router();

// SEC-002: Reflected XSS.
// User input is reflected into HTML without encoding.
// Remediation: encode output or return JSON only.
router.get("/", (req, res) => {
  const q = req.query.q || "";

  res.send(`
    <html>
      <body>
        <h1>Search results for: ${q}</h1>
        <p>No results found.</p>
      </body>
    </html>
  `);
});

module.exports = router;
