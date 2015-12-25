var voteApp = angular.module('voteApp', []);

voteApp.controller('VoteCtrl', function ($scope, $http) {
  $scope.status = 'default';
  $scope.dataClass = 'hide-data';

  $scope.getTarget = function() {
    $scope.currentTarget = $('.single-item').slick('slickCurrentSlide') + 1;
    $('.single-age').get(0).slick.setPosition();
    $scope.dataClass = 'show-data';
  };

  $scope.submitVote = function() {
    $scope.status = 'loading';
    var currentAge = $('.single-age').slick('slickCurrentSlide') + 1;
    var currentSex = $('.single-sex').slick('slickCurrentSlide') + 1;
    
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