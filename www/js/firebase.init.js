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

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/