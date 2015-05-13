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
  }]);

