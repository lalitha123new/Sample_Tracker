/**
 * 
 */
var app = angular.module('TypingStation', ['ui.bootstrap','ngCookies']);
app.controller('TypingController',function($scope,$http,$window,$cookieStore)
{
    

    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    var STATION_BASE_URL=URL_BASE+"station";
    
    $scope.barcodeValue='';
    $scope.patient='';
    $scope.username=$cookieStore.get('typingusername');
    
    //begin code to save the logged in user details in the cookie
    $scope.setUsername=function() {
       
        $scope.invalidPassword = false;
        
        $http.post(URL_BASE+"login?username="+$scope.users+"&password="+$scope.password)
        .success(function(data) {
         
           $scope.showUserName=true;
           $scope.username=$scope.users;
           $scope.showLogout=true;
           $cookieStore.put('typingusername',$scope.username);
           
           $('#loginModal').modal('hide');
           $scope.invalidPassword = false;
          
        })
        .error(function(data) {  
        	$scope.invalidPassword = true;
            
        });
    }
    //end of code
    
    
    $scope.techTable=[];
    $scope.tech={};
    
    //begin code to enable or disable logout button based on login
    if($scope.username!=undefined)
    	$scope.showLogout=true;
    else
    	$scope.showLogout=false;
    //end of code
    
    $scope.techTable=[];
    
    //begin code to get technicians data
    $scope.getAllUsers=function(){
    	
    	$http.get(TECHNICIAN_URL_BASE+"/withstation?stationId=7")
        .success(function(data) {
        	$('#loginModal').modal('show');
        	
           $scope.techTable=data;
      
        })
        .error(function(data) {
			  
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    }
    //end of code
    
    
    //begin code for logout
    $scope.logout=function(){
    	
    	$cookieStore.remove("typingusername");
    	$cookieStore.remove("residentname");
    	 $window.location.reload();
    	 
    }
    //end of code


    $scope.myVar=false;
    
    
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
    
    //begin code to get the pending cases for typing
    $scope.getPendingTasksTyping=function (){
    	
    $scope.assetTasksTable=[];
    var url=STATION_BASE_URL+"/pending?stationId=7";
   
    $http.get(url)
        .success(function (data) {
            $scope.assetTasksTable=data;
           
            
            //to display latest record first
            $scope.assetTasksTable = $scope.assetTasksTable.reverse();
            console.log($scope.assetTasksTable);
        }).error(function(data) {
			
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    }
    //end of code
    
    //begin code to update the status upon clicking the done button
    $scope.doneTyping=function(){
    	
    	$http.get(ASSET_URL_BASE+"/scan?np="+$scope.barcodeValue+"&stationId=7&technician="+$scope.username,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
        .then(function successCallback(response) {
            
            if(response.data.nextState==7)
            	window.location.reload();
            else if(response.data.nextState>7)
            	alert("This case is already passed Typing");
            else
            	alert("please complete previous station before doing Typing");
        },function errorCallBack(err) {
               alert("Invalid Scan. Please Scan Again");
        })
        
    }
    //end of code
    
    $scope.edit = {};

    //begin
    $scope.update=function (){
    	
        $scope.edit.corrective=$scope.edit.corrective;
        $scope.edit.preventive=$scope.edit.preventive;
        $scope.edit.faculty=$scope.edit.faculty;
        $scope.edit.ncsType=$scope.edit.ncsType;
       
    }
    //end
    
    //begin
    setInterval(function(){
    	$scope.getPendingTasksTyping();
    	// calling this for checking pending tasks
    	//increased the time internal from 120000 to 12000000 as it slows down the page
    	
        	}, 12000000)
        	
    //end
        	
});