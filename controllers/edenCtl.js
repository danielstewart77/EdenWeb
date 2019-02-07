angular.module('eden', ['ngMaterial']).controller('edenCtl', function ($scope) {
    
    $scope.deviceId = '71D4FC8E-D739-4D6D-9615-65FDDEA3FC89';
    $scope.menuVisible = false;
    $scope.template = 'dashboard';
    $scope.label0 = '';
    $scope.label1 = '';
    $scope.label2 = '';
    $scope.label3 = '';

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
    };

    $scope.refreshCharts = () => {
      var promise = $.getJSON('https://edenapi.azurewebsites.net/api/readings/bydeviceid/' + $scope.deviceId);
      promise.done(function(reading) {
          var data = JSON.parse(reading.Data);

        moistGauge('#channel0', data.channel0, "reading.label0");
        moistGauge('#channel1', data.channel1, "reading.label1");
        moistGauge('#channel2', data.channel2, "reading.label2");
        moistGauge('#channel3', data.channel3, "reading.label3");

      }).fail(function(err){
        // send error to api
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