angular.module('opm.controllers')
.controller("myHandle", function($scope, $state, $stateParams, $http,Settings) {
    var persinfo = JSON.parse(Settings.user_persinfo);
    $scope.init = function(){
        var http_params = {
            id: $stateParams.id
        }
        $http({
            url:'/ACTIVITI/activiti/form/acquire/',
            method:'GET',
            params: http_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.data = JSON.parse(result.res.data.content);
                $scope.formId = result.res.data.id
            }
        }).error(function(result){
            console.log(result)
        });
    }
    $scope.init();
    $scope.back = function(){
        $state.go("newsCenter.myPending")
    }
    $scope.handle = function(handleStatus){
        var http_params;
        if($scope.handleMessage != undefined){
            http_params = {
                id: $scope.formId,
                task_id: $stateParams.taskId,
                outcome: handleStatus,
                message: $scope.handleMessage,
                user_id: persinfo.user_id,
                user_name: sessionStorage.getItem("userName")
            }
            $http({
                url:'/ACTIVITI/activiti/form/task/sub/',
                method:'POST',
                params: http_params
            }).success(function(result){
                if(result.res.code == 120000){
                    $scope.message = result.res.message;
                    $('#resultModal').modal()
                    setTimeout(function(){
                        $('#resultModal').modal('hide');
                    },1000);
                    setTimeout(function(){
                        $state.go("newsCenter.myPending");
                    },1400)
                }
            }).error(function(result){
                console.log(result)
            });
        }
    }
})

