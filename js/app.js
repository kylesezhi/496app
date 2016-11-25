// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
  // Hat tip to #4 in:
  // https://www.toptal.com/ionic/most-common-ionic-development-mistakes
  $ionicConfigProvider.views.maxCache(0);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.line', {
      url: '/line',
      views: {
        'menuContent': {
          templateUrl: 'templates/line.html',
          controller: 'LineCtrl'
        }
      }
    })
    
    .state('app.users', {
      url: '/users',
      views: {
        'menuContent': {
          templateUrl: 'templates/users.html',
          controller: 'UsersCtrl'
        }
      }
    })

    .state('app.addUser', {
      url: '/addUser',
      views: {
        'menuContent': {
          templateUrl: 'templates/addUser.html',
          controller: 'AddUserCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/users');
});
