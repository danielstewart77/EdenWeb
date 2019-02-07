angular.module('eden', ['ngMaterial']).controller('edenCtl', function ($scope) {
        
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

        moistGauge('#channel0', reading.channel0, reading.label0);
        moistGauge('#channel1', reading.channel1, reading.label1);
        moistGauge('#channel2', reading.channel2, reading.label2);
        moistGauge('#channel3', reading.channel3, reading.label3);

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