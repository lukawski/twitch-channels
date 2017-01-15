var app = angular.module('twitchChannels', [])

app.controller('MainCtrl', ['$scope', 'apiFactory', function ($scope, apiFactory) {
  var channels = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'comster404']

  $scope.data = []

  apiFactory.getStreams(channels)
                .then(function (res) {
                  $scope.data = res
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
    return $http.get(API_URL + 'channels/' + channel)
          .then(success, error)
  }

  var getStream = function (channel) {
    return $http.get(API_URL + 'streams/' + channel)
          .then(success, error)
  }

  var getStreams = function (channels) {
    var promises = []

    channels.forEach(function (v) {
      promises.push(getStream(v))
    })

    return $q.all(promises, success, error)
  }

  return {
    getStream: getStream,
    getStreams: getStreams
  }
}])

app.constant('API_URL', 'https://wind-bow.gomix.me/twitch-api/')
