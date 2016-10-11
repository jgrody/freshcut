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

  .state('menu.myClients', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myClients.html',
        controller: 'myClientsCtrl'
      }
    }
  })

  .state('menu.myPros', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myPros.html',
        controller: 'myProsCtrl'
      }
    }
  })

  .state('menu.addClient', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/addClient.html',
        controller: 'addClientCtrl'
      }
    }
  })

  .state('menu.addPro', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/addPro.html',
        controller: 'addProCtrl'
      }
    }
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
    url: '/page4/:role',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('roleSelection', {
    url: '/page8',
    templateUrl: 'templates/roleSelection.html',
    controller: 'roleSelectionCtrl'
  })

  .state('menu.editClient', {
    url: '/page9/:client',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editClient.html',
        controller: 'editClientCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page8')

  

});