import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors());

const args = require('minimist')(process.argv.slice(2))

const port = args['port'] || 5555

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

// const db = require("./database/createuserinfo.cjs")

const server = app.listen(port, () => {
    console.log('Backend listening on port %PORT%'.replace('%PORT%',port))
});

app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());

const countrytable = spawn("python3", ["controllers/countrytable.py"]);

const casesscript = spawn("python3", ["controllers/cases.py"]);
casesscript.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
})  

const deathscript = spawn("python3", ["controllers/deaths.py"]);
deathscript.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
}) 

const vaccscript = spawn("python3", ["controllers/vaccines.py"]);
vaccscript.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
}) 

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
var userroutes = require('./routes/userroutes.cjs');

app.use(express.json());

app.use('',userroutes);
 
process.on('SIGTERM', () => {
    server.close(( )=> {
        console.log('Server stopped')
    })
})