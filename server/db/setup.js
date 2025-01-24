const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL
    )
  `);
  console.log("Database setup completed.");
});

db.close();
