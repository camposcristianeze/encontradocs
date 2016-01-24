angular.module('app.controllers', [])
  
.controller('encontraDocsCtrl', function($scope) {

})
   
.controller('encontréCtrl', function($scope) {

})
   
.controller('buscoCtrl', function($scope) {
    $scope.locationChanged = function (location) {
        alert(location);
    };
})
 