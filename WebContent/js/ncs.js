/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap']);

App2.controller('Controller3', function($scope,$http) {
	
    var ASSET_URL_BASE = URL_BASE + "assets";
   
    
	var self = this;
	self.state=false;
	self.buttonstate = true;
	self.outputlist=[];
	$scope.station_id = sessionStorage.getItem("station");
	self.stations=["Receiving","Grossing","Embedding","Sectioning","Staining","Reporting","Typing","Verification","Dispatch"];
	$scope.npNumber = sessionStorage.getItem("npNum");
	//begin
	$scope.getAllAssets = function(){
		
		 $http.get(ASSET_URL_BASE+"/ncs?npBase="+$scope.npNumber)
	        .success(function(data) {
	        	
           
            self.outputlist = data;
            console.log( self.outputlist);
        })
        .error(function(data) {
			  //alert("Errors in loading technicians");
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
		
	}
	//end
	$scope.getAllAssets();
	
	$scope.back = function(){
	
		if($scope.station_id == "2"){
			window.location.href = "grossing.html";
		}else if($scope.station_id == "3"){
			window.location.href = "EmbeddingStation.html";
		}else if($scope.station_id == "4"){
			window.location.href = "sectioning.html";
		}
		else if($scope.station_id == "5"){
			window.location.href = "ReportingStation.html";
		}
	}

	
    
});