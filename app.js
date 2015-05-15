angular.module('demo', [])
  .controller('ImageController', ['$scope', '$http', function($scope, $http){
    var imageList = this;
    imageList.images = [];

    $http.get('https://api.github.com/repositories?since=1000').
      success(function(data, status, headers, config) {
        angular.forEach(data, function (repo){
          imageList.images.push(repo.owner);
        });
      });

    $scope.aName = function(owner) {
      if(/^a.+/i.test(owner.login)){
        $scope.getFollowers(owner);
        return true;
      }
      return false;
    };

    $scope.getFollowers = function(owner) {
      if (owner.followers) {
        return owner.followers;
      } else {
        owner.followers = [];
        $http.get(owner.followers_url).
        success(function(data, status, headers, config) {
          angular.forEach(data, function (follower){
            owner.followers.push(follower);
          });
        });
      }
    };
  }]);

