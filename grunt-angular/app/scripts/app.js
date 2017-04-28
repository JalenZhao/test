'use strict';

/**
 * @ngdoc overview
 * @name gruntAngularApp
 * @description
 * # gruntAngularApp
 *
 * Main module of the application.
 */
angular.module("opm", [
  'ui.router',
  'ui.bootstrap',
  'opm.controllers',
  'opm.service',
  'opm.settings'
]) 
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/rbac/userList');
    $stateProvider
    // RBAC权限管理中心
    .state('rbac', {
        url: '/rbac',
        templateUrl: '../views/rbac/rbac.html',
        controller: 'rbac'
    })
        // 用户列表
        .state('rbac.user_list', {
            url: '/userList',
            templateUrl: '../views/rbac/userList.html',
            controller: 'userList'
        })
        // 资源权限
        .state('rbac.rbac_resource_list', {
            url: '/rbacResourceList',
            templateUrl: '../views/rbac/rbacResourceList.html',
            controller: 'rbacResourceList'
        })
        // 操作权限
        .state('rbac.rbac_operation_list', {
            url: '/rbacOperationList',
            templateUrl: '../views/rbac/rbacOperationList.html',
            controller: 'rbacOperationList'
        })
        // 角色列表
        .state('rbac.role_list', {
            url: '/roleList',
            templateUrl: '../views/rbac/roleList.html',
            controller: 'roleList'
        })

        // 角色拥有者列表
        .state('rbac.role_owner_list', {
            url: '/roleOwnerList?role',
            templateUrl: '../views/rbac/roleOwnerList.html',
            controller: 'roleOwnerList'
        })
        // 机构列表
        .state('rbac.org_list', {
            url: '/orgList',
            templateUrl: '../views/rbac/orgList.html',
            controller: 'orgList'
        })

    // CMDB配置管理中心
    // .state('cmdb', {
    //         url: '/cmdb',
    //         templateUrl: 'modules/cmdb/templates/cmdb.html',
    //         controller: 'cmdb'
    //     })
    //     .state('cmdb.ci_list', {
    //         url: '/ci_list',
    //         templateUrl: 'modules/cmdb/templates/ciList.html',
    //         controller: 'ciList'
    //     })
    //     .state('cmdb.ci_list_add', {
    //         url: '/ci_list_add',
    //         templateUrl: 'modules/cmdb/templates/ciListAdd.html'
    //     })
    //     // 对象管理
    //     .state('cmdb.ci_obj_list', {
    //         url: '/ci_obj_list',
    //         templateUrl: 'modules/cmdb/templates/ciObjectList.html',
    //         controller: 'ciObjectList'
    //     })
    //     // 对象管理详情页
    //     .state('cmdb.details_obj', {
    //         url: '/details_obj',
    //         templateUrl: 'modules/cmdb/templates/detailsObject.html',
    //         controller: 'detailsObject'
    //     })
    //     // 详情页
    //     .state('cmdb.details', {
    //         url: '/details',
    //         templateUrl: 'modules/cmdb/templates/details.html'
    //     })
    //     // 修改属性
    //     .state('cmdb.change_attr', {
    //         url: '/change_attr',
    //         templateUrl: 'modules/cmdb/templates/changeAttr.html'
    //     })
    //     // 结构组织图
    //     .state('cmdb.org_chart', {
    //         url: '/org_chart',
    //         templateUrl: 'modules/cmdb/templates/orgChart.html'
    //     })



    // 混合云
    .state('hybrid', {
        url: '/hybrid',
        templateUrl: '../views/hybrid/hybrid.html'
    })

    // 远程操作
    .state('remote', {
        url: '/remote',
        templateUrl: '../views/remote/remote.html'
    })  
        //信息管理
        .state('remote.Jenkins_information_management', {
            url: '/JenkinsInformationManagement',
            templateUrl: '../views/remote/JenkinsInformationManagement.html',
            controller: 'JenkinsInformationManagement'
        })
        //信息总汇
        .state('remote.Jenkins_Information_convergence', {
            url: '/JenkinsInformationConvergence',
            templateUrl: '../views/remote/JenkinsInformationConvergence.html',
            controller: 'JenkinsInformationConvergence'
        })
        //我的JOB
        .state('remote.Jenkins_my_JOB', {
            url: '/JenkinsMyJOB',
            templateUrl: '../views/remote/JenkinsMyJOB.html',
            controller: 'JenkinsMyJOB'
        })
        //JOB权限分配
        .state('remote.Jenkins_JOB_rbac', {
            url: '/JenkinsJOBRbac',
            templateUrl: '../views/remote/JenkinsJOBRbac.html',
            controller: 'JenkinsJOBRbac'
        })

    // 工作流
    .state('workflow', {
        url: '/workflow',
        templateUrl: '../views/workflow/workflow.html',
        controller: 'workflow'
    })  
        //总实例列表
        .state('workflow.total_list', {
            url: '/total_list',
            templateUrl: '../views/workflow/totalList.html',
            controller: 'totalList'
        })
        // 公网IP实例列表
        .state('workflow.internetApplication', {
            url: '/internetApplication',
            templateUrl: '../views/workflow/workflowInternetApplication.html',
            controller: 'workflowInternetApplication'
        })
        // 实例列表
        .state('workflow.examples', {
            url: '/examples?category?name',
            templateUrl: '../views/workflow/examples.html',
            controller: 'examples'
        })
        // 实例详情
        .state('workflow.exampleDetails', {
            url: '/examplesDetails?applyId?psId?category?name',
            templateUrl: '../views/workflow/exampleDetails.html',
            controller: 'exampleDetails'
        })
    // 资源申请
    .state('resourceApplication', {
        url: '/resourceApplication',
        templateUrl: '../views/resourceApplication/resourceApplication.html',
        controller: 'resourceApplication'
    })
        .state('resourceApplication.internet_application', {
            url: '/internetApplication',
            templateUrl: '../views/resourceApplication/internetApplication.html',
            controller: 'internetApplication'
        })

    // 消息中心
    .state('newsCenter', {
        url: '/newsCenter.myApply',
        templateUrl: '../views/newsCenter/newsCenter.html',
        controller: 'newsCenter'
    })
        // 我的申请
        .state('newsCenter.myApply', {
            url: '/myApply',
            templateUrl: '../views/newsCenter/myApply.html',
            controller: 'myApply'
        })
        // 我的申请-编辑/查看
        .state('newsCenter.myApplyDetails', {
            url: '/myApplyDetails?id?type?psId',
            templateUrl: '../views/newsCenter/myApplyDetails.html',
            controller: 'myApplyDetails'
        })
        // 我的待处理
        .state('newsCenter.myPending', {
            url: '/myPending',
            templateUrl: '../views/newsCenter/myPending.html',
            controller: 'myPending'
        })
        // 我的待处理--处理
        .state('newsCenter.myHandle', {
            url: '/myHandle?id?taskId',
            templateUrl: '../views/newsCenter/myHandle.html',
            controller: 'myHandle'
        })
        // 我的已处理
        .state('newsCenter.myProcessed', {
            url: '/myProcessed',
            templateUrl: '../views/newsCenter/myProcessed.html',
            controller: 'myProcessed'
        })
        // 我的待处理--查看
        .state('newsCenter.myProcessedDetails', {
            url: '/myProcessedDetails?id?psId',
            templateUrl: '../views/newsCenter/myProcessedDetails.html',
            controller: 'myProcessedDetails'
        })
    // 监控服务
    .state('monitoringService', {
        url: '/monitoringService',
        templateUrl: '../views/monitoringService/monitoringService.html',
        controller: 'monitoringService'
    })
        // 监控列表
        .state('monitoringService.monitoringList', {
            url: '/monitoringList',
            templateUrl: '../views/monitoringService/monitoringList.html',
            // controller: 'myApplyController'
        })
        // 告警列表
        .state('monitoringService.waringList', {
            url: '/waringList',
            templateUrl: '../views/monitoringService/waringList.html',
            // controller: 'myApplyController'
        })
        // 告警曲线
        .state('monitoringService.waringCurve', {
            url: '/waringCurve',
            templateUrl: '../views/monitoringService/waringCurve.html',
            controller: 'waringCurve'
        });
});