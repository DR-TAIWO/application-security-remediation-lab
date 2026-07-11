const jwt = require("jsonwebtoken");
const config = require("../config");

// SEC-005: Weak/insecure authentication design.
// Uses hardcoded JWT secret and does not validate strong token controls properly.
// Remediation: use env/Key Vault secret, validate issuer/audience/expiry and enforce RBAC.
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.user = null;
    return next();
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
  } catch (err) {
    req.user = null;
  }

  next();
}

module.exports = { authenticate };
