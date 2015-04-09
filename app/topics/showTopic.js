app.controller('showTopic', function($scope, $routeParams, $http) {

  $http.get('/api/topics/' + $routeParams.id).success(function(data) {
    $scope.topic = data;
  })

})