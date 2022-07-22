/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap','ngCookies']);

App2.controller('doctordetails', function($scope,$http,$cookieStore) {
	
    //var URL_BASE="http://10.11.3.3:8080/Sample_Tracker/webapi/";
	//var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
    //var URL_BASE="http://localhost:1025/Sample_Tracker/webapi/";
    
	
	$scope.doctornames = $cookieStore.get('doctornames');
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    var DOCTOR_URL_BASE = URL_BASE + "doctor";
    
	var self = this;
	self.state=false;
	self.buttonstate = true;
	self.outputlist=[];
	self.stations=["Receiving","Grossing","Embedding","Sectioning","Staining","Reporting","Typing","Verification","Dispatch","Dispatched"];
	
	//begin
	$scope.getpatientDetails = function(){
		
		$http.get(DOCTOR_URL_BASE+"/doctordetails?doctorname="+$scope.doctornames)
        .success(function(data) {
           
            self.outputlist = data;
        })
        .error(function(data) {
			  //newly added error code
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
		
	}
	//end
	$scope.getpatientDetails();
	
	//begin
	$scope.logout = function(){
			
		$cookieStore.remove('doctornames');
		window.location.href="doctor.html";
		
	}
	//end

	//begin
    $scope.printAllAssets=function(){
    	var array = [];
    	for(var asset in self.outputlist){
    		array.push({
    			Np_Base : self.outputlist[asset].npBase,
    			Patient_Name : self.outputlist[asset].patientName,
    			Patient_Age : self.outputlist[asset].patientAge,
    			Patient_Sex : self.outputlist[asset].patientSex,
    			Created : self.outputlist[asset].created,
    			status : self.outputlist[asset].status
    			
    		})
    	}
    	alasql('SELECT * INTO CSV("AllPatients.csv",{headers:true}) FROM ?',[array]);
    }
    //end
    
    
});