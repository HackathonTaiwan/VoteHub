var voteApp = angular.module('voteApp', []);

voteApp.controller('VoteCtrl', function ($scope, $http) {
  $scope.submitVote = function() {

    var currentAge = $('.single-age').slick('slickCurrentSlide') + 1;
    var currentTarget = $('.single-item').slick('slickCurrentSlide') + 1;

    $http.post('//votetw.org/vote', {
        'age': currentAge,
        'target': currentTarget,
        'internal_ip': '123'
    }).success(function(resp) {
        console.log('success');
        $scope.success = true;
    }).error(function(resp) {
        console.log('error');
        $scope.error = true;
    });
  };
  
});