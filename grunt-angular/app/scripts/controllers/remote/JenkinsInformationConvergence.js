angular.module('opm.controllers')
.controller("JenkinsInformationConvergence", function($scope) {
	$scope.init = function(){
		$scope.loadingSwitch = false;
		console.log(123)

		if($scope.data){
			$scope.loadingSwitch = true;
		}
	}
	$scope.init();
})
