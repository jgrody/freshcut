angular.module('firebaseConfig', ['firebase'])

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB92aFEdoS5wtR44OaSkiix-LIB3FADtS0",
    authDomain: "freshcut.firebaseapp.com",
    databaseURL: "https://freshcut.firebaseio.com",
    storageBucket: "project-5391251911339566675.appspot.com",
  };
  firebase.initializeApp(config);

})