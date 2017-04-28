angular.module('opm.controllers')
.controller("roleOwnerList", function($scope, $state, $stateParams, ajaxService, Settings) {
    $scope.maxSize = Settings.maxSize;
    $scope.bigCurrentPage = Settings.bigCurrentPage;
    $scope.pageSize = Settings.pageSize;
    $scope.loadingSwitch = false;
    $scope.init = function(){
         var params = {
                index: $scope.bigCurrentPage,
                sort: 'asc',
                size: $scope.pageSize,
                query:{
                    precise:{
                        role_id: $stateParams.role
                    }
                }
            };
            ajaxService.post_token('users', 'rbac', params).then(
                function(result){
                    if(result.res.code == 120000){
                        $scope.loadingSwitch = true;
                        $scope.bigTotalItems = result.res.data.total;
                        $scope.data = result.res.data.users;
                        $scope.groups = result.res.data.groups;
                        $scope.roles = result.res.data.roles; 
                    }
                },
                function(result){
                    console.log(result)
                }
            )
    }
    $scope.init()
	$scope.back = function(){
		$state.go('rbac.role_list')
	}
	$scope.pageChanged = function() {
        $scope.init()
    };
})
