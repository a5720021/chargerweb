firebase.auth().onAuthStateChanged(function(user) {
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
  
function login(){
    var userEmail = document.getElementById("email_user").value;
    var userPass = document.getElementById("password_user").value;


    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        window.alert("Error : " + errorMessage);
      });
}

function logout(){
    firebase.auth().signOut();
}