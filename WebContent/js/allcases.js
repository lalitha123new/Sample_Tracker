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
	$scope.myVar = true; 
	self.stations=["Receiving","Grossing","Embedding","Sectioning","Staining","Reporting","Typing","Verification","Dispatch"];
	
	//begin
	$scope.getAllAssets = function(){
		$http.get(ASSET_URL_BASE+"/allcases")
        .success(function(data) {
           
            self.outputlist = data;
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
    $scope.printAllAssets=function(){
    	
    	var array = [];
    	for(var asset in self.outputlist){
    		array.push({
    			NP_Number : self.outputlist[asset].npNumber,
    			currentState : self.outputlist[asset].currentState,
    			nextState : self.outputlist[asset].nextState,
    			fixative : self.outputlist[asset].fixative,
    			specimen : self.outputlist[asset].specimen,
    			biopsy : self.outputlist[asset].biopsy,
    			type : self.outputlist[asset].type,
    			review : self.outputlist[asset].review,
    			special : self.outputlist[asset].special,
    			ncs : self.outputlist[asset].ncs,
    			process_status : self.outputlist[asset].process_status,
    			special_stain : self.outputlist[asset].special_stain,
    			notes : self.outputlist[asset].notes,
    			done : self.outputlist[asset].done,
    			ihc : self.outputlist[asset].ihc,
    			process_all : self.outputlist[asset].process_all,
    			em : self.outputlist[asset].em		
    		})
    	}
    	alasql('SELECT * INTO CSV("AllAssets.csv",{headers:true}) FROM ?',[array]);
    }
    //end
    
});