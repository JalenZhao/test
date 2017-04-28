angular.module('opm.controllers')
.controller("monitoringService", function($scope, ajaxService) {
	var userToken = sessionStorage.getItem("token");
    $scope.init = function(){
    	var params = {
            token: userToken
        };
    	ajaxService.post_token('init_menu', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000){
                    var aMenus = result.res.menus_tree.menus;
                    for(var i=0; i<aMenus.length; i++){
                        if(aMenus[i].order == 8){
                            $scope.leftMenusTitles = aMenus[i].children;
                        }
                    }
                }
            },
            function(result){
                console.log(result.res.code)
            }
        )
    }
    $scope.init()
})
