var app = angular.module('myApp', []),
    apiKey = 'MDE3MDA3OTYyMDE0MTI5Nzk5MzcyYWQ0ZA001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('MyController', function($scope) {
  $scope.person = { name: "Ari Lerner" };
  var updateClock = function() {
    $scope.clock = new Date();
  };
  var timer = setInterval(function() {
    $scope.$apply(updateClock);
  }, 1000);
  updateClock();
});

app.controller('PlayerController', function($scope, $http) {
  // Hidden our previous section's content
  // construct our http request
  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.audio.src = '/media/npr.mp4';
  $scope.play = function() {
    $scope.audio.play();
    $scope.playing = true;
  };
  $scope.stop = function() {
    $scope.audio.pause();
    $scope.playing = false;
  };
  $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop()
    });
  });

  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {

    $scope.programs = data.list.story;
    
    $scope.play = function(program) {
      if ($scope.playing) $scope.audio.pause();
      console.log(program.audio[0].format.mp4.$text);
      var url = program.audio[0].format.mp4.$text;
  
      $scope.streamAudio = document.createElement('audio');
      $scope.streamAudio.src = url;
      $scope.streamAudio.play();
      $scope.playing = true;
    }
  }).error(function(data, status) {
    // Some error occurred
  });
});


