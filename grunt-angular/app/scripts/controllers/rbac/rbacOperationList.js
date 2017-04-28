angular.module('opm.controllers')
.controller("rbacOperationList", function($scope, $http, ajaxService, dataFormat) {
	var userToken = sessionStorage.getItem('token');
	$scope.init = function(){
		$scope.loadingSwitch = false;
		ajaxService.post_token('rights', 'rbac', {'token': userToken}).then(
	   		function(result){
				if(result){
					$scope.loadingSwitch = true;
					if(result.res.code == 120000){
						$scope.data = dataFormat.format(result.res.data,[]);
						setTimeout(function(){
					        $('.operationTree').treegrid({
					            'initialState': 'collapsed'
					        });
					    },10)
					}
				}
	   		},
	   		function(result){
	   			console.log(result)
	   		}
	   	)
	}
	$scope.init()
	$scope.expandAll = function(){
		$('.operationTree').treegrid('expandAll');
	}

	$scope.collapseAll = function(){
		$('.operationTree').treegrid('collapseAll');
	}
})
