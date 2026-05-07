const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./healthtech.db", (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("SQLite Connected");
    }
});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS prescriptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            doctor_id INTEGER,
            patient_id INTEGER,
            medicines TEXT,
            diagnosis TEXT,
            notes TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

});

module.exports = db;