var app = angular.module('grossingStation', ['ui.bootstrap','ngCookies']);
app.controller('GrossController',function($scope,$http,$window,$cookieStore,$timeout)
{

    //var URL_BASE="http://10.11.3.3:8080/Sample_Tracker/webapi/";
	//var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
    //var URL_BASE="http://localhost:1025/Sample_Tracker/webapi/";
	 
	//var BASE_URL1 = "http://10.11.3.3:8080/Sample_Tracker_test/";
	
	
	
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
    
    $scope.specimen_report_template = "";
 
    
    $scope.showUserName=false;
    $scope.checknp = true;

    $scope.setResident=function() {
        	
            $cookieStore.put('residentname',$scope.residentname);   
        }
    
    $scope.resTable=[];
    
    $scope.getResident = function(){
    	
        $http.get(TECHNICIAN_URL_BASE+"/withrole?role=resident")
        .success(function(data) {
        	
        	$('#residentModal').modal('show');
        	$scope.resTable=data;
          
        })
        .error(function(data) {
			  //newly added error code
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    }

   
    //$scope.password = "np1234";
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
    
    //begin code to store the logged in user name in the cookie
    $scope.setUsername=function() {
    	
    	$scope.resultObject = $scope.search($scope.users, $scope.techTable);
    	$cookieStore.put('user_id',$scope.resultObject[0].technician_id);
        $scope.invalidPassword = false;
        //$('#loginModal').modal('hide');
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
            //alert("Login error ");
        	$scope.invalidPassword = true;
            
        });
    }
    
    //end of code
   
    $scope.tech={};
   
   //begin code to enable and disable logout button based on login
    if($scope.username!=undefined)
    	$scope.showLogout=true;
    else
    	$scope.showLogout=false;
    //end of code
    
    $scope.techTable=[];
    $scope.faculty_Array = [];
    $scope.residentArray = [];
    $scope.technicianArray = [];
    
    //begin code to get all staffs- faculty, resident and technicians to display in the login modal
    $scope.getAllUsers=function(){
    	
    	$http.get(TECHNICIAN_URL_BASE+"/withstation?stationId=2")
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
        	
           $scope.techTable=data;
      
        })
        .error(function(data) {
            //alert("Errors in loading technicians");
            
        });
    	
    }
    //end of code
    
    //begin code of logout
    $scope.logout=function(){
    	
    	$cookieStore.remove("username");
    	$cookieStore.remove("residentname");
    	 $window.location.reload();
    	 
    }
    //end of code
    
    
    //begin code to get the asset data for the np number entered
    $scope.getAssetDetails=function () {
    	
    	if($scope.username==null)
    		$scope.getAllUsers();
    	
    	else{
    		
	    	var tempString = $scope.npNumberValue + ";";
	    	var test = tempString.substring(0,tempString.indexOf(";"));
	    	test=test.toUpperCase();
	    	$scope.npNumberValue=test;
	    	$scope.viewunMessageRegular(test);
	    	$scope.getAllNCSAssets(test);
	    	
	        if($scope.npNumberValue.indexOf(':')==-1){
	        	alert("Invalid Scan. Please Scan Again");
	        	return;
	        }
	       
	        //REST call to get the asset data
	        $http.get(ASSET_URL_BASE+"/scan?np="+test+"&stationId=2&technician="+$scope.username+"&assistant="+$scope.residentname,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
	            .then(function successCallback(response) {
	                $scope.asset=response.data;
	                
	                //code to display the remark template based on the specimen
	                if($scope.asset.specimen == "Muscle biopsy"){
	                	$scope.specimen_report_template = "muscle";
	                }else if($scope.asset.specimen == "Epilepsy surgery"){
	                	$scope.specimen_report_template = "epileptic";
	                }else{
	                	$scope.specimen_report_template = "general";
	                }
	                $('#template_dropdown').val($scope.specimen_report_template);

	                $scope.displayTemplate($scope.specimen_report_template);
	                
	                $scope.populateTable();
	                $scope.getPatientDetails();
	                $scope.step1=false;
	                $scope.checknp = false;
	                
	            	$("#select_label").removeClass("hidden");
	    			$("#template_dropdown").removeClass("hidden");
	    			$("#select_button").removeClass("hidden");
	    			
	    			
	            },function errorCallBack(err) {
	                   alert("Invalid Scan. Please Scan Again");
	               
	            })
	    	}
    }
    //end of code
    
    //begin code to to display the  patient details when viewing  the reply message from reporting station
    //upon clicking the view message button in the notification popup
    
    $scope.getAssetDetailsMessage=function () {
    	
    	if($scope.username==null)
    		$scope.getAllUsers();
    	else{
	    	var tempString = $scope.npNumberValue + ";";
	    	var test = tempString.substring(0,tempString.indexOf(";"));
	    	test=test.toUpperCase();
	    	$scope.npNumberValue=test;
	        if($scope.npNumberValue.indexOf(':')==-1){
	        	alert("Invalid Scan. Please Scan Again");
	        	return;
	        }
	        
	        //REST call to get the asset details
	        $http.get(ASSET_URL_BASE+"/scan?np="+test+"&stationId=2&technician="+$scope.username+"&assistant="+$scope.residentname,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
	            .then(function successCallback(response) {
	                $scope.asset=response.data;
	                $scope.populateTable();
	                $scope.getPatientDetails();
	                $scope.step1=false;
	                $scope.checknp = false;
	            },function errorCallBack(err) {
	             
	                   alert("Invalid Scan. Please Scan Again");
	               
	            })
	    	}
    }
    //end of code

    
    var npNumb = "";
    $scope.hosp_name = "";
    //begin code to get the patient detials for the np number entered
    $scope.getPatientDetails=function() {
        var npbase=$scope.npNumberValue.substring(0, $scope.npNumberValue.indexOf(":"));
        npNumb = npbase;
        $http.get(REQUEST_URL_BASE+"?npbase="+npbase)
            .success(function (data) {
            	
                $scope.patient=data;
            	if($scope.patient.unit_name){
            		$scope.hosp_name =  "NIMHANS";
            	}
            });
    }
    //end of code

    
    $scope.alreadyExists=function() {
    /*    if($scope.asset.nextState!=2)
            alert("This is not tissue belonging to Grossing Station. Press Done to Refresh Page");
    */}
    
    
    $scope.number=1;
    //begin code to generate blocks upon clicking the add block button
    $scope.generateBlocks=function() {
       
        var url=ASSET_URL_BASE+"/tissue/generateblocks?technician="+$scope.username+"&assistant="+$scope.residentname+"&number="+$scope.number;
       
        $http.post(url,$scope.asset).success(function(data) {
            $scope.populateTable();
        })
        /*$scope.populateTable();*/
    }
    //end of code

    $scope.assetTable=[];

    //begin code to display the asset details in the Assets table for the np number entered
    $scope.populateTable=function () {
    	
        $scope.assetTable=[];
        var test= $scope.npNumberValue;
        
        $http.get(ASSET_URL_BASE+"/block?npBase="+test,{headers: {'Content-Type': 'application/json'}})
            .success(function (data) {
            $scope.assetTable=data;
            
            if($scope.assetTable.length==0)
            	$scope.generateBlocks();
            
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

    //begin code to generated block to print 
    $scope.printAsset= function (printNp) {
       
        var array = [
            {
                Np_Number : printNp//.replace("|","/").replace("|"," ").replace("|"," ").replace("|"," ")
            }];
        console.log(array);  
        $scope.queue=$scope.queue.concat(array);
        //alasql('SELECT * INTO CSV("BlockNpNumber.csv",{headers:true}) FROM ?',[array]);
        
    };
    //end of code
    
    
    //begin
    $scope.printAllAssets= function () {
    	 
        var array =[];
        	array=alasql('SELECT npNumber FROM ?',[$scope.assetTable])
        	var array2=[];
        for(var i=0;i<array.length;i++)
        	{
        	array2[i]={Np_Number : array[i].npNumber};
        	}
       
        
        alasql('SELECT * INTO CSV("BlockNpNumber.csv",{headers:true}) FROM ?',[array2]);
    	
    };
    //end
    	
    $scope.queue=[];
    
    //begin code for Add all to Queue
    $scope.addQueue=function(){
    	
    	if($scope.assetTable.length==0)
    		alert("There is no bottles scaned");
    	
    	else{
    	
    	var array =[];
    	array=alasql('SELECT npNumber FROM ?',[$scope.assetTable])
    	var array2=[];
    	
    	for(var i=0;i<array.length;i++){
    		
    	array2[i]={Np_Number : array[i].npNumber};
    	
    	}
    	
    	$scope.queue=$scope.queue.concat(array2);
    	$scope.clearAll();
    	}
    }
    //end
    
    //begin
    $scope.printQueue=function(){
    	alasql('SELECT * INTO CSV("BlockNpNumber.csv",{headers:true}) FROM ?',[$scope.queue]);
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

    //begin code to delete any generated block
    $scope.delete = function(asset){
    	
    	var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');
    	
        if(deleteUser){
        	
        if(asset.currentState==2){
        	
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
    //end of code

    //bgin code to go to the home page for entering the np number to get the patient and asset details in the normal flow
    $scope.scanScreen=function () {
    	//$("#messageDiv1").removeClass("hidden");
    	$("#tr2").addClass("hidden");
    	$("#asset-list").removeClass("hidden");
    	$("#container6").removeClass("hidden");
        $scope.task = false;
        
		//$scope.pendingTissue=false;
		//$scope.completedTissue=false;
		//$scope.scanTissue=true;
		//$scope.specialTask=false;
    }
    //end of code
    
    //begin code to display the patient, asset and message details for an np number upon clicking scan tissue button
    //under special tasks
    $scope.scanScreen1=function (np){
    	
    	$scope.npNumberValue = np;
        $scope.task = false;
        $scope.getAssetDetails();
    }
    //end of code
    
    
   //$scope.scanTissue=true;
    $scope.assetTasksTable=[];
       
    //begin code to get the list of pending tasks
    $scope.getPendingTasks=function (){	
    	
    	$("#messageDiv1").addClass("hidden");
    	$("#tr2").addClass("hidden");
    	$("#asset-list1").removeClass("hidden");
    	$scope.myVar = true;
    	//$scope.specialTask=false;
    	//$scope.scanTissue=false;
    	//$scope.pendingTissue=true;
    	//$scope.completedTissue=false;
        $scope.label="Pending Assets";
        $scope.assetTasksTable=[];
        $scope.task=true;
        var url=STATION_BASE_URL+"/pending?stationId=2";
        
        $http.get(url)
            .success(function (data) {
                $scope.assetTasksTable=data;
                
                //to display latest record first
                $scope.assetTasksTable = $scope.assetTasksTable.reverse();
                $scope.pendingTasks = $scope.assetTasksTable.length;
                $scope.myVar = false;
            })
    }
    //end of code
    
    //begin code to get the list and number of special tasks
    $scope.getSpecialTasks=function(){
    	
    	$("#messageDiv1").addClass("hidden");
    	$("#asset-list1").removeClass("hidden");
    	
    	//$scope.scanTissue=false;
    	//$scope.pendingTissue=false;
    	//$scope.completedTissue=false;
    	//$scope.specialTask=true;
    	
        $scope.label="Special Tasks";
        $scope.assetTasksTable=[];
        $scope.task=true;
        var url=STATION_BASE_URL+"/special?stationId=2";
        
        $http.get(url)
            .success(function (data) {
            	
                $scope.assetTasksTable=data;
                
                //to display latest record first
                $scope.assetTasksTable =  $scope.assetTasksTable.reverse();
                $scope.noOfSpecialtasks = data.length;
                $scope.changetoWarning();
            })
        
    }
    //end of code
    
    //begin code to change the button color of special taks button based on the number
    $scope.changetoWarning = function (){
    	   if($scope.noOfSpecialtasks >= 1)
           	$('#specialTask').addClass('btn-warning');
           else 
           	$('#specialTask').removeClass('btn-warning');
    	
    }
    //end of code
    
    //begin code to get the number of pending cases
    $scope.getLengthofPending = function(){
        var url=STATION_BASE_URL+"/pending?stationId=2";
       
        $http.get(url)
            .success(function (data) {
                $scope.pendingTasks = data.length;
            })  
    }
    //end of code
    
    //begin code to get the number of special taks cases
    $scope.getLengthofSpecial = function(){
        var url=STATION_BASE_URL+"/special?stationId=2";
        
        $http.get(url)
            .success(function (data) {
                $scope.noOfSpecialtasks = data.length;
                $scope.changetoWarning();
            })  
    }
    //end of code
    
    
    //$scope.getLengthofPending();
    //$scope.getLengthofSpecial();
    /*setInterval(function(){
    $scope.getLengthofPending();// calling this for checking pending tasks
    $scope.getLengthofSpecial();
    console.log("interval"); 
    }, 120000)*/ // this is giving heap error
    
    
    //begin code
    $scope.getCompletedTasks=function(){
    	
		//$scope.specialTask=false;
		//$scope.scanTissue=false;
		//$scope.completedTissue=true;
		//$scope.pendingTissue=false;
    	
    	$scope.label="Completed Assets";
        $scope.assetTasksTable=[];
        $scope.task=true;
        var url=STATION_BASE_URL+"/completed?stationId=2";
        $http.get(url)
            .success(function (data) {
                $scope.assetTasksTable=data;
            })
    }
    //end 
    
    
    $scope.processDate = new Date();
    
    //begin
    $scope.getProcessedTasks = function(){
    	$("#asset-list1").removeClass("hidden");
    	$scope.label="Processed Assets";
        $scope.assetTasksTable=[];
        $scope.npNums = [];
        $scope.task=true;
        var today = $scope.processDate;
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
		
        $http.get(REQUEST_URL_BASE+"/getactivity?stationId=2&technicianName=&assetType=1&startDate="+start_date+"&endDate="+end_date)
        .success(function(data) {
           
            $scope.addingNoOfBlocks(data);
        })
    }
    //end
    
    //redirect to daily log page upon clicking the view daily log grossing button under In Progress
    $scope.dailyLog = function(){
    	
    	location.href="dailyLog-Grossing.html?date="+$scope.processDate;
    }
    //end
    
    //begin
    $scope.processPrev = function(){
    	$scope.processDate.setDate($scope.processDate.getDate() - 1);
    	$scope.getProcessedTasks();
    }
    //end
    
    //begin
    $scope.processNext = function(){
    	$scope.processDate.setDate($scope.processDate.getDate() + 1);
    	$scope.getProcessedTasks();
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
    //begiin
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
		    }).error(function(data){ 
		    	alert("Error");
		    	
		    });
    }
    //end
    
    
    
    //begin code for separate date for each block if there are multiple blocks under decal
    $scope.decalArray = [];
    $scope.addBlockWithDate = function(){
    	
    	$scope.pStatus = "";
    	var today = new Date();
		var dd = today.getDate();
		today.setMonth(today.getMonth() + 6);// get the date after 6 month
		var mm = today.getMonth()+1; //January is 0!
		
		var yyyy = today.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		}
		var date = dd+'-'+mm+'-'+yyyy;
    	
		var decalDate = "";
		
    	for(var asset in $scope.assetTasksTable){
    		
    		
    	decalDate = $('#'+asset+'_decalDate').val();
    	var decaldata  = $scope.assetTasksTable[asset].decal+":Decal:"+decalDate;
    	
    	if($scope.assetTasksTable[asset].decal != undefined){
    		if((decalDate == undefined) || (decalDate == "")){
    			alert("Please select date");
    	
    		}else{
    			$scope.decalArray.push(decaldata);;
    	    	$('#'+asset+'_decalDate').val("");
    		}
    	console.log($scope.decalArray);
		}
    	
    	
    	}
    	
    }
    //end 
    
    
    //begin code related to In progress
    $scope.saveDailyLog = function(){
    	
    	//block with separate dates
    	console.log("mnn"+$scope.decalArray);
    	
    	var today = new Date();
		var dd = today.getDate();
		today.setMonth(today.getMonth() + 6);// get the date after 6 month
		var mm = today.getMonth()+1; //January is 0!
		
		var yyyy = today.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		}
		var date = dd+'-'+mm+'-'+yyyy;
		
    	for(var check in $scope.assetTasksTable){
    		
    		if($scope.assetTasksTable[check].pStatus=="KFF" || $scope.assetTasksTable[check].decal!=undefined){
    			
    			var kffDate = $('#'+check+'_kffDate').val();
    			var decalDate = $('#'+check+'_decalDate').val();

    			if(kffDate == '' && $scope.assetTasksTable[check].pStatus=="KFF"){
    				
    			alert("Please select the Expected Date for KFF :"+$scope.assetTasksTable[check].npNumber);
    			return;
    			
    			}
    			
    			if(decalDate == '' && ($scope.assetTasksTable[check].decal!=undefined && $scope.assetTasksTable[check].decal[0]!='undefined')){
    				
				alert("Please select the Expected Date for Decal :"+$scope.assetTasksTable[check].decal);
				return;
					
				}
    			}
		}
    	
    	var i = 0;
    	for(var asset in $scope.assetTasksTable){
    		
    			//for RK and KFF data
    			if($scope.assetTasksTable[asset].pStatus!=undefined){
    				
    				var kffDate = $('#'+asset+'_kffDate').val();
    				
    				if($scope.assetTasksTable[asset].pStatus=="RK")
    					$scope.pStatus = $scope.assetTasksTable[asset].pStatus+":"+date;
    				else if($scope.assetTasksTable[asset].pStatus=="KFF")
    					$scope.pStatus = $scope.assetTasksTable[asset].pStatus+":"+kffDate;
    				else
    					$scope.pStatus = $scope.assetTasksTable[asset].pStatus;
    				
    				
    				i++;
    				
    				$http.post(ASSET_URL_BASE+"/tissue/setProcessStatus?npNumber="+$scope.assetTasksTable[asset].npNumber+"&pStatus="+$scope.pStatus)
    			        .success(function(data) {
    			        	
    			        	i--;
    			        	
    			        	if(i==0)
    			        		$scope.getProcessedTasks();
    			        		//$window.location.href= 'dailyLog-Grossing.html';
    			   
    			        })
    			        .error(function(data) {  
    			        	
    			            alert("error saving pStatus");
    			        });
    			}
    			
    			
    			//for block with date data
    			if($scope.assetTasksTable[asset].decal!=undefined){
    				i++;
    				
    				var decalDate = $('#'+asset+'_decalDate').val();
    				
    				for (var j in $scope.assetTasksTable[asset].decal){
    				
                    $http({
                    	url : ASSET_URL_BASE+"/block/setDecal?npNumber="+$scope.assetTasksTable[asset].decal[j]+"&pStatus=Decal:"+decalDate,
                        method : "POST"
                    }).success(function(res){
                    	i--;
                    	if(i==0)
                    		$scope.getProcessedTasks();
                    		}).error(function(err){
                    		alert("error");
                    		})
    				}
    			}
   
    		}

    }
    //end of code related to In progress
    
    
    //begin code for date in In progress
    $scope.enableDatePicker = function(){
    	
    	$(".datepicker").datepicker({ dateFormat: 'dd-mm-yy',minDate: 0 });
    }
    //end of code
    

    $scope.files = []; 
    var file_array = [];
    $scope.pic = '';
    $scope.myImage1=false;
    
    
    //begin code for file upload
    $scope.upload=function(){
    	
    	var file= document.getElementById("fileid").files[0];
    	var formData = new FormData();
    	
    	if((npNumb != "" && file != undefined)){
    	 	
    	$scope.myImage1=true; 
        formData.append('file', file);
        formData.append('np_base', npNumb);
        
        for (var value of formData.values()) {
        	   console.log(value); 
        }

    
	    $http.post(URL_BASE+'ehosp/uploadPdf', formData, {
	        
	        transformRequest: angular.identity,
	        headers: {'Content-Type': undefined}
	     }).success(function() {
	    	 alert("Successfully uploaded the file");
	    	 $("#uploadModal").modal("hide");
	    	 $scope.myImage1=false; 
	    }).error(function() {
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
    
    //begin code to get and display the file names in the pop up
    $scope.getFiles =  function(){
    	
    	$http.get(ASSET_URL_BASE+"/getlistofimage?np_base="+npNumb)
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
    
    
    //begin code to view the uploaded file in new tab
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

    //begin code to delete uploaded files in required
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
    
    //begin code to close popup
    $scope.close =  function(){
    	
   	 $scope.pic = ""; 
   	 $scope.file_array = [];
   	 $('#uploadModal').modal('hide');
   }
    //end of code
   
    
    $scope.np_Number = '';
    $scope.user_id = '';
    $scope.resultObject1 = [];
    
    //get the technician Name from the list of technicians for displaying in the message table
    $scope.search1 = function(nameKey, myArray){
    	
	    for (i=0;i < myArray.length; i++) {
	        var marvelHeroes =  myArray.filter(function(hero) {
			return hero.technician_id == nameKey;
			});
	        return marvelHeroes;
	             
	    }
    }
    
    
    //begin code for getting all technicians name based on id related to message functionality
    $scope.getAllUsers1=function(){
    	
    	
    	$http.get(TECHNICIAN_URL_BASE+"/withstation?stationId=2")
        .success(function(data) {
        	
           $scope.techTable1=data;
        })
        .error(function(data) {
            //alert("Errors in loading technicians");
            
        });
    	
    }
    $scope.getAllUsers1();
    //end of code
    
    
    $scope.messages2 = [];
    //begin code to get unread messages when clicking bell icon from the reporting station
    $scope.getMessages = function(){
    	
    	if($scope.username== undefined){
        	alert("Please login");
        	return false;
        	
        }else{
        	
    	$http.get(URL_BASE+"npmessage/getAllmessage?rec_station_id="+2)
        .success(function(data) {
        	
            for(var i= 0;i<data.length;i++){
            	
            	 var d = new Date(data[i].createdAt);
            	 data[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
     	    	 d.getHours() + ":" + d.getMinutes();
            	 
            }
            
            $scope.messages = data.filter(data => data.read_flag == 0);
            
            $scope.messages1 = [];
            
            //get the technician name for a message
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
     
  //get notification count - if message is there then bell icon is displayed with the count
    $scope.getCount = function(){
    	
    	$http.get(URL_BASE+"npmessage/countofmessages?station_id="+2)
        .success(function(data) {
        	
	            // begin code for bell
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
    
    $scope.asset_no = '';
    
    //get message history for a block number to display in the table when
    //clicking view button in the notification modal
    
    $scope.viewunreadMessageforNp1 = function(np,message_id){
    	$("#asset-list1").addClass("hidden");
    	
    	$("#asset-list").removeClass("hidden");
    	$("#container6").removeClass("hidden");
    	$("#messageDiv1").removeClass("hidden");
    	$scope.task=false;
    	
    	np=np.toUpperCase();
    	$scope.npNumberValue = np;
    	$scope.getAssetDetailsMessage();
    	
    	//calling function updating the read flag
    	$scope.readDone(message_id);
    	
    	$("#messageModal").modal('hide');
    	
    	$http.get(URL_BASE+"npmessage/getmessagebyblock?npNumber="+np+"&stn_id="+2)
        .success(function(data) {
        	
            if(data != ""){
            	$("#tr2").removeClass("hidden");
            }else{
            	$("#tr2").addClass("hidden");
            }
            $scope.messages3= data;
            
            for(var i=0;i<data.length;i++){
                var d = new Date(data[i].createdAt);
    	    	
    	    	$scope.messages3[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    	    	d.getHours() + ":" + d.getMinutes();
    	    	
                }
            $scope.messages2 = [];
            
            //display the technician name for a message
            for(var j=0;j<$scope.messages3.length;j++){
            	$scope.messages2[j] = ($scope.search1($scope.messages3[j].user_id, $scope.techTable1));
            	$scope.messages3[j].tech= $scope.messages2[j][0].technicianName;
        	
            }
            
            $scope.asset_no = $scope.messages3[0].asset_number;
          
           
        }).error(function(data) {
			  
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    	
    	
    }
    //end of code
    
    
    //begin code to update the read flag
    $scope.readDone = function(message_id){
    	
    	$http.get(URL_BASE+"npmessage/makeReadmessage?np_message_id="+message_id)
        .success(function(data) {
            
        }).error(function(data) {
			  
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    }
    //end of code
    
    
    //begin code to get message history for a block number to display in the pop-up
    //when sending message by clicking Message button
    $scope.viewreplyMessage = function(np){
    	
    	$scope.np = np;
    	
    	$http.get(URL_BASE+"npmessage/getmessagebyblock?npNumber="+np+"&stn_id="+2)
        .success(function(data) {
           
            $scope.messages2= data;
            for(var i=0;i<$scope.messages2.length;i++){
            var d = new Date($scope.messages2[i].createdAt);
	    	
	    	$scope.messages2[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	    	d.getHours() + ":" + d.getMinutes();
	    	
            }
            
            $("#displayMessageModal").modal('show');
            
        }).error(function(data) {
			  
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    	
    	
    }
    //end of code
    
 
    
  //begin code to send message or reply message for a block number
    $scope.sendReply =  function(np){
    	
    	$scope.user_id = $cookieStore.get('user_id');
    	$scope.message = $('#messagebox').val();
    	
    	 $scope.obj1 = {
    		"np_message_id":0,
    		"asset_number":np,
    		"rec_station_id":5,
    		"send_station_id":2,
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
    	
    	$http.get(URL_BASE+"npmessage/getmessagebyblock?npNumber="+np+"&stn_id="+2)
        .success(function(data) {
           
        	
        	if(data!=""){
        		$("#messageDiv1").removeClass("hidden");
            	$("#tr2").removeClass("hidden");
            }else{
            	$("#tr2").addClass("hidden");
            }
           
            for(var i=0;i<data.length;i++){
                var d = new Date(data[i].createdAt);
    	    	
                data[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    	    	d.getHours() + ":" + d.getMinutes();
    	    	
                }
            $scope.messages3 = data;
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
    
    
    //code to close modal
    $scope.close1 =  function(){
    	
      	 $('#messageModal').modal('hide');
    }
    //end
    
    //code to close modal
    $scope.close2 =  function(){
  	
  	 $('#displayMessageModal').modal('hide');
    
    }
    //end
      
      
    //begin code to display the template to write the remarks based on the option selected
      $('#template_dropdown').on('change', function() {
    	  
        	$('#report_template1').modal('show');
        	$scope.selected =$('#template_dropdown').val();
        	
        	$scope.displayTemplate($scope.selected);
      });
      //end of code
      
      
      //submit data from grossing station
      $scope.result="";
      $scope.report="";
      $scope.pname;
      $scope.psex;
      $scope.uom;
      $scope.sample_type_desc;
      $scope.uhid;
      $scope.daily_sampleno_str;
      $scope.normal_range;
      $scope.age;
      $scope.item_cat = "NEUROPATHOLOGY";
      $scope.report_date="2017-09-30 16:07:41.520098";
      
      //submit report
      $scope.doc_id = "11";
      
      $scope.reportArray = [];
      $scope.obj = {};
      
      var config1 = {
         	headers : {
            'Content-Type': 'text/plain;charset=utf-8;'
      }
	  };
      
      
      //begin code to submit the remarks report in the template
      $scope.submitReport =  function(){
    	  
      		$("#report_button1").prop("disabled",true);
      		$scope.selected = $('#template_dropdown').val()
      	
      		if($scope.selected==="general"){
      		
      		 $scope.report = "";
      		 $scope.report = CKEDITOR.instances.editor1.getData();
      		
      		}else if($scope.selected==="muscle"){
      		 $scope.report = "";
      		 $scope.report = CKEDITOR.instances.editor2.getData();
      		
      		}else if($scope.selected==="epileptic"){
      		 $scope.report = "";
      		 $scope.report = CKEDITOR.instances.editor3.getData();
      		
      		}
      	 
      	
	      	 if($scope.patient.patientSex === 0){
	      		 $scope.patient.patientSex = "Male";
	      	 }else{
	      		 $scope.patient.patientSex = "Female";
	      	 }
      	 
	      	 $scope.obj.result = $scope.report;
	      	 $scope.reportArray.push($scope.obj);
      	
	      	 var Data = {
      			   "parm1": $scope.patient.UHID,
      			   "parm2": $scope.patient.patientName,
      			   "parm3": $scope.patient.patientSex,
      			   "parm4": "1",
      			   "parm5": "N",
      			   "parm6": "1",
      			   "parm7": "NC",
      			   "parm8": $scope.patient.sampleRequestId,
      			   "parm9": $scope.reportArray,
      			   "parm10": "",
      			   "parm11": $scope.doc_name,
      			   "parm12": $scope.doc_id,
      			   "parm13": $scope.doc_name,
      			   "parm14": "1",
      	    		
      			};
      	   
      	  
      	   
	      	 var dataObject = JSON.stringify(Data);
      	   
      	  
	      	 return $http.post(URL_BASE+'ehosp/saveExternalReportDraft',dataObject,config1)
   				.then(
   						function(response){
   							console.log(response);
   			
   			 });
      			
      }
      //end of code
      
      //begin code to display the template for writing the remarks
      $scope.displayTemplate = function(selected){
    	 
    	  
    	  if(selected==="general"){
      		$('#div2').addClass("hidden");
      		$('#div3').addClass("hidden");
      		$('#div1').removeClass("hidden");
      		$('#report_button1').removeClass("hidden");
      		$("#report_button1").removeClass("hidden");
      		
      	}else if(selected==="muscle"){
      		$('#div1').addClass("hidden");
      		$('#div3').addClass("hidden");
      		$('#div2').removeClass("hidden");
      		$("#report_button1").removeClass("hidden");
      		//CKEDITOR.replace('editor2');
      		CKEDITOR.replace( 'editor2'
              		  , {
              	toolbar: [
              		{ name: 'document', items: [ 'Save', '-', 'NewPage', 'Preview','Print','Table','Maximize' ] },	// Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
              		[ 'Cut', 'Copy', 'Paste', 'PasteText', 'Undo', 'Redo' ],			// Defines toolbar group without name.
              																							// Line break - next group will be placed in new line.
              		{ name: 'basicstyles', items: [ 'Bold', 'Italic','Underline','Font','FontSize','SelectAll' ] }																				// Line break - next group will be placed in new line.
              		
              	] 
              }  
              );
      		$('#report_button1').removeClass("hidden");
      		
      	}else if(selected==="epileptic"){
      		$('#div1').addClass("hidden");
      		$('#div2').addClass("hidden");
      		$('#div3').removeClass("hidden");
      		$("#report_button1").removeClass("hidden");
      		
      		CKEDITOR.replace( 'editor3'
              		  , {
              	toolbar: [
              		{ name: 'document', items: [ 'Save', '-', 'NewPage', 'Preview','Print','Table','Maximize' ] },	// Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
              		[ 'Cut', 'Copy', 'Paste', 'PasteText', 'Undo', 'Redo' ],			// Defines toolbar group without name.
              																							// Line break - next group will be placed in new line.
              		{ name: 'basicstyles', items: [ 'Bold', 'Italic','Underline','Font','FontSize','SelectAll' ] }																				// Line break - next group will be placed in new line.
              		
              	] 
              }  
              );
      		$('#report_button1').removeClass("hidden");
      		
      	}
      }
      //end of code
      
      
      $scope.ncs = true;
      //begin code to get the NCS details for the np number
    
      $scope.np_array = [];
  	  $scope.getAllNCSAssets = function(np){
  	  $scope.np_array = np.split(":")
  		
  		$http.get(ASSET_URL_BASE+"/allncs?npBase=")
          .success(function(data) {
             
              if(data != ""){
            	  $scope.ncs = false;
            	  
              }
          })
          .error(function(data) {
  			  //alert("Errors in loading technicians");
  	    	  alert("Error: server encountered an internal error. Please try again after some time ");
  	        
  	    });
  		
  	}
  	
  	
  	//end of code
  	
  	//begin code to redirect to ncs page
$scope.getNCS = function(){
	window.location.href = "NCSDetails.html";
}
    
});
