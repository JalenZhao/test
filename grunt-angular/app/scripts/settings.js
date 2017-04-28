angular.module('opm.settings',[])
.constant('Settings',{
	kong_ip: 'http://172.23.31.167',
	// opm_ip: 'http://172.23.28.124:10001',
	opm_version: '0_1_0',
	user_persinfo:sessionStorage.getItem("persinfo"),
	maxSize:5,
	bigCurrentPage:1,
	pageSize:10
});