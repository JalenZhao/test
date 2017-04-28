angular.module('opm.controllers')
.controller("myProcessed", function($scope,$http,$state,Settings) {
    var persinfo = JSON.parse(Settings.user_persinfo);
    $scope.loadingSwitch = false;
    // 分页初始化 开始
    $scope.maxSize = Settings.maxSize;
    $scope.bigCurrentPage = Settings.bigCurrentPage;
    $scope.pageSize = Settings.pageSize;
    $scope.pageChanged = function() {
        $scope.init();
    };
    // 分页初始化 结束
    // type=0  已处理
    // type=1  待处理
    $scope.init = function(){
        var http_params = {
            user_id: persinfo.user_id,
            page: $scope.bigCurrentPage,
            pageSize: $scope.pageSize,
            type: 0,
            user_name: sessionStorage.getItem("userName")
        }
        $http({
            url:'/ACTIVITI/activiti/workflow/my/tasks/',
            method:'GET',
            params: http_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.bigTotalItems = result.total;
                $scope.data = result.res.data;
                $scope.loadingSwitch = true;
                if($scope.data.length == 0){
                    $scope.message = "暂无已处理数据";
                }
            }
        }).error(function(result){
            console.log(result);
        });
    }
    $scope.init();
    $scope.search = function(){
        if($scope.keyword != undefined){
            var search_params = {
                user_id: persinfo.user_id,
                page: $scope.bigCurrentPage,
                pageSize: $scope.pageSize,
                type: 0,
                user_name: sessionStorage.getItem("userName"),
                search: $scope.keyword
            }
            $http({
                url:'/ACTIVITI/activiti/workflow/my/tasks/',
                method:'GET',
                params: search_params
            }).success(function(result){
                if(result.res.code == 120000){
                    $scope.bigTotalItems = result.total;
                    $scope.data = result.res.data;
                    $scope.loadingSwitch = true;
                    $scope.message="搜索结果不存在!";
                }
            }).error(function(result){
                console.log(result);
            });
        }else{
            $scope.init();
        }
        
    }
    $scope.look = function(formDataId,psId){
        $state.go("newsCenter.myProcessedDetails",{"id":formDataId,"psId":psId});
    }
})
