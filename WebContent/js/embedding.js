
var app = angular.module('embeddingStation', ['ui.bootstrap','ngCookies']);
app.controller('EmbeddingController',function($scope,$http,$window,$cookieStore)
{
    
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    var STATION_BASE_URL=URL_BASE+"station";
    
    $scope.barcodeValue='';
    $scope.patient='';
    $scope.username=$cookieStore.get('username');

    
    //begin code to get the logged in user details
    $scope.setUsername=function() {
        
        $scope.invalidPassword = false;
        
        $http.post(URL_BASE+"login?username="+$scope.users+"&password="+$scope.password)
        .success(function(data) {
          
           $scope.showUserName=true;
           $scope.username=$scope.users;
           $scope.showLogout=true;
           $cookieStore.put('username',$scope.username);
           $('#loginModal').modal('hide');
           $scope.invalidPassword = false;
          
        })
        .error(function(data) {
			  //newly added error code
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
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
    
    //begin code to get all technician details
    $scope.getAllUsers=function(){
    	
    	$http.get(TECHNICIAN_URL_BASE+"/withstation?stationId=3")
        .success(function(data) {
        	
        	$('#loginModal').modal('show');
        	$scope.techTable=data;
      
           
        })
        .error(function(data) {
			  //newly added error code
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    }
    //end of code
    
   
    //begin code for logout
    $scope.logout=function(){
    	
    	$cookieStore.remove("username");
    	$cookieStore.remove("residentname");
    	 $window.location.reload();
    	 
    }
    //end of code


    $scope.myVar=false;
    
   
    $scope.getPatientFromRequest=function(){
    	if($scope.username==null)
    		$scope.getAllUsers();
    	else
    		{
		    	console.log("Hai in getPatient...");
		    	$scope.myVar=true;
		    	
		    	var tempString = $scope.barcodeValue + ";";
		    	var test = tempString.substring(0,tempString.indexOf(";"));
		    	test=test.toUpperCase();
		    	$scope.barcodeValue=test;
		    	
		        $http.get(REQUEST_URL_BASE+"?npbase="+$scope.barcodeValue)
		        .success(function(data) {
		            $scope.patient=data;
		            
		            if(data=='')
		            	alert("Check the NP number");
		            console.log($scope.patient);
		            $scope.recievingStationStep=1;
		            $scope.myVar=false;
		        })
		        .error(function(data) {
		            alert("Please Scan the NP Number Again");
		            $scope.myVar=false;
		        });
    		}
    }
    
    //begin code to get the asset details for the np number entered
    $scope.getAssetDetails=function () {
    	
    	if($scope.username==null)
    		$('#loginModal').modal('show');
    	else{
	    	var tempString = $scope.npNumberValue + ";";
	    	var test = tempString.substring(0,tempString.indexOf(";"));
	    	$scope.npNumberValue=test;
	    	$scope.getAllNCSAssets(test);
	        $http.get(ASSET_URL_BASE+"/scan?np="+test+"&stationId=2&technician="+$scope.username+"&assistant="+$scope.residentname,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
	            .then(function successCallback(response) {
	                $scope.asset=response.data;
	                $scope.getPatientDetails();
	                $scope.recievingStationStep=1;
		            $scope.myVar=false;
	            },function errorCallBack(err) {
	                   alert("Invalid Scan. Please Scan Again");
	               
	            })
	    	}
    }
    //end of code
    
    $scope.hosp_name = "";
    //begin code to get the patient details for the np number entered
    $scope.getPatientDetails=function() {
            var npbase=$scope.npNumberValue.substring(0, $scope.npNumberValue.indexOf(":"));
            
            $http.get(REQUEST_URL_BASE+"?npbase="+npbase)
                .success(function (data) {
                    $scope.patient=data;
                    
                    if($scope.patient.unit_name){
                    	$scope.hosp_name = "NIMHANS";
                    }
                });
    }
    //end of code
    
    //begin code to get the pending cases
    $scope.getPendingTasksEmbedding=function (){
    	
    $scope.assetTasksTable=[];
    var url=STATION_BASE_URL+"/pending?stationId=3";
    $http.get(url)
        .success(function (data) {
            $scope.assetTasksTable=data;
            //to display latest record first
            $scope.assetTasksTable = $scope.assetTasksTable.reverse();
            
        })
    }
    //end of code
    
    //begin code to update the status upon clicking the done button
    $scope.doneEmbedding=function(){
    	$http.get(ASSET_URL_BASE+"/scan?np="+$scope.npNumberValue+"&stationId=3&technician="+$scope.username,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
        .then(function successCallback(response) {
        	
            if(response.data.nextState==3)
            	window.location.reload();
            else if(response.data.nextState>3)
            	alert("This case is already passed Embedding");
            else
            	alert("please complete previous station before doing Embedding");
        },function errorCallBack(err) {
               alert("Invalid Scan. Please Scan Again");
        })
        
    }
    //end of code
    
    //begin
    setInterval(function(){
    	$scope.getPendingTasksEmbedding();
    	// calling this for checking pending tasks
    	//increased the time internal from 120000 to 12000000 as it slows down the page
        	}, 12000000)
        	
     //end
        	
        	
        	 $scope.ncs = true;
    $scope.np_ncs = "";
    //begin code to get the NCS details for the np number
  
    $scope.np_array = [];
	  $scope.getAllNCSAssets = function(np){
		//$scope.np_ncs = np;
		 $scope.np_array = np.split(":");
		
		$scope.np_ncs = $scope.np_array[0];
	  $http.get(ASSET_URL_BASE+"/ncs?npBase="+$scope.np_array[0])
      .success(function(data) {
      	console.log(data)
      	
      	 if(data != ""){
         	  $scope.ncs = false;
         	  
           }
          
          
      }).error(function(data) {
			  //alert("Errors in loading technicians");
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
		
	}
	
	
	//end of code
	
	//begin code to redirect to ncs page
$scope.getNCS = function(np_new){
	sessionStorage.setItem("npNum", np_new);
	sessionStorage.setItem("station", "3");
	window.location.href = "NCSDetails.html";
}

});