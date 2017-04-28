angular.module('opm.controllers')
.controller("examples", function($scope, $state, $stateParams, $http, Settings) {
    // 分页初始化开始
	$scope.maxSize = Settings.maxSize;
    $scope.bigCurrentPage = Settings.bigCurrentPage;
    $scope.pageSize = Settings.pageSize;
    $scope.pageChanged = function() {
        $scope.init();
    };
    // 分页初始化结束
    $scope.loadingSwitch = false;
    $scope.init = function(){
    	var http_params={
            category: $stateParams.category,
            name: $stateParams.name,
            page:$scope.bigCurrentPage,
            pageSize:$scope.pageSize
        }
        $http({
            url:'/ACTIVITI/activiti/workflow/pis/',
            method:'GET',
            params: http_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.data =  result.res.data;
                 $scope.loadingSwitch = true;
            }
        }).error(function(result){
            console.log(result)
        });
    }
    $scope.init();
    $scope.back = function(){
        $state.go('workflow.total_list')
    }
    // 监控
    $scope.monitor = function(id){
        $scope.imgUrl = "/ACTIVITI/activiti/workflow/pis/img/?pid="+id;
        $('#monitorModal').modal();
    }
    // 暂停
    $scope.pause = function(id){
        var http_params = {
            pid: id
        }
        $http({
            url:'/ACTIVITI/activiti/workflow/pis/suspend/',
            method:'POST',
            params: http_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.resultMessage = result.res.message;
                $("#promptModal").modal();
                setTimeout(function(){
                    $("#promptModal").modal("hide");
                },1000)
            }
            $scope.init();
        }).error(function(result){
            console.log(result)
        });
    }
    // 激活
    $scope.activate = function(id){
        var http_params = {
            pid: id
        }
        $http({
            url:'/ACTIVITI/activiti/workflow/pis/activi/',
            method:'POST',
            params: http_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.resultMessage = result.res.message;
                $("#promptModal").modal();
                setTimeout(function(){
                    $("#promptModal").modal("hide");
                },1000)
            }
            $scope.init();
        }).error(function(result){
            console.log(result)
        });
    }
    // 删除
    $scope.deleteModal = function(id){
        $("#deleteModal").modal();
        $scope.delete = function(){
            var http_params = {
                pid: id
            }
            $http({
                url:'/ACTIVITI/activiti/workflow/pis/del/',
                method:'POST',
                params: http_params
            }).success(function(result){
                if(result.res.code == 120000){
                    $("#promptModal").modal("hide");
                    $scope.init();
                }
            }).error(function(result){
                console.log(result)
            });
        }
    }

    // 详情
    $scope.details = function(applyId,psId){
        $state.go("workflow.exampleDetails",{"applyId":applyId,"psId":psId,"category":$stateParams.category,"name":$stateParams.name})
    }
})
