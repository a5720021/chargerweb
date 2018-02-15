const express = require('express')
var cors = require('cors')
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser')
//r = require('rethinkdb')
var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyDpBtpDYu0a4roRChP0yWBgAu9yPB3lrjc",
    authDomain: "ocpp-database.firebaseapp.com",
    databaseURL: "https://ocpp-database.firebaseio.com",
    storageBucket: "ocpp-database.appspot.com",
  };
  firebase.initializeApp(config);
  
// Get a reference to the database service
var database = firebase.database();

var conIO = [];
io.on('connection', function (socket) {
    conIO.push(socket)
    // console.log('SK');
    // socket.emit('news', { hello: 'world' });
    // socket.on('my other event', function (data) {
    //     console.log(data);
    // });
});

// var conDB = null;
// r.connect(
//     { host: 'rdb.codeunbug.com', port: 28015, user: "admin", password: "next@2017", db: "myList" }, function (err, conn) {
//         if (err) throw err;
//         conDB = conn;
//     })

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors())

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})