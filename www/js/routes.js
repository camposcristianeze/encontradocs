angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('encontraDocs', {
      url: '/home',
      templateUrl: 'templates/encontraDocs.html',
      controller: 'encontraDocsCtrl'
    })
        
      
    
      
        
    .state('encontré', {
      url: '/encontre',
      templateUrl: 'templates/encontré.html',
      controller: 'encontréCtrl'
    })
        
      
    
      
        
    .state('busco', {
      url: '/page5',
      templateUrl: 'templates/busco.html',
      controller: 'buscoCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});