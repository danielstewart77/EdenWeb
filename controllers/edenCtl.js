angular.module('eden', ['ngMaterial']).controller('edenCtl', function ($scope) {
    
    $scope.deviceId = '71D4FC8E-D739-4D6D-9615-65FDDEA3FC89';
    $scope.menuVisible = false;
    $scope.template = 'dashboard';
    $scope.Channels = null;
    $scope.Channel = null;
    $scope.ChannelIds = {};
    $scopeOutputMessage = null;

    $scope.showMenu = () => {
        //toggle
        if ($scope.menuVisible == true){
            $scope.menuVisible = false;
        }
        else{
            $scope.menuVisible = true;
        }
    };

    $scope.show = (template) => {
        if (template){
            $scope.template = template;
            $scope.menuVisible = false;
        }

        if ($scope.template == 'dashboard'){
            $scope.refreshCharts();
        }
        if ($scope.template == 'config'){
            $scope.loadChannels();
        }
    };

    $scope.refreshCharts = () => {
      var promise = $.getJSON('https://edenapi.azurewebsites.net/api/readings/bydeviceid/' + $scope.deviceId);
      promise.done(function(reading) {

          var channels = JSON.parse(reading.Data);

          for (var i = 0; i < channels.length; i++)
          {
            moistGauge('#channel' + i, channels[i].Value, channels[i].Name);
            $scope.ChannelIds[channels[i].Id] = channels[i].Sensor;
          }

      }).fail(function(err){
        // send error to api
      });
    };

    $scope.loadChannels = () => {
        var promise = $.getJSON('https://edenapi.azurewebsites.net/api/channels/' + $scope.deviceId);
        promise.done(function(reading) {
  
            $scope.Channels = JSON.parse(reading.Data);
  
        }).fail(function(err){
          // send error to api
        });
    };

    $scope.saveConfig = () => {
        var req = {
            method: 'PUT',
            url: 'https://edenapi.azurewebsites.net/api/channels/',
            data: {
                //$scope.
                //$scope.Channels,
            }
        };

        $http(req).then(function successCallback(response) {
            $scope.refreshCharts();
            $scope.show('dashboard');
            $scope.OutputMessage = response.data;
        }, function errorCallback(response) {
            $scope.OutputMessage = response.data;
        });
    };

    if ($scope.template == 'dashboard'){
            $scope.refreshCharts();
        }

}).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('customTheme')
        .primaryPalette('grey')
        .accentPalette('orange')
        .warnPalette('red');
});