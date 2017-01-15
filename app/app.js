var app = angular.module('twitchChannels', [])

app.controller('MainCtrl', ['$scope', 'apiFactory', function ($scope, apiFactory) {
  $scope.channels = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'comster404']

  $scope.data = []
  apiFactory.getStreams($scope.channels)
                .then(function (res) {
                  $scope.data = res
                  console.log(res)
                })
  apiFactory.getChannels($scope.channels)
                .then(function (res) {
                  $scope.info = res
                  console.log(res)
                })
}])

app.factory('apiFactory', ['$http', 'API_URL', '$q', function ($http, API_URL, $q) {
  var success = function (res) {
    return res.data
  }

  var error = function (err) {
    return $q.reject(err)
  }

  var getChannel = function (channel) {
    return $http.get(API_URL + 'channels/' + channel).then(success, error)
  }

  var getChannels = function (channels) {
    var promises = []


    channels.forEach(function (v) {
      promises.push(getChannel(v))
    })

    return $q.all(promises).then(function (res) { return res })
  }


  var getStream = function (channel) {
    return $http.get(API_URL + 'streams/' + channel).then(success, error)
  }

  var getStreams = function (channels) {
    var promises = []

    channels.forEach(function (v) {
      promises.push(getStream(v))
    })


    return $q.all(promises).then(function (res) { return res })
  }

  return {
    getStreams: getStreams,
    getChannels: getChannels
  }
}])

app.constant('API_URL', 'https://wind-bow.gomix.me/twitch-api/')
