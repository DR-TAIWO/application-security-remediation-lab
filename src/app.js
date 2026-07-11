const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const customers = require("./routes/customers");
const search = require("./routes/search");
const login = require("./routes/login");
const register = require("./routes/register");
const admin = require("./routes/admin");

const app = express();

app.use(bodyParser.json());

// SEC-007: Insecure CORS - allows all origins.
// Remediation: restrict allowed origins, methods and headers.
app.use(cors({ origin: "*" }));

// SEC-008: Missing security headers.
// Remediation: add helmet and configure Content-Security-Policy, X-Frame-Options etc.

app.get("/", (req, res) => {
  res.json({
    message: "AppSec Remediation Lab - intentionally vulnerable local API"
  });
});

app.use("/customers", customers);
app.use("/search", search);
app.use("/login", login);
app.use("/register", register);
app.use("/admin", admin);

module.exports = app;
