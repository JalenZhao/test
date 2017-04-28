angular.module('opm.controllers')
.controller("orgList", function($scope, $http, $window, ajaxService, dataFormat) {
	$scope.init = function(){
		$scope.loadingSwitch = false;
		ajaxService.get('groups', 'rbac', {}).then(
			function(result){
				if(result){
					if(result.res.code == 120000){
						$scope.data = dataFormat.format(result.res.data,[]);
						$scope.departments = result.res.data;
						$scope.loadingSwitch = true;
						setTimeout(function(){
					        $('.orgTree').treegrid({
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
	$scope.init();
	$scope.reload = function(){
		$window.location.reload()
	}
	$scope.addUpdata = function(){
		var params = {
			name: $scope.addGroup.name,
			parent_id: parseInt($("#selectGroup").val())
		}
		ajaxService.post_token('group/add', 'rbac', params).then(
			function(result){
				if(result.res.code == 120000){
					$('#add').modal('hide');
                    $scope.init();
                    $scope.reload();
				}
			},
			function(result){
				console.log(result);
			}
		)
	}
	$scope.delete = function(item){
		$scope.deleteGroup={
			name: item.name,
			id: item.id
		}
	}
	$scope.deleteUpdata = function(){
		var params = {
			id: $scope.deleteGroup.id
		}
		ajaxService.post_token('group/del', 'rbac', params).then(
			function(result){
				if(result.res.code == 120000){
					$('#delete').modal('hide');
                    $scope.reload();
				}
			},
			function(result){
				console.log(result)
			}
		)
	}
	$scope.edit = function(item){
		$scope.editGroup = {
			name: item.name,
			id: item.id,
			parent_id: item.parent_id
		}
	}
	$scope.editUpdata = function(){
		var params = {
			name: $scope.editGroup.name,
			id: $scope.editGroup.id,
			parent_id: parseInt($("#editSelect").val())
		}
		ajaxService.post_token('group/update', 'rbac', params).then(
			function(result){
				if(result.res.code == 120000){
					$('#edit').modal('hide');
					$scope.reload();
				}
			},
			function(result){
				console.log(result)
			}
		)
	}
	$scope.expandAll = function(){
		$('.orgTree').treegrid('expandAll');
	}
	$scope.collapseAll = function(){
		$('.orgTree').treegrid('collapseAll');
	}
})
