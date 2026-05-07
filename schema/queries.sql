CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
);

CREATE TABLE prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_id INTEGER,
    patient_id INTEGER,
    medicines TEXT,
    diagnosis TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);