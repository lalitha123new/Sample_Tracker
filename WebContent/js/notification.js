/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap']);

App2.controller('notificationController', function($scope,$http) {
	  
	var Session_id = sessionStorage.getItem("admin_id");
	var self = this;
	
	self.state=false;
	self.buttonstate = true;
    
	self.outputlist1=[];
	self.outputlist2=[];
 
	
	//begin code to get notification
	 $scope.getAnotification = function(){
		 
			if(Session_id){
			$http.get(BASE_URL2+"allnotification/2")
			.success(function(data) {
	    	 
	         self.outputlist1 = data;
	         self.outputlist1.reverse();
	         
	     	})
	     	.error(function(data) {
				  //newly added error code
		    	  alert("Error: server encountered an internal error. Please try again after some time ");
		        
		    });
			}else{
	    	 
	    	 alert("Session got expired, Please login again");
	    	 window.location.href="././superAdmin.html";
	    	 
	    	 sessionStorage.clear();
			}
			
		}
	 $scope.getAnotification();
	 
	 //end of code to get notification
	 
	 //begin code to redirect to read the message
	 $scope.readMessage = function(hosp_id,sample_id,notifyid,np){
		 
		 
		 if(Session_id){
				$http.get(BASE_URL2+"notification/"+hosp_id+"/"+sample_id)
				.success(function(data) {
		    	 
					 self.outputlist2 = data;
			         sessionStorage.setItem("hosp_id",hosp_id);
			         sessionStorage.setItem("sample_id",sample_id);
			         sessionStorage.setItem("np_num1",np);
			         window.location.href = "readMessage.html";
		         
		     	})
		     	
				}else{
		    	 
		    	 alert("Session got expired, Please login again");
		    	 window.location.href="././superAdmin.html";
		    	 
		    	 sessionStorage.clear();
				}
		 $scope.readNotification(notifyid);
		 
	 }
	 var arr = sessionStorage.getItem("outputlist2");
	 //end of code to redirect to read the message
	 
	 //begin code to update read notification status whether the message is read or not
	 $scope.readNotification = function(notifyid){
		 
		   
		   if(Session_id){
			$http.get(BASE_URL2+"updateReadNotification/"+notifyid)
			.success(function(data) {
				//console.log(data);
	    	 
	     	})
	     	.error(function(data) {
				  //newly added error code
		    	  alert("Error: server encountered an internal error. Please try again after some time ");
		        
		    });
	     	
			}else{
	    	 
	    	 alert("Session got expired, Please login again");
	    	 window.location.href="././superAdmin.html";
	    	 
	    	 sessionStorage.clear();
			}
	 }
	 //end of code
	 
  
	 $scope.back = function(){
		  window.location.href="././externalHospital.html";
	  }
	 
	 $scope.logOutUser=function(){
	  
	  if (confirm("Do you want to logout?")) {
	  
	  window.location.href="././superAdmin.html";
	  sessionStorage.clear();
	  
	  }
  }
  
  

  
 
});