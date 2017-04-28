angular.module('opm.controllers')
.controller("userList", function($scope, $http, ajaxService, Settings) {
    $scope.persinfo = JSON.parse(Settings.user_persinfo);
    $scope.treeSelect = function(){
        $('.selectpicker').selectpicker({
            'selectedText': 'cat',
        });
    }
    $scope.treeSelect();
    //分页初始化start
    $scope.maxSize = Settings.maxSize;
    $scope.bigCurrentPage = Settings.bigCurrentPage;
    $scope.pageSize = Settings.pageSize;
    $scope.pageChanged = function() {
        if($scope.keyword == undefined){
            $scope.init();
        }else{
            $scope.search();
        }
    };
    //分页初始化end
    $scope.init = function(){
        $scope.loadingSwitch = false;
        var params = {
            index: $scope.bigCurrentPage-1,
            sort: 'asc',
            size: $scope.pageSize
        };
        ajaxService.get('users', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000 ){
                    $scope.loadingSwitch = true;
                    $scope.bigTotalItems =result.res.data.total;
                    $scope.data = result.res.data.rows;
                    $scope.groups = result.res.data.groups;
                    $scope.roles = result.res.data.roles;  
                }
            },
            function(result){
                console.log(result)
            }
        )
    }
    $scope.init();
    var aChecked = [];
    var aCheckedValue = [];
    $scope.toggleChecked = function(id,value){
        var index = aChecked.indexOf(id);
        if(index>=0){
            aChecked.splice(index,1);
            for(var i=0; i<aCheckedValue.length; i++){
                if(aCheckedValue[i][id] != undefined){
                    aCheckedValue.splice(i,1);
                }
            }
        }else{
            var obj = {};
            obj[id] = value;
            aCheckedValue.push(obj);
            aChecked.push(id);
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
    var userToken = sessionStorage.getItem('token');
    //获取所有角色
    $scope.addAllRoles = function(){
        ajaxService.get('all_roles', 'rbac', {}).then(
            function(result){
                if(result.status == "SUCCESS"){
                    var roleList = result.res.data.rows;
                    var str = "";
                    for(var i=0; i<roleList.length; i++){
                        str += "<option value="+roleList[i].id+">"+roleList[i].role_name+"</option>";
                    }
                    $('#add_roles').append(str);
                    $('#add_roles').selectpicker('refresh');
                }
            },
            function(result){
                console.log(result)
            }
        )
    }
    $scope.addAllRoles();
    // 获取所有部门
    $scope.allGroups = function(){
        ajaxService.get('groups', 'rbac', {}).then(
            function(result){
                if(result.res.code == 120000){
                    $scope.departments = result.res.data;
                }
            },
            function(result){
                console.log(result)
            }
        )
    }
    $scope.allGroups();
    $scope.closed = function(){
        $scope.phone_msg=null;
        $scope.cn_msg=null;
        $scope.email_msg=null;
        $scope.pwd_msg=null;
        $scope.name_msg =null;
        $scope.group_msg=null;
        $scope.select_msg=null;
    }
    //添加用户
    $scope.add = function(){
        $scope.userInformation = {
            id: null,
            name: null,
            pwd: null,
            email: null,
            cn: null,
            phone: null,
            group_id: null,
            roleids: null
        };
    	if(aCheckedValue.length != 0){
    		$('#addButton').attr("data-target","#addError");
    	}else{
    		$('#addButton').attr("data-target","#add");
    	}
    }
    $scope.addUpdata = function(){
        var sArray = $('#add_roles').val();
        var group = $('#user_group').val();
        var bSwitch_role,bSwitch_group,bSwitch_name,bSwitch_pwd,bSwitch_email,bSwitch_cn,bSwitch_phone;
        var array = [];
        if(sArray){
            for(var i=0; i<sArray.length; i++){
                array.push(parseInt(sArray[i]));
            }
            $scope.userInformation.roleids = array;
            bSwitch_role = true;
            $scope.select_msg = null;
        }else{
            $scope.select_msg = '请分配角色';
            bSwitch_role = false;
        }
        if(group != 0){
            $scope.userInformation.group_id = parseInt(group);
            bSwitch_group = true;
            $scope.group_msg = null;
        }else{
            $scope.group_msg = '必选';
            bSwitch_group = false;
        }
        if($scope.userInformation.name == undefined){
            $scope.name_msg = '必填';
            bSwitch_name = false;
        }else{
            $scope.name_msg = null;
            bSwitch_name = true;
        }
        if($scope.userInformation.pwd == undefined){
            $scope.pwd_msg = '必填';
            bSwitch_pwd = false;
        }else{
            $scope.pwd_msg = null;
            bSwitch_pwd = true;
        }
        if($scope.userInformation.email == undefined){
            $scope.email_msg = '必填或非法';
            bSwitch_email = false;
        }else{
            $scope.email_msg = null;
            bSwitch_email = true;
        }
        if($scope.userInformation.cn == undefined){
            $scope.cn_msg = '必填';
            bSwitch_cn = false;
        }else{
            $scope.cn_msg = null;
            bSwitch_cn = true;
        }
        if($scope.userInformation.phone == undefined){
            $scope.phone_msg = '必填';
            bSwitch_phone = false;
        }else{
            var reg_phone = /^(((13[0-9]{1})|(15[0-35-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            var reg_telphone = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
            var boolean = reg_phone.test($scope.userInformation.phone) || reg_telphone.test($scope.userInformation.phone);
            if(boolean){
                $scope.phone_msg = null;
                bSwitch_phone = true;
            }else{
                $scope.phone_msg = "手机号格式有误";
                bSwitch_phone = false;
            }
        }
        if( bSwitch_role && bSwitch_group && bSwitch_name && bSwitch_pwd && bSwitch_email && bSwitch_cn && bSwitch_phone){
            ajaxService.post_token('user/add', 'rbac', $scope.userInformation).then(
                function(result){
                    if(result.res.code == 120000){
                        $('#add').modal('hide');
                        $scope.init();
                        $scope.phone_msg=null;
                        $scope.cn_msg=null;
                        $scope.email_msg=null;
                        $scope.pwd_msg=null;
                        $scope.name_msg =null;
                        $scope.group_msg=null;
                        $scope.select_msg=null;
                    }else if(result.res.code == 140000){
                        $scope.name_msg = result.res.msg;
                    }else{
                        console.log(result)
                    }
                },
                function(result){
                    console.log(result.res.code);
                }
            )
        }
    }
    //编辑用户
    $scope.edit = function(){
    	if(aCheckedValue.length != 1){
    		$('#editButton').attr("data-target","#editError");
    	}else{
            var params = {
                userid: aChecked[0]
            }
            $scope.groupCheckedId = aCheckedValue[0][aChecked[0]].group_id;
            ajaxService.post_token('user/info', 'rbac', params).then(
                function(result){
                    if(result.res.code == 120000){
                        $scope.editInformation = result.res.data;
                    }
                },
                function(result){
                    console.log(result)
                }
            )
    		$('#editButton').attr("data-target","#edit");
    	}
    }
    $scope.editUpdata = function(){
        var group = $('#edit_group').val();
        var bSwitch_group,bSwitch_name,bSwitch_email,bSwitch_cn,bSwitch_phone;
        var array = [];
        if(group == 0){
            $scope.group_msg = '必选';
            bSwitch_group = false;
        }else{
            bSwitch_group = true;
            $scope.group_msg = null;
        }
        if($scope.editInformation.user.name == undefined){
            $scope.name_msg = '必填';
            bSwitch_name = false;
        }else{
            $scope.name_msg = null;
            bSwitch_name = true;
        }
        if($scope.editInformation.persinfo.email == undefined){
            $scope.email_msg = '必填或非法';
            bSwitch_email = false;
        }else{
            $scope.email_msg = null;
            bSwitch_email = true;
        }
        if($scope.editInformation.user.cn == undefined){
            $scope.cn_msg = '必填';
            bSwitch_cn = false;
        }else{
            $scope.cn_msg = null;
            bSwitch_cn = true;
        }
        if($scope.editInformation.persinfo.phone == undefined){
            $scope.phone_msg = '必填';
            bSwitch_phone = false;
        }else{
            var reg_phone = /^(((13[0-9]{1})|(15[0-35-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            var reg_telphone = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
            var boolean = reg_phone.test($scope.editInformation.persinfo.phone) || reg_telphone.test($scope.editInformation.persinfo.phone);
            if(boolean){
                $scope.phone_msg = null;
                bSwitch_phone = true;
            }else{
                $scope.phone_msg = "手机号格式有误";
                bSwitch_phone = false;
            }
        }
        if(bSwitch_group && bSwitch_name && bSwitch_email && bSwitch_cn && bSwitch_phone){
            var params = {
                userid: $scope.editInformation.user.id,
                name: $scope.editInformation.user.name,
                email: $scope.editInformation.persinfo.email,
                cn: $scope.editInformation.user.cn,
                phone: $scope.editInformation.persinfo.phone,
                group_id: parseInt($('#edit_group').val()),
                roleids: $scope.persinfo.role_ids
            }
            if($scope.editInformation.user.pwd == undefined){
                params.pwd = "";
            }else{
                params.pwd = $scope.editInformation.user.pwd;
            }
            ajaxService.post_token('user/update', 'rbac', params).then(
                function(result){
                    if(result.res.code == 120000){
                        $('#edit').modal('hide');
                        $scope.init();
                    }else if(result.res.code == 140000){
                        $scope.name_msg = result.res.msg;
                    }else{
                        console.log(result)
                    }
                },
                function(result){
                    console.log(result.res.code);
                }
            )
        }
    }
    //删除用户
    $scope.delete = function(){
        if(aCheckedValue.length){
            var array = [];
            for(var i=0; i<aCheckedValue.length; i++){
                array.push(aCheckedValue[i])
            }
            $scope.deleteData = array;
            $('#deleteButton').attr("data-target","#delete");
        }else{
            $('#deleteButton').attr("data-target","#deleteError");
        }
    }
    $scope.deleteUpdata = function(){
        var params = {};
        var delete_ids = aChecked;
        params.ids = delete_ids;
        params.token = userToken;
        ajaxService.post_token('user/del', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000){
                    aChecked = [];
                    aCheckedValue = [];
                    $scope.init();
                    $('#delete').modal('hide');
                }
            },
            function(result){
                console.log(result.res.code);
            }
        )
    }
    // 禁用用户
    $scope.disabled = function(){
        if(aCheckedValue.length){
            var array = [];
            for(var i=0; i<aCheckedValue.length; i++){
                array.push(aCheckedValue[i])
            }
            $scope.disabledData = array;
            $('#disabledButton').attr("data-target","#disabled");
        }else{
            $('#disabledButton').attr("data-target","#disabledError");
        }
    }
    $scope.disabledUpdata = function(){
        var params = {};
        params.token = userToken;
        params.ids = aChecked;
        params.flag = 0;
        ajaxService.post_token('user/status', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000){
                    aChecked = [];
                    aCheckedValue = [];
                    $scope.init();
                    $('#disabled').modal('hide');
                }
            },
            function(result){
                console.log(result.res.code);
            }
        )
    }
    // 启用用户
    $scope.abled = function(){
        if(aCheckedValue.length){
            var array = [];
            for(var i=0; i<aCheckedValue.length; i++){
                array.push(aCheckedValue[i]);
            }
            $scope.abledData = array;
            $('#abledButton').attr("data-target","#abled");
        }else{
            $('#abledButton').attr("data-target","#abledError");
        }
    }
    $scope.abledUpdata = function(){
        var params = {};
        params.token = userToken;
        params.ids = aChecked;
        params.flag = 1;
        ajaxService.post_token('user/status', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000){
                    aChecked = [];
                    aCheckedValue = [];
                    $scope.init();
                    $('#abled').modal('hide');
                }
            },
            function(result){
                console.log(result.res.code);
            }
        )
    }
    //角色管理
    $scope.rolesAllRoles = function(){
        ajaxService.get('all_roles', 'rbac', {}).then(
            function(result){
                if(result.status == "SUCCESS"){
                    var roleList = result.res.data.rows;
                    var str = "";
                    for(var i=0; i<roleList.length; i++){
                        str += "<option value="+roleList[i].id+" ng-selected='ownRoleids.indexOf(roleList[i].id)!=-1'"+">"+roleList[i].role_name+"</option>";
                    }
                    $('#roles_roles').append(str);
                    $('#roles_roles').selectpicker('refresh');
                }
            },
            function(result){
                console.log(result)
            }
        )
    }
    $scope.rolesAllRoles();
    $scope.role= function(){
    	if(aCheckedValue.length != 1){
    		$('#rolesButton').attr("data-target","#rolesError");
    	}else{
            var str = aCheckedValue[0][aChecked[0]].roleids;
            var sArray = [];
            if(str != undefined){
                sArray = str.split(',');
            };
            var array = [];
            for(var i=0; i<sArray.length; i++){
                array.push(parseInt(sArray[i]))
            };
            $scope.ownRoleids = array;
            $scope.rolesAllRoles();
    		$('#rolesButton').attr("data-target","#roles");
            var information = aCheckedValue[0][aChecked[0]];
            $scope.roleData = {
                username: information.name,
                id: information.id
            }
            if(aCheckedValue[0][aChecked[0]].roleids != undefined){
                var strRoleList = aCheckedValue[0][aChecked[0]].roleids.split(",");
                var aRoleList = [];
                for(var i=0; i<strRoleList.length; i++){
                    aRoleList.push(parseInt(strRoleList[i]));
                }
            }
    	}
    }
    $scope.roleUpdata = function(){
        var sArray = $("#roles_roles").val();
        var array = [];
        if(sArray){
            for(var i=0; i<sArray.length; i++){
                array.push(parseInt(sArray[i]));
            }
        };
        var params = {
            userid: $scope.roleData.id
        };
        if(array != false){
            params.roleids = array;
            ajaxService.post_token('user/role', 'rbac', params).then(
                function(result){
                    if(result.res.code == 120000){
                        $('#roles').modal('hide');
                        $scope.init();
                        $scope.updata_role_emsg="";
                    }
                },
                function(result){
                    console.log(result)
                }
            )
        }else{
            $scope.updata_role_emsg = "请分配角色!";
        }
    }
    $scope.search = function(){
        if($scope.keyword != undefined){
            $scope.loadingSwitch = false;
            var params = {
                index: $scope.bigCurrentPage-1,
                sort: 'asc',
                size: $scope.pageSize,
                query:{
                    fuzzy:{
                        cn: $scope.keyword
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
    }
})
