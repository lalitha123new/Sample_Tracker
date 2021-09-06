/**
 * 
 */
var app = angular.module('dispatchStation', ['ui.bootstrap','ngCookies']);
app.controller('DispatchController',function($scope,$http,$window,$cookieStore)
{
    
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    var STATION_BASE_URL=URL_BASE+"station";
    
    $scope.barcodeValue='';
    $scope.patient='';
    $scope.username=$cookieStore.get('dispatchusername');

    //begin code to save the logged in user details
    $scope.setUsername=function() {
       
        $scope.invalidPassword = false;
        
        $http.post(URL_BASE+"login?username="+$scope.users+"&password="+$scope.password)
        .success(function(data) {
          
           $scope.showUserName=true;
           $scope.username=$scope.users;
           $scope.showLogout=true;
           $cookieStore.put('dispatchusername',$scope.username);
           $('#loginModal').modal('hide');
           $scope.invalidPassword = false;
          
        })
        .error(function(data) {  
            alert("Login error ");
        	$scope.invalidPassword = true;
            
        });
    }
    //end of code
    
    
    $scope.techTable=[];
    $scope.tech={};
    
    //begin code for logout
    if($scope.username!=undefined)
    	$scope.showLogout=true;
    else
    	$scope.showLogout=false;
    //end of code
    
    $scope.techTable=[];
    
    //begin code to get the staff details
    $scope.getAllUsers=function(){
    	
    	$http.get(TECHNICIAN_URL_BASE+"/withstation?stationId=9")
        .success(function(data) {
        	
        	$('#loginModal').modal('show');
          
           $scope.techTable=data;
      
        })
        .error(function(data) {
        	
	    	  alert("Error: server encountered an internal error. Please try again after some time");
            
        });
    	
    }
    //end of code
    
    //begin code for logout
    $scope.logout=function(){
    	
    	$cookieStore.remove("dispatchusername");
    	$cookieStore.remove("residentname");
       
    	 $window.location.reload();
    	 
    }
    //end of code


    $scope.myVar=false;
    $scope.hosp_name =  "";
    
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
		    	$scope.get_DoctorEmail($scope.barcodeValue);
		    	
		        $http.get(REQUEST_URL_BASE+"?npbase="+$scope.barcodeValue)
		        .success(function(data) {
		        	
		            $scope.patient=data;
		            
		            if($scope.patient.unit_name){
		            	alert("cjjj")
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
    
    //begin code to get the pending cases for dispatch
    $scope.getPendingTasksDispatch=function (){
    	
    $scope.assetTasksTable=[];
    var url=STATION_BASE_URL+"/pending?stationId=9";
    
    $http.get(url)
        .success(function (data) {
        	
            $scope.assetTasksTable=data;
            //to display latest record first
            $scope.assetTasksTable = $scope.assetTasksTable.reverse();
        })
        .error(function(data) {
			  
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    }
    //end of code
    
    //begin code to change the status upon clicking the done button
    $scope.doneDispatch=function(){
    	
    	$http.get(ASSET_URL_BASE+"/scan?np="+$scope.barcodeValue+"&stationId=9&technician="+$scope.username,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
        .then(function successCallback(response) {
        	
           
            if(response.data.nextState==9)
            	window.location.reload();
            else if(response.data.nextState>9)
            	alert("This case is already passed Dispatch");
            else
            	alert("please complete previous station before doing Dispatch");
        },function errorCallBack(err) {
               alert("Invalid Scan. Please Scan Again");
        })
        
    }
    //end of code
    
    //begin 
    setInterval(function(){
    	$scope.getPendingTasksDispatch();
    	// calling this for checking pending tasks
    	//increased the time internal from 120000 to 12000000 as it slows down the page
        	}, 12000000)
     //end
    
    $scope.myVar1=false; 	
    
    
    //begin code to upload file
    $scope.uploadFile = function(){
   
    	var file= document.getElementById("fileid").files[0];
    	var formData = new FormData();
    	
    	
    	if(($scope.patient.npBase != "" && file != undefined)){
    	 	
    	$scope.myVar1=true; 
        formData.append('file', file);
        formData.append('np_base', $scope.patient.npBase);
        formData.append('identifier_id', 1);
        
        for (var value of formData.values()) {
        	  // console.log(value); 
        }
        
      
        
        $http.post(URL_BASE+'ehosp/uploadPdf', formData, {
        
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
         })
         .success(function() {
         	alert("Successfully uploaded the file");
         	 $scope.myVar1=false; 
         })
         .error(function() {
         	alert("Error in uploading the file");
         	$scope.myVar1=false; 
         });
        
     
    	}else{
    		
    		alert("Please select file");
    	}
    }
    //end of code
    
    //send Email Notification
 	$scope.myVar2=false; 
   
 	//begin code to send the uploaded file to email address entered
    $scope.sendPdfFile = function(){
    	
    	if(($scope.email_pdf != undefined) && ($scope.patient.npBase != "")){
    		
    		 $scope.myVar2=true;
    		
    		var formData = new FormData();
    		formData.append('email', $scope.email_pdf);
    		formData.append('npBase', $scope.patient.npBase);
    		
    	
    	$http.post(URL_BASE+'ehosp/sendPdf', formData, {    
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined}
         })
         .success(function() {
         	alert("Successfully sent pdf  file");
         	 $scope.myVar2=false;
         })
         .error(function() {
         	alert("Error in sending pdf file");
         	 $scope.myVar2=false;
         });
    		
    	}else{
    	alert("Please Make sure email id and npnumber fields are filled");	
    	
    		
    	}
    	
    	
    }
    //end of code
    
    
    
    //begin code to get the doctor email for external sample if it exists and display in the email id field
    $scope.get_DoctorEmail = function(np_no){

    	$http.get(BASE_URL2+"/getEmailBynpnumber?np_no="+$scope.barcodeValue)
        .then(function successCallback(response) {
        	
        	
        	if(response.data != ""){
        		$scope.email_pdf = response.data;
        	}else{
        		console.log("No email id for this number");
        	}
            
        },function errorCallBack(err) {
               alert("Invalid Scan. Please Scan Again");
        })
    	
    }
    //end of code
    
});