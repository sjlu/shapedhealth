app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(false);

  var routes = {
    '/': 'listConversations'
  };

  for (var route in routes) {
    var controller = routes[route];
    $routeProvider.when(route, {
      templateUrl: controller + '.html',
      controller: controller
    });
  }

  $routeProvider.otherwise({
    redirectTo: '/'
  });

}]);