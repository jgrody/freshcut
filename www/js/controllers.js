angular.module('app.controllers', [])
  
.controller('myProfileCtrl', ['$scope', '$stateParams', '$ionicUser', function ($scope, $stateParams, $ionicUser) {
    $scope.user = {};
    
    $ionicUser.load().then(function(user){
        $scope.user = $ionicUser;
    })
}])
   
.controller('addClientCtrl', ['$scope', '$stateParams', '$ionicUser', '$firebaseArray', '$state', 'Validator', 'goTo', 'popupFactory', '$http', '$q', function ($scope, $stateParams, $ionicUser, $firebaseArray, $state, Validator, goTo, popupFactory, $http, $q) {
    $scope.errors = {};
    
    var sheetsuURL = "https://sheetsu.com/apis/v1.0/2d94e8863d03";
    
    var ref = firebase.database().ref();
    var clientsRef = ref.child($ionicUser.id).child('clients')
    var list = $firebaseArray(clientsRef);
    
    $scope.client = {
        name: "",
        phone: "",
        zipcode: ""
    }
    
    $scope.import = function(){
        $scope.importing = $http.get(sheetsuURL).then(function(response){
            var users = response.data;
            angular.forEach(users, function(value, index){
                // Dont want to send the google sheets ID with the data
                delete value.id;
                
                // Checking if the phone number already exists in the DB
                clientsRef
                    .orderByChild('phone')
                    .equalTo(value.phone)
                    .once('value', function(snapshot) {
                        if (!snapshot.val()) {
                            console.log('Number doesnt exist: adding...')
                            add(value)
                        } else {
                            console.log('Number: '+value.phone+ ' already exists. Moving on...')
                        }
                })
                
                // Way of knowing when its finished
                if (index + 1 == users.length){
                    delete $scope.importing;
                    popupFactory.alert({
                        title: 'Users imported!'
                    }).then(function(res){
                        goTo.clients();
                    })
                }
            })
        })
    }
    
    $scope.add = function(){
        $scope.errors.name = Validator.setNameErrors($scope.client.name);
        $scope.errors.phone = Validator.setPhoneErrors($scope.client.phone);
        
        if (
            Validator.validate('existence', $scope.client.name) &&
            Validator.validate('existence', $scope.client.zipcode) &&
            Validator.validate('phone', $scope.client.phone)
        ) {
            add($scope.client).then(function(){
                popupFactory.alert({
                    title: 'User added!'
                }).then(function(res){
                    goTo.clients();
                })
            })
        }
    }
    
    function add(user){
        return list.$add(user)
    }

}])
   
.controller('addProCtrl', ['$scope', '$ionicUser', '$firebaseArray', '$state', 'Validator', 'goTo', function ($scope, $ionicUser, $firebaseArray, $state, Validator, goTo) {
    $ionicUser.load().then(function(){});
    
    $scope.errors = {};
    
    var ref = firebase.database().ref();
    var prosRef = ref.child($ionicUser.id).child('pros')
    var list = $firebaseArray(prosRef);
    
    $scope.pro = {
        name: "",
        phone: "",
        specialties: ""
    }
    
    $scope.add = function(){
        setNameErrors();
        setPhoneErrors();
        
        if (
            Validator.validate('existence', $scope.pro.name) &&
            Validator.validate('phone', $scope.pro.phone)
        ) {
            list.$add($scope.pro).then(function(arg){
                goTo.pros()
            })
        }
    }
    
    $scope.validateName = function(){
        return $scope.pro.name.length;
    }
    
    function setNameErrors(){
        if ($scope.pro.name.length){
            $scope.errors.name = "";
        } else {
            $scope.errors.name = "Name is a required field";
        }
    }
    
    function setPhoneErrors(){
        var isValid = Validator.phoneIsValid($scope.pro.phone);
       
        if (!$scope.pro.phone.length){
            $scope.errors.phone = "Phone number is a required field"
        }
        
        if (!isValid) {
            $scope.errors.phone = "Phone number is invalid";
        }
        
        if ($scope.pro.phone.length && isValid){
            $scope.errors.phone = "";
        }
        
    }
    
    function phoneIsValid(){
        var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
        var digits = $scope.pro.phone.replace(/\D/g, "");
        return digits.match(phoneRe) !== null;
    }

}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', function ($scope, $stateParams, $ionicUser, $ionicAuth, $state) {
    
    $scope.userData = $ionicUser.details;
    var onboarded = $ionicUser.get('onboarded');

    $scope.logout = function(){
        $ionicAuth.logout();
        
        if (onboarded) {
            $state.go('login');
        } else {
            $state.go('roleSelection');
        }
    }

}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', function ($scope, $stateParams, $ionicUser, $ionicAuth, $state) {

    $scope.data = {
        'email': '',
        'password': ''
    }
    
    $scope.error = '';
    
    if ($ionicAuth.isAuthenticated()) {
        // Make sure the user data is going to be loaded
        $ionicUser.load().then(function() {});
        if ($ionicUser.get('onboarded')) {
            $state.go('menu.myProfile'); 
        } else {
            $state.go('roleSelection')
        }
    }
    
    $scope.login = function(){
        $scope.error = '';
        $ionicAuth.login('basic', $scope.data).then(function(){
            $state.go('menu.myProfile');
        }, function(){
            $scope.error = 'Error logging in.';
        })
    }

}])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', '$state', function ($scope, $stateParams, $ionicAuth, $ionicUser, $state) {
    
    $scope.data = {
        'name': '',
        'email': '',
        'password': ''
    }
    
    $scope.error='';
    
    $scope.signup = function(){
        
        $scope.error = '';

        $ionicAuth.signup($scope.data).then(function() {
            // `$ionicUser` is now registered

            $ionicAuth.login('basic', $scope.data).then(function(){
                $ionicUser.set('onboarded', true);
                $ionicUser.set('role', $stateParams.role);
                $ionicUser.save();
                $state.go('menu.myProfile');
            });
            
        }, function(err) {
            
            var error_lookup = {
                'required_email': 'Missing email field',
                'required_password': 'Missing password field',
                'conflict_email': 'A user has already signed up with that email',
                'conflict_username': 'A user has already signed up with that username',
                'invalid_email': 'The email did not pass validation'
            }    
        
            $scope.error = error_lookup[err.details[0]];
        });
    }

}])
   
