// import { createRequire } from 'module';

// const require = createRequire(import.meta.url);

// const db = require("../dbinit/createuserinfo.cjs");

const db = require("../database/createuserinfo.cjs")

const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const { appendFile } = require("fs");

// should take un, email, 2 passwords in json format
router.post('/register', (req, res) => {
    const {email, password, cPassword} = req.body;

    if (password === cPassword) {
        try{
            const stmt = db.prepare(`SELECT email FROM userinfo WHERE email = (${email})`);
            const exist = stmt.run();
            if (exist.length != 0) {
                res.status(400).send("Email already in use.");
            }
        } catch (e) {
            console.error(e)
        }

        const hashedPw = getHashedPassword(password);

        const adduser = db.prepare(`INSERT INTO userinfo VALUES email, password (${email},${password})`);
        const user = adduser.run();

        res.status(201).json(user);
    } else {
        res.status(400).send("Passwords do not match");
    }
});
// should take username and password in json
router.post('/login', (req, res) => {
    res.sendStatus(200);
});

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

module.exports = router; 