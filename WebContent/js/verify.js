var app = angular.module('receivingStation', ['ui.bootstrap','ngCookies']);
app.controller('VerifyController',function($scope,$http,$window,$cookieStore)
{
    //var URL_BASE="http://10.11.3.3:8080/Sample_Tracker/webapi/";
	//var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
    //var URL_BASE="http://localhost:1024/Sample_Tracker/webapi/";
	//var BASE_URL1 = "http://10.11.3.3:8080/Sample_Tracker_test/";
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    var STATION_BASE_URL=URL_BASE+"station";
    
    
    $scope.barcodeValue='';
    $scope.patient='';
    $scope.username = '';
   
    $scope.username=$cookieStore.get('username');
    
    $scope.showUserName=false;
    $scope.recievingStationStep=0;
    $scope.linkingStep=0;
    var new_array = [];
    $scope.assetTable=[];
    
    $scope.asset={};
    $scope.asset.quantity=1;
    $scope.asset.biopsy = '';
    $scope.asset.specimen = '';
    $scope.asset.fixative = '';
    $scope.asset.npNumber = '';
    $scope.asset.comment = '';
    $scope.ncsModel = false;
    $scope.asset.corrective = '';
    $scope.asset.preventive = '';
    $scope.asset.faculty = '';
    $scope.asset.technician = '';
    $scope.asset.ncsType = '';
    $scope.checknp = true; 
    $scope.check_login =  true;
    
    $scope.transactionCodeValue ='';
    
    	////display in the technician name is NCS upon page refresh
    	if($scope.username){
    		
        if($scope.username.indexOf("Dr") === -1){
        	$scope.asset.technician = $scope.username;
           
            }
        }
    
    
   
   
    //Step =0 Scan Barcode
    //Step >=1 Verify patient details
    //Step >= 2 Verify NP Number and edit option
    //Step >=3 Only Verify Np Number

    $scope.updateNpBase =0;
    
    //1 if chance to update

    /*$scope.setUsername=function() {
        console.log("here I am !");
        $cookieStore.put('username',$scope.username);
        console.log("username: "+$cookieStore.get('username'));
        $('#loginModal').modal('hide');
    }*/
    //$scope.password="np1234";
    
   
	    //drop down options for NCS
	    $scope.ncsType_Array = ["Unlabelled sample","Discordant details","Inadequate clinical details","Formalin spill(improper fixative)"];
	   
    	//begin code to get the logged in user details
    	$scope.setUsername=function() {
        
        $scope.invalidPassword = false;
        
        $http.post(URL_BASE+"login?username="+$scope.users+"&password="+$scope.password)
        .success(function(data) {
          
           $scope.showUserName=true;
           $scope.showLogout=true;
           $scope.check_login =  false;
          
           $scope.username=$scope.users;
           
           //display in the technician name is NCS upon login
           if($scope.users.indexOf("Dr") === -1){
           $scope.asset.technician = $scope.users;
          
           }
           
           $cookieStore.put('username',$scope.username);
           $('#loginModal').modal('hide');
           $scope.invalidPassword = false;
          
          
        })
        .error(function(data) {  
            
        	$scope.invalidPassword = true;
            
        });
    }
    
    
    
   //begin code to hide or display buttons
    if($scope.username!=undefined){
    	$scope.showLogout=true;
    	 $scope.check_login =  false;
    	
    }
    else{
    	$scope.showLogout=false;
    	 $scope.check_login =  true;
    }
    //end of code
    
    
    
    $scope.techTable=[];
    $scope.faculty_Array = [];
    $scope.residentArray = [];
    $scope.technicianArray = [];
    $scope.officeArray = [];
    
    //begin code to get all technicians details and display in the login pop up based on roles
    $scope.getAllUsers=function(){
    	
    	
    	$http.get(TECHNICIAN_URL_BASE+"/withstation?stationId=1")
        .success(function(data) {
        	$('#loginModal').modal('show');
        	
        	
        	$scope.faculty_Array = data.filter(function( obj ) {
        	    return obj.roles === "faculty";
        	});
        	$scope.residentArray = data.filter(function( obj ) {
        	    return obj.roles === "resident";
        	});
        	$scope.technicianArray = data.filter(function( obj ) {
        	    return obj.roles === "technician";
        	});
        	
        	$scope.officeArray = data.filter(function( obj ) {
        	    return obj.roles === "office";
        	});
        
        	 $scope.doctor_array.push()
        	 $scope.techTable=data;
        	
          
      
        })
        .error(function(data) {
            //alert("Errors in loading technicians");
            
        });
    	
    }
    //end of code
    
    
    //begin 
    $scope.np_array = [];
    $scope.getNcsDetails=function(asset){
    	
    	var npNumber = asset.npNumber.replace("#","-").replace("#","-").replace("#","-");
    	  $scope.np_array = npNumber.split(":");
    	$http.get(ASSET_URL_BASE+"/ncs?npBase="+npNumber)
        .success(function(data) {
        	console.log(data);
            asset.corrective = data[0].corrective;
            asset.preventive = data[0].preventive;
            asset.ncsType = data[0].ncsType;
            asset.faculty = data[0].faculty;
           asset.technician = data[0].technician_name;
            
            
            
        })
       
    }
    //end
    
    
    //begin code for logout
    $scope.logout=function(){
    
    	$cookieStore.remove("username");
    	 $window.location.reload();
    	
    }
    //end of code

    
    $scope.tech={};
    $scope.myVar=false;
    
    
    //begin code to get patient details
    $scope.getPatientDetails=function () {
    	
    	if($scope.username==null)
    		$scope.getAllUsers();
    	else{
    		if($scope.patient.UHID != "Unlinked"){
		    	$scope.myVar=true;
		       
		        $http.get(REQUEST_URL_BASE+"/soap?samplerequestid="+$scope.barcodeValue)
		        .success(function(data) {
		            $scope.patient=data;
		         
		            $scope.recievingStationStep=1;
		            $scope.linkingStep = 1;
		            $scope.myVar=false;
		           
		            
		        })
		        .error(function(data) {
		           // alert("Please Scan the Barcode Again");
		        	
		        	if(confirm("E-hospital portal has problem, Do you want to enter data manually ?")){
		        		  
		        			$('#ManualDataModal').modal('show');
		        		  
		        	}else{
		        			  
		        			  alert("E-hospital portal has problem, Please contact authorised person");
		        	}
		        	
		            $scope.myVar=false;
		        });
    		}
    		}
    }
    //end of code
    
    
    
    //begin code to upon entering Transaction id form external hospital, display the patient details in the pop up
    $scope.getExternalPatientDetails=function () {
    	
    	
    	$scope.transactionCodeValue =$scope.transactionCodeValue; 
    	$http.get(BASE_URL2+"patientbyExtId/"+$scope.transactionCodeValue)
        .success(function(data) {
        	
        	$('#ExternalDataModal').modal('show');
            $('#pass1').val(data[0].pat_name);
            $('#pass2').val(data[0].pat_age);
            $('#pass3').val(data[0].referred_by);
            $('#pass4').val(data[0].username);
            
            
            if(data[0].pat_gender === "Male"){
            	
            $('#female').attr('checked', false);
            $("#male").prop('checked', 'checked');
           
            }else{
            	
            $('#male').attr('checked', false);
            $('#female').prop('checked', 'checked');
            }
            
          
            
			})
             .error(function(data) {
             	alert("Not able to save the sheet asset");
             });
    	
    	
    }
    //end of code
    
    
    
    //begin code to manual data entry for patient for internal
    $scope.setPatientDetails = function(){
    	
    	
    	$scope.patient.UHID = $scope.patient_UHID;
        $scope.patient.surgeon = $scope.patient_surgeon;
        $scope.patient.unitName = $scope.patient_unit;
        $scope.patient.departmentName = $scope.patient_department;
        $scope.patient.patientName = $scope.patient_patientName;
        $scope.patient.age = $scope.patient_age;
        $scope.patient.sex = $scope.patient_sex;
        $scope.recievingStationStep=1;
        
        var S = $scope.barcodeValue;
        var req_wrd = S.search(/EXT/);
        
        if(req_wrd == 0){  
     	   $scope.patient.external = 1;
        }else{  
     	   $scope.patient.external = 0;  
        }
        $scope.patient.hospital  ="NIMHANS";
        $('#ManualDataModal').modal('hide');
        
        $('#ExternalDataModal').modal('hide');		
    }
    //end of code
    
    
    
    	//begin
    	$scope.setPatientDetails1 = function(){
        
        
    	$scope.patient.UHID = $scope.patient_UHID;
        $scope.patient.patientName =$("#pass1").val();
        $scope.patient.age = $("#pass2").val();
        
        if($("#male").prop('checked', 'checked')){
        	
        	 $scope.patient.sex = "Male";
        	 
         }else{
        	 
            $scope.patient.sex = "Female";
            
           }
        
        $scope.patient.surgeon = $("#pass3").val();
        $scope.patient.hospital  =$("#pass4").val();
        
        $scope.recievingStationStep=1;
        
        var S = $scope.barcodeValue;
        var req_wrd = S.search(/EXT/);
       
        if(req_wrd == 0){  
    	   $scope.patient.external = 1;
        }else{  
    	   $scope.patient.external = 0;  
        }
        
       	
        $scope.linkingStep = 1;
        $scope.myVar=false;
        
        $('#ManualDataModal').modal('hide');
        $('#ExternalDataModal').modal('hide');
                
    }
    //end 
    
    
    $scope.npSuggestion='';
    $scope.oldRequests={};
    
    
    //begin
    $scope.getSuggestion=function() {
    	
        if($scope.patient.npBase==null){
        	
            $http.get(REQUEST_URL_BASE+"/next?external="+$scope.patient.external)
                .success(function(data) {
                	
                	
                    $scope.recievingStationStep=2;
                    $scope.npSuggestion=data;
                    $scope.npNumber=data;
                    $scope.updateNpNumber();
                	if($scope.patient.uniqueNpBase!=null){
                	
                		
                		
                		$http.get(REQUEST_URL_BASE+"/withUhid?uhid="+$scope.patient.UHID)
                		.success(function(data) {
                    	
                    	$scope.oldRequests=data;
                    	$('#oldNpModal').modal('show');
                		})
                	}
                    
                })
        }else{
        	
            $scope.recievingStationStep=4;
            $scope.npSuggestion=$scope.patient.npBase;
            $scope.npNumber=$scope.patient.npBase;
            $scope.populateTable();
            $scope.checkNpNumber();
            flag=false;
        }
    
    }
    //end 
    
    //begin
    $scope.getSuggestion1=function() {
    	
    	
        if($scope.patient.npBase==null){
        	
        	
            $http.get(REQUEST_URL_BASE+"/next?external="+$scope.patient.external)
                .success(function(data) {
                	
                	 $scope.recievingStationStep=2;
                	 $scope.updateNpNumber();
                	
                	if($scope.patient.uniqueNpBase!=null){
                		
                		
                		
                		$http.get(REQUEST_URL_BASE+"/withUhid?uhid="+$scope.patient.UHID)
                		.success(function(data) {
                    	
                    	$scope.oldRequests=data;
                    	$('#oldNpModal').modal('show');
                		})
                	}
                    
                })
        }else{
        	
            $scope.recievingStationStep=4;
            $scope.npSuggestion=$scope.patient.npBase;
            $scope.npNumber=$scope.patient.npBase;
            $scope.populateTable();
            $scope.checkNpNumber();
            flag=false;
        }
    
    }
    //end



    $scope.npNum = "Create new";
    
    //begin
    $scope.setNpNumber = function (){
    	
    	if($scope.npNum=="Create new"){
    		$('#oldNpModal').modal('hide');
    	}else{
    		$scope.putPatient();
    	}
    	$('#oldNpModal').modal('hide');
    }
    //end
    
    //begin
    $scope.getUpdatedDetails = function(){
    	
    	$scope.myVar=true;
       
        $http.get(REQUEST_URL_BASE+"/soap?samplerequestid="+$scope.barcodeValue)
        .success(function(data) {
        	
            $scope.patient=data;       
            $scope.recievingStationStep=1;
            $scope.linkingStep = 1;
            $scope.myVar=false;
            $scope.getSuggestion();
        })
        .error(function(data) {
            alert("Not Updated");
            $scope.myVar=false;
        });
    }
    //end
    
    
    //begin
    $scope.verify = function (){
    	$scope.linkingStep=2;
    }
    //end
    
    
    $scope.unLinked = {};
    
    //begin code to get the unlinked samples data
    $scope.getUnlinked = function(){
    	
        $http.get(REQUEST_URL_BASE+"/unlinked")
        .success(function(data) {
        	
        	//$scope.unLinked = data;
        	$scope.unLinked = data.reverse();
        
        	console.log($scope.unLinked)
        	if($scope.unLinked.length==0){
        		$('#unlinked').removeClass('btn-danger');
        		$('#unlinked').addClass('btn-success');
        	}else{	
        		$('#unlinked').removeClass('btn-success');
        		$('#unlinked').addClass('btn-danger');
        	}
        	
        		
        		
        })
    	
    }
    //end of code
    
    
    $scope.getUnlinked();

    $scope.pat = {};
    
    //begin
    $scope.selectThis = function(pat){
    	
    	$('#readBarcode').removeClass('hidden');
    	$('#patientDetails').removeClass('hidden');
        $scope.patient='';
    	$scope.npNum=pat.npBase;
    	$scope.barcodeValue='';
    	$scope.recievingStationStep=0;
    	
    	
    }
    //end
    
   
    //begin
    $scope.putPatient = function(){
    	
    	var requestData={
                npBase: $scope.npNum.toString(),
                sampleRequestId: $scope.barcodeValue,
                UHID: $scope.patient.UHID,
                surgeon: $scope.patient.surgeon,
                patientName: $scope.patient.patientName,
                patientAge: $scope.patient.age,
                patientSex: $scope.patient.sex
            };
    	
    	
    	$http.put(REQUEST_URL_BASE, requestData ,{headers: {'Content-Type': 'application/json'}})
        .then(function successCallback(response) {
        	
        	$scope.getUnlinked();
        	$scope.getUpdatedDetails();
        	$('#readBarcode').addClass('hidden');
        	$('#patientDetails').addClass('hidden');

        }, function errorCallback(response) {
        });
    	
    	
    }
    //end
    
    
    
    $scope.patient = {};
    $scope.checkboxModel = false;
    
    //begin
    $scope.unlinkPerson = function(){
    	
    	$("#button1").addClass("hidden");
    	$("#button2").removeClass("hidden");
    	if($scope.checkboxModel==false){
    		
    	
    	$scope.patient.UHID = "Unlinked";
    	$scope.patient.npBase==null;
    	$scope.patient.external=1;
    	$scope.barcodeValue = "Unlinked";
    	$scope.getSuggestion();
    	
    	}else{
    		
    		$scope.patient.UHID = '';
    		$scope.npNumber = '';
    		$scope.npSuggestion = '';
    		$scope.barcodeValue = '';
    	}
    	
    }
    //end
    
    
    $scope.regex= /^X?[1-9]\d*[/][0-9]{2}$/;
   
    $scope.npNumber='';
    
    
    $scope.confirmNp = function(){
    	$('#confirmNp').modal('show');
    }
    
    
    //begin
    $scope.checkNpNumber=function(){	
    	
    	
    	$('#confirmNp').modal('hide');
    	$scope.checknp =  false;
    	
    	$http.get(BASE_URL2+"patientbyExtId/"+$scope.transactionCodeValue)
        .success(function(data) {
        	
        	var myJSON = JSON.stringify(data);
        	var str1 = myJSON.substr(0, myJSON.length-1);
        	var str2 = str1.substr(1);
        	
        	var obj = JSON.parse(str2);
        	
        	sample_test = JSON.parse(obj.sample_test);
        
        	for(var i=0;i<sample_test.length;i++){
        		
        		
        		for(var k=0;k<sample_test[i].sample_quantity;k++){
        			new_array.push(sample_test[i]);
        			
        			 
        		}
        		
        		
        	}
        	//assign multiple sample array
        	$scope.multipleArray = sample_test;
        	 $scope.externalVal=true;
        	for(var j=0;j<new_array.length;j++){
        		
        		 $scope.externalVal=true;
        		
				 $scope.asset1 = {};
		       	 $scope.asset1.specimen =new_array[j].specimen;
		       	 if( new_array[j].sample_type == "" || new_array[j].sample_type == undefined){
		       		 $scope.asset1.biopsy =  "Nil";
		       		 
		       	 }else{
		       	 $scope.asset1.biopsy = new_array[j].sample_type;
		       	 }
		       	 $scope.asset1.fixative =new_array[j].fixative;
		       	 
		       	 if(new_array[j].ref_no == undefined){
		       		new_array[j].ref_no ="";
		       	 }
		       	 $scope.asset1.review = new_array[j].ref_no;
		       	 $scope.asset1.quantity=new_array[j].sample_quantity;
		       	//$scope.asset1.quantity=1;
		       	 $scope.assetTable.push($scope.asset1);
		       	 
		       	
		       	
        	}
        
         
         var str3 = $scope.npNumber.substr(0, $scope.npNumber.length-2);
       	 var str4 = str3.substr(1);
         var str5 = parseInt(str4, 10);
       	 
       	 /*var updateData  ={
                 npno: $scope.npNumber,
                 status:"Received"
                 
       	 }*/
         var updateData  ={
                 npno: $scope.npNumber,
                 status:"Received",
                 ext_trc_id:$scope.transactionCodeValue
                 
        }
       	
       	 var newtransval=$scope.transactionCodeValue+"";
         
         	/* $http.post(BASE_URL2+"statuschange/"+newtransval, updateData ,{headers: {'Content-Type': 'application/json'}})
         	.then(function successCallback(response) {
         	
             })
             .error(function(data) {
             	alert("Not able to save the sheet asset");
             });*/
         
         $http.post(BASE_URL2+"statuschange/", updateData ,{headers: {'Content-Type': 'application/json'}})
         .then(function successCallback(response) {
         
             })
             .error(function(data) {
              alert("Not able to save the sheet asset");
             });
       	 
       	 
       	 
        })
    	
   //*************************************************************************************************
    	
//    	//save button values
//    	 $scope.asset.quantity=2;
//    	 $scope.asset.biopsy = "Skin";
//   	 $scope.asset.specimen = "Tissue";
//    	 $scope.asset.fixative = "10% Formalin";
    	

    	$scope.npNumber=$scope.npNumber.toUpperCase();
    	
    	if($scope.regex.test($scope.npNumber)){
    		
    	if($scope.npNumber=='')
            $scope.npNumber=$scope.npSuggestion;
    	
        if($scope.patient.npBase==null){  
        	
        	//var confirm = $window.confirm('Are you sure to assign this NP Number : '+$scope.npNumber);
            $scope.updateNpBase =0;
            //var noOfslashs = $scope.npNumber.replace(/[^/]/g, '').length
            
            if($scope.patient.UHID != undefined){
            	$scope.patient.UHID = $scope.patient.UHID;
            }else{
            	$scope.patient.UHID="Unlinked";
            }
            
            console.log("GENDER "+$scope.patient.sex)
            var requestData={
                npBase: $scope.npNumber.toString(),
                sampleRequestId: $scope.barcodeValue,
                UHID: $scope.patient.UHID,
                surgeon: $scope.patient.surgeon,
                patientName: $scope.patient.patientName,
                patientAge: $scope.patient.age,
                patientSex: $scope.patient.sex,
                department_name :  $scope.patient.departmentName,
                unit_name : $scope.patient.unitName
            };
           
          
          // if(confirm){
            $http.post(REQUEST_URL_BASE, requestData ,{headers: {'Content-Type': 'application/json'}})
                .then(function successCallback(response) {
                	
                	$http.post(ASSET_URL_BASE+"/sheet?technician="+$scope.username+"&stationId=1&np="+$scope.npNumber)
                    .success(function(data) {
                    	
                    	//console.log(ASSET_URL_BASE+"/sheet?technician="+$scope.username+"&stationId=1&np="+$scope.npNumber);
                    	
                       //call save button function	
                    	$scope.save();
                    	
                    })
                    .error(function(data) {
                    	alert("Not able to save the sheet asset");
                    });
                	console.log("npBase is null,data saved");
                    //console.log(response);
                    $scope.recievingStationStep=4;
                    $scope.getUnlinked();
                    //$scope.create();
                }, function errorCallback(response) {
                    $scope.getSuggestion();
                    flag=true;
                    alert("Invalid NP Number !!! ");
                    $scope.asset.biopsy = '';
                    $scope.asset.specimen = "Tissue";
                    $scope.asset.fixative = '';
                });
            /*}
            else
            	$scope.updateNpBase =1;*/
        }else{
            $scope.recievingStationStep=4;
            $scope.populateTable();
        }
    	}else
    		alert("Invalid NP Number");
        
    }
    //end
    
    

    //begin
    $scope.updateNpNumber=function() {
    	
        //This variable allows the data field to be updated.
        $scope.updateNpBase =1;
        $scope.populateTable();
    }
    //end

   
    //begin code to display the test details in the table at the bottom
    $scope.populateTable=function() {
    	
        //Get the data from server of this NpBase and keep updating the table
        $http.get(ASSET_URL_BASE+"?npBase="+$scope.npNumber)
            .success(function(data) {
              console.log(data);
                $scope.assetTable=[];
                for(var asset in data)
                { 	
            		if(data[asset].npNumber.match(/^X?[0-9]*[/][0-9]{2}[:][0][0]/) || data[asset].npNumber.match(/^X?[0-9]*[/][0-9]{2}[:]\w+$/)){
            			//console.log($scope.assetTable[asset].npNumber.substring($scope.assetTable[asset].npNumber.indexOf(":")+1,$scope.assetTable[asset].npNumber.indexOf(":")+3));
            			$scope.assetTable.push(data[asset]);
            			
            			console.log($scope.assetTable);
            			
            		}
            		else
            			console.log(data[asset]);
                }
            })
            
            
    }
    //end of code
    
    var flag=true;
    
    $scope.myVar1=false;
    
    
    //begin code to dave the sample data in the db and display the same back again in the table
    $scope.save=function(){
    	
    	 $scope.myVar1=true;
    	 
    	var config1 = {
                   headers : {
                       'Content-Type': 'text/plain;charset=utf-8;'
        					}
        };
    	
    	
    	//RestCall write and get data
    	var data1 = 
      	  {
	       "parm1":"14",
	       "parm2": "H-2002190028"
	      };
    	
       $http.post(URL_BASE+'ehosp/testRequestDetailsUsingSampleId',data1,config1).then(function(response){
    	   
    	 
    	   //http://localhost:8080/Sample_Tracker/webapi/ehosp/getTestDetails?test_id=73&subtest_id=3
    	   
    	   if(response["data"]!=""){
    		   
    	   $http.get(URL_BASE+'ehosp/getTestDetails?test_id='+response["data"]["sample_test"][0]["Test_Id"]+'&subtest_id='+response["data"]["sample_test"][0]["Sub_Test_Id"]).success(function(data) {
	        	
    		   $scope.stestname=response["data"]["sample_test"][0]["Test_Name"];
	           $scope.ssubtestname=response["data"]["sample_test"][0]["Sub_Test_Name"];
	           
	        	 if($scope.externalVal){
	        		 
	        	 multipleArray1=$scope.multipleArray;
         		 $scope.testOne(multipleArray1);
         		   
	        	 }else{
	        		 
	        	$scope.create();
	           	$scope.asset.quantity=1;
	           	$scope.asset.specimen = data["specimen"];
	           	$scope.asset.fixative = data["fixative"];
	           	$scope.asset.biopsy = data["biopsy_type"];
	           	
	           	$scope.populateTable();
	        	 }
	            $scope.myVar1=false;

			})
	        .error(function(data) { 
	        	
	        	// $scope.myVar1=false;
	        	
			
			});
    	   
                   }else{
                	   
                	   if($scope.externalVal){
                		   
                		   multipleArray1=$scope.multipleArray;
                		   $scope.testOne(multipleArray1);
                		   $scope.myVar1=false; 
                		   
                	   }else{
                		   
                	  
                	//if autopopulate is not working 
                	$scope.create();
                   	$scope.asset.quantity=$scope.asset.quantity;
                   	$scope.asset.specimen = "Tissue";
                   	$scope.populateTable();
                    $scope.myVar1=false;
                	
                   }
    		   
    	   }
    	   
		});
    	
    }
    //end of code
    
    
    
    //begin code to Create new Asset for the patient
    $scope.create=function() {
    	
        var url = "";
        
       
        
        if((!($scope.asset.specimen == "" || $scope.asset.biopsy == "" ))) {
        	
        	
 
            if((($scope.asset.specimen=="Block" || $scope.asset.specimen=="Blocks" || $scope.asset.specimen=="Stained Slide" || $scope.asset.specimen=="Unstained Slide"
            	|| $scope.asset.specimen=="Slides for Opinion") && $scope.asset.fixative == "")||$scope.asset.fixative != "")
            {
            	
                if ($scope.asset.specimen == "Tissue" || $scope.asset.specimen == "Fluid" || $scope.asset.specimen == "Frozen"){
                   
                	url = ASSET_URL_BASE + "/tissue?stationId=1&technician="+$scope.username+"&np=" + $scope.npNumber+"&review="+$scope.asset.comment+"&quantity="+$scope.asset.quantity;
                
                }else if ($scope.asset.specimen == "Block" || $scope.asset.specimen == "Blocks"){
                	
                    url = ASSET_URL_BASE + "/block?stationId=1&technician="+$scope.username+"&np=" + $scope.npNumber+"&review="+$scope.asset.comment+"&quantity="+$scope.asset.quantity;
                }else if ($scope.asset.specimen == "Stained Slide" || $scope.asset.specimen == "Unstained Slide" ||  $scope.asset.specimen == "Slides for Opinion"){
                	
                	url = ASSET_URL_BASE + "/slide?stationId=1&technician="+$scope.username+"&np=" + $scope.npNumber+"&review="+$scope.asset.comment+"&quantity="+$scope.asset.quantity;
                }else{
                	
                	url = ASSET_URL_BASE + "/tissue?stationId=1&technician="+$scope.username+"&np=" + $scope.npNumber+"&review="+$scope.asset.comment+"&quantity="+$scope.asset.quantity;
                }
               
              
                if($scope.ncsModel==false){	
                	
                			var assetDetails = {
		                    biopsy: $scope.asset.biopsy,
		                    fixative: $scope.asset.fixative,
		                    specimen: $scope.asset.specimen,
		                    
		                    
		                	};
                			
                			
		                   $http.post(url, assetDetails, {headers: {'Content-Type': 'application/json'}})
		                    .then(function successCallback(response) {
		                        $('#insertModal').modal('hide');
		                       
		                      
		                        $scope.populateTable();
		                        $scope.asset.fixative = "";
		                        $scope.asset.corrective = '';
		                        $scope.asset.preventive = '';
		                        $scope.asset.faculty = '';
		                        $scope.asset.ncsType = '';
		                        $scope.asset.fixative = "";
		                    }, function errorCallback(response) {
		                    	console.log(response);
		                    });
                }else if((!($scope.ncsType=="" || $scope.asset.faculty=="" || $scope.asset.preventive=="" || $scope.asset.corrective == ""))){		
                		
                		
                	
                			var assetDetails = {
		                    biopsy: $scope.asset.biopsy,
		                    fixative: $scope.asset.fixative,
		                    specimen: $scope.asset.specimen,
		                    corrective:$scope.asset.corrective,
		                    preventive:$scope.asset.preventive,
		                    faculty:$scope.asset.faculty,
		                    technician_name:$scope.asset.technician,
		                    ncsType:$scope.asset.ncsType,
		                    ncs:1
		                };
                			
	                	$http.post(url, assetDetails, {headers: {'Content-Type': 'application/json'}})
	                    .then(function successCallback(response) {
	                        $('#insertModal').modal('hide');
	                       
	                       
	                        $scope.populateTable();
	                       
	                        $scope.asset.fixative = "";
	                        $scope.asset.corrective = '';
	                        $scope.asset.preventive = '';
	                        $scope.asset.faculty = '';
	                        $scope.asset.ncsType = '';
	                        $scope.asset.fixative = "";
	                    }, function errorCallback(response) {
	                    	console.log(response);
	                    });
                }else {
                	
                	console.log("Complete all fields! 1...");
                	}
            }
            else {
            	
            	console.log("Complete all fields! 2");
            	}
           
        }
        else {
        	
        	console.log("Complete all fields! 3");
        	}

    }
    //end of code

    //begin
    $scope.delete = function(asset){
        // Found that # cannot pass as query parameter
        //Delete only if currentStation is 1
    	var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');

       if(deleteUser){
    	   
        if(asset.currentState==1){
        	
            var npNumber = asset.npNumber.replace("#","-").replace("#","-").replace("#","-");
            var url = ASSET_URL_BASE +"?npNumber="+npNumber;
            
            $http.delete(url,{headers: {'Content-Type': 'application/json'}})
                .then(function successCallback(response) {
                    $scope.populateTable();
                    console.log("deleted...");
                }, function errorCallback(response) {
                });
            $scope.populateTable();
        }
        else 
            alert("The asset has already passed this Station. You are not allowed to delete");
       }
    }
    //end 
    
    
    $scope.edit = {};

    //begin
    $scope.edit=function (editasset){
    	
    	
        $('#editModal').modal('show');
        $scope.asset.npNumber = editasset.npNumber;
        $scope.edit.fixative=editasset.fixative;
        $scope.edit.biopsy=editasset.biopsy;
        $scope.edit.specimen=editasset.specimen;
        $scope.edit.corrective=editasset.corrective;
        $scope.edit.preventive=editasset.preventive;
        $scope.edit.faculty=editasset.faculty;
        $scope.edit.ncsType=editasset.ncsType;
        $scope.markNcs = editasset.ncs==0 ? false : true;
    }
    //end
    
    
    //begin
    $scope.update=function(){
    	
        if($scope.markNcs==false){
        	
        	var assetDetails={
            npNumber : $scope.asset.npNumber,
            biopsy: $scope.edit.biopsy,
            fixative: $scope.edit.fixative,
            specimen: $scope.edit.specimen,
            
        };
        if($scope.edit.fixative == '' || $scope.edit.specimen==''){
        	
        	console.log("Complete all fields! ");
    		return;
        }
        }else{
        	
        	var assetDetails={
                    npNumber : $scope.asset.npNumber,
                    biopsy: $scope.edit.biopsy,
                    fixative: $scope.edit.fixative,
                    specimen: $scope.edit.specimen,
		        	corrective:$scope.edit.corrective,
		            preventive:$scope.edit.preventive,
		            faculty:$scope.edit.faculty,
		            ncsType:$scope.edit.ncsType,
		            ncs:1
        	}; 
        	if($scope.asset.npNumber=='' || $scope.edit.biopsy=='' || $scope.edit.fixative == '' || $scope.edit.specimen=='' || $scope.edit.corrective =='' || $scope.edit.preventive =='' || $scope.edit.faculty =='' || $scope.edit.ncsType=='')
        	{
        		
        		console.log("Complete all fields! ");
        		return;
        	}
        }
        $http.put(ASSET_URL_BASE, assetDetails ,{headers: {'Content-Type': 'application/json'}})
            .then(function successCallback(response) {
                $('#editModal').modal('hide');
                $scope.populateTable();
               
            }, function errorCallback(response) {
            });
    }
    //end 
    
    
    //begin
  //begin
    $scope.printAllAssets=function(){
    	
    	var d= new Date();
		var mon=d.getMonth();
		
		if ($scope.assetTable[0].specimen == "Stained Slide" || $scope.assetTable[0].specimen == "Unstained Slide" || $scope.assetTable[0].specimen == "Slides for Opinion")
		    var type="Sli ("+$scope.assetTable.length+") "+$scope.assetTable[0].npNumber.charAt($scope.assetTable[0].npNumber.length-1)+"-"+$scope.assetTable[$scope.assetTable.length-1].npNumber.charAt($scope.assetTable[$scope.assetTable.length-1].npNumber.length-1);
		else if($scope.assetTable[0].specimen == "Blocks")
			var type=$scope.assetTable[0].specimen.substring(0, 3)+" ("+$scope.assetTable.length+") "+$scope.assetTable[0].npNumber.charAt($scope.assetTable[0].npNumber.length-1)+"-"+$scope.assetTable[$scope.assetTable.length-1].npNumber.charAt($scope.assetTable[$scope.assetTable.length-1].npNumber.length-1);
		else
			var type=$scope.assetTable[0].biopsy.substring(0, 3)+" ("+$scope.assetTable.length+") "+$scope.assetTable[0].npNumber.charAt($scope.assetTable[0].npNumber.length-1)+"-"+$scope.assetTable[$scope.assetTable.length-1].npNumber.charAt($scope.assetTable[$scope.assetTable.length-1].npNumber.length-1);
		mon++;
		var date=d.getDate()+"-"+mon+"-"+d.getFullYear();    
    	var array=[];
    	var tissue=[];
    	var slide=[];
    	var block=[];
    	
    	for(var asset in $scope.assetTable){
    		
    		if($scope.assetTable[asset].specimen=="Stained Slide" || $scope.assetTable[asset].specimen == "Unstained Slide" || $scope.assetTable[asset].specimen == "Slides for Opinion")
    			slide.push($scope.assetTable[asset]);
    		else if($scope.assetTable[asset].specimen == "Blocks")
    			block.push($scope.assetTable[asset]);
    		else
    			tissue.push($scope.assetTable[asset]);
    		
    		
    		if($scope.assetTable[asset].biopsy == undefined){
    				$scope.assetTable[asset].biopsy =  "Nil"
    		}

    	
    		
    		array.push({
                    Np_Number : $scope.assetTable[asset].npNumber,//.replace("|","/").replace("|"," ").replace("|"," ").replace("|"," "),
                    UHID : $scope.patient.UHID,
                    Name : $scope.patient.patientName,
                    Date : date,
                    Age : $scope.patient.age,
                    Sex : $scope.patient.sex,
                    Type : $scope.assetTable[asset].biopsy.substring(0, 3),
                });
    	}
    	
    	
    	array.push({
    			Np_Number : $scope.assetTable[0].npNumber.substring(0,$scope.assetTable[0].npNumber.indexOf(":")),
    			UHID : $scope.patient.UHID,
                Name : $scope.patient.patientName,
                Date : date,
                Age : $scope.patient.age,
                Sex : $scope.patient.sex,
                Type : type
    		
    	})
    	array.push({
    			Np_Number : $scope.assetTable[0].npNumber.substring(0,$scope.assetTable[0].npNumber.indexOf(":")),
    			UHID : $scope.patient.UHID,
                Name : $scope.patient.patientName,
                Date : date,
                Age : $scope.patient.age,
                Sex : $scope.patient.sex,
                Type : type
    		
    	})
    	alasql('SELECT * INTO CSV("RecievingStation.csv",{headers:true}) FROM ?',[array]);
    	
    }
    //end 
    
    //end 
    
    
    //begin
    $scope.printAsset= function (printNp,index) {

    	var d= new Date();
    	var mon=d.getMonth();
    	mon++;
    	var date=d.getDate()+"-"+mon+"-"+d.getFullYear();    
    	
    	console.log(printNp);
    	console.log($scope.patient)
    	console.log($scope.assetTable)
    	console.log($scope.assetTable[index])
    	
    	//newly added code -  printasset was not working for external sample with specimen blocks,slides for opinion and blocks and slides
    	//as there is no biopsy type (modified specimen and biopsy type options)
    	
    	
    	if( $scope.assetTable[index].specimen == "Blocks" || $scope.assetTable[index].specimen == "Slides for Opinion" ||
    			$scope.assetTable[index].specimen == "Blocks and slides" ){
    	
    	var array = [
                {
                	NP_Number : printNp,//.replace("|","/").replace("|"," ").replace("|"," ").replace("|"," "),
                    UHID : $scope.patient.UHID,
                    Name : $scope.patient.patientName,
                    Date : date,
                    Age : $scope.patient.age,
                    Sex : $scope.patient.sex.charAt(0),
                    Type : "Nil"
                }];
    	alasql('SELECT * INTO CSV("RecievingStation.csv",{headers:true}) FROM ?',[array]);
    	}else{
    	var array = [
                {
                	NP_Number : printNp,//.replace("|","/").replace("|"," ").replace("|"," ").replace("|"," "),
                    UHID : $scope.patient.UHID,
                    Name : $scope.patient.patientName,
                    Date : date,
                    Age : $scope.patient.age,
                    Sex : $scope.patient.sex.charAt(0),
                    Type : $scope.assetTable[index].biopsy.substring(0, 3)
                }];
    	alasql('SELECT * INTO CSV("RecievingStation.csv",{headers:true}) FROM ?',[array]);
    	}
            //alasql('SELECT * INTO CSV("RecievingStation.csv",{headers:true}) FROM ?',[array]);
        };
        //end
        
        
        //begin
        $scope.openTemplate = function(){
        	var selected = $('#template_dropdown option:selected');
        	
        	
        }
        //end
        
        
        $(function(){
            $('#upload_button').click(upload);
           // $('#upload_redcord').click(upload_record);
            
        });
        
        $scope.files = []; 
        $scope.myImage1=false;
        $scope.pic = '';
        $scope.file_array = [];
        
        
        //begin code to upload files in the popup upon clicking the upload file button
        $scope.upload=function(){
        	
        	var file= document.getElementById("fileid").files[0];
        	var formData = new FormData();
        	
        	
        	if(($scope.npNumber != "" && file != undefined)){
        	 	
        	$scope.myImage1=true; 
            formData.append('file', file);
            formData.append('np_base', $scope.npNumber);
            
            for (var value of formData.values()) {
            	   console.log(value); 
            }

        
        $http.post(URL_BASE+'ehosp/uploadPdf', formData, {
            
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
         })
         .success(function() {
         	alert("Successfully uploaded the file");
         	$("#uploadModal").modal("hide");
         	 $scope.myImage1=false; 
         })
         .error(function() {
         	alert("Error in uploading the file");
         	$scope.myImage1=false; 
         });
        
     
    	}else{
    		
    		alert("Please select file");
    	}
        }
        //end of code
        
        
        
        $scope.file_array = [];
        $scope.pic = '';
        $scope.upload_id = '';
        
        //begin code to display the uploaded file names in the popup upon clicking the upload file button
        $scope.getFiles =  function(){
        	
        	
        	$http.get(ASSET_URL_BASE+"/getlistofimage?np_base="+$scope.npNumber)
            .success(function(data) {
               
                
                if(data.length == 0){
                	
                	var fileFrame = document.getElementById("myFrame");
            		fileFrame.style.display="none";
                	$("#button_view").addClass("hidden");
                	$("#button_delete").addClass("hidden");
                }else{
                	
                	$("#button_view").removeClass("hidden");
                	$("#button_delete").removeClass("hidden");
                	$scope.file_array= data;
                }
              
            })
        }
        //end of code
        
        //begin code to view the uploaded files from the pop up upon click upload file button
        $scope.viewFile = function(file_url){
        	
        	
        	if(file_url != ""){
        	var fileFrame = document.getElementById("myFrame");
        	var tabOrWindow = window.open(BASE_URL1+file_url, '_blank');
       	 	tabOrWindow.focus();
        	}else{
        		alert("No file exists");
        	}
        }
        //end of code


      //begin code to delete the uploaded files from the pop up upon click upload file button
        $scope.deleteFile = function(upload_id){
        	
        	if(upload_id != ""){
        	$http.get(URL_BASE+"ehosp/deleteFile?np_upload_id="+upload_id)
            .success(function(data) {
               
            	alert("Successfully deleted file");
            	 $("#uploadModal").modal("hide");
                
                $scope.pic = ""; 
              	$scope.file_array = [];
              	$('#fileid').val("");
              	$("#myFrame").hide();
              	$("#myFrame").contents().find("body").html("");
               
                
                
            })
        	}else{
        		alert("No file exists");
        	}
        	
        }
        //end of code
        
            	
     
        //begin 
        $scope.testOne=function(obj) {
        	
           url = ASSET_URL_BASE + "/addExternalSample?stationId=1&technician="+$scope.username+"&np=" + $scope.npNumber;
           
           var myJSON = JSON.stringify(obj);
        	
        	$http.post(url, myJSON, {headers: {'Content-Type': 'application/json'}})
            .then(function successCallback(response) {
            	 $scope.populateTable();
            	// alert("we are here");
            }, function errorCallback(response) {
            	console.log(response);
            });
        	
        }
        //end
        
        
    
        // begin code to go to the externalsample display page upon clicking the external samples button
         $scope.external_Samples = function(){
        	window.location.href="externalSampleDisplay.html";
        }
         //end of coder
       
         
         //begin code to reset the second and third drop downs when selecting options in first drop down otherwise shows previous options
         $scope.resetSecondSelect = function(){
        	 $scope.asset.biopsy = "Nil";
        	 $scope.asset.fixative = "";
         }
         //end 
         
         
         //begin code to reset the third drop down when selecting option in second drop down at the bottom table
         $scope.resetThirdSelect = function(){
        	 $scope.asset.fixative = "";
        	 
         }
         //end
         
         
         $scope.faculty_Array_ncs = [];
         //begin code to get all doctors  and technicians names  in the NCS faculty and technician drop downs
         $scope.getAllStaffs=function(){
         	
         	
         	$http.get(TECHNICIAN_URL_BASE+"/withstation?stationId=1")
             .success(function(data) {
             
             	
             	
             	$scope.faculty_Array1 = data.filter(function( obj ) {
             	    return obj.roles === "faculty";
             	});
             	$scope.residentArray = data.filter(function( obj ) {
             	    return obj.roles === "resident";
             	});
             	$scope.technicianArray = data.filter(function( obj ) {
             	    return obj.roles === "technician";
             	});
             	
             	
             	$scope.faculty_Array_ncs = $scope.faculty_Array1.concat($scope.residentArray);
             	
           
             })
             .error(function(data) {
                 //alert("Errors in loading technicians");
                 
             });
         	
         }
         //end of code
         
         $scope.getAllStaffs();
});




	