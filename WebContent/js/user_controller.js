'use strict';

App.controller('Controller', ['$scope', 'Service','$http', function($scope, Service,$http) {
          
	var self = this;
          var report = "";
         
          var config1 = {
                     	headers : {
                         'Content-Type': 'text/plain;charset=utf-8;'
          				}
          };
          var config2 = {
                     	headers : {
                    	 contentType : "application/json",
         				 dataType : "json"
          			}
          };
          
          $scope.str1 = "";
          $scope.str2 = "";
          $scope.link = "";
          
          var title="";
         
          //var URL_BASE="http://10.11.3.3:8080/Sample_Tracker/webapi/";
      	  //var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
          //var URL_BASE="http://localhost:1025/Sample_Tracker/webapi/";
          
         
          
          var SPECIAL_REQUEST_URL = URL_BASE + "specialrequests";
          var REQUEST_URL_BASE = URL_BASE+ "requests";
          var ASSET_URL_BASE = URL_BASE + "assets";
          var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
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
         
          
          $scope.doctor_name;
          $scope.age1;
          $scope.age2;
          $scope.gender;
          $scope.date1 = "";
          $scope.date2 = "";
          
          $scope.specimen;
          $scope.biopsy;
          $scope.fixative;
          $scope.station_id;
          
          $scope.finalImpression;
          $scope.np_File = '';
         
         
          //search criteria - hide and display fields
          $('#age_select1').change(function(){
        	  
              $('#npNumber').prop('disabled', true);
              $('#biopsy_type_select').prop('disabled', true);
              $('#specimen_select').prop('disabled', true);
              $('#fixative_select').prop('disabled', true);
              $('#station_select').prop('disabled', true);
              $('#final_impress').prop('disabled', true);
          });
          
          $('#age_select2').change(function(){
        	  
              $('#npNumber').prop('disabled', true);
              $('#biopsy_type_select').prop('disabled', true);
              $('#specimen_select').prop('disabled', true);
              $('#fixative_select').prop('disabled', true);
              $('#station_select').prop('disabled', true);
              $('#final_impress').prop('disabled', true);
          });
          
          $('#datepicker1').click(function(){
        	  
              $('#npNumber').prop('disabled', true);
              $('#biopsy_type_select').prop('disabled', true);
              $('#specimen_select').prop('disabled', true);
              $('#fixative_select').prop('disabled', true);
              $('#station_select').prop('disabled', true);
              $('#final_impress').prop('disabled', true);
          });
         
         
          
          //date range new with month and year selection
          var picker = new Lightpick({
        	    field: document.getElementById('datepicker1'),
        	    //secondField: document.getElementById('datepicker2'),
        	    singleDate: false,
        	    //startDate: moment().startOf('month').add(7, 'day'),
        	    //endDate: moment().add(1, 'month').endOf('month').subtract(7, 'day'),
        	    onSelect: function(start, end){
        	    	
        	    		$scope.date1 = start.format('YYYY-MM-DD');
        	    		$scope.date2 = end.format('YYYY-MM-DD');
        	    }
        	});
          
          
          
          var search_obj = {};
          
           self.searchFunction = function(){
        	   
        	  $scope.myVar = true; 
        	   
        	   $scope.doctor_name = $( "#doctor_name" ).val();
        	  
        	   //from age
        	   $scope.age1 = $( "#age_select1" ).val();
        	  
        	   if($scope.age1 === "Select Age")
        	   $scope.age1 = "";
        	   
        	   //to age
        	   $scope.age2 = $( "#age_select2" ).val();
        	  
        	   if($scope.age2 === "Select Age")
       	       $scope.age2 = "";
        	 
        	   //gender
        	   $scope.gender = $( "#gender_select" ).val();
        	   
        	   //biopsy type
        	   $scope.biopsy = $( "#biopsy_type_select" ).val();
        	  
        	   //specimen
        	   $scope.specimen = $( "#specimen_select" ).val();
        	  
        	   //fixative
        	   $scope.fixative = $( "#fixative_select" ).val();
        	   
        	   //final impression
        	   $scope.finalImpression = $('#final_impress').val();
        	  
        	   $scope.station_id = $('#station_select').val();
        	   
        	   $scope.search_obj = 
        		   
 	        	{
	 		      "patientName":self.search_str_pname,
	 		      "doctorNmae":$scope.doctor_name,
	 		      "age1":$scope.age1,
	 		      "age2":$scope.age2,
	 		      "gender":$scope.gender,
	 		      "date1":$scope.date1,
	 		      "date2":$scope.date2,
	 		      "specimen":$scope.specimen,
	 		      "biopsy":$scope.biopsy,
	 		      "fixative":$scope.fixative,
	 		      "finalImpression":$scope.finalImpression,
	 		      "station_id":$scope.station_id
 		       
 		      };
        	   
        	   
        	 self.results = false
        	 $('#patientDT').addClass("hidden");
           	
           	 if(self.search_str_np!=''){
           		 
           		var tempString = self.search_str_np + ":";
    	    	var test = tempString.substring(0,tempString.indexOf(":"));
    	    	test=test.toUpperCase();
    	    	$scope.np_File = test;
    	    	self.search_str_np=test;
    	    	
           	 self.dynamicSuggestionsFunction(self.search_str_np,'npNumber');
           	 $('#patientDT').removeClass("hidden");
           	 self.buttonstate = false;
           	 self.showAssets = true;
           	 
           	 }else{
           		 
           		self.buttonstate = true;
           		self.showAssets = false;
           		self.dynamicSuggestionsFunction(self.search_str_pname,'pName');
           	 }
           	
             
          };
          
          
          //begin code to get patient and associated asset details
          self.dynamicSuggestionsFunction= function(str_pname,id){
        	  
        	  
          	 if(id!=self.previd){
          		 
          	 	self.suggestionslist=[]
          	 }
          	 
         	 Service.dynamicSuggestionsFunction(str_pname,id,$scope.search_obj)
             .then(
             function(d) {
            	 
              if(id=="npNumber"){
      					    		  
		        self.suggestionslist = d.data;
		        self.patient = self.suggestionslist;
		        console.log(self.patient)
      						     
      						   
			    if(self.patient == ""){
			    	alert("No data Available");
			    }
      						        
		        $http.get(ASSET_URL_BASE+"?npBase="+str_pname)
               .success(function(data) {
            	 //  console.log("check1")
      			console.log(data)
                $scope.myVar = false;
                self.outputlist = data;
      				           
                self.date_rec = self.outputlist[self.outputlist.length-1].start_time;
                
               //checking sheet asset is available
      			if(self.outputlist[0].currentState==1 && self.outputlist[0].specimen=="Sheet"){
      				
      				self.status = self.stations[self.outputlist[self.outputlist.length-1].nextState-1];
      				                		
      				$(".view_class").prop("disabled", true);
      				                		
      				}else{
      					
      				self.status = self.stations[self.outputlist[0].nextState-1];
      				                		
      				                		
      				if(self.outputlist[0].currentState == 9){
      					
      				$(".view_class").removeAttr("disabled");
      				}else{
      					
      				$(".view_class").prop("disabled", true);
  				    }
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
      				$scope.myVar = false;
      					    		 
      				if(self.outputlist==''){
      					    			
      				alert("No Data Available");
      				$('#patientDT').addClass("hidden");
      				self.buttonstate=false;
      				self.results=true;
      				}
      				}
              
             		},function(errResponse){
             		$('#patientDT').addClass("hidden");
             		self.showAsset = false;
             		self.results=true;
            						
             		});
         	 
          	self.previd=id;
          	
          	return self.suggestionslist;
          };
          
          //end of code
          
          self.showPatientDetails = function(output){
        	 
        	  title =  output.npBase;
        	  self.search_str_pname = '';
        	  self.search_str_np = output.npBase;
        	  self.outputlist=[];
        	  self.searchFunction();
        	  
          }
          
          self.transDetails= function(blocknp){
          	self.clickedNp = blocknp;
          	self.state=true;
          
         	 Service.transDetails(blocknp)
         	 .then(
         	 function(d) {
         	 self.reportOutputlist = d;
         	 },function(errResponse){
         	 console.error('Error ');
         	 });
          	
          	return self.reportOutputlist;
          };
          
          
          self.getSpecialRequest = function(asset){  	  
        	  $http.get(SPECIAL_REQUEST_URL+"?npNumber="+asset.npBase,{headers: {'Content-Type': 'application/json'}})
              .success(function (data) {
                 
                  asset.specialStains = data;
              })
              .error(function(err){
            	  alert("error");
              });
          }
          
          
          
          var logo="";
          $scope.pat_name = "";
          $scope.pat_age;
          $scope.pat_sex;
          $scope.pat_uhid;
          $scope.report_date;
          var docSign;
          var report1;
          
          
          //begin code to display the report in the report pop up
          $scope.displayReport =  function(){
        	  
        	  
        	  	$scope.pat_name = "";
		        $scope.pat_age ="";
		        $scope.pat_sex = "";
		        $scope.pat_uhid =  "";
				$scope.report_date = "";
				document.getElementById("logo_div").src="";
				document.getElementById("doc_sign").src="";
        	  
        	  $("#reportDiv").empty();
        	  $('#reportModal').modal();
      			
      		  $scope.myVar1 = true;
      		  
      			var data1 = {
      		       "parm1":"14",
      		       "parm2":self.search_str_np
      		      };
      			
      		 return $http.post(URL_BASE+'ehosp/reportUsingSampleId',data1,config1)
      				.then(
      						function(response){
      							
      							if(response.data!=""){
      							
      								if(response.data[0].doc_sign != ""){
      									
      									docSign= response.data[0].doc_sign;
              							
      								}else{
      									docSign = "";
      									
      								}
      								
      								document.getElementById("doc_sign").src="data:image/png;base64,"+docSign;
      								
          							report1 =response.data[0].hosp_logo;
          							document.getElementById("logo_div").src="data:image/png;base64,"+report1;
	      							report = response.data[0].result;
	      							$scope.pat_name = response.data[0].pname;
	      					        $scope.pat_age = response.data[0].age;
	      					        $scope.pat_sex =  response.data[0].psex;
	      					        $scope.pat_uhid =  response.data[0].uhid;
	      							$scope.report_date = response.data[0].report_date;
	      							
      							 
      								}else{
      								$scope.pat_name = "";
	      					        $scope.pat_age ="";
	      					        $scope.pat_sex = "";
	      					        $scope.pat_uhid =  "";
	      							$scope.report_date = "";
      								report = "Report is not available";
      								}
      							
      								$( "#reportDiv" ).append(report);
      								$scope.myVar1 = false;
      							
      					         /* $('#download_button1').click(function () {
      					        	  
      					        	  var doc = new jsPDF();
      					        	  doc.fromHTML(report);
      					        	  doc.save('sample-file.pdf');
      					        	  
      					          });*/
      					          

      	 });
      			
      	}
        //end of code
          
          
          
          $scope.getPdf = function(){
        	
        	 
        	 var data1 = {
        	 "Np_base":self.search_str_np
       	  	 }
        	 
        	 
       	  return $http.post(URL_BASE+'ehosp/getReportPdfPath',data1,config1)
       	  .then(
			  function(response){
				 
					
					 $scope.link = response.data;
					
					 if($scope.link != ""){
						 
					  $scope.str1 = "http://localhost:8080/Sample_Tracker";
					  $scope.str2 = response.data;
					  $scope.link = $scope.str1.concat($scope.str2);
					  document.getElementById("pdflink").href= $scope.link;
					  
					 }else{
						 alert("No data available");
						 $scope.link =""
					     document.getElementById("pdflink").href= $scope.link;
					 }
					  

			  });
        	  
          }
          
          
          //begin code to download the report from popup as pdf file
          $(function () {

        	  $('#download_button').click(function () {
        		 
        		 
        	    var doc = new jsPDF();
        	    doc.addHTML($('#download_div')[0], 0, 0, {
        	      'background': '#fff',
        	      
        	    }, function() {
        	    	
        	      doc.save(self.search_str_np);
        	    });
        	  });
        	});
        	//end of code			
          
          $scope.closeModal = function(){
        	  window.location.reload();
          }
          
          $scope.files = []; 
          $scope.file_array = [];
          $scope.picture;
          $scope.upload_id = '';
          
          //begin code to hide and display the view uploaded file button
          $scope.getFiles =  function(){

        		$http.get(ASSET_URL_BASE+"/getlistofimage?np_base="+$scope.np_File)
        	    .success(function(data) {
        	       
        	       
        	        if(data.length == 0){
        	        	var fileFrame = document.getElementById("myFrame");
        	    		fileFrame.style.display="none";
                      	$("#button_view").addClass("hidden");
                      	
                      }else{
                      	$("#button_view").removeClass("hidden");
                      	$scope.file_array= data;
                      	
                      }
        	      
        	        
        	    })
        	}
          //end of code
          
          
          //begin code to viw the uploaded file in new tab
          $scope.viewFile = function(file_url){
        
          if(file_url != undefined){
          	var fileFrame = document.getElementById("myFrame");
          	var tabOrWindow = window.open(BASE_URL1+file_url, '_blank');
          	tabOrWindow.focus();
          }else{
        	  alert("No file to view");
          }
          }
          
          $scope.close =  function(){
        		
        		 $scope.pic = ""; 
        		 $scope.file_array = [];
        		 $('#uploadModal').modal('hide');
        	}
          
          
          
    }]);