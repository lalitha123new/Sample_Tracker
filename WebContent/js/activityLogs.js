'use strict';

var App2 = angular.module('myApp2',['ui.bootstrap']);

App2.controller('Controller2', function($scope,$http,$window) {
	
    //var URL_BASE="http://10.11.3.3:8080/Sample_Tracker/webapi/";
	//var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
    //var URL_BASE="http://localhost:1025/Sample_Tracker/webapi/";
    
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    
	var self = this;
	self.state=false;
	self.buttonstate = false;
	self.results = false;
	self.outputlist=[];
	self.reportOutputlist = [];
	self.stations=["Receiving","Grossing","Embedding","Sectioning","Staining","Reporting","Typing","Verification","Dispatch"];
    self.techTable=[];
    self.tech=[];
    self.station = '';
    self.technician = '';
    self.biopsy = '';
    
    
	 $http.get(TECHNICIAN_URL_BASE)
	    .success(function(data) {
	      
	       self.techTable=data;
	       for(var tech in self.techTable)
	    	   self.tech.push(self.techTable[tech].technicianName);
	       
	    })
	    .error(function(data) {
	      //error
	      alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
	 	var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		}
		var today = yyyy+'-'+mm+'-'+dd;
		
	$scope.getActivity = function(){
		
		self.results=false;
		self.buttonstate = false;
		var date1 = $('#datepicker1').val();
		var date2 = $('#datepicker2').val();
		
		var start_date = date1.concat(" 00:00:00");
		var end_date = date2.concat(" 23:59:59");
		
		if(self.stations.indexOf(self.station)==-1)
			self.stationId = '';
		else
			self.stationId = self.stations.indexOf(self.station)+1;
		
		 //if(self.stationId==2 && date1==today && date2==today)
         //$window.location.href= 'dailyLog-Grossing.html';
		
		$http.get(REQUEST_URL_BASE+"/getactivity?stationId="+self.stationId+"&assetType="+self.biopsy+"&technicianName="+self.technician+ "&startDate="+start_date+"&endDate="+end_date)
        .success(function(data) {
           
            self.outputlist = data;
           
            if(self.outputlist.length==0){
            	self.results=true;
            }
            else
            	self.buttonstate = true;
        })
       
	}

    $scope.printAllAssets=function()
    {
    	var array = [];
    	for(var asset in self.outputlist){
    		array.push({
    			Asset_Id : self.outputlist[asset].npNumber,
    			Station : self.stations[self.outputlist[asset].stationId-1],
    			Last_Time : self.outputlist[asset].endTime.substring(0,self.outputlist[asset].endTime.lastIndexOf(':')),
    			Ncs: (self.outputlist[asset].ncs == 0 )?'No':'Yes'  ,  
    		    Special : (self.outputlist[asset].special == 0)?'No':'Yes' ,
    		    User : self.tech[self.outputlist[asset].technicianId-1],
    	    	Resident : self.tech[self.outputlist[asset].assistantId-1],
    			Process_Status : self.outputlist[asset].process_status
    		})
    	}
    	alasql('SELECT * INTO CSV("ActivityLogs.csv",{headers:true}) FROM ?',[array]);
    }
});