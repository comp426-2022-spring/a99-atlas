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

            console.log(stmt);
            if (stmt.length != 0) {
                res.status(400).send("Email already in use.");
            } else {
                const hashedPw = getHashedPassword(password);

                const adduser = db.prepare(`INSERT INTO userinfo (email, password) VALUES ('${email}','${hashedPw}')`);
                const user = adduser.run();

                res.status(200).json(user);
            }
        } catch (e) {
            console.error(e)
        }
});
// should take username and password in json
const authTokens = {};

router.post('/login', (req, res) => {
    const {email, password}  =req.body;
    const hashedPw = getHashedPassword(password);

    console.log(db.prepare(`SELECT * FROM userinfo`).all());
    console.log(hashedPw);
    const user = db.prepare(`SELECT email, password FROM userinfo WHERE (email = '${email}' AND password = '${hashedPw}')`).all();
    console.log(user)

    if (user.length > 0) {
        const authToken = generateAuthToken();

        authTokens[authToken] = user;
        res.cookie('AuthToken', authToken);
        res.status(200)

        // res.redirect('/protected');
    } else {
        res.status(400).send("Invalid email or password");
    }
});

router.use((req, res, next) => {
    const authToken = req.cookies['AuthToken'];
    req.user = authTokens[authToken];
    next();
})
router.get('/protected', (req, res) => {
    if (req.user) {
        res.status(200).send("User protected");
    } else {
        res.status(401).send("Please login to contiue");
    }
})

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
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