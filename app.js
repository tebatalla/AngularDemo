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
            owner.followers.push(follower.login);
          });
        });
      }
    };
  }])
  .directive('hoverable', [function() {
    return {
      scope: {
        canHover: '&',
        owner: '='
      },

      link: function(scope, element, attr) {
        
        if(scope.canHover()){
          attachPopover(scope, element);
        }

        function attachPopover(scope, element) {
          if(scope.popover) {
            return;
          } else {
            $(element).popover({
              animation: true,
              content: followers,
              placement: 'auto left',
              trigger: 'hover',
              html: true,
              title: title
            });
            scope.popover = true;
          }
        }

        function title() {
          return scope.owner.login + "'s followers";
        }

        function followers() {
          var $group = $("<ul class='followers'>");
          scope.owner.followers.forEach(function(follower) {
            $group.append("<li>"+follower+"</li>");
          });
          return $group;
        }
      }
    };
  }]);

