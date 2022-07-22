/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap']);

App2.controller('ExternalHospitalController', function($scope,$http) {
	  
    
	var Session_id = sessionStorage.getItem("admin_id")
	var self = this;
	self.state=false;
	self.buttonstate = true;
	self.outputlist1=[];
	var count;
	var data_count;
	
	
	
	//begin code to open modal to create new hospital
	$scope.createHospital =function(){
		   $('#createHospitalModal').modal('show');	
		}
	//end of code to open modal to create new hospital
	
	 $scope.hos_type = [
		    { value: "private"},
		    { value: "government"}
		  
		  ];
	
	//begin code to create new hospital
	$scope.createHospitalSave =function(){
		
			
		 var create_nameofhospital =  $('#create_hosp_name').val();
		 
		 //var create_hospitalType =  $('#create_hosp_type').val();
		 var create_hospitalType =  $scope.hosType;
		 var hosp_address =  $('#hosp_address').val();
		 var create_username = $('#username_create').val();
		 var create_contact = $('#contact_create').val();
		 var create_email = $('#email_create').val();
		 var create_password =  $('#password_create').val();
		 var password_create_confirm =  $('#password_create_confirm').val();
		
		 
         if((create_nameofhospital != "") && (create_hospitalType != "") && (hosp_address != "") && (create_username != "") && (create_contact != "") && (create_email != "") && (create_password != "") && (password_create_confirm != "")){
			 
			 	if(create_password != password_create_confirm){
				
					alert("Passwords does not match");
		 			
		 		}else{
			 
		 			var data = {
        			
        			 nameofhospital:create_nameofhospital,
        			 hospitalType:create_hospitalType,
        			 hospital_address:hosp_address,
        			 username:create_username,
        			 contact:create_contact,
        			 email:create_email,
        			 password:create_password,
        			 verify_email_flag:2,
        			 portal_flag:1,
        			 review_flag:1
        			 
					 
        	 	};
        	 
        	 	if(Session_id){
        		
        	 		//REST call to create new hospital in external nimhans
        	 		$('#createHospitalModal').modal('hide');
        	 		$http.post(BASE_URL2+"login", data).then(function (response) {
        	 		window.location.reload();
        	 		

					}, function (response) {

				});
        	 
        	 	}else{
            	 
        	 		alert("Session got expired, Please login again");
        	 		window.location.href="././superAdmin.html";
            	 
        	 		sessionStorage.clear();
        	 	}
		 		}
		 		
         	}else{
		 			alert("Please enter all fields");
		 			// $scope.invalidPassword_create = true;
		 		}
			 
				}
	//end code to create new hospital
	
	
	 //begin code to get external hospital details
	 $scope.getAllAssets = function(){
		 
			if(Session_id){
				
			$http.get(BASE_URL2+"allhospitals")
			.success(function(data) {
				console.log(data);
	         self.outputlist1 = data;
	         //latest first display
	         self.outputlist1=  self.outputlist1.reverse();
	         
	         for(var i=0;i<self.outputlist1.length;i++){
	    		
	    		var d = new Date(self.outputlist1[i].createdAt);
	  	    	
	    		self.outputlist1[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	  	    	d.getHours() + ":" + d.getMinutes();
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
	 
	 //end code to get external hospital details
	$scope.getAllAssets();
	
	
	
	//begin code to get the notification count to display in the bell symbol
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
	     	
			}else{
	    	 
	    	 alert("Session got expired, Please login again");
	    	 window.location.href="././superAdmin.html";
	    	 
	    	 sessionStorage.clear();
			}
		
		
	}
	$scope.get_notification_count();
	//end of  code to get the notification count to display in the bell symbol
 

	//begin code to display the external hospital details in the edit external hospital modal
	$scope.hospital_id1="";
	
	$scope.editUser = function(hosp_id,nameofhospital,username,contact,email,type,address){ 
			
			$('#edit_hosp_name').val(nameofhospital);
			$('#edit_hosp_type').val(type);
			$('#edit_hosp_address').val(address);
			$('#edit_username').val(username);
			$('#edit_contact').val(contact);
			$('#edit_email').val(email);
			$('#hospid').text(hosp_id);
			
		    $('#editHospitalModal').modal('show');
		
		 
	    }
	//end of  code 
	
	
	
	
	//begin code to save the edited external hospital details
	 $scope.editHospitalSave = function(){
		 
		 var hosid = $('#hospid').text();
		 var edit_nameofhospital =  $('#edit_hosp_name').val();
		 var edit_hospitalType =  $('#edit_hosp_type').val();
		 var edit_hosp_address =  $('#edit_hosp_address').val();
		 var edit_username = $('#edit_username').val();
		 var edit_contact = $('#edit_contact').val();
		 var edit_email = $('#edit_email').val();
		 var edit_password =  $('#edit_password').val();
		 var edit_password_confirm =  $('#edit_password_confirm').val();
		
         if((edit_nameofhospital != "") && (edit_hospitalType != "") && (edit_hosp_address != "") && (edit_username != "") && (edit_contact != "") && (edit_email != "")){
			 
        	 if(edit_password == edit_password_confirm){
        		 
        	 var data = {
        			
        			 hospitalid:hosid,
        			 nameofhospital:edit_nameofhospital,
        			 hospitalType:edit_hospitalType,
        			 hospital_address:edit_hosp_address,
        			 username:edit_username,
        			 contact:edit_contact,
        			 email:edit_email,
        			 password:edit_password_confirm
					   
        	     };
        	 
        	 
        	 	if(Session_id){
        	 		
        	 		//REST call to save edited external hospital data details
        	 		$('#editHospitalModal').modal('hide');
        	 		
        	 		$http.post(BASE_URL2+"updatelogin/"+hosid, data).then(function (response) {
        	 			
        	 			window.location.reload();

					}, function (response) {

				});
        	 
        	 	}else{
            	 
        	 		alert("Session got expired, Please login again");
        	 		window.location.href="././superAdmin.html";
            	 
        	 		sessionStorage.clear();
        	 	}
        	 }else{
        		 alert("Passwords does not match");
        	 }
		 		}else{
			 
		 			alert("Please enter all fields");
		 			// $scope.invalidPassword_create = true;
		 		}
	 }
	 //end of code
	 
	 
	
  $scope.deleteUser = function(technician_id,role){
	  
	  var validation_text = "";
	  
	  if(role.includes("inactive")){
		 
		  validation_text="Do you want to Active technician ?";
	  }else{
		  
		  validation_text="Do you want to Inactive technician ?";
	  }
		
		
	  if(Session_id){
		  
		  if (confirm(validation_text)) {
			  $http.get(USERS_URL_BASE+"/delete/"+technician_id+"/"+role)
			  .success(function(data) {
         
				  if(data == "deleted"){
        	  
					  window.location.reload();
				  }else{
        	     
					  var x = document.getElementById("snackbar1");
					  x.className = "show";
					  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
              
				  }
           
			  })
			  .error(function(data) {
			  //newly added error code
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
			  
		
		  }
	
	  }else{
	       	 
	       	 alert("Session got expired, Please login again");
	       	 window.location.href="././superAdmin.html";
	       	 
	       	 sessionStorage.clear();
	   	 }
	  
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
  
  $scope.pendingHospital =  function(){
	  
	  window.location.href="pendingHospitals.html";
	  
  }
  
  	//begin code to display the external hospital details in the review external hospital modal to approve or reject
	$scope.hospital_id1="";
	
	$scope.reviewUser = function(hosp_id,nameofhospital,username,contact,email,type,address,rev_email_flag){ 
			
			$('#reveiw_hosp_name').val(nameofhospital);
			$('#reveiw_hosp_type').val(type);
			$('#reveiw_hosp_address').val(address);
			$('#reveiw_username').val(username);
			$('#reveiw_contact').val(contact);
			$('#reveiw_email').val(email);
			$('#hospid_review').text(hosp_id);
		    $('#reviewHospitalModal').modal('show');
		    if(rev_email_flag == 1){
		    	$("#not_verified").removeClass("hidden");
		    	$("#not_approve").prop("disabled",true);
		    	$("#not_reject").prop("disabled",true);
		    }else{
		    	$("#not_verified").addClass("hidden");
		    	$("#not_approve").prop("disabled",false);
		    	$("#not_reject").prop("disabled",false);
		    	
		    }
		
		 
	    }
	//end of  code 
	
	
	//begin code to approve or reject external hospital
	$scope.approveHospitalSave = function(rev_flag){
		
		$scope.hsp_id = $('#hospid_review').text();
		
		
		
		$http.get(BASE_URL2+"/updateflag/"+$scope.hsp_id+"/2/"+rev_flag)
		  .success(function(data) {
			  
   
     
		  })
		  .error(function(data) {
		  //newly added error code
			  window.location.reload();
		  console.log("Error: server encountered an internal error. Please try again after some time ");
      
  });
		
	}
	//end of code
	
	
	
  
 
});