const app = require("./app");
const { initDb } = require("./db");

const port = process.env.PORT || 3000;

initDb().then(() => {
  app.listen(port, () => {
    console.log(`AppSec Remediation Lab running on http://localhost:${port}`);
  });
});
