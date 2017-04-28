angular.module('opm.controllers', [])
.controller("home", function($scope, $state, ajaxService, Settings) {
    $scope.username = sessionStorage.getItem("userName");
    $scope.persinfo = JSON.parse(Settings.user_persinfo);
    $scope.headerTitle = "OPM";
    var userToken = sessionStorage.getItem("token");
    $scope.logout = function(){
        ajaxService.post_token("logout","rbac",{"token":userToken}).then(
            function(result){
                if(result.res.code == 120000){
                    sessionStorage.removeItem('token');
                    window.location.href="index.html";
                }else{
                    alert(result.res.mes);
                    window.location.href="index.html";
                }
            },
            function(result){
                alert(result.res.mes)
            }
        )
    };
    $scope.initMenu = function(){
        var params = {
            token: userToken
        }
        // 获取菜单
        ajaxService.post_token('init_menu', 'rbac', params).then(
            function(result){
                if(result.res.code == 120000){
                    $scope.topMenus = result.res.menus_tree.menus;
                }else{
                     window.location.href="index.html";
                }
            },
            function(result){
                window.location.href="index.html";
            }
        )
    }
    $scope.initMenu();
    // 获取个人信息
    $scope.getPersinfo = function(){
        var persinfo_params = {
            userid: $scope.persinfo.user_id
        }
        ajaxService.post_token('user/info', 'rbac', persinfo_params).then(
            function(result){
                if(result.res.code == 120000){
                    $scope.persinfo_data = result.res.data;
                }else{
                    console.log(result.res.code);
                }
            },
            function(result){
                console.log(result);
            }
        )
    }
    // 个人信息编辑提交
    $scope.persinfo_updata = function(){
        var bSwitch_email,bSwitch_phone;
        if($scope.persinfo_data.persinfo.phone == undefined){
            $scope.phone_msg = '必填';
            bSwitch_phone = false;
        }else{
            var reg_phone = /^(((13[0-9]{1})|(15[0-35-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            var reg_telphone = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
            var boolean = reg_phone.test($scope.persinfo_data.persinfo.phone) || reg_telphone.test($scope.persinfo_data.persinfo.phone);
            if(boolean){
                $scope.phone_msg = null;
                bSwitch_phone = true;
            }else{
                $scope.phone_msg = "手机号格式有误";
                bSwitch_phone = false;
            }
        }
        if($scope.persinfo_data.persinfo.email == undefined){
            $scope.email_msg = '必填';
            bSwitch_email = false;
        }else{
            var reg_email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            var boolean = reg_email.test($scope.persinfo_data.persinfo.email);
            if(boolean){
                bSwitch_email = true;
                $scope.email_msg = null;
            }else{
                bSwitch_email = false;
                $scope.email_msg = "邮箱格式有误";
            }
        }
        if(bSwitch_email && bSwitch_phone){
            var params = {
                userid: $scope.persinfo.user_id,
                name: $scope.persinfo_data.user.name,
                email: $scope.persinfo_data.persinfo.email,
                cn: $scope.persinfo_data.user.cn,
                phone: $scope.persinfo_data.persinfo.phone,
                group_id: $scope.persinfo.group_id,
                roleids: $scope.persinfo.role_ids,
                pwd:""
            }
            ajaxService.post_token('user/update', 'rbac', params).then(
                function(result){
                    if(result.res.code == 120000){
                        $("#userinformation").modal("hide")
                    }
                },
                function(result){
                    console.log(result);
                }
            )
        }
    }
    // 查看所有任务
    $scope.alltask = function(){
        $state.go("newsCenter.myPending")
    }
    // changeTitle
    $scope.changeTitle = function(subtitle){
        $scope.headerTitle = "OPM-"+subtitle;
        $scope.headerSubtitle = subtitle;
    }
})
.directive('toggleClass', function(){
    return {
        restrict: 'A',
        link: function($scope, $element){
            $element.on('click', function(){
                $element.addClass('active')
                $element.siblings().removeClass('active')
            });
        }
    };
});
