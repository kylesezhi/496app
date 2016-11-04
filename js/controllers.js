angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('UsersCtrl', function($scope, $http) {
  $scope.users = "";
  $http.get('https://project-4-144319.appspot.com/api/user')
    .success(function(data, status, headers,config){
      console.log('data success');
      ids = [];
      for(i = 0;i<data.ids.length;i++) {
        x = data.ids[i];
        ids.push(x);
      }
      console.log(ids); // for browser console
      $scope.users = ids; // for UI
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(users){
      things = users.data;
    });
    
    $scope.deleteUser= function(id, $index){
      console.log(id);
      // $http({
      //   method:"DELETE",
      //   url: urlApi + id,
      //   params: {token: token}	
      // }).success(function(res){
      //   console.log('Project'+ id +' deleted');
      // });
      // $scope.data.splice($index, 1);
    };
})

.controller('LineCtrl', function($scope, $http) {
  $scope.lineentries = "";
  $http.get('https://project-4-144319.appspot.com/api/lineentry')
    .success(function(data, status, headers,config){
      console.log('data success');
      // console.log(data); // for browser console
      ids = [];
      for(i = 0;i<data.ids.length;i++) {
        x = data.ids[i];
        ids.push(x);
      }
      console.log(ids); // for browser console
      $scope.lineentries = ids; // for UI

      // $scope.lineentries = data; // for UI
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(lineentries){
      things = lineentries.data;
    });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
