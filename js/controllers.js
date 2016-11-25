angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $ionicPopup, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.loggedIn = window.localStorage.getItem("token");

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
  
  $scope.logOut = function() {
    window.localStorage.setItem("token", "");
    $scope.closeLogin();
    window.location.reload(true);
    // $state.go('app.users', {}, {reload: true});
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log($scope.loginData.password);
    console.log($scope.loginData.email);
    // hat tip to:
    // http://stackoverflow.com/questions/31626872/ionic-framework-http-post-request
    var toParams = function (obj) 
    {
      var p = [];
      for (var key in obj) 
      {
        p.push(key + '=' + encodeURIComponent(obj[key]));
      }
      return p.join('&');
    };
    var lineApi = 'http://localhost:8080/api/login';
    var password = $scope.loginData.password;
    var email = $scope.loginData.email;
    
    var payload = {
      password: password,
      email: email,
    };
    console.log(payload);
    
    $http({
        method: 'POST',
        url: lineApi,	
        headers: {'Content-Type': "application/x-www-form-urlencoded"},
        data: toParams(payload),
    }).success(function(res){
      console.log(res);
      if('token' in res) {
        window.localStorage.setItem("token", res.token);
        // var a = $ionicPopup.alert({
        //   title: "Success!",
        //   template: "Logged in."
        // });
      } else {
        window.localStorage.removeItem("token");
        // var a = $ionicPopup.alert({
        //   title: "Error.",
        //   template: "Incorrect email or password."
        // });
      }
      $scope.closeLogin();
      window.location.reload(true);
      // $state.reload();
      // $state.go('app.users', {}, {reload: true});
    });
    

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 500);
    
  };
})

.controller('UsersCtrl', function($scope, $http, $ionicPlatform, $cordovaBadge, $state) {
  // console.log("DEBUZzz");
  // console.log(window.localStorage.getItem("token"));
  
  // $scope.$on('$app.users.beforeEnter', function(){
  //   $state.reload();
  // });
  
  $ionicPlatform.ready(function() {
      // TODO BADGE 1/2
      // $cordovaBadge.promptForPermission();
      // 
      // $scope.setBadge = function(value) {
      //     $cordovaBadge.hasPermission().then(function(result) {
      //         $cordovaBadge.set(value);
      //     }, function(error) {
      //         alert(error);
      //     });
      // };
  });

  $scope.users = "";
  $scope.loggedIn = window.localStorage.getItem("token");
  var lineApi = 'http://localhost:8080/api/user';
  $http.get(lineApi)
    .success(function(data, status, headers,config){
      console.log('data success');
      // console.log(data);
      users = [];
      admins = [];
      for(i = 0;i<data.length;i++) {
        x = data[i];
        if (x.user_type === 'admin') {
          admins.push(x);
        } else {
          users.push(x);
        }
      }
      console.log(users); // for browser console
      $scope.users = users; // for UI
      $scope.admins = admins; // for UI
      
      // TODO BADGE 2/2
      // $cordovaBadge.hasPermission().then(function(result) {
      //     $cordovaBadge.set(ids.length);
      // }, function(error) {
      //     alert(error);
      // });
      
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(users){
      things = users.data;
    });
    
    $scope.deleteUser= function(id, $index){
      console.log(id);
      $http({
        method:"DELETE",
        url: lineApi + '/' + id,
        params: {}
        // params: {token: token}	
      }).success(function(res){
        console.log('User ID #'+ id +' deleted');
      });
      
      $scope.users.splice($index, 1);
    };
})

.controller('LineCtrl', function($scope, $http, $ionicPlatform, $cordovaBadge) {
       
  $scope.lineentries = "";
  $http.get('http://localhost:8080/api/lineentry')
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
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(lineentries){
      things = lineentries.data;
    });
})

.controller('AddUserCtrl', function($scope, $stateParams, $http, $ionicPopup) {
  // hat tip to:
  // http://stackoverflow.com/questions/31626872/ionic-framework-http-post-request
  var toParams = function (obj) 
  {
    var p = [];
    for (var key in obj) 
    {
      p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
  };
  var lineApi = 'http://localhost:8080/api/user';
  $scope.typeList = [
        { text: "Student", value: "student" },
        { text: "Teacher", value: "teacher" },
    ];
    $scope.data = {
        type: 'student'
    }; 
  $scope.submitUser=function(){
    var firstname = $scope.data.firstname;
    console.log(firstname);
    var lastname = $scope.data.lastname;
    console.log(lastname);
    var email = $scope.data.email;
    console.log(email);
    var password = $scope.data.password;
    console.log(password);
    var type = $scope.data.type;
    if (type === 'student') {
      type = 'user';
    } else {
      type = 'admin';
    }
    console.log(type);

    var payload = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      user_type: type,
    };
    console.log(payload);

    $http({
        method: 'POST',
        url: lineApi,	
        headers: {'Content-Type': "application/x-www-form-urlencoded"},
        data: toParams(payload),
    }).success(function(res){
      var a = $ionicPopup.alert({
        title: "Success!",
        template: "User created."
      });
      console.log(res);
      
      $scope.data={};
      $scope.addUserForm.$setPristine();
      $scope.addUserForm.$setUntouched();
    });
  };
});
