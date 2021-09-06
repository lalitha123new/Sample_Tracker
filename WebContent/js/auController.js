/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap']);

App2.controller('auController', function($scope,$http) {
	  
    
	var Session_id = sessionStorage.getItem("admin_id")
	var self = this;
	self.state=false;
	self.buttonstate = true;
	$scope.hospitalArray = [];
    
	self.outputlist1=[];
	 $scope.getAllExternalHospitals = function(){
			$http.get(BASE_URL2+"allhospitals")
			.success(function(data) {
				
				$scope.hospitalArray =  data;
				console.log($scope.hospitalArray);
			});
			 }
	 
	 $scope.getAllExternalHospitals();
	 //begin code to get external AU sample details
	 $scope.getAUSamples = function(){
		 
			if(Session_id){
			$http.get(BASE_URL2+"aupatient")
			.success(function(data) {
	         self.outputlist1 = data;
	         //latest first display
	         self.outputlist1 = self.outputlist1.reverse();
	         console.log(self.outputlist1);
	         for(var i = 0;i<self.outputlist1.length;i++){
	        	 for(var j = 0; j <$scope.hospitalArray.length;j++){
	        		 if(self.outputlist1[i].hospitalid == $scope.hospitalArray[j].hospitalid){
	        			 
	        			 self.outputlist1[i].hosp_name =$scope.hospitalArray[j].username; 
	        		 }
	        	 }
	        	 
	         }
	         console.log(self.outputlist1)
	         
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
	 
	 $scope.getAUSamples();
	 //end code to get external sample details
	 
	 //edit status of au sample and update np number
	 $scope.editSampleStatus = function(ext_sample_id,pat_name,hosp_name,ref_no){
		$('#ext_sample_id').val(ext_sample_id);
		$('#edit_pat_name').val(pat_name);
		$('#edit_hosp_name').val(hosp_name);
		$('#ref_hosp_pat_id').val(ref_no);
		
		$("#editSampleModal").modal('show');
		
	}
	 
	 $scope.status_options = [
		   
		    { value: "Received"},
		    { value: "Reported"},
		    { value: "Verified"},
		    { value: "Dispatched"}
		    
		  
		  ];
	
	
	
	$scope.ediSampleSave = function(){
		var ext_id = $('#ext_sample_id').val();
		 var status =  $scope.status;
		 var np_number =  $('#np_number').val();
		 np_number = np_number.toUpperCase();
		
		 
		
		 
		 var editObj = {
				 au_np_no:np_number,
				 status:status,
				 au_patient_id:ext_id
    			
    			
		 }
		 //console.log(editObj);
		
		 
		 $http.post(BASE_URL2+"statuschangeau/", editObj ,{headers: {'Content-Type': 'application/json'}})
         .then(function successCallback(response) {
        	 
        	 window.location.reload();
         
             })
             .error(function(data) {
              alert("Not able to save the sheet asset");
             });
		 
	}

//end 
	 //function for AU sample preview page redirect
	 $scope.previewAuSample = function(auid){
			
		 //var hospitalid = 1;
		 //sessionStorage.setItem("hosp_id",hospitalid);
		 //sessionStorage.setItem("np_num1",npnum);
		 
		 sessionStorage.setItem("au_id",auid);
		 window.location.href = "previewAuSample.html";
         
	 }
	
  $scope.logOutUser=function(){
	  
	  if (confirm("Do you want to logout?")) {
	  
	  window.location.href="././superAdmin.html";
	  sessionStorage.clear();
	  
	  }
	  
	 
  }
 
});