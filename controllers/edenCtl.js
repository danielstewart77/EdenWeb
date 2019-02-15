angular.module('eden', ['ngMaterial']).controller('edenCtl', function ($scope, $http) {
    
    $scope.deviceId = '71D4FC8E-D739-4D6D-9615-65FDDEA3FC89';
    $scope.menuVisible = false;
    $scope.edit = false;
    $scope.template = 'dashboard';
    $scope.Channels = null;
    $scope.Channel = {
        Id: null,
        Name: null,
        IsCailibrated: false,
        Calibration: null,
        DeviceId: $scope.deviceId,
        Sensor: null
    };
    $scope.ChannelIds = {};
    $scope.Points = [];
    $scope.Point = {
        x: null,
        y: null
    };
    $scope.Calibration = null;
    $scope.PointNumber = 0;
    $scope.Clock = null;
    $scope.OutputMessage = null;

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

        $scope.Clock = new Date(reading.Time).toString("hh:mm tt");

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
        var promise = $.getJSON('https://edenapi.azurewebsites.net/api/channels/bydeviceid/' + $scope.deviceId);
        promise.done(function(channels) {
  
            $scope.Channels = channels;
  
        }).fail(function(err){
          // send error to api
          $scope.OutputMessage = err;
        });
    };

    $scope.saveConfig = () => {
        var getLine = {
            method: 'POST',
            url: 'https://edenapi.azurewebsites.net/api/channels/getcalibration/',
            data: $scope.Points
        }

        $http(getLine).then(function successCallback(response) {
            $scope.Channel.Calibration = JSON.stringify(response.data);

            var putChannel = {
                method: 'PUT',
                url: 'https://edenapi.azurewebsites.net/api/channels/' + $scope.Channel.Id,
                data: $scope.Channel
            };

            $http(putChannel).then(function successCallback(response) {
                $scope.loadChannels();
                //$scope.refreshCharts();
                //$scope.show('dashboard');
                $scope.OutputMessage = response;
            }, function errorCallback(response) {
                $scope.OutputMessage = response.data;
            });

            $scope.edit = false;
            $scope.CalibrationNumber = 0;


        }, function errorCallback(response) {
            $scope.OutputMessage = response;
        });
    };

    $scope.savePoint = () => {
        $scope.Points.push({x: $scope.Point.x, y: $scope.Point.y});
        $scope.PointNumber += 1;
        $scope.Point.x = null;
        $scope.Point.y = null;
    };

    $scope.editChannel = (channel) => {
        $scope.Channel = channel;
        $scope.edit = true;
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