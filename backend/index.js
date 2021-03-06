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

var userroutes = require('./routes/userroutes.cjs');

app.use(express.json());

app.use('/app',userroutes);
 
process.on('SIGTERM', () => {
    server.close(( )=> {
        console.log('Server stopped')
    })
})