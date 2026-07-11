const request = require("supertest");
const app = require("../src/app");
const { initDb } = require("../src/db");

beforeAll(async () => {
  await initDb();
});

describe("Intentionally vulnerable behaviours", () => {
  test("SEC-001 demonstrates SQL injection behaviour", async () => {
    const res = await request(app).get("/customers?name=' OR 1=1--");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(1);
  });

  test("SEC-002 demonstrates reflected XSS behaviour", async () => {
    const payload = "<script>alert(1)</script>";
    const res = await request(app).get(`/search?q=${encodeURIComponent(payload)}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain(payload);
  });

  test("SEC-003 demonstrates broken access control", async () => {
    const res = await request(app).get("/admin/users/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe("admin");
  });
});
