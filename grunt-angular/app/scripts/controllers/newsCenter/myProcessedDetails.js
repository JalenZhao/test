angular.module('opm.controllers')
.controller("myProcessedDetails", function($scope,$http,$state,$stateParams) {
    $scope.init = function(){
        var http_params = {
            id : $stateParams.id
        }
        var http_message_params = {
            ps_id : $stateParams.psId
        }
        $http({
            url:'/ACTIVITI/activiti/form/acquire/',
            method:'GET',
            params: http_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.data = JSON.parse(result.res.data.content);
            }
        }).error(function(result){
            console.log(result)
        });
        $http({
            url:'/ACTIVITI/activiti/workflow/comments/',
            method:'GET',
            params: http_message_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.messageData = result.res.data;
            }
        }).error(function(result){
            console.log(result)
        });
    }
    $scope.init()
    $scope.back = function(){
        $state.go("newsCenter.myProcessed")
    }
})
