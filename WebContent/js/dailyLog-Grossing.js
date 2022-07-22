'use strict';

var App2 = angular.module('myApp2',['ui.bootstrap']);

App2.controller('Controller2', function($scope,$http,$timeout) {
	
    //var URL_BASE="http://10.11.3.3:8080/Sample_Tracker/webapi/";
	//var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
    //var URL_BASE="http://localhost:1025/Sample_Tracker/webapi/";
	
	var parameters = location.search.substring(1).split("&");
	var temp = parameters[0].split("=");
	var comingdate = unescape(temp[1]);
    
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    
	var self = this;
	self.state=false;
	self.buttonstate = true;
	self.outputlist=[];
	self.outputlist_temp=[];
	self.reportOutputlist = [];
	self.stations=["Receiving","Grossing","Embedding","Sectioning","Staining","Reporting","Typing","Verification","Dispatch"];
	self.techTable=[];
	self.tech=[];
	self.techName = '';
	self.residentName = '';
	

	
	$http.get(TECHNICIAN_URL_BASE)
    .success(function(data) {
       
       self.techTable=data;
       self.tech.push("");
       for(var tech in self.techTable)
    	   self.tech.push(self.techTable[tech].technicianName);
       
       $scope.getDailyActivity();
    })
    .error(function(data) {
        //alert("Errors in loading technicians");
    	alert("Error: server encountered an internal error. Please try again after some time ");
        
    });
	
	$scope.getDailyActivity = function(){
		
		var today = new Date();
		if(comingdate){
			
			today = new Date(comingdate);
		}
	
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
		$scope.today = dd+'-'+mm+'-'+yyyy;
		var start_date = today + " 00:00:00";
		var end_date = today + " 23:59:59";
			
        $http.get(REQUEST_URL_BASE+"/getactivity?stationId=2&technicianName=&assetType=1&startDate="+start_date+"&endDate="+end_date)
        .success(function(data) {
           console.log(data);
            self.outputlist = [];
            $scope.setTechName(data);
            $scope.setResidentName(data);
            $scope.addingNoOfBlocks(data);
        })
        .error(function(data) {
			  //newly added error code
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
		
	}
	
	$scope.setTechName = function(assetTable){
		for (var asset in assetTable){
			if(assetTable[asset].technicianId != 0){
				self.techName = self.tech[assetTable[asset].technicianId];
				return;
			}
		}
	}
	$scope.setResidentName = function(assetTable){
		for (var asset in assetTable){
			if(assetTable[asset].technicianId != 0){
				self.residentName = self.tech[assetTable[asset].assistantId];
				return;
			}
		}
	}
	$scope.addingNoOfBlocks = function(data){
		self.initializeBiopsy();
	    	for(var asset in data){
	    		$scope.getNoOfBlocks(data[asset]);
	    	}
//		    $timeout( function(){
//		    	self.outputlist.sort(function(a, b) {
//		    		  var nameA = a.npNumber;
//		    		  var nameB = b.npNumber;
//		    		  if (nameA < nameB) {
//		    		    return -1;
//		    		  }
//		    		  if (nameA > nameB) {
//		    		    return 1;
//		    		  }
//		    		  // names must be equal
//		    		  return 0;
//		    		});
//	        }, 5000 );
	    }
	self.initializeBiopsy = function(){
		self.tumor = 0;
		self.muscle = 0;
		self.nerve = 0;
		self.skin = 0;
		self.epilepsy = 0;
		self.brainBiopsy = 0;
		self.lipBiopsy = 0;
		self.liverBiopsy = 0;
		self.lymphNode = 0;
		self.hair = 0;
		self.thymus = 0;
		self.other = 0;
		//newly added
		self.tumor_routine = 0;
		self.tumor_ihc = 0;
		self.tumor_frozen = 0;
		self.pit_ihc = 0;
		self.epilepsy_routine = 0;
		self.muscle_ehc = 0;
		self.muscle_ehc_ele = 0;
		self.muscle_routine = 0;
		self.muscle_routine_ele = 0;
		self.nerve_routine = 0; 
		self.nerve_ele = 0;
		self.skin_routine = 0;
		self.skin_ele = 0;
		self.muscle_nerve = 0;
		self.muscle_nerve_skin = 0;
		self.muscle_skin = 0;
		self.nerve_skin = 0;
		self.lip1 = 0;
		self.liver1 = 0;
		self.fluid = 0;
		self.conjunctiva = 0;
	}
	
	
	$scope.npNums = [];
	$scope.totalBlocks = 0;
	
	$scope.getNoOfBlocks = function(asset){
		
		
		if($scope.npNums.indexOf(asset.npNumber)==-1 && asset.process_status!=undefined){
			
			$scope.npNums.push(asset.npNumber);
			
	    	$http.get(ASSET_URL_BASE+"/block?npBase="+asset.npNumber,{async:false},{headers: {'Content-Type': 'application/json'}})
	        .success(function (data) {
	        	console.log(data);
	        	asset.noOfBlocks = data.length;
	        	var j = 0;
	        	for (var block in data){ 
	        		if(data[block].process_status != undefined){
	        			console.log(data[block].process_status);
		        		if(data[block].process_status.indexOf("Decal")!=-1){
		        			if (j==0){
		        				asset.decal = data[block].npNumber+"-"+data[block].process_status;
		        				j++;
		        			}	
		        			else
		        				asset.decal+=","+data[block].npNumber+"-"+data[block].process_status;
		        		}
	        		}
	        	}
	        	//asset.preserve = asset.process_status.substr(asset.process_status.indexOf(':')+1,asset.process_status.length)
	        	$scope.totalBlocks += asset.noOfBlocks;
	        	self.outputlist.push(asset);
	        	console.log(self.outputlist)
	        	self.outputlist_temp.push(asset);
	        	
	        	self.outputlist.sort(function(a, b) {
		    		  var nameA = a.npNumber;
		    		  var nameB = b.npNumber;
		    		  if (nameA < nameB) {
		    		    return -1;
		    		  }
		    		  if (nameA > nameB) {
		    		    return 1;
		    		  }
		    		  // names must be equal
		    		  return 0;
		    		});
	        	self.outputlist_temp.sort(function(a, b) {
		    		  var nameA = a.npNumber;
		    		  var nameB = b.npNumber;
		    		  if (nameA < nameB) {
		    		    return -1;
		    		  }
		    		  if (nameA > nameB) {
		    		    return 1;
		    		  }
		    		  // names must be equal
		    		  return 0;
		    		});
	        	self.calculateBiopsy(asset.biopsy);
	        	
		    }).error(function(data){ 	
		    	//newly added error code
		    	  alert("Error: server encountered an internal error. Please try again after some time ");
		    });
	}
	}
	self.calculateBiopsy = function(biopsy){
		
		//Epilepsy (routine) with immunohistochemistry
		switch(biopsy){
    	case("Tumor") : self.tumor++;
    	break;
    	case("Muscle") : self.muscle++;
    	break;
    	case("Nerve") : self.nerve++;
    	break;
    	case("Skin") : self.skin++;
    	break;
    	case("Epilepsy") : self.epilepsy++;
    	break;
    	case("Brain Biopsy") : self.brainBiopsy++;
    	break;
    	case("Lip Biopsy") : self.lipBiopsy++;
    	break;
    	case("Liver Biopsy") : self.liverBiopsy++;
    	break;
    	case("Lymph Node") : self.lymphNode++;
    	break;
    	case("Hair") : self.hair++;
    	break;
    	case("Thymus") : self.thymus++;
    	break;
    	case("Other") : self.other++;
    	break;
    	case("Tumor (routine)") : self.tumor_routine++;
    	break;
    	case("Tumor with IHC") : self.tumor_ihc++;
    	break;
    	case("Tumor+intraoperative squash/frozen") : self.tumor_frozen++;
    	break;
    	case("Pituitary tumor with IHC") : self.pit_ihc++;
    	break;
    	case("Epilepsy (routine) with immunohistochemistry") : self.epilepsy_routine++;
    	break;
    	case("Fresh Muscle for enzyme histochemistry (EHC)") : self.muscle_ehc++;
    	break;
    	case("Fresh Muscle for enzyme histochemistry (EHC) + electron microscopy") : self.muscle_ehc_ele++;
    	break;
    	case("Fixed muscle (routine)") : self.muscle_routine++;
    	break;
    	case("Fixed muscle (routine) with electron microscopy)") : self.muscle_routine_ele++;
    	break;
    	case("Nerve biopsy (routine)") : self.nerve_routine++;
    	break;
    	case("Nerve biopsy (routine) with semithin/electron microscopy") : self.nerve_ele++;
    	break;
    	case("Skin biopsy (routine)") : self.skin_routine++;
    	break;
    	case("Skin biopsy (routine) with electron microscopy") : self.skin_ele++;
    	break;
    	case("Muscle+Nerve") : self.muscle_nerve++;
    	break;
    	case("Muscle+Nerve+Skin") : self.muscle_nerve_skin++;
    	break;
    	case("Muscle+Skin") : self.muscle_skin++;
    	break;
    	case("Nerve+Skin") : self.nerve_skin++;
    	break;
    	case("Lip") : self.lip1++;
    	break;
    	case("Liver") : self.liver1++;
    	break;
    	case("Fluid") : self.fluid++;
    	break;
    	case("conjunctiva") : self.conjunctiva++;
    	break;
    	case("Others") : self.other++;
    	break;
    	
    	//conjunctiva 
    	default: ;
    	break
    	}
	}
	
	self.heading2 = "INTERNALS/REFERRALS";
	
	$scope.showAll = function(){
		
		self.heading2 = "INTERNALS/REFERRALS";
		self.outputlist = [];
		self.initializeBiopsy();
		self.outputlist = self.outputlist_temp;
		$scope.totalBlocks = 0;
		
		for(var asset in self.outputlist_temp){
			
			self.calculateBiopsy(self.outputlist_temp[asset].biopsy);
			$scope.totalBlocks+=self.outputlist_temp[asset].noOfBlocks;
		}
	}
	
	$scope.showInternals = function(){
		
		self.outputlist = [];
		self.initializeBiopsy();
		self.heading2 = "INTERNALS";
		$scope.totalBlocks = 0;
		
		for(var asset in self.outputlist_temp){
			
			if(self.outputlist_temp[asset].npNumber.indexOf('X')==-1){
				
				self.outputlist.push(self.outputlist_temp[asset]);
				self.calculateBiopsy(self.outputlist_temp[asset].biopsy);
				$scope.totalBlocks+=self.outputlist_temp[asset].noOfBlocks;
			}
		}
		
	}
	
	$scope.showReferrals = function(){
		
		self.outputlist = [];
		self.initializeBiopsy();
		self.heading2 = "REFERRALS";
		$scope.totalBlocks = 0;
		
		for(var asset in self.outputlist_temp){
			
			if(self.outputlist_temp[asset].npNumber.indexOf('X')!=-1){
				
				self.outputlist.push(self.outputlist_temp[asset]);
				self.calculateBiopsy(self.outputlist_temp[asset].biopsy);
				$scope.totalBlocks+=self.outputlist_temp[asset].noOfBlocks;
				console.log(self.outputlist);
				console.log(self.calculateBiopsy);
				console.log(self.outputlist_temp[asset].noOfBlocks)
				console.log($scope.totalBlocks)
			}
		}
	}

});