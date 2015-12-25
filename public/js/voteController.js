var voteApp = angular.module('voteApp', []);

voteApp.controller('VoteCtrl', function ($scope, $http) {
  $scope.status = 'default';
  $scope.dataClass = 'hide-data';

  $scope.getTarget = function() {
    $scope.currentTarget = $('.single-item').slick('slickCurrentSlide') + 1;

    if ($scope.currentTarget == 1) {
      return;
    }
    
    $scope.dataClass = 'show-data';
    $scope.status = '';
  };

  $scope.submitVote = function() {
    var currentAge = $('.single-age').slick('slickCurrentSlide') + 1;
    var currentSex = $('.single-sex').slick('slickCurrentSlide') + 1;

    if (currentAge == 1) {
      return;
    }
    if (currentSex == 1) {
      return;
    }
    
    $scope.dataClass = 'hide';
    $scope.status = 'loading';


console.log(currentAge)
console.log(currentSex)


    $http.post('//votetw.org/vote', {
        'target': $scope.currentTarget,
        'age': currentAge,
        'sex': currentSex,
        'internal_ip': ''
    }).success(function(resp) {
        console.log('success');
        $scope.status = 'success';
    }).error(function(resp) {
        console.log('error');
        $scope.status = 'error';
    });
  };
  
});