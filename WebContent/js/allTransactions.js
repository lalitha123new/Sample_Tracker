'use strict';

var App3 = angular.module('myApp3',['ui.bootstrap']);

App3.controller('Controller3', function($scope,$http) {
	
    //var URL_BASE="http://10.11.3.3:8080/Sample_Tracker/webapi/";
	//var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
    //var URL_BASE="http://localhost:1025/Sample_Tracker/webapi/";
    
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    
    var year = new Date().getFullYear();
    var range = [];
    range.push(year);
    for (var i = 1; i < 5; i++) {
        range.push(year - i);
    }
    $scope.years = range;
$scope.selectedYear = $scope.years[0];
$scope.selectedYear = $scope.selectedYear.toString();

    
	var self = this;
	self.state=false;
	self.buttonstate = true;
	self.outputlist=[];
	self.reportOutputlist = [];
    self.techTable=[];
    self.tech=[];
    $scope.myVar = true; 
    self.stations=["Receiving","Grossing","Embedding","Sectioning","Staining","Reporting","Typing","Verification","Dispatch"];
    
    
    $http.get(TECHNICIAN_URL_BASE)
    .success(function(data) {
      
       self.techTable=data;
       self.tech.push("");
       
       for(var tech in self.techTable)
    	   self.tech.push(self.techTable[tech].technicianName);
       
    })
    .error(function(data) {
       // newly added error code
  	  alert("Error: server encountered an internal error. Please try again after some time ");
        
    });
    
    
    //begin
	$scope.getAllTransactions = function(){
		
		$http.get(REQUEST_URL_BASE+"/transactions?npNumber=&year="+$scope.selectedYear)
        .success(function(data) {
           
            self.outputlist = data;
            $scope.myVar = false; 
        })
        .error(function(data) {
          // newly added error code
       	  alert("Error: server encountered an internal error. Please try again after some time ");
             
         });
		
	}
	//end
	$scope.getAllTransactions();

	//begin
    $scope.printAllAssets=function(){
    	
    	var array = [];
    	for(var asset in self.outputlist){
    		array.push({
    			NP_Number : self.outputlist[asset].npNumber,
    			Technician : self.tech[self.outputlist[asset].technicianId],
    			Resident : self.tech[self.outputlist[asset].assistantId],
    			Station: self.stations[self.outputlist[asset].stationId],
    			Last_Time : self.outputlist[asset].endTime.substring(0,self.outputlist[asset].endTime.lastIndexOf(':'))
    		});
    	}
    	alasql('SELECT * INTO CSV("AllTransaction.csv",{headers:true}) FROM ?',[array]);
    }
    //end
    
  //get transations based on year selection
    $scope.getTransactionsforSelectedYear =  function(year){
    	self.outputlist=[];
    	year = year.toString();
    	$scope.myVar = true; 
    	
    	$http.get(REQUEST_URL_BASE+"/transactions?npNumber=&year="+$scope.selectedYear)
            .success(function(data) {
                self.outputlist = data;
                console.log(self.outputlist)
                
                $scope.myVar = false; 
            })
            .error(function(data) {
    			  //newly added error code
    	    	  alert("Error: server encountered an internal error. Please try again after some time ");
    	        
    	    });
    		
    
    }
});