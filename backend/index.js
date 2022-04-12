import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))

const port = args['port'] || 5555

const server = app.listen(port, () => {
    console.log('Backend listening on port %PORT%'.replace('%PORT%',port))
});

const db = require("./dbinit/createuserinfo.cjs")

/*app.use( (req, res, next) => {
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        secure: req.secure,
        status: res.statusCode,
        referer: req.headers['referer'],
        useragent: req.headers['user-agent']
    };
    const stmt = db.prepare(`
        INSERT INTO accesslog (remoteaddr,
        remoteuser,
        time,
        method,
        url,
        protocol,
        httpversion,
        secure,
        status,
        referer,
        useragent) values (?,?,?,?,?,?,?,?,?,?,?);
    `);
    const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time,logdata.method,
        logdata.url,logdata.protocol,logdata.httpversion,logdata.secure,logdata.status,logdata.referer,logdata.useragent);
    res.status(200).json(info);
    next();
})*/


// should take un, email, 2 passwords in json format
app.post('/register', (req, res) => {
    res.sendStatus(200);
});
// should take username and password in json
app.post('/login', (req, res) => {
    res.sendStatus(200);
});