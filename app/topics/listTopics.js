app.controller('listTopics', function($scope, $http, $location) {

  $scope.newHeadline = '';
  $scope.creating = false;

  $scope.createTopic = function() {
    $scope.creating = true;

    $http.post("/api/topics", {
      headline: $scope.newHeadline
    })
    .success(function(data) {
      // go to topic
      $scope.newHeadline = '';
      $scope.creating = false;
      $location.path('/topics/' + data._id)
    })
  }

  $http.get('/api/topics').success(function(topics) {
    $scope.topics = topics;
  })

});