angular.module('opm.controllers')
.controller("roleList", function($scope, $state, ajaxService, dataFormat, Settings) {
    var userToken = sessionStorage.getItem('token');
	
    //分页start
    $scope.maxSize = Settings.maxSize;
    $scope.bigCurrentPage = Settings.bigCurrentPage;
    $scope.pageSize = Settings.pageSize;
    $scope.pageChanged = function() {
        $scope.init()
    };
    //分页end
    $scope.init = function(){
        $scope.loadingSwitch = false;
        var params = {
            index: $scope.bigCurrentPage-1,
            sort: 'asc',
            size: $scope.pageSize
        }
        ajaxService.get('roles', 'rbac', params).then(
            function(result){
                if(result){
                    $scope.bigTotalItems =result.res.data.total;
                    $scope.data = result.res.data.rows;
                    $scope.loadingSwitch = true;
                }
            },
            function(result){
                console.log(result)
            }
        )
    }
    $scope.init()
    var aChecked = [];
    var aCheckedValue = [];
    $scope.toggleChecked = function(id,value){
        var index = aChecked.indexOf(id)
        if(index>=0){
            aChecked.splice(index,1)
            for(var i=0; i<aCheckedValue.length; i++){
                if(aCheckedValue[i][id] != undefined){
                    aCheckedValue.splice(i,1)
                }
            }
        }else{
            var obj = {}
            obj[id] = value;
            aCheckedValue.push(obj);
            aChecked.push(id)
        }
    }
    $scope.isChecked = function(id){
        var index = aChecked.indexOf(id)
        if(index>=0){
            return true;
        }else{
            return false;
        }
    }
    
    // 添加角色
    $scope.add = function(){
        if(aCheckedValue.length != 0){
            $('#addButton').attr("data-target","#addError");
        }else{
            $('#addButton').attr("data-target","#add");
        }
    }
    $scope.roleAdd = {
        name: null
    }
    $scope.addUpdata = function(){
        var bSwitch = true;
        if($scope.roleAdd .name == undefined){
            bSwitch = false;
            $scope.add_msg = '必填'
        }
        if(bSwitch){
            var params = {
                token: userToken,
                name: $scope.roleAdd.name
            }
            ajaxService.post_token('role/add', 'rbac', params).then(
                function(result){
                    if(result.res.code == 120000){
                        $('#add').modal('hide');
                    }else{
                        console.log(result.res.code);
                    }
                },
                function(result){
                    console.log(result.res.code);
                }
            )
        }

    }
    //删除角色
    $scope.delete = function(){
        var delId = aChecked[0];
        var count = aCheckedValue[0][delId].count;
        if(aCheckedValue.length == 1 && count == 0){
            var array = [];
            for(var i=0; i<aCheckedValue.length; i++){
                array.push(aCheckedValue[i]);
            }
            $scope.deleteData = array;
            $('#deleteButton').attr("data-target","#delete");
        }else if(count != 0){
            $scope.delmessage = "该角色存在用户!"
            $('#deleteButton').attr("data-target","#deleteError");
        }else{
            $scope.delmessage = "请指定一角色!"
            $('#deleteButton').attr("data-target","#deleteError");
        }
    }

    $scope.deleteUpdata = function(){
        var params = {};
        var delete_ids = aChecked[0];
        params.role_id = delete_ids;
        params.token = userToken;
        ajaxService.post_token('role/del', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000){
                    $scope.init()
                    aChecked=[];
                    aCheckedValue=[];
                    $('#delete').modal('hide');
                }
                if(result.res.code == 140000){
                    alert(result.res.mes);
                }
            },
            function(result){
                console.log(result.res.code);
            }
        )
    }
    //编辑角色
    $scope.edit = function(){
    	if(aCheckedValue.length != 1){
    		$('#editButton').attr("data-target","#editError");
    	}else{
    		$('#editButton').attr("data-target","#edit");
            $scope.roleInformation = aCheckedValue[0][aChecked[0]];
    	}
    };
    $scope.editUpdata = function(){
        var params = {
            role_id: $scope.roleInformation.id,
            role_name: $scope.roleInformation.role_name,
            token: userToken
        }
        ajaxService.post_token('role/update', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000){
                    $scope.init();
                    aChecked=[];
                    aCheckedValue=[];
                    $('#edit').modal('hide');
                }else{
                    console.log(result.res.code)
                }
            },function(result){
                console.log(result.res.code)
            }
        )
    }
    //禁用角色
    $scope.disabled = function(){
        if(aCheckedValue.length == 1){
            var array = [];
            for(var i=0; i<aCheckedValue.length; i++){
                array.push(aCheckedValue[i]);
            }
            $scope.disabledData = array;
            $('#disabledButton').attr("data-target","#disabled");
        }else{
            $('#disabledButton').attr("data-target","#disabledError");
        }
    }

    $scope.disabledUpdata = function(){
        var params = {
            role_id: aChecked[0],
            flag: 0,
            token: userToken
        };
        ajaxService.post_token('role/status', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000){
                    $scope.init();
                    aChecked=[];
                    aCheckedValue=[];
                    $('#disabled').modal('hide');
                }
            },
            function(result){
                console.log(result.res.code);
            }
        )
    }

    //启用角色
    $scope.abled = function(){
        if(aCheckedValue.length == 1){
            var array = [];
            for(var i=0; i<aCheckedValue.length; i++){
                array.push(aCheckedValue[i])
            }
            $scope.abledData = array;
            $('#abledButton').attr("data-target","#abled");
        }else{
            $('#abledButton').attr("data-target","#abledError");
        }
    }

    $scope.abledUpdata = function(){
        var params = {
            role_id: aChecked[0],
            flag: 1,
            token: userToken
        };
        ajaxService.post_token('role/status', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000){
                    $scope.init();
                    aChecked=[];
                    aCheckedValue=[];
                    $('#abled').modal('hide');
                }
            },
            function(result){
                console.log(result.res.code);
            }
        )
    }


    //加载资源列表
    $scope.loadResources = function(){
        ajaxService.post_token('resources', 'rbac', {'token': userToken}).then(
            function(result){
                var data = result.res.data;
                var checkId = [];
                var $checkableTree = $('#treeview-resources').treeview({
                    data: dataFormat.treeview(data,$scope.ownerResourcesIds),
                    showIcon: false,
                    showCheckbox: true,
                    levels: 2,
                    onNodeChecked: nodeChecked, 
                    onNodeUnchecked: nodeUnchecked
                });
                if($scope.ownerResourcesIds != undefined){
                    checkId = $scope.ownerResourcesIds;
                }
                $scope.resources = checkId;
                var nodeCheckedSilent = false; 
                function nodeChecked (event, node){
                    var index = checkId.indexOf(node.id);  
                    if(index == -1){
                        checkId.push(node.id);
                        $scope.resources = checkId;
                    }
                    if(nodeCheckedSilent){  
                        return;  
                    }  
                    nodeCheckedSilent = true;  
                    checkAllParent(node);  
                    checkAllSon(node);  
                    nodeCheckedSilent = false;
                }  
                  
                var nodeUncheckedSilent = false;  
                function nodeUnchecked  (event, node){
                    var index = checkId.indexOf(node.id);
                    if(index != -1){
                        checkId.splice(index,1);
                        $scope.resources = checkId;
                    }  
                    if(nodeUncheckedSilent){
                        return; 
                    } 
                    nodeUncheckedSilent = true;  
                    uncheckAllParent(node);  
                    uncheckAllSon(node);  
                    nodeUncheckedSilent = false;
                }  
                  
                //选中全部父节点  
                function checkAllParent(node){  
                    $('#treeview-resources').treeview('checkNode',node.nodeId,{silent:true});  
                    var parentNode = $('#treeview-resources').treeview('getParent',node.nodeId);  
                    if(!("id" in parentNode)){  
                        return;  
                    }else{  
                        checkAllParent(parentNode);
                    }  
                }  
                //取消全部父节点  
                function uncheckAllParent(node){  
                    $('#treeview-resources').treeview('uncheckNode',node.nodeId,{silent:true});  
                    var siblings = $('#treeview-resources').treeview('getSiblings', node.nodeId);  
                    var parentNode = $('#treeview-resources').treeview('getParent',node.nodeId);  
                    if(!("id" in parentNode)) {  
                        return;  
                    }  
                    var isAllUnchecked = true;  //是否全部没选中  
                    for(var i in siblings){  
                        if(siblings[i].state.checked){  
                            isAllUnchecked=false;  
                            break;  
                        }  
                    }  
                    if(isAllUnchecked){  
                        uncheckAllParent(parentNode);  
                    }  
                  
                }  
                  
                //级联选中所有子节点  
                function checkAllSon(node){  
                    $('#treeview-resources').treeview('checkNode',node.nodeId,{silent:true});  
                    if(node.nodes!=null&&node.nodes.length>0){  
                        for(var i in node.nodes){  
                            checkAllSon(node.nodes[i]);  
                        }  
                    }  
                }  
                //级联取消所有子节点  
                function uncheckAllSon(node){  
                    $('#treeview-resources').treeview('uncheckNode',node.nodeId,{silent:true});  
                    if(node.nodes!=null&&node.nodes.length>0){  
                        for(var i in node.nodes){  
                            uncheckAllSon(node.nodes[i]);  
                        }  
                    }  
                }
            },
            function(result){
                console.log(data)
            }
        )
    }
    // $scope.loadResources();


    // 资源分配
    $scope.resource = function(){
        
        if(aCheckedValue.length == 1){
            var params = {
                role_id: aChecked[0]
            }
            ajaxService.get('role/resources','rbac',params).then(
                function(result){
                    $scope.ownerResourcesIds = result.res.data.resources;
                },
                function(result){
                    console.log(result)
                }
            )
            $scope.loadResources();
            setTimeout(function(){
                $('#resourceButton').attr("data-target","#resource");
            },500)
        }else{
            $('#resourceButton').attr("data-target","#resourceError");
        }
    }
    // 资源分配提交
    $scope.resourceUpData = function(){
        var params = {
            role_id: aChecked[0],
            resource_ids: $scope.resources,
            token: userToken
        };
        ajaxService.post_token('role/resource', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000){
                    $('#resource').modal('hide');
                }
            },
            function(result){
                console.log(result)
            }
        )
    }
    //加载权限列表
    $scope.loadOperations = function(){
        ajaxService.post_token('rights', 'rbac', {'token': userToken}).then(
            function(result){ 
                var data = result.res.data;
                var checkId = [];
                var $checkableTree = $('#treeview-operations').treeview({
                    data: dataFormat.treeview(data,$scope.ownerRightsIds),
                    showIcon: false,
                    showCheckbox: true,
                    levels: 2,
                    onNodeChecked: nodeChecked, 
                    onNodeUnchecked: nodeUnchecked,
                });
                if($scope.ownerRightsIds != undefined){
                    checkId = $scope.ownerRightsIds;
                }
                var nodeCheckedSilent = false; 
                function nodeChecked (event, node){
                    var index = checkId.indexOf(node.id);  
                    if(index == -1){
                        checkId.push(node.id);
                        $scope.rights = checkId;
                    }
                    if(nodeCheckedSilent){  
                        return;  
                    }  
                    nodeCheckedSilent = true;  
                    checkAllParent(node);  
                    checkAllSon(node);  
                    nodeCheckedSilent = false;
                }  
                var nodeUncheckedSilent = false;  
                function nodeUnchecked  (event, node){
                    var index = checkId.indexOf(node.id);
                    if(index != -1){
                        checkId.splice(index,1);
                        $scope.rights = checkId;
                    }  
                    if(nodeUncheckedSilent){
                        return; 
                    } 
                    nodeUncheckedSilent = true;  
                    uncheckAllParent(node);  
                    uncheckAllSon(node);  
                    nodeUncheckedSilent = false;
                }  
                //选中全部父节点  
                function checkAllParent(node){  
                    $('#treeview-operations').treeview('checkNode',node.nodeId,{silent:true});  
                    var parentNode = $('#treeview-operations').treeview('getParent',node.nodeId);  
                    if(!("id" in parentNode)){  
                        return;  
                    }else{  
                        checkAllParent(parentNode);
                    }  
                }  
                //取消全部父节点  
                function uncheckAllParent(node){  
                    $('#treeview-operations').treeview('uncheckNode',node.nodeId,{silent:true});  
                    var siblings = $('#treeview-operations').treeview('getSiblings', node.nodeId);  
                    var parentNode = $('#treeview-operations').treeview('getParent',node.nodeId);  
                    if(!("id" in parentNode)) {  
                        return;  
                    }  
                    var isAllUnchecked = true;  //是否全部没选中  
                    for(var i in siblings){  
                        if(siblings[i].state.checked){  
                            isAllUnchecked=false;  
                            break;  
                        }  
                    }  
                    if(isAllUnchecked){  
                        uncheckAllParent(parentNode);  
                    }  
                }  
                //级联选中所有子节点  
                function checkAllSon(node){  
                    $('#treeview-operations').treeview('checkNode',node.nodeId,{silent:true});  
                    if(node.nodes!=null&&node.nodes.length>0){  
                        for(var i in node.nodes){  
                            checkAllSon(node.nodes[i]);  
                        }  
                    }  
                }  
                //级联取消所有子节点  
                function uncheckAllSon(node){  
                    $('#treeview-operations').treeview('uncheckNode',node.nodeId,{silent:true});  
                    if(node.nodes!=null&&node.nodes.length>0){  
                        for(var i in node.nodes){  
                            uncheckAllSon(node.nodes[i]);  
                        }  
                    }  
                }  
            },
            function(result){
                console.log(result)
            }
        )
    }
    // 权限分配
    $scope.operation = function(){
        if(aCheckedValue.length == 1){
            var params = {
                role_id: aChecked[0]
            };
            ajaxService.get('role/rights','rbac',params).then(
                function(result){
                    $scope.ownerRightsIds = result.res.data.rights;
                },
                function(result){
                    console.log(result);
                }
            );
            $scope.loadOperations();
            setTimeout(function(){
                $('#resourceButton').attr("data-target","#resource");
            },500)
            $('#operationButton').attr("data-target","#operation");
        }else{
            $('#operationButton').attr("data-target","#operationError");
        }
    }
    // 提交分配的权限
    $scope.operationUpData = function(){
        var params = {
            role_id: aChecked[0],
            right_ids: $scope.rights,
            token: userToken
        };
        ajaxService.post_token('role/right', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000){
                    $('#operation').modal('hide');
                }
            },
            function(result){
                console.log(result);
            }
        )
    }
    //进入角色拥有者列表
    $scope.roleOwnerList = function(roleId,count){
        if(count){
            $state.go('rbac.role_owner_list',{'role':roleId});
        }
    };
    // 搜索
    $scope.search = function(){
        if($scope.keyword != undefined){
            $scope.loadingSwitch = false;
            var params = {
                index: $scope.bigCurrentPage-1,
                sort: 'asc',
                size: $scope.pageSize,
                query: {
                    fuzzy: {
                        role_name: $scope.keyword
                    }
                }
            }
            ajaxService.post_token('roles', 'rbac', params).then(
                function(result){
                    if(result.res.code == 120000){
                        $scope.bigTotalItems =result.res.data.total;
                        $scope.data = result.res.data.rows;
                        $scope.user_counts = result.res.data.user_counts;
                        $scope.loadingSwitch = true;
                    }
                },
                function(result){
                    console.log(result)
                }
            )
        }else{
            $scope.init();
        }
        
    }
})
