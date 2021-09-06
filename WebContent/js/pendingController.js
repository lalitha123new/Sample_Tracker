/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap']);

App2.controller('pendingHospitalController', function($scope,$http) {
	  
    
	var Session_id = sessionStorage.getItem("admin_id")
 	var self = this;
	self.state=false;
	self.buttonstate = true;
    
	self.outputlist1=[];
	var count;
	var data_count;
	
	if(Session_id){
		
	}else{
   	 
 		alert("Session got expired, Please login again");
 		window.location.href="././superAdmin.html";
	 
 		sessionStorage.clear();
 	}
  
  $scope.back = function(){
	  window.location.href="././externalSample.html";
  }
  
  
  
  $scope.logOutUser=function(){
	  
	  if (confirm("Do you want to logout?")) {
	  
	  window.location.href="././superAdmin.html";
	  sessionStorage.clear();
	  
	  }
  }
  

  
 
});