.controller('roleSelectionCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', function ($scope, $stateParams, $ionicUser, $ionicAuth, $state) {
    
    if ($ionicAuth.isAuthenticated()) {
        // Make sure the user data is going to be loaded
        $ionicUser.load().then(function() {});
        $state.go('menu.myProfile');
    }
    
    $scope.role = "Professional";
    
}])
   
.controller('editClientCtrl', ['$scope', '$state', '$stateParams', '$ionicUser', '$firebaseObject', 'popupFactory', 'goTo', function ($scope, $state, $stateParams, $ionicUser, $firebaseObject, popupFactory, goTo) {
    
    var ID = $stateParams.id;
    
    var ref = firebase.database().ref();
    var clientRef = ref.child($ionicUser.id).child('clients').child(ID)
    $scope.client = $firebaseObject(clientRef);
    
    $scope.errors = {};
    
    $scope.update = function(){
        $scope.client.$save().then(function(ref){
            goTo.showClient($scope.client);
        }, function(error){
            console.log('error', error);
          $scope.errors.update = error;  
        })
    }
    
    $scope.removeClient = function(client){
        popupFactory.confirm({
            title: 'Are you sure?'
        }).then(function(res){
            if (res){
                $scope.client.$remove().then(function(ref){
                    goTo.clients();
                }, function(error){
                    $scope.errors.remove = error;
                })
            }
        })
    }
    
    $scope.cancel = function(){
        goTo.showClient($scope.client);
    }
}])
   
.controller('clientsCtrl', ['$scope', '$state', '$ionicUser', '$firebaseArray', 'goTo', 'repo', function ($scope, $state, $ionicUser, $firebaseArray, goTo, repo) {
    var ref, clientsRef, list;
    
    ref = firebase.database().ref();
    clientsRef = ref.child($ionicUser.id).child('clients');
    $scope.list = $firebaseArray(clientsRef);
    
    $scope.removeClient = function(client){
        return repo.removeFromList($scope.list, client)
            .then(function(res){
                if (res) goTo.clients();
            })
    };
    
    $scope.goToClient = function(client){
       goTo.showClient(client);
    };
    
    $scope.goToAddNew = function(){
        goTo.addClient();
    }
    
}])
   
.controller('prosCtrl', ['$scope', '$state', '$ionicUser', '$firebaseArray', 'goTo', 'repo', function ($scope, $state, $ionicUser, $firebaseArray, goTo, repo) {
    var ref = firebase.database().ref();
    var proRef = ref.child($ionicUser.id).child('pros');
    $scope.list = $firebaseArray(proRef);
    
    $scope.remove = function(pro){
        return repo.removeFromList($scope.list, pro)
            .then(function(res){
                if (res) goTo.pros();
            })
    };
    
    $scope.showPro = function(pro){
        console.log(pro.$id)
       goTo.showPro(pro);
    };
    
    $scope.goToAddNew = function(){
        goTo.addPro();
    }
  
}])
   
.controller('clientCtrl', ['$scope', '$stateParams', '$ionicUser', '$firebaseObject', 'goTo', 'repo', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $firebaseObject, goTo, repo) {
    var ref;
    var clientRef;
    var ID = $stateParams.id;
    
    $ionicUser.load().then(function(){
        ref = firebase.database().ref();
        clientRef = ref.child($ionicUser.id).child('clients').child(ID)
        $scope.client = $firebaseObject(clientRef);
    })
    
    $scope.editClient = function(){
        goTo.editClient($scope.client);
    }
    
    $scope.backToClients = function(){
        goTo.clients();
    }
    
    $scope.remove = function(){
        return repo.removeObject($scope.client).then(function(res){
            if (res) goTo.clients();
        })
    }
    
}])
   
.controller('userProfileCtrl', ['$scope', '$state', '$ionicUser', '$firebaseArray', 'goTo', 'repo', function ($scope, $state, $ionicUser, $firebaseArray, goTo, repo) {
    var ref = firebase.database().ref();
    var proRef = ref.child($ionicUser.id).child('menu.pros');
    $scope.list = $firebaseArray(proRef);
    
    $scope.remove = function(pro){
        return repo.removeFromList($scope.list, pro)
            .then(function(res){
                if (res) goTo.pros();
            })
    };
    
    $scope.showPro = function(pro){
        console.log(pro.$id)
       goTo.showPro(pro);
    };
    
    $scope.goToAddNew = function(){
        goTo.addPro();
    }
  
}])
   
.controller('pageCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {
    var url = "https://sheetsu.com/apis/v1.0/2d94e8863d03"
    $http.get(url).then(function(data){
        console.log('data', data)
    })
}])
 