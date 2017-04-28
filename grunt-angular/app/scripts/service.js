'use strict';
angular.module('opm.service',[])
.factory('ajaxService', function($http, $q, Settings){
	var ajaxService = {};
    var user_token = sessionStorage.getItem("token");
    var version = Settings.opm_version;
    ajaxService.post_token = function(url, module, params){
        var defer = $q.defer();
        var MODULE = module.toUpperCase();
        $http({  
            url: '/'+MODULE+'/api/'+module+'/v'+ version+'/'+url+'/', 
            method: 'POST',
            headers : { 'Content-Type': 'application/x-www-form-urlencoded'}, 
            data: JSON.stringify({"auth":{"type":"token","token_value":user_token},"action":params})  
        }).success(function (data) {  
            defer.resolve(data);  
        }).  
        error(function (data) { 
            defer.reject(data);  
        });
        return defer.promise;  
    };
    ajaxService.post_notoken = function(url, module, params){
        var defer = $q.defer();
        var MODULE = module.toUpperCase();
        $http({  
            url: '/'+MODULE+'api/'+module+'/v'+ version+'/'+url+'/',  
            method: 'POST',  
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            data: JSON.stringify({"auth":null,"action":params}) 
        }).success(function (data) {  
            defer.resolve(data);  
        }).  
        error(function (data) { 
            defer.reject(data);  
        });
        return defer.promise;  
    };
    ajaxService.get = function(url, module, getParams){
        var MODULE = module.toUpperCase();
        var defer = $q.defer();
        $http({  
            url: '/'+MODULE+'/api/'+module+'/v'+ version+'/'+url+'/',  
            method: 'GET',  
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            params: {"action":getParams}
        }).success(function (data) {  
            defer.resolve(data);  
        }).  
        error(function (data) { 
            defer.reject(data);  
        });
        return defer.promise;  
    };
    return ajaxService;
})
.factory('dataFormat', function(){
    var dataFormat = {};
    // 更改为treegrid数据格式
    dataFormat.format = function(array,newArray){
        $.each(array,function(index,item){
            if(item.parent_id === 0){
                item.parent_id = null;
            }
            newArray.push(item);
            if(item.children === undefined){
                return newArray;
            }else{
                dataFormat.format(item.children,newArray);
            }
        });
        return newArray;
    };
    // 更改为treeview数据格式
    dataFormat.treeview = function(array,ids){
        $.each(array,function(index,item){
            var flag = ids.indexOf(item.id);
            item.text = item.name;
            if(item.children !== undefined && item.children !== false){
                item.nodes = item.children;
            }
            if(flag !== -1){
                item.state = {
                    checked: true
                };
            }
            if(item.children !== undefined && item.children.length !== 0){
                dataFormat.treeview(item.children,ids);
            }
        });
        return array;
    };
    return dataFormat;
});
