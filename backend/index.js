const express = require('express')
var cors = require('cors')
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser')
//r = require('rethinkdb')
var firebase = require("firebase");
var omise = require('omise')({
    'secretKey': 'skey_test_5aovaci4ff1eoa7lb4d',
    'omiseVersion': '2015-09-10'
  });

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.post('/transaction', function (req, res) {
    //console.log(res);
    omise.charges.create({
        'description': 'Charge for order ID: 888',
        'amount': req.body.amount *100, // 1,000 Baht
        'currency': 'thb',
        'capture': true,
        'card': req.body.token
      }, (err, resp) => {
        if (resp) { //Success    
          console.log(resp);
          res.json({complete:true});
        } else {  //Handle failure
          console.log(resp.failure_code);
          //console.log("Error : "+resp);
        }
      });
});

// app.get('/destroy', function (req, res) {
//     req.session.destroy(function(err) {
//         //sess = undefined;
//     })
// });

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
