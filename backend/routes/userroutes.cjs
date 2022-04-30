// import { createRequire } from 'module';

// const require = createRequire(import.meta.url);

// const db = require("../dbinit/createuserinfo.cjs");

const db = require("../database/createuserinfo.cjs")

const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const { appendFile } = require("fs");

const { spawn } = require('child_process');
const { json } = require("body-parser");

const fs = require('fs')
const morgan = require('morgan')

const writestream = fs.createWriteStream('./access.log', {flags: 'a'})
router.use(morgan('combined',{stream:writestream}))

// should take un, email, 2 passwords in json format
router.post('/register', (req, res) => {
    const {email, password} = req.body;

    try{
        const stmt = db.prepare(`SELECT email FROM userinfo WHERE email = ('${email}')`).all();

        if (stmt.length != 0) {
            res.status(400).json("Email already in use.");
        } else {
            const hashedPw = getHashedPassword(password);

            var nanoid = crypto.randomBytes(5).toString('hex');
            const adduser = db.prepare(`INSERT INTO userinfo (email, nanoid, password) VALUES ('${email}','${nanoid}','${hashedPw}')`).run();

            res.status(200).json(nanoid);
        }
    } catch (e) {
        console.error(e)
    }
});

router.post('/login', (req, res) => {
    const {email, password}  = req.body;
    const hashedPw = getHashedPassword(password);

    const user = db.prepare(`SELECT * FROM userinfo WHERE (email = '${email}' AND password = '${hashedPw}')`).all();

    if (user.length > 0) {
        var nanoid = db.prepare(`SELECT nanoid FROM userinfo WHERE (email = '${email}' AND password = '${hashedPw}')`).all();
        var currentdate = new Date();
        const loglogin = db.prepare(`INSERT INTO loginhistory (email, nanoid, dt) VALUES ('${email}','${nanoid[0]['nanoid']}','${currentdate}')`).run();
        res.status(200).json(nanoid);
    } else {
        res.status(400).json("Invalid email or password");
    }
});

router.patch('/update/user/:id', (req, res) => {
    const {email, password}  = req.body;
    const nanoid = req.params.id;

    if(email != undefined) {
        const stmt = db.prepare(`UPDATE userinfo
                            SET email = '${email}'
                            WHERE nanoid = '${nanoid}'`).run();
    }
    if(password != undefined) {
        const stmt = db.prepare(`UPDATE userinfo
                                SET password = '${getHashedPassword(password)}'
                                WHERE nanoid = '${nanoid}'`).run();
    }

    res.status(200).json(nanoid);
})

router.delete('/delete/user/:id', (req, res) => {
    const nanoid = req.params.id;
    const stmt = db.prepare(`DELETE FROM userinfo WHERE nanoid = '${nanoid}'`).run();
    res.status(200).json(stmt);
})

router.get('/info/user/:id', (req, res) => {
    const nanoid = req.params.id;
    const stmt = db.prepare(`SELECT email FROM userinfo WHERE nanoid = '${nanoid}'`).all();
    res.status(200).json(stmt);
})

router.get('/history/user/:id', (req, res) => {
    const nanoid = req.params.id;
    const stmt = db.prepare(`SELECT dt FROM loginhistory WHERE nanoid = '${nanoid}'`).all();
    console.log(stmt);
    res.status(200).json(stmt);
})

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

router.get('/cases/:id', (req, res) => {
    const time = `${req.params.id}`; 

    const cases = db.prepare(`SELECT data FROM cases WHERE time='${time}'`).all();
    if (cases.length > 0) {
        cases[0]['data'] = JSON.parse(cases[0]['data'])
    }
    res.status(200).json(cases[0]);
})

router.get('/deaths/:id', (req, res) => {
    const time = `${req.params.id}`; 

    const cases = db.prepare(`SELECT data FROM deaths WHERE time='${time}'`).all();
    if (cases.length > 0) {
        cases[0]['data'] = JSON.parse(cases[0]['data'])
    }
    res.status(200).json(cases[0]);
})

router.get('/vaccinations/:id', (req, res) => {
    const time = `${req.params.id}`; 

    const cases = db.prepare(`SELECT data FROM vaccinations WHERE time='${time}'`).all();
    if (cases.length > 0) {
        cases[0]['data'] = JSON.parse(cases[0]['data'])
    }
    res.status(200).json(cases[0]);
})

router.get('/test', (req, res) => {
    console.log("This is a test endpoint.")
    res.status(200).json({"message": "Test successful. Exiting"})
    process.exit(0)
})

// router.use( (req, res, next) => {
//     let logdata = {
//         remoteaddr: req.ip,
//         remoteuser: req.user,
//         time: Date.now(),
//         method: req.method,
//         url: req.url,
//         protocol: req.protocol,
//         httpversion: req.httpVersion,
//         status: res.statusCode,
//         referer: req.headers['referer'],
//         useragent: req.headers['user-agent']
//     };
//     const stmt = db.prepare(`
//         INSERT INTO accesslog (remoteaddr,
//         remoteuser,
//         time,
//         method,
//         url,
//         protocol,
//         httpversion,
//         status,
//         referer,
//         useragent) values (?,?,?,?,?,?,?,?,?,?,?);
//     `);
//     const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time,logdata.method,
//         logdata.url,logdata.protocol,logdata.httpversion,logdata.status,logdata.referer,logdata.useragent);
//     res.status(200).json(info);
//     next();
// })

router.use(function(req, res) {
    res.json("Endpoint not found. (404)");
    res.status(404);
})

module.exports = router; 