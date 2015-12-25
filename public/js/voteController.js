var voteApp = angular.module('voteApp', []);

voteApp.controller('VoteCtrl', function ($scope, $http) {
  $scope.submitVote = function() {

    var currentAge = $('.single-age').slick('slickCurrentSlide') + 1;
    var currentTarget = $('.single-item').slick('slickCurrentSlide') + 1;


    $http.get('//votetw.org/vote/', {
        'age': currentAge,
        'target': currentTarget
    }).success(function(resp) {
        console.log(resp)
    });
  };
  
});