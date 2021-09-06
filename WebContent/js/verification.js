
var app = angular.module('verificationStation', ['ui.bootstrap','ngCookies']);
app.controller('VerificationController',function($scope,$http,$window,$cookieStore)
{
    
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    var STATION_BASE_URL=URL_BASE+"station";
    
    $scope.barcodeValue='';
    $scope.patient='';
    $scope.username=$cookieStore.get('verificationusername');

    $scope.doc_name = "";
    $scope.doc_id = "";
    $scope.report_base = "";
    
    //begin code to save the logged in user details
    $scope.setUsername=function() {
       
        $scope.invalidPassword = false;
        
        $http.post(URL_BASE+"login?username="+$scope.users+"&password="+$scope.password)
        .success(function(data) {
          
           $scope.showUserName=true;
           $scope.username=$scope.users;
           $scope.showLogout=true;
           $cookieStore.put('verificationusername',$scope.username);
           $('#loginModal').modal('hide');
           $scope.invalidPassword = false;
          
        })
        .error(function(data) {  
            
        	$scope.invalidPassword = true;
            
        });
    }
    //end of code
    
    
    $scope.techTable=[];
    $scope.faculty_Array = [];
    $scope.residentArray = [];
    $scope.tech={};
    
   
    //begin code to enable or disable the logout button based on the login 
    if($scope.username!=undefined)
    	$scope.showLogout=true;
    else
    	$scope.showLogout=false;
    //end of code
    
    $scope.techTable=[];
    
    //begin code to get the staff details for displaying in the login pop up
    $scope.getAllUsers=function(){
    
    	$http.get(TECHNICIAN_URL_BASE+"/withstation?stationId=8")
        .success(function(data) {
        	
        	$('#loginModal').modal('show');
        	
        	
        	$scope.faculty_Array = data.filter(function( obj ) {
        	    return obj.roles === "faculty";
        	});
        	$scope.residentArray = data.filter(function( obj ) {
        	    return obj.roles === "resident";
        	});
        	
        	
        	$scope.techTable=data;
        })
        .error(function(data) {
			  
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    }
    //end of code
    
    
    //begin code for logout
    $scope.logout=function(){
    	
    	$cookieStore.remove("verificationusername");
    	$cookieStore.remove("residentname");
    	 $window.location.reload();
    	
    }
    //end of code


    $scope.myVar=false;
    $scope.hosp_name = "";
    
   //begin code to get the patient details for the np number entered
    $scope.getPatientFromRequest=function(){
    	if($scope.username==null)
    		$scope.getAllUsers();
    	
    	else{
		    	
		    	$scope.myVar=true;
		    	var tempString = $scope.barcodeValue + ";";
		    	var test = tempString.substring(0,tempString.indexOf(";"));
		    	test=test.toUpperCase();
		    	$scope.barcodeValue=test;
		    	
		    	$scope.checkState($scope.barcodeValue);
		    	
		        $http.get(REQUEST_URL_BASE+"?npbase="+$scope.barcodeValue)
		        .success(function(data) {
		        	
		            $scope.patient=data;
		            if($scope.patient.unit_name){
		            	$scope.hosp_name = "NIMHANS";
		            }
		            var d = new Date($scope.patient.created);
	    	    	
	    	    	$scope.patient.created = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	    	    	d.getHours() + ":" + d.getMinutes();
	    	    	
		            if(data=='')
		            	alert("Check the NP number");
		           
		            $scope.recievingStationStep=1;
		            $scope.myVar=false;
		        })
		        .error(function(data) {
		            alert("Please Scan the NP Number Again");
		            $scope.myVar=false;
		        });
    		}
    }
    //end of code
    
    
    //begin code to get the pending cases for verification
    $scope.getPendingTasksVerification=function (){
    	
    $scope.assetTasksTable=[];
    var url=STATION_BASE_URL+"/pending?stationId=8";
   
    $http.get(url)
        .success(function (data) {
            $scope.assetTasksTable=data;
            //to display latest record first
            $scope.assetTasksTable = $scope.assetTasksTable.reverse();
        })
    }
    //end of code
    
    
    $scope.ext_hosp_id = "";
    //begin code to update the status upon clicking the done button
    $scope.doneVerification=function(){
    	
    	//REST call to get the external transaction id for an np number for passing in the change status REST call
    	$http.get(BASE_URL2+"extidByNpnum?npnum="+$scope.barcodeValue)
        .success(function(data) {
        	
        	$scope.ext_hosp_id  = data;
        	
        },function errorCallBack(err) {
               alert("Error");
        })
    	
        
//          $http.post(URL_BASE+"login?username="+$scope.users+"&password="+$scope.password)
//        .success(function(data) {
    	$http.get(ASSET_URL_BASE+"/scan?np="+$scope.barcodeValue+"&stationId=8&technician="+$scope.username,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
        .then(function success(response1) {
    	
        	
        	
        	  if(response1.data.nextState==8){
        		 
        		  //window.location.reload();
              }
              else if(response1.data.nextState>8){
              	alert("This case is already passed Verification");
              }
              else{
              	alert("please complete previous station before doing Verification");
              }
        	//code for updating the status as "Verified" for external sample in the external portal
        	 var updateData  ={
        	            npno: $scope.barcodeValue,
        	            status:"Verified",
        	            ext_trc_id:$scope.ext_hosp_id
        	            
        	  	 }
        	  	 
        	  	 $http.post(BASE_URL2+"statuschange/", updateData ,{headers: {'Content-Type': 'application/json'}})

        	  	  .success(function(data) {
        	    	
        	    	console.log(data);
        	    	window.location.reload();
        	    	
        	        })
        	        .error(function(data) {
        	        	
        	        	console.log("error");
        	        	window.location.reload();
        	        	
        	        });
        	 
           
        	 //existing code commented
//        	  if(response1.data.nextState==8)
//         		 
//        		  window.location.reload();
//              
//              else if(response1.data.nextState>8)
//              	alert("This case is already passed Verification");
//              
//              else
//              	alert("please complete previous station before doing Verification");
              
          
        },function errorCallBack(err) {
               alert("Invalid Scan. Please Scan Again");
        })
        
       
        
    }
    //end of code
    
    
    //begin
    setInterval(function(){
    	$scope.getPendingTasksVerification();
    	// calling this for checking pending tasks
    	//increased the time internal from 120000 to 12000000 as it slows down the page
        	}, 12000000)
        	
    //end
        	
    //display report
    var config1 = {
    headers : {
    'Content-Type': 'text/plain;charset=utf-8;'
    }
    };
    
        	
    //begin 
    $scope.viewReport = function(){
        	
    	$('#reportModal').modal();
    	var data1 = 
        {
         "parm1":"14",
         "parm2":$scope.patient.npBase
        };
        		 
		 return $http.post(URL_BASE+'ehosp/reportUsingSampleId',data1,config1)
		.then(
				function(response){
					
					 report = response.data[0].result;
					 $( "#reportDiv" ).append(report);
					 $('#download_button1').click(function () {
			        	  
			        	  var doc = new jsPDF();
				          
			        	  doc.fromHTML(report);
			        	    doc.save('sample-file.pdf');
			          });
			          

				});
	 }
    //end 
        	 
    //begin code to check report is available (if next state is 7) and if so display the edit button to display that
    $scope.checkState =  function(np){
        		 
        		 var np1="'"+np+"'";
     			
     			$http.get(URL_BASE+"assets/nextState?np="+np1)
     		    .then(function successCallback(response) {
     		    	console.log(response)
     		    	
	    	$scope.nextState_array = response.data.split("next_state:");
	    	 
	    	if($scope.nextState_array[1] == 7){
	    	   
	    	   var data1 = {
	    				 "parm1":"14",
	    				 "parm2":np
	    		 };
	    	   
	    	   return $http.post(URL_BASE+'ehosp/reportUsingSampleId',data1,config1)
	    		.then(
				function(response){
					console.log(response)
					if(response.data != ""){
						$("#edit_button").removeClass("hidden");
					}else{
						$("#edit_button").addClass("hidden");
					}
     		    					
     		    				});
     		    	   
     		       }
     		    });
     		    
    	}
    	//end of code
    
    	
       //begin code to display the report in the template for verification	 
       $scope.editReport =  function(){
        		 
        		 $('#div1').removeClass("hidden");
        		 $('#report_button1').removeClass("hidden");
        		 
        		 var data1 = {
        				 "parm1":"14",
        				 "parm2":$scope.patient.npBase
        		 };
        		 
        		 return $http.post(URL_BASE+'ehosp/reportUsingSampleId',data1,config1)
				.then(
						function(response){
							
							
							 report = response.data[0].result;
							 CKEDITOR.instances.editor1.setData(report);
							  

						});
        }
       	//end of code
        	 
        	 
       	$scope.doc_id = "11";
        	    
       	$scope.reportArray = [];
       	$scope.obj = {};
        	    
       	//begin code to save the verified report
       	$scope.submitReport = function(){
        		 
       		$("#report_button1").prop('disabled', true);
        		 
        	$scope.report1 = "";
        	$scope.report1 = CKEDITOR.instances.editor1.getData();
    		$scope.obj.result = $scope.report1;
       	 	$scope.reportArray.push($scope.obj);
           	
           	   var Data = {
           			   "parm1": $scope.patient.UHID,
           			   "parm2": $scope.patient.patientName,
           			   "parm3": $scope.patient.patientSex,
           			   "parm4": "1",
           			   "parm5": "N",
           			   "parm6": "1",
           			   "parm7": "NC",
           			   "parm8": $scope.patient.sampleRequestId,
           			   "parm9": $scope.reportArray,
           			   "parm10": "",
           			   "parm11": $scope.doc_name,
           			   "parm12": $scope.doc_id,
           			   "parm13": $scope.doc_name,
           			   "parm14": "1",
           	    		
           			};
           	   
           	   var dataObject = JSON.stringify(Data);
           	   return $http.post(URL_BASE+'ehosp/saveExternalReport',dataObject,config1)
				.then(
						function(response){
							console.log(response);
						
			
	 });
    }
    //end of code
    
});