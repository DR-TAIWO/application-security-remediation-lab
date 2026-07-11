const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbFile = process.env.DATABASE_FILE || path.join(__dirname, "..", "database.sqlite");
const db = new sqlite3.Database(dbFile);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, function(err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function initDb() {
  await run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    accountBalance REAL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    passwordHash TEXT,
    role TEXT
  )`);

  const customers = await all("SELECT * FROM customers");
  if (customers.length === 0) {
    await run("INSERT INTO customers (name, email, accountBalance) VALUES ('Alice', 'alice@example.com', 1000)");
    await run("INSERT INTO customers (name, email, accountBalance) VALUES ('Bob', 'bob@example.com', 2500)");
    await run("INSERT INTO customers (name, email, accountBalance) VALUES ('Charlie', 'charlie@example.com', 300)");
  }

  const users = await all("SELECT * FROM users");
  if (users.length === 0) {
    await run("INSERT INTO users (username, passwordHash, role) VALUES ('admin', 'Password123!', 'admin')");
    await run("INSERT INTO users (username, passwordHash, role) VALUES ('taiwo', 'Password123!', 'user')");
  }
}

module.exports = { db, run, all, initDb };
