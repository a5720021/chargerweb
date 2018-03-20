firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("logout_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
    }

    if (user != null) {
        var emailID = user.email;
        document.getElementById("user_id").innerHTML = "Welcome user : " + emailID;
    }

    else {
        // No user is signed in.
        document.getElementById("logout_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
});

function login() {
    // var rootRef = firebase.database().ref("ocpp-database");

    // rootRef.on("value", snap => {
    //     var name = snap.child("name").val();
    //     var pass = snap.child("password").val();
    // });

    var userName = document.getElementById("name_user").value;
    var userPass = document.getElementById("password_user").value;

    // if (name == userName) {
    //     window.alert("Error username or password ");
    firebase.auth().signInWithEmailAndPassword(userName, userPass)
        .then(function () {
            // Sign-out successful.
            window.Polymer = {rootPath: '/'};
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            window.alert("Error : " + errorMessage);
        });
    //}
}

function logout() {
    firebase.auth().signOut();
}

var dbRefObject = firebase.database().ref().child("authorize");
var dbRefList = dbRefObject.child("73A6F02D");
// dbRefObject.on("value", snap => { // Keep the local user object synced with the Firebase userRef 
//     console.log(JSON.stringify(snap.val()));
// });

dbRefList.on("child_added", snap =>{
    var userID = snap.val()
    if(userID != null){
        console.log(userID);
    }else{console.log("F");}
});

// rootRef.on("value", snap => {
//     var name = snap.child("name").val();
//     var pass = snap.child("password").val();
// });