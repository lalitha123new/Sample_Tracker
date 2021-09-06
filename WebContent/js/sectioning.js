var app = angular.module('sectioningStation', ['ui.bootstrap','ngCookies']);
app.controller('SectioningController',function($scope,$http,$window,$cookieStore,$timeout)
{	
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var STATION_BASE_URL=URL_BASE+"station";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    var SPECIAL_REQUEST_URL = URL_BASE + "specialrequests";
    $scope.username=$cookieStore.get('username');
    $scope.residentname = $cookieStore.get('residentname');
    
    $scope.task = false;
    // true if pending tasks or Completed Tasks else false for Scan Barcode Screen
    $scope.npNumberValue='';
    $scope.asset='';
    $scope.assetData = {};
    $scope.patient={};
    $scope.step1=true;
    $scope.label='';
    $scope.showUserName=false;
    $scope.special_data_array = [];
    $scope.isDisabled = false;
    
    //begin 
    $scope.setResident=function() {
            $cookieStore.put('residentname',$scope.residentname);
            
    }
    //end
    
    $scope.resTable=[]
    
    $scope.getResident = function(){
    	
        $http.get(TECHNICIAN_URL_BASE+"/withrole?role=resident")
        .success(function(data) {
        	
        	$('#residentModal').modal('show');
           $scope.resTable=data;
           console.log(data);
        })
        .error(function(data) {
			  //newly added error code
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    }
    
    
    $scope.user_id = '';
    $scope.resultObject = [];
    
    $scope.search = function(nameKey, myArray){
    		
	    for (i=0;i < myArray.length; i++) {
	        var marvelHeroes =  myArray.filter(function(hero) {
			return hero.technicianName == nameKey;
			});
	        return marvelHeroes;
	             
	    }
    }
    
    //begin code to get the logged in user details using the username
    $scope.setUsername=function() {
    	
    	$scope.resultObject = $scope.search($scope.users, $scope.techTable);
    	 $cookieStore.put('user_id',$scope.resultObject[0].technician_id); 
    	
        $scope.invalidPassword = false;
        $http.post(URL_BASE+"login?username="+$scope.users+"&password="+$scope.password)
        .success(function(data) {
        	
           $scope.showUserName=true;
           $scope.showLogout=true;
           $scope.username=$scope.users;
           $cookieStore.put('username',$scope.username);
           $scope.invalidPassword = false;
           jQuery('#loginModal').modal('hide');    
        })
        .error(function(data) {  
           
        	$scope.invalidPassword = true;
            
        });
    }
    //end of code
   
    $scope.tech={};
    
    
    //begin code to enable or disable logout button based on login
    if($scope.username!=undefined)
    	$scope.showLogout=true;
    else
    	$scope.showLogout=false;
    //end
    
    
    
    $scope.techTable=[];
    
    //begin code to get all staff details
    $scope.getAllUsers=function(){
    	
    	$http.get(TECHNICIAN_URL_BASE+"/withstation?stationId=4")
        .success(function(data) {
        	$('#loginModal').modal('show');
            $scope.techTable=data;
           
        })
        .error(function(data) {
			  //newly added error code
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    }
    //end of code
    
    //begin code for logout
    $scope.logout=function(){
    	
    	$cookieStore.remove("username");
    	$cookieStore.remove("residentname");
    	$window.location.reload();
    }
    //end of code
    
    
    //begin code to generate slides
    $scope.doSectioning = function(asset){
    	
    	$scope.npNumberValue = asset.npNumber;
    	$scope.getAssetDetails();
    	$scope.task = false;
    }
    //end of code
    
    var npSpecial ='';
    $scope.msg_np='';
    
    //begin code to get the asset details for the np number entered
    $scope.getAssetDetails=function () {
    	
    	if($scope.username==null)
    		$scope.getAllUsers();
    	
    	else{
    		
	    	var tempString = $scope.npNumberValue + ";";
	    	var test = tempString.substring(0,tempString.indexOf(";"));
	    	 $scope.getSpecialDataRows($scope.npNumberValue);
	    	test=test.toUpperCase();
	    	$scope.npNumberValue=test;
	    	$scope.viewunMessageRegular(test);
	    	$scope.getAllNCSAssets(test);
	    	npSpecial = $scope.npNumberValue;
	    	
	        if($scope.npNumberValue.indexOf(':')==-1){
	        	alert("Invalid Scan. Please Scan Again");
	        	return;
	        }
	        
	        $http.get(ASSET_URL_BASE+"/scan?np="+test+"&stationId=4&technician="+$scope.username+"&assistant="+$scope.residentname,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
	            .then(function successCallback(response) {
	                $scope.asset=response.data;
	                $scope.populateTable();
	                $scope.getPatientDetails();
	                $scope.step1=false;
	            },function errorCallBack(err) {
	              
	                   alert("Invalid Scan. Please Scan Again");
	                
	            })
	    	}
    }
    //end of code
    
    
    //begin code to fetch patient details when displaying the message upon clicking the view
    //button in the notification pop up
    $scope.getAssetDetailsMessage=function () {
    	
    	if($scope.username==null)
    		$scope.getAllUsers();
    	
    	else{
    		
	    	var tempString = $scope.npNumberValue + ";";
	    	var test = tempString.substring(0,tempString.indexOf(";"));
	    	 $scope.getSpecialDataRows($scope.npNumberValue);
	    	test=test.toUpperCase();
	    	$scope.npNumberValue=test;
	    	npSpecial = $scope.npNumberValue;
	    	
	        if($scope.npNumberValue.indexOf(':')==-1){
	        	alert("Invalid Scan. Please Scan Again");
	        	return;
	        }
	        
	        $http.get(ASSET_URL_BASE+"/scan?np="+test+"&stationId=4&technician="+$scope.username+"&assistant="+$scope.residentname,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
	            .then(function successCallback(response) {
	                $scope.asset=response.data;
	                $scope.populateTable();
	                $scope.getPatientDetails();
	                $scope.step1=false;
	            },function errorCallBack(err) {
	             
	                   alert("Invalid Scan. Please Scan Again");
	                
	            })
	    	}
    }
    //end of code
    
    
    
    $scope.checkArray = [];
    
    //begin
    $scope.FormateDate = function(oldDate){
    var newDate=new Date(oldDate.toString().split("-").reverse().join("-"));
    return newDate;
    }
    //end
    
    
    //begin code to get the special instructions data for a block 
    //and display in the special instructions table if data is there else special instructions table is not displayed
    $scope.getSpecialDataRows =  function(npSpecial){
    	
    	$scope.special_data_array = [];
    	
    	 $http.get(SPECIAL_REQUEST_URL+"/getSpecialInc?npNumber="+npSpecial)
         .then(function successCallback(response) {
        	 
        	//if special instructions data is there display the table special instructions else not
        	if(response.data.length>0){
        		$("#table5").removeClass("hidden");
        	}
        	
        	 $scope.special_data_array = response.data;
        	 
        	 
        	 for(var i=0;i<$scope.special_data_array.length;i++){
        		 	var d = new Date($scope.special_data_array[i].createdAt);
        	    	
        	    	 $scope.special_data_array[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
        	    	 d.getHours() + ":" + d.getMinutes();
        	    	
        	    	 $scope.checkArray.push($scope.special_data_array[i].special_request_id);
        	 }
        	 $scope.getSlidesDone($scope.checkArray);
        	 
             
         },function errorCallBack(err) {
          
                alert("Invalid Scan. Please Scan Again");
             
         })
    	
    }
    //end of code
    
    
    $scope.special_data_array1 = [];
    $scope.x;
    
    
    //begin code to get the status of special slides and change the color of row as green or pink
    $scope.getSlidesDone = function(array1){
   	
   	 for(var i=0;i<array1.length;i++){
   		 
   		 $http.get(SPECIAL_REQUEST_URL+"/makeSpecialIncDone?special_request_id="+array1[i])
            .success(function (data) {
              $scope.x= data.done;
               
            }).error(function(data) {
   			  
   	    	  //console.log(data);
   	        
   	    });
   		 
   		 
   	 }
   	 
    }
    //end of code
    
    $scope.hosp_name =  "";
    //begin code to get the patient details for the np number entered
    $scope.getPatientDetails=function() {
    	
        var npbase=$scope.npNumberValue.substring(0, $scope.npNumberValue.indexOf(":"));
        $http.get(REQUEST_URL_BASE+"?npbase="+npbase)
            .success(function (data) {
                $scope.patient=data;
                if($scope.patient.unit_name){
                	$scope.hosp_name = "NIMHANS";
                }
               
               
            });
    }
    //end of code

    $scope.number=1;
    
    //begin code to generate slides upon clicking the add slide button (only for special instructions are there) and 
    //and display the special instruction test details in the table at the bottom
    $scope.generateSlides= function(np,special_stain,ihc,others) {
    	$scope.generateArray = [];
    	var number= 1;
    	var temp = "";
    	var temp1 ="";
    	var temp2 ="";
    	var temp3 ="";
    	
    	
    	 if(special_stain){
    		 
    		 if(special_stain.includes(",")){
     			
     			var specialArr = special_stain.split(",");
     			
     		     for(var i=0;i<=(specialArr.length-1);i++){	
     			
           		    $scope.generateArray.push("special_stain@@"+specialArr[i]);
           		
           		    }
       		}else{
    		     $scope.generateArray.push("special_stain@@"+special_stain);
    		
    	     }
    		 
    	 }
    	 
    	if(ihc){
    		
    		 if(ihc.includes(",")){
      			
      			var ihcsArr = ihc.split(",");
      			
      			for(var i=0;i<=(ihcsArr.length-1);i++){
      			
       		          $scope.generateArray.push("ihc@@"+ihcsArr[i]);
      			}
      			
    	     }else{
    		
    		    $scope.generateArray.push("ihc@@"+ihc);
    	     }
    		 
    	}
    	
    	if(others){
    		
    		if(others.includes(",")){
    			
    			var othersArr = others.split(",");
    			
    		      for(var i=0;i<=(othersArr.length-1);i++){
    			
        		    $scope.generateArray.push("others@@"+othersArr[i]);
        		 
    			   }
    		}else{
    		     $scope.generateArray.push("others@@"+others);
    		 
    		}
    		
    	}
    	
    	var spcial_request_arr1="";
    	
    	var j=0
    	for(var i=0;i <= ($scope.generateArray.length-1);i++){
    		
    		spcial_request_arr1+="##"+$scope.generateArray[i];
    	}
    		
        var url=ASSET_URL_BASE+"/block/generateMoreslides?technician="+$scope.username+"&number="+number+"&npNumber="+$scope.npNumberValue+"&stainName= stainname";
   		 $http.post(url,{spcial_request_arr1},{async:true},$scope.asset).success(function(data) {
   			 
   				$scope.populateTable();
   			
       })
    	
    }
    //end of code
    
 
    
    //begin
    $scope.addSlide = false;
    $scope.addSlide1 = false;
    
    $scope.createSlide = function(){
    	
    	$scope.addSlide = !$scope.addSlide;
    }
    $scope.createSlide1 = function(){
    	
    	$scope.addSlide1 = !$scope.addSlide1;
    }
    //end
    


//new code added on 2020 and function parameters special, ihc and other are also new
$scope.special_stain = '';
$scope.ihc = '';
$scope.others= '';
$scope.status = "";
$scope.new_array = [];

	//begin code to save the generated slide(upon clicking the add slide button) details upon clicking the save button
	//and display in the table at the bottom - this is normal flow
    $scope.saveSlide = function(stainName,special_stain,ihc,others,number,special,ihc,other){
    	
    	$scope.new_array.push(number);
    	sessionStorage.setItem("new_data", $scope.new_array);
    	
    	
    	var uri = stainName;
    	var temp ="";
    	
    	
    	if(stainName == undefined && special_stain == "" && ihc == "" && others == "" ){
    	
    		stainName = "H&E";
    		 uri = stainName;
    	}
    	
    	if(stainName){
    		 temp = encodeURIComponent(uri);
    		
    	}else if(special_stain){
    		
    		 temp = "special_stain@@"+special_stain;
    		
    	}else if(ihc){
    		
    		 temp = "ihc@@"+ihc;
    		 
    	}else if(others){
    		
    		 temp = "others@@"+others;
    		
    	}else{
    		 temp = encodeURIComponent(uri);
    	}
    	
    	$scope.addSlide = false;
    	if((stainName) || (special_stain) || (ihc) || (others)){
    		
	    	var url=ASSET_URL_BASE+"/block/generateslides?technician="+$scope.username+"&number="+number+"&npNumber="+$scope.npNumberValue+"&stainName="+temp;
	    	
	        $http.post(url,$scope.asset).success(function(data) {
	    	
	       	 $scope.addSlide = false;
	            $scope.populateTable();
	        })
    	}else {
    		
    		$scope.addSlide = false;
    		
    	}
    }
    //end of code
    
    //begin code to mark a block as complete and remove it from the list of special instructions list upon clicking the 
    // mark as complete button - not tested functionality
    
    $scope.markSlide = function(){
    	
    	 $http.get(ASSET_URL_BASE+"/scanSectioning?np="+$scope.npNumberValue+"&stationId=4&technician="+$scope.username+"&assistant="+$scope.residentname,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
         .then(function successCallback(response) {
        	 alert("Marked Successfully as complete");
             
         },function errorCallBack(err) {
          
                alert("Error");
             
         })
    	
    }
    //end of code

    $scope.assetTable=[];
    $scope.disableGenarateSlide = false;
    
    $scope.special_array = [];
    
    //begin code to display the table at the bottom with the regular stain or special stain data
    $scope.populateTable=function () {
    	
        $scope.assetTable=[];
        var test= $scope.npNumberValue;
      
        $http.get(ASSET_URL_BASE+"/slide?npBase="+test,{headers: {'Content-Type': 'application/json'}})
            .success(function (data) {
            	$scope.assetTable=data;
            	for(var i=0;i<$scope.assetTable.length;i++){
            		
            		var d = new Date($scope.assetTable[i].createdAt);
        	    	 $scope.assetTable[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
        	    	d.getHours() + ":" + d.getMinutes();
        	    	if($scope.assetTable[i].createdAt==="NaN-NaN-NaN NaN:NaN"){
        	    		$scope.assetTable[i].createdAt = "NA";
            		}else{
            			
            			$scope.assetTable[i].createdAt = $scope.assetTable[i].createdAt;
            		}
            		
            		if($scope.assetTable[i].stain_name.includes("special_stain@@")){
            			$scope.special_array = [];
            			
            			 $scope.special_array = $scope.assetTable[i].stain_name.split("special_stain@@");
            			 $scope.assetTable[i].stain_name = '';
            			 $scope.assetTable[i].special_stain1 = $scope.special_array[1];
            		}else if($scope.assetTable[i].stain_name.includes("ihc@@")){
            			$scope.special_array = [];
            			 $scope.special_array = $scope.assetTable[i].stain_name.split("ihc@@");
            			 $scope.assetTable[i].stain_name = '';
            			 $scope.assetTable[i].ihc1 = $scope.special_array[1];
            		}else if($scope.assetTable[i].stain_name.includes("others@@")){
            			$scope.special_array = [];
            			 $scope.special_array = $scope.assetTable[i].stain_name.split("others@@");
            			 $scope.assetTable[i].stain_name = '';
            			 $scope.assetTable[i].others1 = $scope.special_array[1]+ " H & E";
            		}
            		
            	}
            
           
            if($scope.assetTable.length == 0){
            	
            	//below code inserts numerous rows in transaction table
            	//$scope.generateSlides();
            }
            
        });
    }
    //end of code

    
    $scope.edit = {};

    //begin
    $scope.edit=function (editasset){
        $scope.edit.npNumber = editasset.npNumber;
        $scope.edit.fixative=editasset.fixative;
        $scope.edit.biopsy=editasset.biopsy;
        $scope.edit.specimen=editasset.specimen;
    }
    //end
    

    //begin
    $scope.update=function(){
    	
        var assetDetails={
        		
            npNumber : $scope.edit.npNumber,
            biopsy: $scope.edit.biopsy,
            fixative: $scope.edit.fixative,
            specimen: $scope.edit.specimen
        };
        $http.put(ASSET_URL_BASE, assetDetails ,{headers: {'Content-Type': 'application/json'}})
            .then(function successCallback(response) {
            	window.location.reload();
            }, function errorCallback(response) {
            });
    }
    //end

    //begin code to add generated slide to print queue
    $scope.printAsset= function (asset) {
    	
    	var npBase = asset.npNumber.substring(0,asset.npNumber.indexOf(':'));
    	var npTail = asset.npNumber.substring(asset.npNumber.indexOf(':')+1,asset.npNumber.length);
    	var commanStain ;
    	
    	if(asset.stain_name){
    		 commanStain =	 asset.stain_name;
    	}else if(asset.special_stain1){
    		commanStain =	 asset.special_stain1;
    	}else if(asset.ihc1){
    		commanStain =	 asset.ihc1;
    		
    	}else if(asset.others1){
    		commanStain =	 asset.others1;
    	}
    	
        var array = [
            {
                Np_Number : asset.npNumber,
                npBase:npBase,
                npTail:npTail,
                Patient_Name : $scope.patient.patientName,
                Stain_Name : commanStain,
                Patient_Age : $scope.patient.patientAge,
            	Biopsy_Type : asset.biopsy,
            	Patient_Gender : $scope.patient.patientSex==0 ? 'M' : 'F'
            }]; 
        $scope.queue=$scope.queue.concat(array);
      
        
    };
    //end of code
    
    $scope.queue=[];
    
    //begin code 
    $scope.addQueue=function(){
    	
    	if($scope.assetTable.length==0)
    		alert("There is no bottles scaned")
    	else
    		{
			var array =[];
			array=alasql('SELECT npNumber,stain_name,biopsy FROM ?',[$scope.assetTable])
			var array2=[];
			for(var i=0;i<array.length;i++){
				
				var npBase = array[i].npNumber.substring(0,array[i].npNumber.indexOf(':'));
				var npTail = array[i].npNumber.substring(array[i].npNumber.indexOf(':')+1,array[i].npNumber.length);
				array2[i]={
						Np_Number : array[i].npNumber,
						npBase:npBase,
						npTail:npTail,
						Patient_Name : $scope.patient.patientName,
						Stain_Name:array[i].stain_name,
						Patient_Age : $scope.patient.patientAge,
						Biopsy_Type : array[i].biopsy,
						Patient_Gender : $scope.patient.patientSex==0 ? 'M' : 'F'
						};
				
			}
			$scope.queue=$scope.queue.concat(array2);
			$scope.clearAll();
    		}
    }
    //end
    
    //begin code to print the slide upon clickign the print queue button
    $scope.printQueue=function(){
    	
    	alasql('SELECT * INTO CSV("SlideNpNumber.csv",{headers:true}) FROM ?',[$scope.queue]);
    }
    //end 
    
   //begin
    $scope.clearAll= function(){
    	 	$scope.task = false;
    	 	$scope.npNumberValue='';
    	    $scope.asset='';
    	    $scope.assetData = {};
    	    $scope.patient={};
    	    $scope.step1=true;
    	    $scope.number=1;
    	    $scope.assetTable=[];
    	    
    }
    //end

    //delete block
    $scope.delete = function(asset){
    	
    	var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');
        if(deleteUser){
        if(asset.currentState==4){
            var url=ASSET_URL_BASE+"?npNumber="+asset.npNumber;
            $http.delete(url,{headers: {'Content-Type': 'application/json'}}).then(function successCallback(response) {
                $scope.populateTable();
            }, function errorCallback(response) {
            });
        }
        else
            alert("The Block has already passed through Embedding. You are not allowed to delete it");
    }
    }
    //end

    //begin code to go the home page to enter the np number
    $scope.scanScreen=function () {
    	
    	$("#asset-list1").removeClass("hidden");
    	$("#asset-list").removeClass("hidden");
    	$("#container6").removeClass("hidden");
        $scope.task = false;
    }
    //end of code
    
    $scope.special_display = '';
    $scope.ihc_display = '';
    $scope.other_display = '';
    
    
    //begin code to get the patient and asset details for a block number upon clicking the scan block button 
    //under the special instructions
    $scope.scanScreen1=function (np,special,ihc,others) {
    	
    	 $scope.special_display = special;
    	 $scope.ihc_display = ihc;
    	 $scope.other_display = others;
    	
    	$scope.npNumberValue = np;
    	
        $scope.task = false;
        
        $scope.getAssetDetails();
    }
    //end of code
    
    $scope.assetTasksTable=[];
    
    
    //begin code to get the pending task list   
    $scope.getPendingTasks=function (){	
    	
    	$("#messageDiv1").addClass("hidden");
    	$("#asset-list1").removeClass("hidden");
    	$scope.myVar = true;
        $scope.label="Pending Assets";
        $scope.assetTasksTable=[];
        $scope.task=true;
        var url=STATION_BASE_URL+"/pending?stationId=4";
        $http.get(url)
            .success(function (data) {
                $scope.assetTasksTable=data;
                $scope.myVar = false;
                //to display latest record first
                $scope.assetTasksTable =  $scope.assetTasksTable.reverse();
                $scope.pendingTasks = $scope.assetTasksTable.length;
            })
    }
    //end of code
    
    //egin code to get the special tasks list
    $scope.getSpecialTasks=function(){
    	$("#messageDiv1").addClass("hidden");
    	$("#asset-list1").removeClass("hidden");
    	$scope.myVar = true;
        $scope.label="Special Tasks";
        $scope.assetTasksTable=[];
        $scope.task=true;
        var url=STATION_BASE_URL+"/special?stationId=4";
        $http.get(url)
            .success(function (data) {
            	
                $scope.assetTasksTable=data;
                for(var i=0;i<$scope.assetTasksTable.length;i++){
                
                if($scope.assetTasksTable[i].createdAt){
                	var d = new Date($scope.assetTasksTable[i].createdAt);
        	    	$scope.assetTasksTable[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
        	    	d.getHours() + ":" + d.getMinutes();
        	    	
                }else{
                	$scope.assetTasksTable[i].createdAt = "";
                }
                }
               
                $scope.myVar = false;
                //to display latest record first
                //$scope.assetTasksTable = $scope.assetTasksTable.reverse();
                $scope.noOfSpecialtasks = data.length;
                $scope.changetoWarning();
            })
        
    }
    //end of code
    
    //begin code to change the color of special instruction button color based on the number of cases
    $scope.changetoWarning = function (){
    	   if($scope.noOfSpecialtasks >= 1)
           	$('#specialTask').addClass('btn-warning');
           else 
           	$('#specialTask').removeClass('btn-warning');
    	
    }
    //end of code
    
    //begin code to get the number of pending cases
    $scope.getLengthofPending = function(){
        var url=STATION_BASE_URL+"/pending?stationId=4";
        $http.get(url)
            .success(function (data) {
                $scope.pendingTasks = data.length;
            })  
    }
    //end of code
    
    //begin code to get the number of special cases
    $scope.getLengthofSpecial = function(){
        var url=STATION_BASE_URL+"/special?stationId=4";
        $http.get(url)
            .success(function (data) {
                $scope.noOfSpecialtasks = data.length;
                $scope.changetoWarning();
            })  
    }
    //end of code
    
    //begin
    $scope.getCompletedTasks=function(){	
    	$scope.label="Completed Assets";
        $scope.assetTasksTable=[];
        $scope.task=true;
        var url=STATION_BASE_URL+"/completed?stationId=4";
        $http.get(url)
            .success(function (data) {
                $scope.assetTasksTable=data;
            })
    }
    //end 
    
    //begin
    $scope.getProcessedTasks = function(){
    	$scope.label="Processed Assets";
        $scope.assetTasksTable=[];
        $scope.npNums = [];
        $scope.task=true;
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
		var start_date = today + " 00:00:00";
		var end_date = today + " 23:59:59";
		
        $http.get(REQUEST_URL_BASE+"/getactivity?stationId=4&technicianName=&assetType=1&startDate="+start_date+"&endDate="+end_date)
        .success(function(data) {
        	
            $scope.addingNoOfBlocks(data);
        }).error(function(data) {
			  //newly added error code
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    }
    //end
    
    //begin
    $scope.addingNoOfBlocks = function(data){
    	
    	for(var asset in data){
    		$scope.getNoOfBlocks(data[asset]);
    	}
    	
    }
    //end
    
    
    $scope.npNums = [];
    //begin
    $scope.getNoOfBlocks = function(asset){
	    	$http.get(ASSET_URL_BASE+"/block?npBase="+asset.npNumber,{async:false},{headers: {'Content-Type': 'application/json'}})
	        .success(function (data) {
	        	asset.noOfBlocks = data.length;
	        	asset.blocks = data;
	        	if(asset.process_status==undefined && $scope.npNums.indexOf(asset.npNumber)==-1){
	        		$scope.npNums.push(asset.npNumber);
	        		$scope.assetTasksTable.push(asset);
	        		$scope.assetTasksTable.sort(function(a, b) {
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
	        	}
	        	//$(".datepicker").datepicker({ dateFormat: 'yy-mm-dd',minDate: 0 });
		    }).error(function(data) {
				  //newly added error code
		    	  alert("Error: server encountered an internal error. Please try again after some time ");
		        
		    });
    }
    //end 
    
    
    $scope.printData=[];
    
    //begin code to download the special instructions list as csv file
    $scope.printQueue1=function(){
    	
    	for(var i=0;i<$scope.assetTasksTable.length;i++){
    		
    		if($scope.assetTasksTable[i].special_stain == undefined){
    			$scope.assetTasksTable[i].special_stain = "NA";
    			
    		}
    		if($scope.assetTasksTable[i].ihc == undefined){
    			$scope.assetTasksTable[i].ihc = "NA";
    			
    		}
			
			
    		$scope.printData[i]={
					Np_Number : $scope.assetTasksTable[i].npNumber,
					Special_Stain : $scope.assetTasksTable[i].special_stain,
					IHC : $scope.assetTasksTable[i].ihc
					
					
					};
    		
			
		}
    	alasql('SELECT * INTO CSV("SpecialTaskTable.csv",{headers:true}) FROM ?',[$scope.printData]);
    }
    //end of code
    
    
    
    $scope.np_Number = '';
    $scope.user_id = '';
    $scope.resultObject1 = [];
    
    //begin code to get the technician Name from the list of technicians for displaying the message table
    $scope.search1 = function(nameKey, myArray){
    	
		
	    for (i=0;i < myArray.length; i++) {
	        var marvelHeroes =  myArray.filter(function(hero) {
			return hero.technician_id == nameKey;
			});
	        return marvelHeroes;
	             
	    }
    }
    //end of code
    
    
    //begin code for getting all technicians data
    $scope.getAllUsers1=function(){
    	
    	
    	$http.get(TECHNICIAN_URL_BASE+"/withstation?stationId=2")
        .success(function(data) {
        	
           $scope.techTable1=data;
      
           
        })
        .error(function(data) {
            //alert("Errors in loading technicians");
            
        });
    	
    }
    //end of code
    
    $scope.getAllUsers1();
    $scope.messages2 = [];
    
    //begin code to get unread messages when clicking bell icon in the notification
    $scope.getMessages = function(){
    	
    	
    	if($scope.username== undefined){
        	alert("Please login");
        	return false;
        	
        }else{
        	
    	$http.get(URL_BASE+"npmessage/getAllmessage?rec_station_id="+4)
        .success(function(data) {
        	            
            for(var i= 0;i<data.length;i++){
            	
            	 var d = new Date(data[i].createdAt);
     	    	
            	 data[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
     	    	d.getHours() + ":" + d.getMinutes();
            	 
            }
            
            $scope.messages = data.filter(data => data.read_flag == 0);
            
            $scope.messages1 = [];
            
            for(var j=0;j<$scope.messages.length;j++){
            	$scope.messages1[j]= $scope.search1($scope.messages[j].user_id, $scope.techTable1);
            	
            	$scope.messages[j].tech= $scope.messages1[j][0].technicianName;
        	
            }
           
            
            //display the latest message first
            $scope.messages.reverse();
            $("#messageModal").modal('show');
           
        }).error(function(data) {
			  
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    		
    }
    	
    }
    //end of code
    
    
    
    //begin code to get notification count
    $scope.getCount = function(){
    	
    	
    	$http.get(URL_BASE+"npmessage/countofmessages?station_id="+4)
        .success(function(data) {
        	
           
            // begin code for bell - bell is displayed only if there is notification
            var notification_count = data;
			var el = document.querySelector('.notification');

			    
			    el.setAttribute('data-count', notification_count);
			    el.classList.remove('notify');
			    el.offsetWidth = el.offsetWidth;
			    el.classList.add('notify');
			    
			    if(notification_count >= 0){
			        el.classList.add('show-count');
			    }
			    if(notification_count  == 0){
			    	
			    	$('#notify_div').addClass("invisible");
			    	document.getElementById("notify_div1").style.cursor = "default";
			    	
			    }
           
        }).error(function(data) {
			  
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    }
    
    $scope.getCount();
    //end of code
    
    
    $scope.messages2a = [];
    
    //begin code to get message history for a block number to display in the table when clicking
    //view button in the notification modal
    $scope.viewunreadMessageforNp1 = function(np,message_id){
    	$("#messageDiv1").removeClass("hidden");
    	$("#table5").removeClass("hidden");
    	$("#asset-list").removeClass("hidden");
    	$("#container6").removeClass("hidden");
    	$("#asset-list1").addClass("hidden");
    	$scope.task=false;
    	
    	
    	np=np.toUpperCase();
    	$scope.npNumberValue = np;
    	$scope.getAssetDetailsMessage();
    	
    	//calling function updating the read flag
    	$scope.readDone(message_id);
    	
    	$("#messageModal").modal('hide');
    	
    	
    	$http.get(URL_BASE+"npmessage/getmessagebyblock?npNumber="+np+"&stn_id="+4)
        .success(function(data) {
           
            $scope.messages3= data;
            
            for(var i= 0;i<data.length;i++){
           	 var d = new Date(data[i].createdAt);
    	    	
           	 data[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    	    	d.getHours() + ":" + d.getMinutes();
           	 
           }
           
            $scope.message3 = data;
           
           $scope.messages2 = [];
          
           
           for(var j=0;j<$scope.messages3.length;j++){
           	$scope.messages2[j] = ($scope.search1($scope.messages3[j].user_id, $scope.techTable1));
           
           	$scope.messages3[j].tech= $scope.messages2[j][0].technicianName;
       	
           }
           
        }).error(function(data) {
			  
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    	
    	
    }
    //end of code
    
    
    
    //begin code to update the read flag after reading a message in the notification
    $scope.readDone = function(message_id){
    	
    	$http.get(URL_BASE+"npmessage/makeReadmessage?np_message_id="+message_id)
        .success(function(data) {
            
        }).error(function(data) {
			  
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    }
    //end of code
    
    
    //begin code to display all messages for a block number in the view and
    //reply pop-up when clicking Message button in instructions table
    $scope.viewunreadMessageforNp =  function(np){
    	
    	
    	$http.get(URL_BASE+"npmessage/getmessage?npNumber="+np)
        .success(function(data) {
            $scope.messages2= data;
            
            $scope.messages2a = [];
            
            $("#displayMessageModal").modal('show');
            
           
        }).error(function(data) {
			  
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    }
    //end of code
    
    
    
    $scope.np1 = [];
    $scope.messages = [];
    
    //begin code to get message history for a block number to display in the pop-up when
    //sending message by clicking Message button
    $scope.viewreplyMessage = function(np){
    	$scope.np = np;
    	$("#displayMessageModal").modal('show');
    	
    	$http.get(URL_BASE+"npmessage/getmessagebyblock?npNumber="+np+"&stn_id="+4)
        .success(function(data) {
            
            $scope.messages2= data;
            for(var i=0;i<$scope.messages2.length;i++){
            var d = new Date($scope.messages2[i].createdAt);
	    	
	    	$scope.messages2[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	    	d.getHours() + ":" + d.getMinutes();
	    	
            }
            
        }).error(function(data) {
			  
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    }
    //end of code
    
    
    $scope.obj1 = {};
    $scope.message = "";
    
    //begin code to send message or reply message for a block number
    $scope.sendReply =  function(np){
    	
    	$scope.user_id = $cookieStore.get('user_id');
    	$scope.message = $('#messagebox').val();
    	
    	 $scope.obj1 = {
    		"np_message_id":0,
    		"asset_number":np,
    		"rec_station_id":5,
    		"send_station_id":4,
    		"message":$scope.message,
    		"user_id":$scope.user_id,
    		"createdAt":""

    		}
    	
    	 $http.post(URL_BASE+"npmessage/postmessage",$scope.obj1).success(function(data) {
         	alert("Sent message successfully ");
        	$("#displayMessageModal").modal('hide');
               
         })
         .error(function(data) {  
         	$scope.invalidPassword = true;
             
         });
    	
    }
    //end of code
    
   
    
  //begin code to get message history for np number to display in the table when when scanning in the regular flow
    $scope.viewunMessageRegular = function(np){
    	
    	 //$("#table5").removeClass("hidden");
    	
    	$http.get(URL_BASE+"npmessage/getmessagebyblock?npNumber="+np+"&stn_id="+4)
        .success(function(data) {
        	
            if(data!=""){
            	$("#messageDiv1").removeClass("hidden");
            for(var i=0;i<data.length;i++){
                var d = new Date(data[i].createdAt);
    	    	
                data[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    	    	d.getHours() + ":" + d.getMinutes();
    	    	
                }
            $scope.messages3= data;
            for(var j=0;j<$scope.messages3.length;j++){
               	$scope.messages2[j] = ($scope.search1($scope.messages3[j].user_id, $scope.techTable1));
               
               	$scope.messages3[j].tech= $scope.messages2[j][0].technicianName;
           	
               }
            
            }
           
           
        }).error(function(data) {
    		  
        	  alert("Error: server encountered an internal error. Please try again after some time ");
            
        });
    	
    }
    //end of code
    
    
    //begin code to close modal
    $scope.close1 =  function(){
    $('#messageModal').modal('hide');
    }
    //end 
    
    //begin
    $scope.close2 =  function(){
   	 $('#displayMessageModal').modal('hide');
    }
   //end
   
   
      $scope.ncs = true;
      $scope.np_ncs = "";
      //begin code to get the NCS details for the np number
    
      $scope.np_array = [];
  	  $scope.getAllNCSAssets = function(np){
  		//$scope.np_ncs = np;
  		 $scope.np_array = np.split(":");
  		
  		$scope.np_ncs = $scope.np_array[0];
  	  $http.get(ASSET_URL_BASE+"/ncs?npBase="+$scope.np_array[0])
        .success(function(data) {
        	console.log(data)
        	
        	 if(data != ""){
           	  $scope.ncs = false;
           	  
             }
            
            
        }).error(function(data) {
  			  //alert("Errors in loading technicians");
  	    	  alert("Error: server encountered an internal error. Please try again after some time ");
  	        
  	    });
  		
  	}
  	
  	
  	//end of code
  	
  	//begin code to redirect to ncs page
  $scope.getNCS = function(np_new){
  	sessionStorage.setItem("npNum", np_new);
  	sessionStorage.setItem("station", "4");
  	window.location.href = "NCSDetails.html";
  }
	  
});
