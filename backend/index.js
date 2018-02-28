const express = require('express')
var cors = require('cors')
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser')
//r = require('rethinkdb')
var firebase = require("firebase");
var session = require('express-session')

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
    //console.log('SK');
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
app.use(bodyParser.json());

app.use(cors());

// Use the session middleware
app.use(session({ secret: 'charge point',cookie: { maxAge: 60000}}));

//var sess;

app.post('/auth', function (req, res) {
    var params = req.body;
    //req.session.user_id = "0001";

    var ref = database.ref('/authorize/'+params.username);
  
    //ref.once('value').then( function(snapshot) {
        //console.log(params.password,snapshot.val().password);
        if(params.username == "mung" || params.password == 123456){//snapshot.val().password){
            //sess = req.session;
            req.session.name = "Pathompat";//snapshot.val().name;
            req.session.amount = 5000;//snapshot.val().amount;
            //req.session.blocked = snapshot.val().blocked;
            //req.session.expiredate = snapshot.val().expiredate;
        }
    //});

    console.log(req.session);
});

app.get('/chksession', function (req, res) {
    //var params = req.body;
    //req.session.user_id = "0001";
    // if(req.session){
    //res.send("haha");
    // }
    console.log(req.session);
    if(req.session.name != undefined){
        res.send("log-in by :"+req.session.name);
    }else{
        console.log("No session!! Please log-in");
    }
});

app.get('/destroy', function (req, res) {
    req.session.destroy(function(err) {
        //sess = undefined;
    })
});

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
