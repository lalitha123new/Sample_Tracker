'use strict';

App.controller('NpDeleteController', ['$scope', 'Service','$http', function($scope, Service,$http) {
	
          var self = this;
          
          //var URL_BASE="http://10.11.3.3:8080/Sample_Tracker/webapi/";
      	  //var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
          //var URL_BASE="http://localhost:1025/Sample_Tracker/webapi/";
          var Session_id = sessionStorage.getItem("admin_id")
          
          
          //begin
          $scope.logOutUser=function(){
        	 
        	  if (confirm("Do you want to logout?")) {
        	  
        	  window.location.href="/Sample_Tracker/superAdmin.html";
        	  sessionStorage.clear();
        	  
        	  }
         }
         //end
          
          var SPECIAL_REQUEST_URL = URL_BASE + "specialrequests";
          var REQUEST_URL_BASE = URL_BASE+ "requests";
          var ASSET_URL_BASE = URL_BASE + "assets";
          var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
          var DELETE_NP = URL_BASE +"admin";
          self.search_str_pname='';
          self.search_str_np='';
          self.search_str_hname='';
          self.search_str_dname='';
          self.search_str_ttype='';
          self.suggestionslist=[];
          self.previd='';
          self.clickedNp = '';
          self.state=false;
          self.buttonstate = false;
          self.results = false;
          self.showAssets = false;
          
         
          self.outputlist=[];
          self.reportOutputlist = [];
          self.patient=[];
          self.stations=["Receiving","Grossing","Embedding","Sectioning","Staining","Reporting","Typing","Verification","Dispatch","Dispatched"];
         
         
           //begin
           self.searchFunction = function(){
        	   
        	 self.results = false
        	 $('#patientDT').addClass("hidden");
           	 
        	 if(Session_id){
        	 
           	 if(self.search_str_np!=''){
           		 
           		var tempString = self.search_str_np + ":";
    	    	var test = tempString.substring(0,tempString.indexOf(":"));
    	    	test=test.toUpperCase();
    	    	self.search_str_np=test;
    	    	
           	 self.dynamicSuggestionsFunction(self.search_str_np,'npNumber');
           	 $('#patientDT').removeClass("hidden");
           	 self.buttonstate = false;
           	 self.showAssets = true;
           	 
           	 }else{
           		alert("Please Enter Np Number!");
           		
           	 }
           	 
        	 }else{
            	 
            	 alert("Session got expired, Please login again");
            	 window.location.href="/Sample_Tracker/superAdmin.html";
            	 sessionStorage.clear();
        	 }
           
             
          };
          //end
          
          //begin
          self.dynamicSuggestionsFunction= function(str_pname,id){
        	  
          	 if(id!=self.previd){
          	 	self.suggestionslist=[]
          	 }
          	 
         	 Service.dynamicSuggestionsFunction(str_pname,id)
                 	 .then(
      					       function(d) {
      					    	   
      					    	   if(id=="npNumber"){
      					    		   
      						        self.suggestionslist = d.data;
      						        self.patient = self.suggestionslist;
      						        
      						        $http.get(ASSET_URL_BASE+"?npBase="+str_pname)
      				               .success(function(data) {
      				               
      				                self.outputlist = data;
      				               
      				                self.new_nextState=self.outputlist[0].nextState;
      				         
      				                if(self.outputlist[0].currentState==1 && self.outputlist[0].specimen=="Sheet"){
      				                		//checking sheet asset is available
      				                		self.status = self.stations[self.outputlist[self.outputlist.length-1].nextState-1];
      				                		
      				                	}else{
      				                		self.status = self.stations[self.outputlist[0].nextState-1];
      				                		
      				                	}
      				       
      				                for(var np in self.outputlist){
      				                	
      				                	self.outputlist[np].npBase = self.outputlist[np].npNumber;
      				                	self.outputlist[np].patientName = self.patient.patientName;
      				                	
      				                }
      				                if(self.outputlist=='' && self.patient==''){
    						        	
    						        	$('#patientDT').addClass("hidden");
        					    	   	self.results=true;
    						        	}
      	
      				               })
      						        
      					    	   }else{
      					    		 self.suggestionslist = d.data;
      					    		 self.outputlist = self.suggestionslist;
      					    		 
      					    		if(self.outputlist==''){
      					    			
      						        	$('#patientDT').addClass("hidden");
      						        	self.buttonstate=false;
          					    	   	self.results=true;
          					    	   	
      						        	}
      					    	   }
      					       },
            					function(errResponse){
      					    	   	$('#patientDT').addClass("hidden");
      					    	   	self.showAsset = false;
      					    	   	self.results=true;
            						
            					}
      			       );
          	self.previd=id;
          
          	return self.suggestionslist;
          };
          //end
          
          
          //begin
          self.showPatientDetails = function(output){
        	
        	  self.search_str_pname = '';
        	  self.search_str_np = output.npBase;
        	  self.outputlist=[];
        	  self.searchFunction();
        	  
          }
          //end
          
          
          //begin
          self.transDetails= function(blocknp){
          	self.clickedNp = blocknp;
          	self.state=true;
          	
         	 Service.transDetails(blocknp)
                 	 .then(
      					       function(d) {
      						        self.reportOutputlist = d;
      					       },
            					function(errResponse){
            						console.error('Error ');
            					}
      			       );
          	
          	return self.reportOutputlist;
          };
          //end
          
          
          //begin
          self.getSpecialRequest = function(asset){  	  
        	  $http.get(SPECIAL_REQUEST_URL+"?npNumber="+asset.npBase,{headers: {'Content-Type': 'application/json'}})
              .success(function (data) {
                 
                  asset.specialStains = data;
              })
              .error(function(data) {
    			  //newly added error code
    	    	  alert("Error: server encountered an internal error. Please try again after some time ");
    	        
    	    });
          }
          //end
          
          //begin code to delete np number
          $scope.deleteNpNumber = function(npnumber,status){
        	  
        	  if(Session_id){
        	  
        	  if (confirm("Do you want to delete NpNumber = "+npnumber+" ?")) {
        		  
        	  $http.get(DELETE_NP+"/deleteNpnumber/"+status+"?npnumber="+npnumber,{headers: {'Content-Type': 'application/json'}})
              .success(function (data) {
            	  
                  if(data==1){
                	  
                	  alert(npnumber+" has deleted..!");
                	  document.location.reload();
                  }else{
                	  
                	  alert(npnumber+" has Not deleted");
                  }
              })
              .error(function(err){
            	
            	  alert("Session got expired, Please login again");
              	  window.location.href="/Sample_Tracker/superAdmin.html";
              	  sessionStorage.clear();
              });
        	  
        	  }
        	  }else{
             	 
             	 alert("Session got expired, Please login again");
             	 window.location.href="/Sample_Tracker/superAdmin.html";
             	 sessionStorage.clear();
         	 }
          }
          //end
          
          self.resetForm = function(){
	       }
 
      
    }]);