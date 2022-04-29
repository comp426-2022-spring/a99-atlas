const Database = require('better-sqlite3');

const db = new Database('database/atlas.db');

const stmt = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' AND (name='userinfo' OR name='loginhistory');
`);

let row = stmt.get();

if (row === undefined) {
    console.log('Database empty. Will now be initialized.');
    const sqlInit = `
        CREATE TABLE userinfo (id INTEGER PRIMARY KEY,
            email TEXT,
            nanoid TEXT,
            password TEXT);
    `;
    db.exec(sqlInit);
    console.log('Atlas database is now initialized. Created userinfo table.');

    const sqlInit2 = `
        CREATE TABLE loginhistory (id INTEGER PRIMARY KEY,
            email TEXT,
            dt DATETIME
            );
    `;
    db.exec(sqlInit2);
    console.log('Created userinfo and loginhistory table.');
} else {
    console.log('Database exists.');
}

module.exports = db;