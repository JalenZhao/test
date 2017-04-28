angular.module('opm.controllers')
.controller("myApply", function($scope, $http, $state, Settings) {
    var persinfo = JSON.parse(Settings.user_persinfo);
    var userId = persinfo.user_id;
    var username = sessionStorage.getItem("userName")
    $scope.loadingSwitch = false;
    // 分页初始化 开始
    $scope.maxSize = Settings.maxSize;
    $scope.bigCurrentPage = Settings.bigCurrentPage;
    $scope.pageSize = Settings.pageSize;
    $scope.pageChanged = function() {
        $scope.init();
    };
    // 分页初始化 结束
    $scope.init = function(){
        var http_params = {
            user_id: userId,
            page: $scope.bigCurrentPage,
            pageSize: $scope.pageSize,
            search: $scope.keyword,
            user_name: username
        }
        $http({
            url:'/ACTIVITI/activiti/form/my/application/',
            method:'GET',
            params: http_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.bigTotalItems = result.res.data.total;
                $scope.data = result.res.data.list;
                $scope.loadingSwitch = true;
                if($scope.data == false){
                    $scope.loadingSwitch = true;
                    $scope.message = "暂无申请信息!";
                }
            }
        }).error(function(result){
            console.log(result);
        });
    }
    $scope.init();


    $scope.search = function(){
        var http_params = {
            user_id: userId,
            page: 1,
            pageSize: $scope.pageSize,
            search: $scope.keyword
        };
        $http({
            url:'/ACTIVITI/activiti/form/my/application/',
            method:'GET',
            params: http_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.bigTotalItems = result.res.data.total;
                $scope.data = result.res.data.list;
                $scope.loadingSwitch = true;
                if($scope.keyword != undefined){
                    $scope.loadingSwitch = true;
                    $scope.message = "搜索结果不存在!";
                }
            }
        }).error(function(result){
            console.log(result)
        });
    }
    $scope.operate = function(id,type,status,psId){
        if(type === "edit"){
            if(status == "0" || status == "2"){
                $state.go("newsCenter.myApplyDetails",{"id":id,"type":'edit'});
            }else{
                $scope.message = "该状态下,不可编辑...";
                $('#resultModal').modal();
                setTimeout(function(){
                    $('#resultModal').modal('hide');
                },1000);
            }
        }else{
            $state.go("newsCenter.myApplyDetails",{"id":id,"type":"look","psId":psId});
        }
    }
    $scope.del = function(row){
        if(row.status == 0){
            $scope.confirmMessage = row.appliName;
            $('#delModal').modal();
            $scope.trueDel = function(){
                var http_params = {
                    id: row.id
                };
                $http({
                    url:'/ACTIVITI/activiti/form/del/',
                    method:'POST',
                    params: http_params
                }).success(function(result){
                    if(result.res.code == 120000){
                        $scope.init();
                        $('#delModal').modal('hide');
                    }
                }).error(function(result){
                    console.log(result);
                });
            }
        }else{
            $scope.message = "该状态下,不可删除...";
            $('#resultModal').modal();
            setTimeout(function(){
                $('#resultModal').modal('hide');
            },1000);
        }
    }
})
