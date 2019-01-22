angular.module('eden', ['ngMaterial']).controller('edenCtl', function ($scope) {
        
    $scope.menuVisible = false;
    $scope.template = 'dashboard';

    

    

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
            //pouchdb.find(type, $scope);
            $scope.template = template;
            $scope.menuVisible = false;
        }

        
    };

    $scope.refreshCharts = () => {
      google.charts.load("current", { packages: ['corechart', 'bar', 'line', 'gauge'] });
    google.charts.setOnLoadCallback(refresh);

      function refresh(){

      var promise = $.getJSON("https://edengreen.ddns.net/moisture");
      promise.done(function(reading) {

        drawGauge('channel0', 'channel0', reading.channel0);
        drawGauge('channel1', 'channel1', reading.channel1);
        drawGauge('channel2', 'channel2', reading.channel2);
        drawGauge('channel3', 'channel3', reading.channel3);

      }).fail(function(err){
        // send error to api
      });
      }
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