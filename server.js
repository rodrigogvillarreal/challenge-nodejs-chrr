const express = require('express');
const logger = require('morgan');
const firebase = require("firebase");
const admin = require("firebase-admin");
const bodyParser = require('body-parser');

const app = express()
const port = Number(process.env.port || 3030)

var idToken;
var uid;

var firebaseConfig = {
  apiKey: "AIzaSyCr67wg6lFCNMoUkyaS2GvvKcO9QAhCYqE",
  authDomain: "nodechallenge-424c1.firebaseapp.com",
  databaseURL: "https://nodechallenge-424c1.firebaseio.com",
  projectId: "nodechallenge-424c1",
  storageBucket: "nodechallenge-424c1.appspot.com",
  messagingSenderId: "198380806724",
  appId: "1:198380806724:web:40d57506473d3f31f39211"
};

firebase.initializeApp(firebaseConfig);
admin.initializeApp(firebaseConfig);

var db = firebase.database();
var refSitios = db.ref("SitiosInteres");

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
    admin.auth().verifyIdToken(req.body.token)
    .then(function(decodedToken) {
      uid = decodedToken.uid;
      // ...
    }).catch(function(error) {
      // Handle error
    });  
    console.log(idToken);
    res.sendStatus(200);
})

/* CRUD */

app.get('/SitiosInteres', (req, res) => {

  
  refSitios.once("value", function(data) {
    console.log(data.val());
  });

  // sitiosRef.once("value")
  //   .then(snapshot => {
  //     snapshot.forEach(doc => {
  //       console.log(doc.id, '=>', doc.data());
  //     });
  //   })
  //   .catch(err => {
  //     console.log('Error getting documents', err);
  //   });

  //console.log(sitios);


})

app.listen(port, () => console.log(`Challenge App listening on port:`, port));

