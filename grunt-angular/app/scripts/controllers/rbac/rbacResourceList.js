angular.module('opm.controllers')
.controller("rbacResourceList", function($scope, $http, ajaxService, dataFormat) {
	var userToken = sessionStorage.getItem('token');
	$scope.data = [];
 	$scope.init = function(){
		$scope.loadingSwitch = false;
	   	ajaxService.post_token('resources', 'rbac', {'token': userToken}).then(
	   		function(result){
				if(result){
					$scope.loadingSwitch = true;
					if(result.res.code == 120000){
						$scope.data = dataFormat.format(result.res.data,[]);
						setTimeout(function(){
					        $('.resourceTree').treegrid({
					            'initialState': 'collapsed'
					        });
					    },10)
					}
				}
	   		},
	   		function(result){
	   			console.log(data)
	   		}
	   	)
 	}
 	$scope.init();
	$scope.expandAll = function(){
		$('.resourceTree').treegrid('expandAll');
	}

	$scope.collapseAll = function(){
		$('.resourceTree').treegrid('collapseAll');
	}
})
