angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.myProfile', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myProfile.html',
        controller: 'myProfileCtrl'
      }
    }
  })

  .state('addClient', {
    url: '/page5',
    templateUrl: 'templates/addClient.html',
    controller: 'addClientCtrl'
  })

  .state('addPro', {
    url: '/page7',
    templateUrl: 'templates/addPro.html',
    controller: 'addProCtrl'
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/page3',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page4',
	params: {
		role: "'Professional'"		
},
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('roleSelection', {
    url: '/page8',
    templateUrl: 'templates/roleSelection.html',
    controller: 'roleSelectionCtrl'
  })

  .state('editClient', {
    url: '/page9',
	params: {
		id: ""		
},
    templateUrl: 'templates/editClient.html',
    controller: 'editClientCtrl'
  })

  .state('menu.mapsExample', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mapsExample.html',
        controller: 'mapsExampleCtrl'
      }
    }
  })

  .state('menu.clients', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/clients.html',
        controller: 'clientsCtrl'
      }
    }
  })

  .state('menu.pros', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pros.html',
        controller: 'prosCtrl'
      }
    }
  })

  .state('client', {
    url: '/page12',
	params: {
		id: ""		
},
    templateUrl: 'templates/client.html',
    controller: 'clientCtrl'
  })

  .state('pro', {
    url: '/page15',
	params: {
		id: ""		
},
    templateUrl: 'templates/pro.html',
    controller: 'proCtrl'
  })

$urlRouterProvider.otherwise('/page8')

  

});