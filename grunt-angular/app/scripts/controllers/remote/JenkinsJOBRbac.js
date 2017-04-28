angular.module('opm.controllers')
.controller("JenkinsJOBRbac", function($scope) {
	$scope.init = function(){
		$scope.loadingSwitch = false;
		$scope.data = [
			{
				id: 1,
				taskname: "企业飞信——WEB",
				owner: [
					{
						id:15,
						name: "宋亚龙"
					},{
						id:8,
						name: "赵殿龙"
					}
				],
				date: new Date().getTime()
			},{
				id: 2,
				taskname: "企业飞信——资源更新",
				owner: [
					{
						id:15,
						name: "宋亚龙"
					}
				],
				date: new Date().getTime()
			},{
				id: 3,
				taskname: "贯众健走——前端资源服务",
				owner: [
					{
						id:15,
						name: "宋亚龙"
					}
				],
				date: new Date().getTime()
			},{
				id: 4,
				taskname: "贯众健走——前端数据服务",
				owner: [
					{
						id:8,
						name: "赵殿龙"
					}
				],
				date: new Date().getTime()
			},{
				id: 5,
				taskname: "贯众健走——DB备份",
				owner: [
					{
						id:8,
						name: "赵殿龙"
					}
				],
				date: new Date().getTime()
			}
		]
		if($scope.data){
			$scope.loadingSwitch = true;
		}
	}
	$scope.init();

	$scope.change = function(){
		console.log(123)
	}
})
