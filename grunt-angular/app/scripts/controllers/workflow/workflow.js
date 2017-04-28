angular.module('opm.controllers')
.controller("workflow", function($scope, $state) {
	$scope.exampleApply = function(workflowId){
		$state.go('workflow.example_apply',{"id":workflowId})
	}
})