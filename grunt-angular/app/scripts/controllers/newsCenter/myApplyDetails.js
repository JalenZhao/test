angular.module('opm.controllers')
.controller("myApplyDetails", function($scope, $state, $stateParams, ajaxService, Settings, $http) {
    var workflowId = sessionStorage.getItem("workflowId");
    var persinfo = JSON.parse(Settings.user_persinfo);
    var applyId = $stateParams.id;
    var psId = $stateParams.psId;
    $scope.operationType = $stateParams.type;
    if($scope.operationType == "look"){
        $scope.disabledSwitch = true;
    }else{
        $scope.disabledSwitch = false;
    }
    $scope.init = function(){
        var acquire_params = {
                id: applyId
            }
        var comments_params = {
                ps_id: psId
            }
        $http({
        url:'/ACTIVITI/activiti/form/acquire/',
        method:'GET',
        params: acquire_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.data = JSON.parse(result.res.data.content);
                $scope.applyContent = result.res.data;
            }
        }).error(function(result){
            console.log(result)
        });

        $http({
        url:'/ACTIVITI/activiti/workflow/comments/',
        method:'GET',
        params: comments_params
        }).success(function(result){
            if(result.res.code == 120000){
                $scope.resultContent = result.res.data;
            }
        }).error(function(result){
            console.log(result)
        });
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
        $scope.data.push(obj)
    }
    $scope.back = function(){
        $state.go('newsCenter.myApply')
    }
    $scope.updata = function(updata_type){
        var data = $scope.data;
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
            var dataStr = JSON.stringify($scope.data);
            var http_params = {
                user_id: persinfo.user_id,
                pd_id: $scope.applyContent.processDefinitionId,
                category: $scope.applyContent.category,
                appliName: $scope.applyContent.appliName,
                data : dataStr,
                type: updata_type,
                id: applyId,
                user_name:sessionStorage.getItem("userName")
            }
            var modalSwitch = false;
            $http({
                url:'/ACTIVITI/activiti/form/add_or_upd/',
                method:'POST',
                params: http_params
            }).success(function(result){
                if(result.res.code == 120000){
                    $scope.message = result.res.message;
                    $('#resultModal').modal();
                    setTimeout(function(){
                        $('#resultModal').modal('hide');
                    },1000);
                    setTimeout(function(){
                        $state.go("newsCenter.myApply")
                    },1400);
                };

            }).error(function(result){
                console.log(result)
            });
        }
    }
})

