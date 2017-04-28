angular.module('opm.controllers')
.controller("totalList", function($scope, $state, $http, Settings) {
    // 分页初始化开始
	$scope.maxSize = Settings.maxSize;
    $scope.bigCurrentPage = Settings.bigCurrentPage;
    $scope.pageSize = Settings.pageSize;
    $scope.pageChanged = function() {
        $scope.init();
    };
    // 分页初始化结束
    $scope.loadingSwitch = false;
    $scope.init = function(category){
        var http_params;
        if(category == undefined || category == false){
            http_params={
                page: $scope.bigCurrentPage,
                pageSize: $scope.pageSize
            }
        }else{
            http_params={
                page: $scope.bigCurrentPage,
                pageSize: $scope.pageSize,
                category:category
            }
        }
        $http({
            url:'/ACTIVITI/activiti/workflow/deployments/',
            method:'GET',
            params: http_params
        }).success(function(result){
            if(result.res.code == 120000 ){
                $scope.data = result.res.data;
                $scope.bigTotalItems =result.total;
                $scope.loadingSwitch = true;
            }
        }).error(function(result){
            console.log(result)
        });
        // 获取流程分类列表
        $http({
            url:'/ACTIVITI/activiti/category/categories/',
            method:'GET'
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.categoryList = result.res.data;
            }
        }).error(function(result){
            console.log(result)
        });
    }
    $scope.init();
    $scope.dofilter = function(){
        if($scope.category != undefined){
            $scope.init($scope.category)
        }else{
            $scope.init()
        }
    }
    $scope.examplesInfo = function(total,category,name){
        if(total){
            $state.go('workflow.examples',{'category':category,'name':name})
        }
    }
    // 查看流程图
    $scope.workflowImg = function(workflowId){
        $scope.imgUrl = "/ACTIVITI/activiti/workflow/pd/img/?pdid="+workflowId+"&type=0";
        $('#workflowModal').modal();
    }
})
