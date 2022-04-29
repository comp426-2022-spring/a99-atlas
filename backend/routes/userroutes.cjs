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

// should take un, email, 2 passwords in json format
router.post('/register', (req, res) => {
    const {email, password} = req.body;

    try{
        const stmt = db.prepare(`SELECT email FROM userinfo WHERE email = ('${email}')`).all();

        if (stmt.length != 0) {
            res.status(400).send("Email already in use.");
        } else {
            const hashedPw = getHashedPassword(password);

            var nanoid = crypto.randomBytes(5).toString('hex');
            const adduser = db.prepare(`INSERT INTO userinfo (email, nanoid, password) VALUES ('${email}','${nanoid}','${hashedPw}')`).run();

            res.status(200).send(nanoid);
        }
    } catch (e) {
        console.error(e)
    }
});
// should take username and password in json
const authTokens = {};

router.post('/login', (req, res) => {
    const {email, password}  = req.body;
    const hashedPw = getHashedPassword(password);

    const user = db.prepare(`SELECT * FROM userinfo WHERE (email = '${email}' AND password = '${hashedPw}')`).all();

    if (user.length > 0) {
        var nanoid = db.prepare(`SELECT nanoid FROM userinfo WHERE (email = '${email}' AND password = '${hashedPw}')`).all();
        // console.log(nanoid);
        res.status(200).send(nanoid);
    } else {
        res.status(400).send("Invalid email or password");
    }
});

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

router.get('/cases/:id', (req, res) => {
    const time = `${req.params.id}`; 

    const cases = db.prepare(`SELECT data FROM cases WHERE time='${time}'`).all();

    res.status(200).json(cases);
})

router.get('/deaths/:id', (req, res) => {
    const time = `${req.params.id}`; 

    const cases = db.prepare(`SELECT data FROM deaths WHERE time='${time}'`).all();

    res.status(200).json(cases);
})

router.get('/vaccinations/:id', (req, res) => {
    const time = `${req.params.id}`; 

    const cases = db.prepare(`SELECT data FROM vaccinations WHERE time='${time}'`).all();

    res.status(200).json(cases);
})

module.exports = router; 