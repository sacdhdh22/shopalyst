var app = angular.module('survey.controller',['ngMaterial','angularSpinner', 'chart.js']);

app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({color: 'blue'});
}]);

//survey controller
app.controller('surveyCtrl', function($scope, $http, $mdToast,usSpinnerService,$window){
    usSpinnerService.stop('spinner-1');
    this.myDate = new Date();
    this.isOpen = false;
    $scope.features = ['food', 'ambiance', 'service', 'pricing'];
    $scope.ratings = [{'value' : 1},{'vlaue' : 2}, {'value' : 3},{'value' : 4},{'value' : 5}];
    var ratings = {
          food : {value : 0},
          ambiance : {value : 0},
          service : {value : 0},
          pricing : {value : 0}
    };
    $scope.select = function(data, feature){
       ratings[feature] = data;
    };

    $scope.submit= function(){
        usSpinnerService.spin('spinner-1');
        $http.post('/survey/submitFeedback', { surveyData : ratings, user: $scope.user})
        .then(function(){
            usSpinnerService.stop('spinner-1');
            $mdToast.show({
                hideDelay   : 3000,
                position    : 'top right',
                controller  : 'ToastCtrl',
                templateUrl : 'toast-template.html'
            });
            setTimeout(function() {
                $window.location.reload();
            },3000);

        }).catch(function(){

        })
    }

});
app.controller('ToastCtrl', function($scope, $mdToast, $mdDialog) {
    $scope.closeToast = function() {
        if (isDlgOpen) return;
        $mdToast
            .hide()
            .then(function() {
                isDlgOpen = false;
            });
    };

    $scope.openMoreInfo = function(e) {
        if ( isDlgOpen ) return;
        isDlgOpen = true;

        $mdDialog
            .show($mdDialog
                .alert()
                .title('More info goes here.')
                .textContent('Something witty.')
                .ariaLabel('More info')
                .ok('Got it')
                .targetEvent(e)
            )
            .then(function() {
                isDlgOpen = false;
            });
    };
});

app.controller('resultController', function($scope, $http, $mdToast,usSpinnerService) {
    usSpinnerService.spin('spinner-1');
   $http.get('/survey/getResult') .then(function(data){
       usSpinnerService.stop('spinner-1');
       $scope.result = data.data[0];
       $scope.data = [
           [ $scope.result.foodBad,$scope.result.foodPoor,$scope.result.foodAverage,$scope.result.foodGood,$scope.result.foodExcellent],
           [ $scope.result.ambianceBad,$scope.result.ambiancePoor,$scope.result.ambianceAverage,$scope.result.ambianceGood,$scope.result.ambianceExcellent],
           [ $scope.result.serviceBad,$scope.result.servicePoor,$scope.result.serviceAverage,$scope.result.serviceGood,$scope.result.serviceExcellent],
           [ $scope.result.pricingBad,$scope.result.pricingPoor,$scope.result.pricingAverage,$scope.result.pricingGood,$scope.result.pricingExcellent]
       ];
   }).catch(function(){
   })

    $scope.labels = ['Food', 'Ambiance', 'Service', 'Pricing'];
    $scope.series = ['Bad', 'Poor','Average','Good','Excellent'];


});