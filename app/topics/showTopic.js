app.controller('showTopic', function($scope, $routeParams, $http) {

  $http.get('/api/topics/' + $routeParams.id).success(function(data) {
    $scope.topic = data;
  })

  var loadComments = function() {
    $http.get('/api/topics/' + $routeParams.id + '/comments').success(function(data) {
      $scope.comments = data;
    })
  }
  loadComments();

  $scope.postComment = function() {
    $http.post('/api/topics/' + $routeParams.id + '/comments', {
      text: $scope.newCommentText
    })
    .success(function(data) {
      $scope.comments.push(data);
      loadComments();
    });
  }

  $http.get('/api/me').success(function(data) {
    $scope.me = data;
  });

})