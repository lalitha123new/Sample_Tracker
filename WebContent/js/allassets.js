'use strict';

var App2 = angular.module('myApp2',['ui.bootstrap']);

App2.controller('Controller2', function($scope,$http) {
	
    //var URL_BASE="http://10.11.3.3:8080/Sample_Tracker/webapi/";
	//var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
    //var URL_BASE="http://localhost:1025/Sample_Tracker/webapi/";
	 var year = new Date().getFullYear();
	    var range = [];
	    range.push(year);
	    for (var i = 1; i < 5; i++) {
	        range.push(year - i);
	    }
	    $scope.years = range;
	$scope.selectedYear = $scope.years[0];
	$scope.selectedYear = $scope.selectedYear.toString();
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    
	var self = this;
	self.state=false;
	self.buttonstate = true;
	self.outputlist=[];
	self.reportOutputlist = [];
	$scope.myVar = true; 
	self.stations=["Receiving","Grossing","Embedding","Sectioning","Staining","Reporting","Typing","Verification","Dispatch"];
	
	//begin
	$scope.getAllAssets = function(){
	
		$http.get(ASSET_URL_BASE+"?npBase=&year="+$scope.selectedYear)
        .success(function(data) {
            self.outputlist = data;
            console.log(data)
            $scope.myVar = false; 
        })
        .error(function(data) {
			  //newly added error code
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
		
	}
	//end
	$scope.getAllAssets();
	
	
	//begin
	$scope.getType = function(type){
		
		switch(type){
		case 1: return "Tissue";
		break;
		case 2: return "Block";
		break;
		case 3: return "Slide";
		break;
		default:
			return "Nil";
			break;		
		}
	}
	//end

	//begin
    $scope.printAllAssets=function(){
    	
    	var array = [];
    	for(var asset in self.outputlist){
    		array.push({
    			NP_Number : self.outputlist[asset].npNumber,
    			Type : $scope.getType(self.outputlist[asset].type),
    			Specimen : self.outputlist[asset].specimen,
    			Biopsy : self.outputlist[asset].biopsy,
    			Current_status : self.stations[self.outputlist[asset].currentState-1],
    			NCS : (self.outputlist[asset].ncs == 0 )?'No':'Yes',
    			Special : (self.outputlist[asset].special == 0 )?'No':'Yes',
    			Process_Status : self.outputlist[asset].process_status

    		})
    	}
    	alasql('SELECT * INTO CSV("AllAssets.csv",{headers:true}) FROM ?',[array]);
    }
    //end
    
    
    //get assets based on year selection
    $scope.getAssetsforSelectedYear =  function(year){
    	self.outputlist=[];
    	year = year.toString();
    	$scope.myVar = true; 
    	
    		$http.get(ASSET_URL_BASE+"?npBase=&year="+year)
            .success(function(data) {
                self.outputlist = data;
                
                $scope.myVar = false; 
            })
            .error(function(data) {
    			  //newly added error code
    	    	  alert("Error: server encountered an internal error. Please try again after some time ");
    	        
    	    });
    		
    
    }
   
});