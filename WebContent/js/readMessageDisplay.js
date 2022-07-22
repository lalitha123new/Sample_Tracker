/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap']);

App2.controller('readMessageController', function($scope,$http) {
	  
	var Session_id = sessionStorage.getItem("admin_id");
	var hosp_id = sessionStorage.getItem("hosp_id");
    var sample_id = sessionStorage.getItem("sample_id");
    var np_number1 = sessionStorage.getItem("np_num1");
    
	 
	var self = this;
	self.state=false;
	self.buttonstate = true;
    self.outputlist1=[];
    var np_number;
   
    var chat_test_img = [];
    
    $scope.img_array = [];
	//begin code to display messages for a sample of a hospital
	 $scope.getallMessages = function(){
		 
			//if(Session_id){
			$http.get(BASE_URL2+"notification/"+hosp_id+"/"+sample_id)
			.success(function(data) {
	    	
	    	 chat_test_img = data[0].img_url;
	    	 
	    	 if(data[0].img_url != null){
	    	 var src2 = BASE_URL2+data[0].img_url;
	    	 $("#imgLocation1").attr("src", src2);
	    	 }else{
	    	  $("#imgLocation1").addClass("hidden");
			  $("#viewBtn2").addClass("hidden");
			 }
	    	 
	    	 for(var i=0;i<data.length;i++){
	    	 var d = new Date(data[i].created_at);
		    	
	    	 data[i].created_at = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	    	 d.getHours() + ":" + d.getMinutes();
	    	 }
	    	 
	    	 
	         self.outputlist1 = data;
	         np_number = self.outputlist1[0].np_num;
	         
	         
	         
	         
	     	})
	     	.error(function(data) {
				  //newly added error code
		    	  alert("Error: server encountered an internal error. Please try again after some time ");
		        
		    });
	     	
			/*}else{
	    	 
	    	 alert("Session got expired, Please login again");
	    	 window.location.href="././superAdmin.html";
	    	 
	    	 sessionStorage.clear();
			}*/
			
		}
	 $scope.getallMessages();
	//end code to display messages for a sample of an external hospital
	 
	 var np_number = sessionStorage.getItem("np_num1");
	 $scope.message = "";
	 
	 
	function onUpload(){
		console.log("upload complete");
	}
	 
  
  $scope.logOutUser=function(){
	  
	  if (confirm("Do you want to logout?")) {
	  
	  window.location.href="././superAdmin.html";
	  sessionStorage.clear();
	  
	  }
  }
  
  

 
});