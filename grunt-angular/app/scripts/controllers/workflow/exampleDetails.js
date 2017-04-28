angular.module('opm.controllers')
.controller("exampleDetails", function($scope, $state, $stateParams, Settings, $http) {
    var applyId = $stateParams.applyId;
    var psId = $stateParams.psId;
    $scope.bSwitch1 = false;
    $scope.bSwitch2 = false;
    $scope.init = function(){
        var acquire_params = {
                id: applyId
            }
        var comments_params = {
                ps_id: psId
            }
        $http({
            url:'/ACTIVITI/activiti/form/acquire/',
            method:'GET',
            params: acquire_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.data = JSON.parse(result.res.data.content);
                $scope.applyContent = result.res.data;
                $scope.bSwitch1 = true;
            }
        }).error(function(result){
            console.log(result)
        });

        $http({
            url:'/ACTIVITI/activiti/workflow/comments/',
            method:'GET',
            params: comments_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.resultContent = result.res.data;
                $scope.bSwitch2 = true;
            }
        }).error(function(result){
            console.log(result)
        });
    }
    $scope.init();
    $scope.back = function(){
        $state.go('workflow.examples',{"category":$stateParams.category,"name":$stateParams.name})
    }
})

