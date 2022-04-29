const Database = require('better-sqlite3');

const db = new Database('database/atlas.db');

const stmt = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' AND (name='userinfo' OR name='loginhistory' or name='accesslog');
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
            nanoid TEXT,
            dt DATETIME
            );
    `;
    db.exec(sqlInit2);
    console.log('Created userinfo and loginhistory table.');
} else {
    console.log('Database exists.');
}

if (row === undefined) {
    console.log('Access log empty. Will now be initialized.');
    const sqlInit = `
        CREATE TABLE accesslog (id INTEGER PRIMARY KEY,
            remoteaddr TEXT,
            remoteuser TEXT,
            nanoid TEXT,
            time TIME,
            method TEXT,
            url TEXT,
            protocol TEXT,
            httpversion TEXT,
            secure TEXT,
            status TEXT,
            referer TEXT,
            useragent TEXT);
    `;
    db.exec(sqlInit);
    console.log('Access log now initialized.');
} else {
    console.log('Access log exists.');
}
module.exports = db;