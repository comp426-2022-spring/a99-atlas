const db = require("./createuserinfo.cjs")

const stmt = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' AND name='loginhistory';
`);

let row = stmt.get();

if (row === undefined) {
    console.log('Database empty. Will now be initialized.');
    const sqlInit = `
        CREATE TABLE loginhistory (id INTEGER PRIMARY KEY,
            username TEXT,
            dt DATETIME
            );
    `;
    db.exec(sqlInit);
    console.log('Created loginhistory table.');
} else {
    console.log('loginhistory exists.');
}

const stmt2 = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' AND name='accesslog';
`);

let row2 = stmt.get();

if (row2 === undefined) {
    console.log('Database empty. Will now be initialized.');
    const sqlInit = `
        CREATE TABLE accesslog (id INTEGER PRIMARY KEY,
            remoteaddr TEXT,
            remoteuser TEXT,
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
    console.log('Access log is now initialized.');
} else {
    console.log('Access log exists.');
}

module.exports = db;