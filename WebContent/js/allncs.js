/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap']);

App2.controller('Controller3', function($scope,$http) {
	
    //var URL_BASE="http://10.11.3.3:8080/Sample_Tracker/webapi/";
	//var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
    //var URL_BASE="http://localhost:1025/Sample_Tracker/webapi/";
    
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    
	var self = this;
	self.state=false;
	self.buttonstate = true;
	self.outputlist=[];
	self.stations=["Receiving","Grossing","Embedding","Sectioning","Staining","Reporting","Typing","Verification","Dispatch"];
	
	//begin
	$scope.getAllAssets = function(){
		
		$http.get(ASSET_URL_BASE+"/allncs?npBase=")
        .success(function(data) {
           
            self.outputlist = data;
        })
        .error(function(data) {
			  //alert("Errors in loading technicians");
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
		
	}
	//end
	$scope.getAllAssets();

	//begin
    $scope.printAllAssets=function(){
    	
    	var array = [];
    	for(var asset in self.outputlist){
    		array.push({
    			NP_Number : self.outputlist[asset].npNumber,
    			Corrective : self.outputlist[asset].corrective,
    			Preventive : self.outputlist[asset].preventive,
    			Faculty : self.outputlist[asset].faculty,
    			Ncs_type : self.outputlist[asset].ncsType
    			
    		})
    	}
    	alasql('SELECT * INTO CSV("AllAssets.csv",{headers:true}) FROM ?',[array]);
    }
    //end
    
});