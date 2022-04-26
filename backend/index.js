import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))

const port = args['port'] || 5555

const db = require("./database/createuserinfo.cjs")

const server = app.listen(port, () => {
    console.log('Backend listening on port %PORT%'.replace('%PORT%',port))
});

app.use(express.urlencoded({ extended: true}));

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

// var userroutes = require('./routes/userroutes.cjs');

app.use(express.json());

// const stmt = db.prepare('SELECT email FROM userinfo WHERE email = "liamp@live.unc.edu"').all();
// console.log(stmt);


const crypto = require('crypto');
const { appendFile } = require("fs");

// should take un, email, 2 passwords in json format
app.post('/register', (req, res) => {
    const {email, password, cPassword} = req.body;

    if (password === cPassword) {
        try{
            const stmt = db.prepare(`SELECT email FROM userinfo WHERE email = ('${email}')`);
            const exist = stmt.run();
            if (exist.length != 0) {
                res.status(400).send("Email already in use.");
            }
        } catch (e) {
            console.error(e)
        }

        const hashedPw = getHashedPassword(password);

        const adduser = db.prepare(`INSERT INTO userinfo (email, password) VALUES ('${email}','${hashedPw}')`);
        const user = adduser.run();

        res.status(201).json(user);
    } else {
        res.status(400).send("Passwords do not match");
    }
});
// should take username and password in json
app.post('/login', (req, res) => {
    res.sendStatus(200);
});

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}


process.on('SIGTERM', () => {
    server.close(( )=> {
        console.log('Server stopped')
    })
})