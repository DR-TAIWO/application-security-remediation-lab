// SEC-004: Hardcoded secret.
// Remediation: load secrets from environment variables or Azure Key Vault.
module.exports = {
  jwtSecret: "SuperSecretHardcodedJwtKey123!",
  databasePassword: "P@ssword123-hardcoded",
  adminApiKey: "admin-api-key-123456"
};
