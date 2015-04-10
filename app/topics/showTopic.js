app.controller('showTopic', function($scope, $routeParams, $http) {

  $scope.posting = false;

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
    $scope.posting = true;
    $http.post('/api/topics/' + $routeParams.id + '/comments', {
      text: $scope.newCommentText
    })
    .success(function(data) {
      $scope.posting = false;
      $scope.newCommentText = null;
      $scope.comments.push(data);
      loadComments();
    });
  }

  $http.get('/api/me').success(function(data) {
    $scope.me = data;
  });

})