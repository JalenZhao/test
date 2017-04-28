angular.module('opm.controllers')
.controller("internetApplication", function($scope, $state, $stateParams, ajaxService, $http, Settings) {
	var workflowId = sessionStorage.getItem("workflowId");
	var category_session = sessionStorage.getItem("category");
	var appliName_session = sessionStorage.getItem("appliName");
	var userToken = sessionStorage.getItem("token");
    var persinfo = JSON.parse(Settings.user_persinfo);
    var username = sessionStorage.getItem("userName");
	$scope.operationType = $stateParams.type;
	
	$scope.init = function(){
		$scope.template = {
			user_id: persinfo.user_id,
			pd_id: workflowId,
			category: category_session,
			appliName: appliName_session,
			user_name: username
		}
		$scope.template.data = [
			{
				env: 0,
				in_ip: null,
				in_port: null,
				no_in_port: null,
				out_ip: null,
				out_port: null,
				no_out_port: null,
				no_out_ip: null
			}
		]
	}
	$scope.init();
	$scope.add = function(){
		var obj = {
			env: 0,
			in_ip: null,
			in_port: null,
			no_in_port: null,
			out_ip: null,
			out_port: null,
			no_out_port: null,
			no_out_ip: null
		}
		$scope.template.data.push(obj)
	}
	$scope.back = function(){
		$state.go('newsCenter.myApply')
	}
	$scope.updata = function(updata_type){
		var data = $scope.template.data;
		var enSwitch = true;
		var inIpSwitch = true;
		var inPortSwitch = true;
		var outIpSwitch = true;
		var outPortSwitch = true;
		for(var i=0; i<data.length; i++){
			// 环境验证
			if(data[i].env == 0){
				data[i].env_emsg = "请选择环境";
				enSwitch = false;
			}else{
				data[i].env_emsg = null;
				enSwitch = true;
			}
			// 内网ip验证
			if(data[i].in_ip == undefined){
				data[i].in_ip_emsg = "内网IP有误";
				inIpSwitch = false;
			}else{
				var in_ip_reg = /^(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])$/;
				var in_ip_reg_boolean = in_ip_reg.test(data[i].in_ip)
				if(in_ip_reg_boolean == false){
					data[i].in_ip_emsg = "内网IP有误";
					inIpSwitch = false;
				}else{
					data[i].in_ip_emsg = null;
					inIpSwitch = true;
				}
			}
			// 内网端口验证
			if(data[i].no_in_port == true){
				data[i].in_port = null;
				data[i].in_port_emsg = null;
				inPortSwitch = true;
			}else{
				var in_port_reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
				var in_port_reg_boolean = in_port_reg.test(data[i].in_port);
				if(in_port_reg_boolean == false){
					data[i].in_port_emsg = "端口有误";
					inPortSwitch = false;
				}else{
					data[i].in_port_emsg = null;
					inPortSwitch = true;
				}
			}
			// 外网ip验证
			if(data[i].no_out_ip){
				data[i].out_ip = null;
				data[i].out_ip_emsg = null;
			}else{
				if(data[i].out_ip == undefined){
					data[i].out_ip_emsg = "外网IP有误";
					outIpSwitch = false;
				}else{
					data[i].out_ip_emsg = null;
					outIpSwitch = true;
				}
			}
			// 外网端口验证
			if(data[i].no_out_port == true ){
				data[i].out_port = null;
				data[i].out_port_emsg = null;
				outPortSwitch = true;
			}else{
				var out_port_reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
				var out_port_reg_boolean = out_port_reg.test(data[i].out_port);
				if(out_port_reg_boolean == false){
					data[i].out_port_emsg = "端口有误";
					outPortSwitch = false;
				}else{
					data[i].out_port_emsg = null;
					outPortSwitch = true;
				}
			}
		}
		if( enSwitch && inIpSwitch && inPortSwitch && outIpSwitch && outPortSwitch){
			var dataStr = JSON.stringify($scope.template.data);
			var http_params = {
					user_id: persinfo.user_id,
					pd_id: workflowId,
					category: category_session,
					appliName: appliName_session,
					data : dataStr,
					type: updata_type,
					user_name: username
				}
			$http({
				url:'/ACTIVITI/activiti/form/add_or_upd/',
				method:'POST',
				params: http_params
			}).success(function(result){
				if(result.res.code == 120000){
					$scope.message = result.res.message;
					$('#resultModal').modal()
					setTimeout(function(){
						$('#resultModal').modal('hide')
					},1000);
					$scope.template.data = [
						{
							env: 0,
							in_ip: null,
							in_port: null,
							no_in_port: null,
							out_ip: null,
							out_port: null,
							no_out_port: null,
							no_out_ip: null
						}
					]
				};

			}).error(function(result){
				console.log(result)
			});
		}
	}
	$scope.del = function(index){
		$scope.template.data.splice(index,1)
	}
})

