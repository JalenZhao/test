angular.module('opm.controllers')
.controller("workflowInternetApplication", function($scope, $state, $stateParams, $http, Settings) {
	$scope.maxSize = Settings.maxSize;
    $scope.bigCurrentPage = Settings.bigCurrentPage;
    $scope.pageSize = Settings.pageSize;
    $scope.init = function(){
        var http_params={
            id: $stateParams.id
        }
        $http({
            url:'/ACTIVITI/activiti/workflow/pis/',
            method:'GET',
            params: http_params
        }).success(function(result){
            console.log(result)
        }).error(function(result){
            console.log(result)
        });
    }
    $scope.init();
    $scope.pageChanged = function() {
        console.log(bigCurrentPage)
    };
    $scope.dofilter = function(){
        console.log($scope.category)
    }
    $scope.examplesInfo = function(total,id){
        if(total){
            $state.go('workflow.examples',{'id': id})
        }
    }
})
