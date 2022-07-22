/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap','ngCookies']);

App2.controller('doctorController', function($scope,$http,$cookieStore) {
	
    //var URL_BASE="http://10.11.3.3:8080/Sample_Tracker/webapi/";
	//var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
    //var URL_BASE="http://localhost:1025/Sample_Tracker/webapi/";
    
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    var DOCTOR_URL_BASE = URL_BASE + "doctor";
	
   
	$scope.getAllAssets = function(){
		
		$http.get(DOCTOR_URL_BASE+"/doctorlist")
		.success(function(data){
			
			$scope.doctor = data;
		})
		.error(function(data) {
			  //newly added error code
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
	}
	
	
	$scope.getAllAssets();
	
	$scope.doctorlogin = function(d,p){
		
		var pwd = "np1234";
		$scope.doctorname = d;
		$cookieStore.put('doctornames',$scope.doctorname);
		
		
		if(p==pwd){	
			window.location.href="patientDetails.html";
		}else{
			
			alert("Please check password again!!")
		}
		
	}
});