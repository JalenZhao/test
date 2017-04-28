angular.module('opm.controllers')
.controller("JenkinsMyJOB", function($scope) {
	//标签页初始化
	$scope.model = {
	    name: 'Tabs'
	};

	$scope.init = function(){
		$scope.loadingSwitch = false;
		$scope.data = [
			{
				id: 1,
				taskname: "企业飞信—WEB",
				flag: 1
			},{
				id: 2,
				taskname: "企业飞信—资源更新",
				flag: 0
			},{
				id: 3,
				taskname: "贯众健走—前端资源服务",
				flag: 1
			},{
				id: 4,
				taskname: "贯众健走—前端数据服务",
				flag: 0
			},{
				id: 5,
				taskname: "贯众健走—DB备份",
				flag: 1
			}
		]
		if($scope.data){
			$scope.loadingSwitch = true;
		}
	}
	$scope.init();
	$scope.start = function(item){
		$scope.startTaskName = item.taskname;
	}
	$scope.stop = function(item){
		$scope.stopTaskName = item.taskname;
	}
	$scope.console = function(item){
		$scope.consoleData = "Success控制台输出Started by timerBuilding on master in workspace /var/lib/jenkins/workspace/hello[hello] $ /bin/sh -xe /tmp/hudson8822998566971283957.sh+ echo 'hello jenkins.'hello jenkins.Finished: SUCCESS"
	}
	$scope.copy = function(){
		console.log(123)
	}
	// 新建JOB
	$scope.createJobUpdata = function(){
		console.log($scope.jobname)
		$('#createJOBModal').modal('hide');
	}
})
