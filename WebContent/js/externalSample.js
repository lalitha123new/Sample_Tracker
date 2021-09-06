/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap']);

App2.controller('ExternalSampleController', function($scope,$http) {
	  
    
 var Session_id = sessionStorage.getItem("admin_id")
 	var self = this;
	self.state=false;
	self.buttonstate = true;
	self.outputlist1=[]; 
	$scope.checkNpNumber = true;
	
	
	 //begin code to get external sample details
	 $scope.getAllSamples = function(){
		 
			if(Session_id){
			$http.get(BASE_URL2+"patient")
			.success(function(data) {
	    	 console.log(data)
	         self.outputlist1 = data;
	         
	         //latest first display
	         self.outputlist1 = self.outputlist1.reverse();
	         
	         for(var j=0;j<self.outputlist1.length;j++){
	        	 
	        	 if(self.outputlist1[j].npno != null){
	        		// $scope.checkNpNumber = false;
	        		 $('#j').prop("disabled",false);
	        		 
	        	 }else{
	        		 //$scope.checkNpNumber = true;
	        		 $('#j').prop("disabled",true);
	        	 }
	         }
	         
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
	 
	 $scope.getAllSamples();
	 //end code to get external sample details
	 
	 
	 //begin code to redirect to  the preview page for external sample where we display the chat, uploaded files also
	 $scope.previewSample = function(sampleid,npnum,hospitalid){
		
		 sessionStorage.setItem("hosp_id",hospitalid);
		 sessionStorage.setItem("sample_id",sampleid);
		 sessionStorage.setItem("np_num1",npnum);
		 window.location.href = "previewSample.html";
         
	 }
	 //end of code
	 
	 //begin code to redirect to the print page for an external sample
	 $scope.printPreview = function(sampleid,npnum,hospitalid){
		
		 //var hospitalid = 1;
		 sessionStorage.setItem("hosp_id",hospitalid);
		 sessionStorage.setItem("sample_id",sampleid);
		 sessionStorage.setItem("np_num1",npnum);
		 window.location.href = "printPreview.html";
         
	 }
	 //end of code
	
	 $scope.logOutUser=function(){
	  
	  if (confirm("Do you want to logout?")) {
	  
	  window.location.href="././superAdmin.html";
	  sessionStorage.clear();
	  
	  }
  }
  
  //begin code to get notification count
  $scope.get_notification_count = function(){
		if(Session_id){
			$http.get(BASE_URL2+"notificationscount/2")
			.success(function(data) {
	    	 
				 count = data;
			      var el = document.querySelector('.notification');
			      el.setAttribute("data_count",count);
			      el.classList.add('notify');
			        
			            
			      if(count > 0){
			        el.classList.add('show_count');
			        }
	         
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
	$scope.get_notification_count();
	//end of code

  
 
});