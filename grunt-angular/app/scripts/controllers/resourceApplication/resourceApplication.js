angular.module('opm.controllers')
.controller("resourceApplication", function($scope, ajaxService) {
	var userToken = sessionStorage.getItem("token");
    $scope.init = function(){
    	var params = {
            token: userToken
        };
    	ajaxService.post_token('init_menu', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000){
                    $scope.leftMenusTitles = result.res.menus_tree.menus[5].children;
                }
            },
            function(result){
                console.log(result.res.code)
            }
        )
    }
    $scope.init();

    $scope.save = function(data,item,index){
        sessionStorage.setItem("workflowId",JSON.parse(data.propertys).id)
        sessionStorage.setItem("category",item.name)
        sessionStorage.setItem("appliName",item.children[index].name)
    }
})