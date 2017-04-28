angular.module('opm.controllers')
.controller("JenkinsInformationManagement", function($scope) {
	$scope.init = function(){
		$scope.loadingSwitch = false;
		$scope.data = [
			{
				id: 1,
				name: "和创使用",
				regional_master: "红山机房",
				regional_division: "生产区",
				address: "http://172.23.28.125:18080",
				remark: null
			},{
				id: 2,
				name: "红山区自用",
				regional_master: "红山机房",
				regional_division: "开发区",
				address: "http://172.23.28.125:18080",
				remark: null
			},{
				id: 3,
				name: null,
				regional_master: "石桥机房",
				regional_division: "生产区",
				address: "http://172.23.28.125:18080",
				remark: null
			},{
				id: 4,
				name: "和创使用",
				regional_master: "石桥机房",
				regional_division: "测试区",
				address: "http://172.23.28.125:18080",
				remark: null
			},{
				id: 5,
				name: "和创使用",
				regional_master: "石桥机房",
				regional_division: "开发区",
				address: "http://172.23.28.125:18080",
				remark: null
			}
		]

		if($scope.data){
			$scope.loadingSwitch = true;
		}
	}
	$scope.init();
	// 新增操作
	$scope.add = function(){
		$scope.information = {
			id: null,
			name: null,
			address: null,
			username: null,
			pwd: null,
			remark: null
		}
		$('#addButton').attr("data-target","#addModal");
	}
	// 编辑操作
	$scope.edit = function(item){
		$scope.information = {
			id: item.id,
			name: item.name,
			address: item.address,
			username: null,
			pwd: null,
			remark: item.remark
		}
		$('#editButton').attr("data-target","#addModal");
	}

	// 若information.id不存在为新增udata，否则为编辑updata
	$scope.updata = function(id){
		if(id == undefined){
			// 新增todo
		}else{
			// 编辑todo
		}
		$('#addModal').modal('hide');
	}
	// 删除操作
	$scope.delete = function(item){
		$scope.information = {
			id: item.id,
			address: item.address
		}
		$('#delButton').attr("data-target","#delModal");
	}
	$scope.deleteUpdata = function(id){
		console.log(id)
		$('#delModal').modal('hide');
		$scope.init();
	}
})
