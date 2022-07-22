/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap']);

App2.controller('ControllerUsers', function($scope,$http) {
	  
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var USERS_URL_BASE = URL_BASE + "users";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    
    var Session_id = sessionStorage.getItem("admin_id")
    
	var self = this;
	self.state=false;
	self.buttonstate = true;
	self.outputlist1=[];
	outputlist2=[];
	self.stations=["Receiving","Grossing","Embedding","Sectioning","Staining","Reporting","Typing","Verification","Dispatch"];
	$scope.index2;
	
	$scope.roleArr = ["Select role","admin", "faculty", "office", "resident", "techguru","technician","Nimhans_surgeon","Ext_surgeon","nimhans_unit"];
	$scope.roleArrEdit = ["admin", "faculty", "office", "resident", "techguru","technician","Nimhans_surgeon","Ext_surgeon","nimhans_unit"];
	$scope.roleT = $scope.roleArr[0];
	$scope.roleTedit ="";
	$scope.new_array = [];
	
	
	//begin code to get all units 
	$scope.getAllUnits = function(){
	
			if(Session_id){
		
				$http.get(USERS_URL_BASE+"/allunits")
				.success(function(data) {
    	 
					outputlist2 = data;
					for(var i=0;i<outputlist2.length;i++){
    		  
						$scope.new_array[i] = outputlist2[i];
    		   
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
	//end of code
	
	

	$scope.getAllUnits();
	
	//begin
	$scope.createUser =function(){
	   $('#createUserModal').modal('show');	
	}
	//end
	
	
	//begin code to display the unit field in the create_user modal if the selected role is "nimhans_unit"
	$scope.selectedValue = function(item){
		
		if(item ==="nimhans_unit"){
			$("#unit_div").removeClass("hidden");
		}else{
			$("#unit_div").addClass("hidden");
		}
	}
	//end 
	
	//begin code to create new user
	$scope.createUserSave =function(){
			
		 var edit_user_name =  $('#create_user_name').val();
	     var passwordT =  $('#password_create').val();
	     var cmfpasswordT =  $('#cmfpassword_create').val();
	     
	     var technician_role1 =  $('#create_technician_role').val();
	     var unit  = $('#unit_id').val();
	     var result1 = unit.split(":");
	     unit = result1[1];
	    
	    
	     var technician_role = "";
	     if(technician_role1 != "string:Select role"){
	    	 
	    	 var result = technician_role1.split(":");
		      technician_role = result[1]; 
	     }
	     
	    
         if((passwordT == cmfpasswordT) && (passwordT != "") && (cmfpasswordT !="") && (technician_role != "string:Select role") && (technician_role != "") && (unit != "")){
			 
			 
        	 var data = {
        			   technician_id:0,
					   technicianName:edit_user_name,
					   password:cmfpasswordT,
					   roles:technician_role,
					   unit_id:unit
					   };
        	
        	
        	 if(Session_id){
        		
        	 $http.post(USERS_URL_BASE+"/allusers", JSON.stringify(data)).then(function (response) {
                 if (response.data)

                	 $('#createUserModal').modal('hide');
                 
                 var x = document.getElementById("snackbar2");
                 x.className = "show";
                 setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

				 }, function (response) {

				 });
        	 
                 }else{
            	 
            	 alert("Session got expired, Please login again");
            	 window.location.href="././superAdmin.html";
            	 
            	 sessionStorage.clear();
        	     }
		         }else{
			 
			     alert("Please enter all fields");
			     // $scope.invalidPassword_create = true;
		         }
			
	}
	//end of code
	
	
		//begin code to get all users for login drondown
		$scope.getAllAssets = function(){
		
		if(Session_id){
			
		$http.get(USERS_URL_BASE+"/allusers")
        .success(function(data) {
            self.outputlist1 = data;
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
	
	$scope.getAllAssets();
	
	//begin code to edit user
	$scope.editUser = function(technician_id,technician_name,technician_role){
		
		 $('#edit_user_name').val(technician_name);
		 $('#technician_id').val(technician_id);
		
		 
		 var index1 = $scope.roleArrEdit.indexOf(technician_role);
		 
		 $scope.roleTedit = $scope.roleArrEdit[index1];
		
		 //technician_role
		 $scope.index2=index1;
		 $('#technician_role').append('<option value="'+$scope.index2+'" selected>'+$scope.roleTedit+'</option>');
		 $('#editUserModal').modal('show');	 
	    }
		//end of code
	
		//begin code to save edited user details
	 	$scope.setEditUser = function(){
		 	 
		 var edit_user_name = $('#edit_user_name').val();
	     var passwordT = $('#passwordT').val();
	     var cmfpasswordT =  $('#cmfpasswordT').val();
	     var technician_id =  $('#technician_id').val();
	     var technician_role1 =  $('#technician_role').val();
	    
	    
	     var technician_role = "";
	     
	     if(technician_role1 >0){
	     technician_role = $scope.roleArrEdit[technician_role1];
	     }else if(technician_role1 != "string:Select role"){
	    	 
	    	 var result = technician_role1.split(":");
		      technician_role = result[1]; 
	     }
		
	    
		 if((passwordT == cmfpasswordT) && (passwordT != "") && (cmfpasswordT !="")){
			 
			var data = {
					   technician_id:technician_id,
					   technicianName:edit_user_name,
					   password:cmfpasswordT,
					   roles:technician_role
					   };
			
			if(Session_id){
			
			$http.post(USERS_URL_BASE+"/allusers", JSON.stringify(data)).then(function (response) {
                    if (response.data)

                    	$('#editUserModal').modal('hide');
                    window.location.reload();
                    
                    var x = document.getElementById("snackbar3");
                    x.className = "show";
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

					}, function (response) {

					});

				
					}else{
		       	 
		       	 alert("Session got expired, Please login again");
		       	 window.location.href="././superAdmin.html";
		       	 
		       	 sessionStorage.clear();
				 }
			
			
			
		 		}else{
			 
		 		$scope.invalidPassword = true;
			
		 		}
		 
	 	}
	 	//end of code
	 	
	
	 //begin code to deactivate user
	 $scope.deleteUser = function(technician_id,role){
	  
	  var validation_text = "";
	  
	  if(role.includes("inactive")){
		 
		  validation_text="Do you want to Activate technician ?";
	  }else{
		  
		  validation_text="Do you want to Deactivate technician ?";
	  }
		
		
	  if(Session_id){
		  
		  if (confirm(validation_text)) {
			  $http.get(USERS_URL_BASE+"/delete/"+technician_id+"/"+role)
			  .success(function(data) {
          
           if(data == "deleted"){
        	  
        	   /*   var x = document.getElementById("snackbar");
               x.className = "show";
              setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000); */
        	   
              window.location.reload();
           }else{
        	     
               var x = document.getElementById("snackbar1");
               x.className = "show";
               setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
              //invalidPassword
           }
           
        })
		
		 }
	
	  }else{
	       	 
	       	 alert("Session got expired, Please login again");
	       	 window.location.href="././superAdmin.html";
	       	 
	       	 sessionStorage.clear();
	   	 }
	  
	}
	//end of code
  
  
	 //begin code for logout
	 $scope.logOutUser=function(){
	  
	  if (confirm("Do you want to logout?")) {
	  
	  window.location.href="././superAdmin.html";
	  sessionStorage.clear();
	  
	  }
	 }
	 //end of code
  
  
	// $scope.OpenExe=function(){
	//	  
	//	 var cmdShell = new ActiveXObject("WScript.Shell");
	//	 var myPath = "C:\Users\EHRC\Downloads\FileZilla_3.41.2_win64-setup.exe"    //or any other file!
	//
	//	 cmdShell.Run(myPath , 1, true); 
	//  }
  

	 //begin
	 $scope.printAllAssets=function(){
    	var array = [];
    	for(var asset in self.outputlist1){
    		array.push({
    			NP_Number : self.outputlist[asset].npNumber,
    			currentState : self.outputlist[asset].currentState,
    			nextState : self.outputlist[asset].nextState,	
    		})
    	}
    	alasql('SELECT * INTO CSV("AllAssets.csv",{headers:true}) FROM ?',[array]);
    }
	//end
});