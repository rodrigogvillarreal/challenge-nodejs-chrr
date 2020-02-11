const express = require('express')
const logger = require('morgan')
const admin = require('firebase-admin')
const bodyParser = require('body-parser')

const app = express()
const port = Number(process.env.port || 3030)

var idToken;

/*
    Windows PowerShell
    $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Rodrigo Villarreal\Desarrollo\NodeJs\challenge-nodejs-chrr\service-account-file.json"
    Linux Terminal
    export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
*/
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://nodechallenge-424c1.firebaseio.com'
  });

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendfile('./index.html');
})

app.get('/login', (req, res) => {
    res.sendfile('./login.html');
})

app.post('/login', (req, res) => {
    idToken = req.body.token;
    console.log(idToken);
})



//

app.listen(port, () => console.log(`Challenge App listening on port:`, port));

