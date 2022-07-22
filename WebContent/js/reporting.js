/**
 * 
 */
var app = angular.module('ReportingStation', ['ui.bootstrap','ngCookies']);
app.controller('ReportingController',function($scope,$http,$window,$cookieStore)
{
	// var BASE_URL1 = "http://localhost:8080/Sample_Tracker/";
	//var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
    //var URL_BASE="http://localhost:1025/Sample_Tracker/webapi/"
	
	
	var SPECIAL_REQUEST_URL = URL_BASE+ "specialrequests";
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
    var STATION_BASE_URL=URL_BASE+"station";
    
    $scope.barcodeValue='';
    $scope.patient='';
    $scope.username=$cookieStore.get('reportingusername');
    
    $scope.stainTestTable = [];
    $scope.ihcTestTable = [];
    $scope.special = {};
    $scope.special.ihc = 0;
    $scope.special.stain = 0;
    $scope.special.note = '';
    $scope.selectAll = false;
    $scope.selectedStainTests = [];
    $scope.selectedihcTests = [];
    $scope.allStainTests = '';
    $scope.allihcTests = '';
    var i = 0;
    var j = 0;
    $scope.special.processAll = false;
    $scope.special.processMore = false;
    $scope.special.em = false;
    $scope.special.processMore = false;
    $scope.special.em = false;
    $scope.special.checkbox_stain = true;
    $scope.special.checkbox_ihc = true;
    $scope.special.stain = '';
    $scope.special.ihc = '';
    
    $scope.doc_name = "";
    $scope.doc_id = "";
    $scope.report_base = "";
    $scope.hosp_name = "";
    
    
    
    
    var config1 = {
               		headers : {
                   'Content-Type': 'text/plain;charset=utf-8;'
    					}
    			};
    
    
    $scope.special_stains = ["None",
                             "Skin (Lafora)",
                             "Skin (CADASIL)",
                             "Vessel",
                             "Liver",
                             "Inflammatory",
                             "Muscle (fixed)",
                             "Muscle (fresh)",
                             "Muscle (fresh) metabolic",
                             "Nerve" 
                             ];
    $scope.ihc = ["None",
                  "Epilepsy",
                  "Pituitary",
                  "MSRCT",
                  "Lymphoma",
                  "PNET",
                  "Medulloblastoma",
                  "Infective",
                  "Demyelination",
                  "Metastasis",
                  "Plasmacytoma",
                  "Germ cell",
                  "Glioma adult (diffuse)",
                  "Glioma adult (GBM)",
                  "Glioma pediatric (midline)",
                  "Glioma pediatric (non-midline)",
                  "Glioneuronal",
                  "Pilocytic astrocytoma/ Ependymoma",
                  "Muscle (fresh)DMD",
                  "Muscle (fresh)LGMD",
                  "Muscle (fresh)CMD",
                  "Muscle (fresh)Protein aggregate",
                  "Muscle (fresh)Fibre typing",
                  "Muscle (fresh)EDMD"
                  ];
    
   $scope.Skin_Lafora = ["PAS-diastase",
                         "Lugol's iodine"];
   
   $scope.Skin_CADASIL = ["PAS",
                          "Masson Trichrome"];
   
   $scope.Vessel = ["Masson Trichrome",
                    "Verhoff van Gieson"];
   
   $scope.Liver = ["PAS",
                   "PAS-D",
                   "Reticulin",
                   "Masson Trichrome"];
   
   $scope.Inflammatory = ["Ziehl-Neelsen",
                          "PAS",
                          "GMS",
                          "Grams"];
   
   $scope.Muscle_fixed = ["HE",
                          "Masson Trichrome"];
   
   $scope.Muscle_fresh = ["HE",
                          "MGT",
                          "NADH-Tr",
                          "SDH"];
   
   $scope.Muscle_fresh_metabolic = ["COX-SDH",
                                    "PAS",
                                    "PAS-D",
                                    "Oil red O",
                                    "Myophosphorylase",
                                    "Acid phosphatase"];
   
   $scope.Nerve = ["HE",
                   "Masson Trichrome",
                   "K-Pal"];
   
   $scope.Epilepsy = ["GFAP",
                      "NeuN",
                      "Neurofilament",
                      "CD34",
                      "Vimentin"];
   
   $scope.Pituitary = ["P53",
                       "MIB-1(Ki-67)",
                       "GH",
                       "PRL",
                       "ACTH",
                       "FSH",
                       "LH",
                       "TSH",
                       "Cytokeratin"];
   
   $scope.MSRCT = ["LCA",
                   "Desmin",
                   "SMA",
                   "CD99",
                   "CK",
                   "MPO",
                   "CD138",
                   "Synaptophysin",
                   "Chromogranin",
                   "INI-1"];
   
   $scope.Lymphoma = ["LCA",
                      "CD3",
                      "CD20",
                      "MIB-1(Ki-67)",
                      "ALK",
                      "CD30"];
   
   $scope.PNET = ["CD99",
                  "Synaptophysin",
                  "INI-1"];
   
   $scope.Medulloblastoma = ["β-catenin",
                             "YAP-1",
                             "GAB-1",
                             "p53"];
   
   $scope.Infective = ["Toxoplasma",
                       "HSV",
                       "JCV",
                       "CMV"];
   
   $scope.Muscle_fresh_DMD = ["Dys1",
                              "Dys2",
                              "Dys3",
                              "Merosin"];
   
   $scope.Muscle_fresh_LGMD = ["Sarcoglycans (βƔδɑ)",
                               "Dysferlin"];
   
   $scope.Muscle_fresh_CMD = ["Dystroglycans (ɑβ)",
                              "Merosin",
                              "Col 6"
                              ];
   
   $scope.Muscle_fresh_Protein_aggregate = ["Desmin",
                                            "ɑ Actinin",
                                            "Bag 3",
                                            "Zasp",
                                            "Titin",
                                            "CRYAB1"];
   
   $scope.Muscle_fresh_Fibre_typing = ["Myosin S",
                                       "Myosin F"];
   
   $scope.Muscle_fresh_EDMD = ["Emerin",
                               "Lamin A/C"];
   
   
   $scope.Demyelination = ["LFB+PAS",
                           "GFAP",
                           "Neurofilament",
                           "CD68"];
   
   $scope.Metastasis = ["PanCK",
                        "CK7",
                        "CK20",
                        "TTF-1"];
   
   $scope.Plasmacytoma = ["CD138",
                          "Kappa",
                          "Lambda"];
   
   $scope.Germ_cell = ["βHCG",
                       "AFP",
                       "PLAP",
                       "Inhibin",
                       "PanCK",
                       "CD30"];
   
   $scope.Glioma_adult_diffuse = ["IDH-1(R132H)",
                                  "ATRX",
                                  "P53",
                                  "MIB-1(Ki-67)"];
   
   $scope.Glioma_adult_GBM = ["IDH-1(R132H)"];
   $scope.Glioma_pediatric_midline = ["GFAP",
                                      "P53",
                                      "ATRX",
                                      "H3.3K27M",
                                      "MIB-1(Ki-67)"];
   
   $scope.Glioma_pediatric_non_midline = ["GFAP",
                                          "P53",
                                          "ATRX",
                                          "MIB-1(Ki-67)"];
   
   $scope.Glioneuronal = ["Reticulin",
                          "GFAP",
                          "Synaptophysin",
                          "NeuN",
                          "Neurofilament",
                          "CD34",
                          "MIB-1 (Ki-67)"];
   
   $scope.Pilocytic_astrocytoma_Ependymoma = ["GFAP",
                                              "EMA",
                                              "MIB-1 (Ki-67)"];
 
   
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
    
   
   	//begin code to save the logged in user name details
    $scope.setUsername=function() {
       
    		$scope.resultObject = $scope.search($scope.users, $scope.techTable);
    		$cookieStore.put('user_id',$scope.resultObject[0].technician_id); 
    	 
    		$scope.invalidPassword = false;
        
        
        $http.post(URL_BASE+"login?username="+$scope.users+"&password="+$scope.password)
        .success(function(data) {
        	
           $scope.showUserName=true;
           $scope.username=$scope.users;
           $scope.showLogout=true;
           $scope.doc_name =  $scope.username;
           $cookieStore.put('reportingusername',$scope.username);
           
           $('#loginModal').modal('hide');
           $scope.invalidPassword = false;
          
        })
        .error(function(data) {  
           
        	$scope.invalidPassword = true;
            
        });
    }
    //end of code
    $scope.techTable=[];
    $scope.tech={};
    
  
    //begin code to hide or display the logout button based on login
    if($scope.username!=undefined)
    	$scope.showLogout=true;
    else
    	$scope.showLogout=false;
    //end of code
    
    $scope.techTable=[];
    $scope.faculty_Array = [];
    $scope.residentArray = [];
    
    //begin code to get all the staff details
    $scope.getAllUsers=function(){
    	
    	
    	$http.get(TECHNICIAN_URL_BASE+"/withstation?stationId=6")
        .success(function(data) {
        	$('#loginModal').modal('show');
        	
        	$scope.faculty_Array = data.filter(function( obj ) {
        	    return obj.roles === "faculty";
        	});
        	$scope.residentArray = data.filter(function( obj ) {
        	    return obj.roles === "resident";
        	});
        	
            $scope.techTable=data;
      
           
        })
        .error(function(data) {
			  //newly added error code
	    	  alert("Error: server encountered an internal error. Please try again after some time ");
	        
	    });
    	
    }
    //end of code
    
    
    //begin code to logout
    $scope.logout=function(){
    	
    	$cookieStore.remove("reportingusername");
    	 $window.location.reload();
    	 
    }
    //end of code


    $scope.myVar=false;
    
    //begin code to get the patient details for the np number entered
    $scope.getPatientFromRequest=function(){
    	
    	$("#asset-list2").addClass("hidden");
    	$("#asset-list3").addClass("hidden");
    	$("#asset-list1").removeClass("hidden");
    	//display the pending cases for reporting
    	$scope.getPendingTasksReporting();
    	
    	if($scope.username==null)
    		$scope.getAllUsers();
    	else{
	    	
	    	$scope.myVar=true;
	    	
	    	var tempString = $scope.barcodeValue + ";";
	    	var test = tempString.substring(0,tempString.indexOf(";"));
	    	test=test.toUpperCase();
	    	$scope.barcodeValue=test;
	    	$scope.getAllNCSAssets(test);
	    	$scope.viewunMessageRegular($scope.barcodeValue);
	    	$scope.getAllSpecialForNp($scope.barcodeValue);
	    	$scope.getAllSpecialTissueForNp($scope.barcodeValue);
	    	
	    	//to check whether remarks from grossing station exists for the entered np number 
	    	
	    	
	        $http.get(REQUEST_URL_BASE+"?npbase="+$scope.barcodeValue)
	        .success(function(data) {
	        	console.log(data)
	        	//if sample id is there with the np number, then we will display the remarks and report
	        	//otherwise not(for external samples, initially there will not be sample id,)
	        	if(data.sampleRequestId != "Unlinked"){
	        		
	        		$scope.checkReport($scope.barcodeValue);
	        	}else{
	        		
	        		$("#template_dropdown").addClass("hidden");
	    			$("#select_button").addClass("hidden");
	    			$("#select_label").addClass("hidden");
	    			$('#report_button1').addClass("hidden");
	    			$('#div4').addClass("hidden");
	    			$('#report_button2').addClass("hidden");
	        	}
	        	
	            $scope.patient=data;
	            if($scope.patient.unit_name){
	            	$scope.hosp_name = "NIMHANS";
	            }
	            var d = new Date($scope.patient.created);
    	    	
    	    	$scope.patient.created = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    	    	d.getHours() + ":" + d.getMinutes();
    	    	
	            if(data=='')
	            	alert("Check the NP number");
	           
	            $scope.recievingStationStep=1;
	            $scope.myVar=false;
	        })
	        .error(function(data) {
	            alert("Please Scan the NP Number Again");
	            $scope.myVar=false;
	        });
    		}
    }
    //end of code
    
    
    	//begin code to get patient details when displaying the message through notification
    	$scope.getPatientFromRequest1=function(){
    	
    	$("#asset-list2").addClass("hidden");
    	$("#asset-list3").addClass("hidden");
    	$("#asset-list1").removeClass("hidden");
    	//display the pending cases for reporting
    	$scope.getPendingTasksReporting();
    	
    	
    	if($scope.username==null)
    		$scope.getAllUsers();
    	else{
	    	
	    	$scope.myVar=true;
	    	
	    	var tempString = $scope.barcodeValue + ";";
	    	var test = tempString.substring(0,tempString.indexOf(";"));
	    	$scope.getAllNCSAssets(test);
	    	test=test.toUpperCase();
	    	$scope.barcodeValue=test;
	    	
	    	//to get the special instructions if exists for the np number 
	    	$scope.getAllSpecialForNp($scope.barcodeValue);
	    	
	    	//to get the special tasks if exists for the np number 
	    	$scope.getAllSpecialTissueForNp($scope.barcodeValue);
	    	
	        $http.get(REQUEST_URL_BASE+"?npbase="+$scope.barcodeValue)
	        .success(function(data) {
	        	
	            $scope.patient=data;
	            if($scope.patient.unit_name){
	            	$scope.hosp_name = "NIMHANS";
	            }
	            var d = new Date($scope.patient.created);
    	    	
    	    	$scope.patient.created = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    	    	d.getHours() + ":" + d.getMinutes();
    	    	
	           
	            if(data=='')
	            	alert("Check the NP number");
	           
	            $scope.recievingStationStep=1;
	            $scope.myVar=false;
	        })
	        .error(function(data) {
	            alert("Please Scan the NP Number Again");
	            $scope.myVar=false;
	        });
    		}
    	}
    	//end of code
    
		    //begin code to get the pending cases for reporting
		    $scope.getPendingTasksReporting=function (){
		    	$("#asset-list1").removeClass("hidden");
		    	$("#asset-list2").addClass("hidden");
		    	$("#asset-list3").addClass("hidden");
		    	$("#messageDiv1").addClass("hidden");
		    	$("#messageDiv2").addClass("hidden");
		    	$("#messageDiv3").addClass("hidden");
		    	
		    $scope.assetTasksTable=[];
		    var url=STATION_BASE_URL+"/pending?stationId=6";
		   
		    $http.get(url)
		        .success(function (data) {
		            $scope.assetTasksTable=data;
		            console.log(data)
		            //to display latest record first
		            $scope.assetTasksTable =  $scope.assetTasksTable.reverse();
		        })
		    }
		    //end of code
   
		    $scope.nparray=[];
		    $scope.npindex=[];
    
		    //begin code to get the pending cases number
		    $scope.checkCount = function(index){	
			 if ($scope.assetTasksTable[index].clicked !== true) {
				 
			        $scope.assetTasksTable[index].clicked = true; 
		        	$scope.nparray.push($scope.assetTasksTable[index].npNumber);
		         	
			    }
			    else{
			    	
			     $scope.assetTasksTable[index].clicked = false;
			     $scope.nparray.splice($scope.nparray.indexOf($scope.assetTasksTable[index].npNumber),1);
			          	
			     
			    }
		    }
		    //end of code

    	$scope.flag= false;
    
    	$scope.barcodeValue='';
    	
    	//begin code to check and change the status upon clicking the report done button
    	$scope.doneReporting=function(){
    	$scope.flag=true;
    	if($scope.barcodeValue==''){
    		
    		if($scope.nparray.lenght!=0){
    			
    			for(var i in $scope.nparray){
    				
    				$http.get(ASSET_URL_BASE+"/scan?np="+$scope.nparray[i]+"&stationId=6&technician="+$scope.username,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
    	           
    				.success(function(response){
    					
    					
    	                if(i==$scope.nparray.length-1)
    	                	{
    	                	window.location.reload();
    	                	
    	                	$scope.flag=true;
    	                	}
    				})
    				.error(function(error){
    					
    					console.log(err);
 	                    alert("Invalid Scan. Please Scan Again");
    				})
    			}
    		}
    		
    	}else{
    		
    		$http.get(ASSET_URL_BASE+"/scan?np="+$scope.barcodeValue+"&stationId=6&technician="+$scope.username,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
            .then(function successCallback(response) {
               
                	if(response.data.nextState==6)
                	window.location.href='ReportingStation.html';
                
                	else if(response.data.nextState>6){
                	
                	alert("This case is already passed Reporting");
                	window.location.href='ReportingStation.html';
                	$("#div4").addClass("hidden");
                	
                	}else{
                		
                	$("#template_dropdown").addClass("hidden");
					$("#select_button").addClass("hidden");
					$("#select_label").addClass("hidden");
					$('#report_button1').addClass("hidden");
					$('#div4').addClass("hidden");
					$('#report_button2').addClass("hidden");
                	alert("please complete previous station before doing Reporting");
                	window.location.href='ReportingStation.html';
                	}
            },function errorCallBack(err) {
            		console.log(err);
                   alert("Invalid Scan. Please Scan Again");
            })
    		
    		}
    	
        
    	}
    	//end of code
    	
    	
    	//begin
    	setInterval(function(){
    	
    	$scope.getPendingTasksReporting();
    	// calling this for checking pending tasks
    	//increased the time internal from 120000 to 12000000 as it slows down the page
        	}, 12000000)
        //end
    
        	
        //begin code to redirect to special instructions page upon clicking the add instructions button
	    $scope.sendSpecialRequest = function(){
	    	window.location.href = "specialRequest.html?npnumber="+$scope.patient.npBase;
	    }
    	//end of code
    
    	//begin
    	$scope.specialRequestInit = function(){
	
    		var parameters = location.search.substring(1).split("&");
    		var temp = parameters[0].split("=");
    		l = unescape(temp[1]);
	
    		$scope.npbasevalue = l;
    		$scope.barcodeValue =l;
	
			$http.get(ASSET_URL_BASE+"?npBase="+$scope.npbasevalue+":")
		  .success(function(data) {
		     
		      $scope.assetTable=data;
		  })
		  .error(function(data) {
			  //newly added error code
			  alert("Error: server encountered an internal error. Please try again after some time ");
    
		  });
    	} 
    	//end
    
    	//begin
    	$scope.updateStain = function(){
    		
    	$scope.selectedStainTests = [];
        $scope.selectAll = false;
    	
    	switch($scope.special.stain){
    	
    	case '0' : $scope.stainTestTable = [];
    	break;
    	case '1' : $scope.stainTestTable = $scope.Skin_Lafora;
    	break;
    	case '2' : $scope.stainTestTable = $scope.Skin_CADASIL;
    	break;
    	case '3' : $scope.stainTestTable = $scope.Vessel;
    	break;
    	case '4' : $scope.stainTestTable = $scope.Liver;
    	break;
    	case '5' : $scope.stainTestTable = $scope.Inflammatory;
    	break;
    	case '6' : $scope.stainTestTable = $scope.Muscle_fixed;
    	break;
    	case '7' : $scope.stainTestTable = $scope.Muscle_fresh;
    	break;
    	case '8' : $scope.stainTestTable = $scope.Muscle_fresh_metabolic;
    	break;
    	case '9' : $scope.stainTestTable = $scope.Nerve;
    	break;
    	default : $scope.stainTestTable = [];		
    	}
    }
    //end
    	
    	//begin
    	$scope.updateIHC = function(){
    	
        $scope.selectedihcTests = [];
        $scope.selectAll2 = false;
        
    	switch($scope.special.ihc){
    	
    	case '0' : $scope.ihcTestTable = [];
    	break;
    	case '1' : $scope.ihcTestTable = $scope.Epilepsy;
    	break;
    	case '2' : $scope.ihcTestTable = $scope.Pituitary;
    	break;
    	case '3' : $scope.ihcTestTable = $scope.MSRCT;
    	break;
    	case '4' : $scope.ihcTestTable = $scope.Lymphoma;
    	break;
    	case '5' : $scope.ihcTestTable = $scope.PNET;
    	break;
    	case '6' : $scope.ihcTestTable = $scope.Medulloblastoma;
    	break;
    	case '7' : $scope.ihcTestTable = $scope.Infective;
    	break;
    	case '8' : $scope.ihcTestTable = $scope.Demyelination;
    	break;
    	case '9' : $scope.ihcTestTable = $scope.Metastasis;
    	break;
    	case '10' : $scope.ihcTestTable = $scope.Plasmacytoma;
    	break;
    	case '11' : $scope.ihcTestTable = $scope.Germ_cell;
    	break;
    	case '12' : $scope.ihcTestTable = $scope.Glioma_adult_diffuse;
    	break;
    	case '13' : $scope.ihcTestTable = $scope.Glioma_adult_GBM;
    	break;
    	case '14' : $scope.ihcTestTable = $scope.Glioma_pediatric_midline;
    	break;
    	case '15' : $scope.ihcTestTable = $scope.Glioma_pediatric_non_midline;
    	break;
    	case '16' : $scope.ihcTestTable = $scope.Glioneuronal;
    	break;
    	case '17' : $scope.ihcTestTable = $scope.Pilocytic_astrocytoma_Ependymoma;
    	break;
    	case '18' : $scope.ihcTestTable = $scope.Muscle_fresh_DMD;
    	break;
    	case '19' : $scope.ihcTestTable = $scope.Muscle_fresh_LGMD;
    	break;
    	case '20' : $scope.ihcTestTable = $scope.Muscle_fresh_CMD;
    	break;
    	case '21' : $scope.ihcTestTable = $scope.Muscle_fresh_Protein_aggregate;
    	break;
    	case '22' : $scope.ihcTestTable = $scope.Muscle_fresh_Fibre_typing;
    	break;
    	case '23' : $scope.ihcTestTable = $scope.Muscle_fresh_EDMD;
    	break;
    	default : alert("Error");		
    	}
    }
    //end
    
    var no = 0;
    $scope.others1 = '';
    $scope.others2 = '';
    $scope.others3 = '';
    $scope.array3 = [];
    
    //begin code to submit the special instructions data
    $scope.submit = function(){
    	
    	$("#special_button").prop('disabled',true);
    	
    	$scope.allStainTests = '';
    	$scope.allihcTests = '';
    	
    	i = 0;
    	j = 0;
    	
    	
    	//tissue data
    	for(var k1=0;k1<$scope.tissue_array.length;k1++){
    		$scope.tissue_array[k1]["notes"] = $scope.special.note;
    		
    		if($scope.tissue_array[k1].em == 1){
    			
    			$scope.specialRequest(1,2,$scope.tissue_array[k1]);
    			
    		}else if($scope.tissue_array[k1].process_all == 1){
    			
    			$scope.specialRequest(1,2,$scope.tissue_array[k1]);
    			
    		}else if($scope.tissue_array[k1].process_more == 1){
    			
    			$scope.specialRequest(1,2,$scope.tissue_array[k1]);
    		}
    		
    	}
    	
    	
    	//block data
    	for(var k2=0;k2<$scope.test_array.length;k2++){
    		
    		
    		if($scope.test_array[k2]["ihc"] === "undefined:"){
    			$scope.test_array[k2]["ihc"] = "";
    			
    		}
    		if($scope.test_array[k2]["special_stain"] === "undefined:"){
    			$scope.test_array[k2]["special_stain"] = "";
    		} 
    		
    		if($scope.special.checkbox_ihc === false){
    			
    			$scope.test_array[k2]["ihc"] = "";
    		}
    		if($scope.special.checkbox_stain === false){
    			
    			$scope.test_array[k2]["special_stain"] = "";
    		}
    		$scope.test_array[k2]["notes"] = $scope.special.note;
    		
    			$scope.specialRequest(3,4,$scope.test_array[k2]);
    		}
    	
    }
    //end of submit 
    
    
    //begin
    function arraysEqual(arr1, arr2) {
    	if(arr1 && arr2){
	        if(arr1.length !== arr2.length)
	            return false;
	        for(var i = arr1.length; i--;) {
	            if(arr1[i] !== arr2[i]){
	            	
	            	return false;
	            }
	                
	        }
	
	        return true;
    	}else{
    		return false;
    	}
    }
    //end

    
    var specialRequest1 = {};
    
    //begin
    $scope.specialRequest = function(currentStation,nextStation,specialRequest){

    	
    	//REST call for saving special instructions in the db
    	$http.post(SPECIAL_REQUEST_URL+"?currentState="+currentStation+"&nextState="+nextStation+"&technicianName="+$scope.username, specialRequest ,{headers: {'Content-Type': 'application/json'}})
   	 	.success(function(data) {	
   		window.location.href='ReportingStation.html';
   		
   		
   		 no--;
    		 if (no==0){
    			
   			 $('#editModal').modal('hide');
   			 alert("Special Request Submitted!");
   			 if($scope.special.em == true)
   				 $scope.doneReporting();
   			 else
   				 window.location.href='ReportingStation.html';
   		 }	 
  		 
   	 	})
   	 	.error(function(data) {
                   	alert("Not able to save the special request");
                 	console.log(data);
        });
  	
    	
    }
    //end 
    
    
    $scope.special.checkbox_stain = false;
    $scope.special.checkbox_ihc = false;
   
    //begin
    $scope.showRequest = function(){
    	
        $scope.special.checkbox_stain = true;
       
    }
    //end 
    
    //begin
    $scope.showRequest1 = function(){
    	 $scope.special.checkbox_ihc = true;
    	
    }
    //end
    
    //begin
    $scope.processall = function(){
    	
    	$scope.special.processAll = true;
    }
    //end
    
    
    //begin
	 $scope.processmore = function(){
	    	
	    	$scope.special.processMore = true;
	 }
	 //end
    
	 //begin
    $scope.em = function(){
    	
    	$scope.special.em = true;
    }
    //end
    
    
    //begin
    $scope.selectAllTests = function(){
    	
    	if($scope.selectAll==false){
    		
    		$scope.selectedStainTests = [];
    		for(var test in $scope.stainTestTable){
    			
    			$scope.selectedStainTests[$scope.stainTestTable[test]]="true";
    		}
    	}else
    		$scope.selectedStainTests = [];
    	
    }
    //end 
    $scope.selectAll2 = false;
    
    
    //begin
    $scope.selectAllTests2 = function(){
    	
    	if($scope.selectAll2==false){
    		
    		$scope.selectedihcTests = [];
    		for(var test in $scope.ihcTestTable){	
    			
    			$scope.selectedihcTests[$scope.ihcTestTable[test]]="true";
    		}
    	}else
    		$scope.selectedihcTests = [];
    	
    	
    }
    //end
    
    
    //begin code to display the report template
    $('#template_dropdown').on('change', function() {
    	$('#report_template1').modal('show');
    	$scope.selected =$('#template_dropdown').val();
    	
    	
    	if($scope.selected==="general"){
    		$('#div2').addClass("hidden");
    		$('#div3').addClass("hidden");
    		$('#div1').removeClass("hidden");
    		$('#report_button1').removeClass("hidden");
    		
    	}else if($scope.selected==="muscle"){
    		$('#div1').addClass("hidden");
    		$('#div3').addClass("hidden");
    		$('#div2').removeClass("hidden");
    		
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
    		
    	}	
    	else if($scope.selected==="epileptic"){
    		$('#div1').addClass("hidden");
    		$('#div2').addClass("hidden");
    		$('#div3').removeClass("hidden");
    		
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
    	
    });
    //end of code
    
    
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
    $scope.doc_id = "11";
    
    $scope.reportArray = [];
    $scope.obj = {};
    
    //begin code to submit the report
    $scope.submitReport =  function(){
    	
    		$("#report_button1").prop("disabled",true);
    	
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
    	 }
    	 else{
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
    
    //new code for special stains
    
    var test_obj = {};
    $scope.test_array = [];
    $scope.allStainTests = '';
	$scope.allihcTests = '';
	$scope.block_others = '';
	
	
	
	//begin code to add multiple tests for each block - both special stains and ihc
    $scope.addTest = function(){
    	
    	//display the selected tests row
    	var result_style = document.getElementById('test_selected').style;
    	result_style.display = 'table-row';
    	
    	//npNumber
    	test_obj.npNumber = $scope.special.block1[0];
    	i = 0;
    	j = 0;
    	
    	//Special stains
    	
    	$scope.allStainTests+=($scope.others1=='')?'':($scope.others1);
    	for (var test in $scope.selectedStainTests){
    		
    		if($scope.selectedStainTests[test]=="true"){
    			if(i==0)
    				$scope.allStainTests = test;
    			else
    				$scope.allStainTests +=","+ test;
    			i++;
    		}
    		
    	}
    	
    	//IHC
    	
    	$scope.allihcTests +=($scope.others2=='')?'':($scope.others2);
    	for (var test in $scope.selectedihcTests){
    		
    		if($scope.selectedihcTests[test]=="true"){
    			if(j==0)
    				$scope.allihcTests = test;
    			else
    				$scope.allihcTests +=","+ test;
    			j++;
    		}
    		
    	}
    	
    	test_obj.process_all = "";
    	test_obj.process_more = "";
    	test_obj.em = "";
    	
    	test_obj.ihc = $scope.allihcTests;
    	
    	
    	test_obj.special_stain = $scope.allStainTests;
    	test_obj.block_others = $scope.others3;
    	
    	if($scope.special.checkbox_ihc === false){
    		
    		//test_obj.ihc ="";
		}
		if($scope.special.checkbox_stain === false){
			//test_obj.special_stain ="";
		}
    	
    	
    	$scope.test_array.push(test_obj);
    	
    	
    	//clear the object, special_stain, ihc
    	test_obj = {};
    	$scope.allStainTests = '';
    	$scope.allihcTests = '';
    	$scope.others3 = '';
    	
    	
    	//reset dropdown menu after clicking add test button
    	 $scope.special.checkbox_stain="checkbox1";
         $scope.special.stain = '';
         $scope.special.checkbox_ihc = "checkbox2";
     	 $scope.special.ihc = '';
     	
     	$scope.special.checkbox_stain = true;
        $scope.special.checkbox_ihc = true;
    	
    }
    //end of code
    
    
    
    //begin code to remove any selected test displayed above before saving in db
    $scope.remove_test =  function(n){
    	$scope.test_array.splice($scope.test_array.indexOf(n),1);
    	
    }
    //end of code
    
    $scope.process_all;
    $scope.process_more;
    $scope.em;
    
    tissue_obj = {};
    $scope.tissue_array = [];
    
    //begin code to add multiple tests for each tissue
    $scope.addTissue = function(){
    	
    	//display the selected tests row
    	var result_style1 = document.getElementById('tissue_selected').style;
    	result_style1.display = 'table-row';
    	
		if($scope.special.processAll==true){
			$scope.process_all = 1;
		}else{
			$scope.process_all = 0;
		}
		
		if($scope.special.processMore==true){
			$scope.process_more = 1;
		}else{
			$scope.process_more = 0;
		}
		
		if($scope.special.em==true){
			$scope.em = 1;
		}else{
			$scope.em = 0;
		}
			
		tissue_obj.npNumber = $scope.special.tissue1[0];
		tissue_obj.process_all = $scope.process_all;
		tissue_obj.process_more = $scope.process_more;
		tissue_obj.em = $scope.em;
		tissue_obj.ihc = "";
		tissue_obj.special_stain = "";
		
		
		
		$scope.tissue_array.push(tissue_obj);
		tissue_obj = {};
    	$scope.process_all = 0;
    	$scope.process_more = 0;
    	$scope.em = 0;
    	
    	 $scope.special.processAll=false;
    	 $scope.special.processMore=false;
    	 $scope.special.em=false;
    	
	
    	
    }
    
  //begin code to remove any selected test displayed above before saving in db
    $scope.remove_tissue =  function(n){
    	$scope.tissue_array.splice($scope.tissue_array.indexOf(n),1);
    	
    }
    //end of code
    
    
    
    $scope.edit = {};

    //begin
    $scope.update=function (){
    	
        $scope.edit.corrective=$scope.edit.corrective;
        $scope.edit.preventive=$scope.edit.preventive;
        $scope.edit.faculty=$scope.edit.faculty;
        $scope.edit.ncsType=$scope.edit.ncsType;
        
    }
    //end
     
    
    $scope.file_array = [];
    $scope.pic = '';
    $scope.upload_id = '';
    
    //begin code to get the uploaded files and display in the pop up upon clicking the uploaded files button
    $scope.getFiles =  function(barcodeValue){
	
	
	$http.get(ASSET_URL_BASE+"/getlistofimage?np_base="+barcodeValue)
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
    

    //begin code to view the uploaded file in the pop up
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

    //begin code to delete the uploaded file in the pop up
    $scope.deleteFile = function(upload_id){
	
	$http.get(URL_BASE+"ehosp/deleteFile?np_upload_id="+upload_id)
    .success(function(data) {
       
        
        alert("Successfully deleted file");
        $scope.pic = ""; 
      	$scope.file_array = [];
      	$('#fileid').val("");
      	$("#myFrame").hide();
      	$("#myFrame").contents().find("body").html("");
       
        
        
    })
	
    }
    //end of code

    //begin 
    $scope.close =  function(){
	
	 $scope.pic = ""; 
	 $scope.file_array = [];
	 $('#uploadModal').modal('hide');
    }
    //end 
    
    //begin
    $scope.close1 =  function(){
	
	 $('#messageModal').modal('hide');
    }
    //end
    
    //begin
    $scope.close2 =  function(){
	 
	 $('#displayMessageModal').modal('hide');
    }
    //end



	$scope.np_Number = '';
	$scope.user_id = '';
	$scope.resultObject1 = [];

	//begin code to get the technician Name from the list of technicians for displaying in the message table
	$scope.search1 = function(nameKey, myArray){
	
	
    for (i=0;i < myArray.length; i++) {
        var marvelHeroes =  myArray.filter(function(hero) {
		return hero.technician_id == nameKey;
		});
        return marvelHeroes;
             
    }
	}
	//end of code


	//begin cod to display the technicians details data to get the technician name related to message feature
	//getting all technicians data
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
	$scope.np_Number = '';


	$scope.messages = [];

	//begin code to get unread messages when clicking bell icon
	$scope.getMessages = function(){
	
	if($scope.username== undefined){
    	alert("Please login");
    	return false;
    	
    }else{
	
	
	$http.get(URL_BASE+"npmessage/getAllmessage?rec_station_id="+5)
    .success(function(data) {
        
        
        for(var i= 0;i<data.length;i++){
        	 var d = new Date(data[i].createdAt);
 	    	
        	 data[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
 	    	d.getHours() + ":" + d.getMinutes();
        	 
        }
        
      
        $scope.messages = data;
        $scope.messages1 = [];
        
        for(var j=0;j<$scope.messages.length;j++){
        	$scope.messages1[j]= $scope.search1($scope.messages[j].user_id, $scope.techTable1);
        	
        	$scope.messages[j].tech= $scope.messages1[j][0].technicianName;
    	
        }
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
	
	$http.get(URL_BASE+"npmessage/countofmessages?station_id="+5)
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
		    
		    //hide the bell if there is no notification
		    if(notification_count  == 0){
		    	
		    	$('#notify_div').addClass("invisible");
		    	document.getElementById("notify_div1").style.cursor = "default";
		    	
		    }
       
    }).error(function(data) {
		  
    	  alert("Error: server encountered an internal error. Please try again after some time ");
        
    });
	
	}
	//end of code

	$scope.getCount();


	$scope.np_array = [];
	$scope.messages3 = [];

	//begin code to get message history for a block number to display in the table when clicking view button in the notification modal
	$scope.viewunreadMessageforNp1 = function(np,message_id){
	
	
	$scope.np_array=np.split(":");
	
	$scope.barcodeValue = $scope.np_array[0];
	
	//get patient details
	$scope.getPatientFromRequest1();
	
	//get special instructions details
	$scope.getAllSpecialForNp($scope.barcodeValue);
	
	//get special tasks details
	$scope.getAllSpecialTissueForNp($scope.barcodeValue);
	
	//calling function updating the read flag
	$scope.readDone(message_id);
	
	$("#messageModal").modal('hide');
	
	$http.get(URL_BASE+"npmessage/getmessagebyblock?npNumber="+np+"&stn_id="+5)
    .success(function(data) {
        
        $scope.messages3= data;
        
        for(var i= 0;i<data.length;i++){
          	 var d = new Date(data[i].createdAt);
   	    	
          	 data[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
   	    	d.getHours() + ":" + d.getMinutes();
          	 
          }
          
           $scope.message3 = data;
       
           for(var j=0;j<$scope.messages3.length;j++){
           	$scope.messages2[j] = ($scope.search1($scope.messages3[j].user_id, $scope.techTable1));
           	$scope.messages3[j].tech= $scope.messages2[j][0].technicianName;
       	
           }
        
           $("#messageDiv1").removeClass("hidden");

       
    }).error(function(data) {
		  
    	  alert("Error: server encountered an internal error. Please try again after some time ");
        
    });
	
	}
	//end of code


	//begin code to get message history for np number to display in the table when when scanning in the regular flow
	$scope.viewunMessageRegular = function(np){
	
	
	$http.get(URL_BASE+"npmessage/getmessagebyblock?npNumber="+np+"&stn_id="+5)
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


	//begin code to update the read flag for the notification message upon clicking the view button
	$scope.readDone = function(message_id){
	
	$http.get(URL_BASE+"npmessage/makeReadmessage?np_message_id="+message_id)
    .success(function(data) {
      
    }).error(function(data) {
		  
    	  alert("Error: server encountered an internal error. Please try again after some time ");
        
    });
	
	}
	//end of code


	//begin code to display all messages for a block number in the view and reply pop-up when clicking Message button in instructions table
	$scope.viewunreadMessageforNp =  function(np){
	
	
	$http.get(URL_BASE+"npmessage/getmessage?npNumber="+np)
    .success(function(data) {
    	
       
        $scope.messages2= data;
        $("#displayMessageModal").modal('show');
        
       
    }).error(function(data) {
		  
    	  alert("Error: server encountered an internal error. Please try again after some time ");
        
    });
	
	}
	//end of code



	$scope.np1 = [];
	$scope.messages = [];

	//begin code to get message history for a block number to display in the pop-up when sending message by clicking Message button
	$scope.viewreplyMessage = function(np){
	$scope.np = np;
	$("#displayMessageModal").modal('show');
	
	$http.get(URL_BASE+"npmessage/getmessagebyblock?npNumber="+np+"&stn_id="+5)
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

	//begin code to send message or reply message for a block number or tissue number
	$scope.sendReply =  function(np){
	
	$scope.user_id = $cookieStore.get('user_id');
	
	
	$scope.message = $('#messagebox').val();
	$scope.obj1 = {};
	var count = (np.match(/:/g) || []).length;
	if(count > 1){
		
		// to sectioning
		
	$scope.obj1 = {
		"np_message_id":0,
		"asset_number":np,
		"rec_station_id":4,
		"send_station_id":5,
		"message":$scope.message,
		"user_id":$scope.user_id,
		"createdAt":""

		}
	}else{
		//to grossing
		
		 $scope.obj1 = {
					"np_message_id":0,
					"asset_number":np,
					"rec_station_id":2,
					"send_station_id":5,
					"message":$scope.message,
					"user_id":$scope.user_id,
					"createdAt":""
		
	}
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


	$scope.specialArrayNp = [];

	//begin code to get all the special  blocks when scanning an np number for displaying in a new table below the messages table
	$scope.getAllSpecialForNp =  function(np){
	
	$http.get(URL_BASE+"assets/scanreportBlock?np="+np)
    .success(function(data) {
    	
       
    	
    	if(data!=""){
    		$("#messageDiv2").removeClass("hidden");
        for(var i=0;i<data.length;i++){
            var d = new Date(data[i].createdAt);
	    	
            data[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	    	d.getHours() + ":" + d.getMinutes();
	    	
            
            if(data[i].createdAt==="NaN-NaN-NaN NaN:NaN"){
            	data[i].createdAt = "NA";
    		}else{
    			
    			data[i].createdAt = data[i].createdAt;
    		}
            }
        
        $scope.specialArrayNp = data;
        console.log($scope.specialArrayNp);
    	}
        
       
    }).error(function(data) {
		  
    	  alert("Error: server encountered an internal error. Please try again after some time ");
        
    });
	
	}
	//end of code


	$scope.specialArrayTissueNp = [];

	//begin code to get all the special  tissues when scanning an np number for displaying in a new table below the messages table
	$scope.getAllSpecialTissueForNp =  function(np){
	
	
	$http.get(URL_BASE+"assets/scanreportTissue?np="+np)
    .success(function(data) {
    	
    	if(data!=""){
    		$("#messageDiv3").removeClass("hidden");
       
        for(var i=0;i<data.length;i++){
            var d = new Date(data[i].createdAt);
	    	
            data[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
	    	d.getHours() + ":" + d.getMinutes();
	    	
            
            if(data[i].createdAt==="NaN-NaN-NaN NaN:NaN"){
            	data[i].createdAt = "NA";
    		}else{
    			
    			data[i].createdAt = data[i].createdAt;
    		}
            }
        
        $scope.specialArrayTissueNp = data;
    	}
        
       
    }).error(function(data) {
		  
    	  alert("Error: server encountered an internal error. Please try again after some time ");
        
    });
	
	}
	//end of code


	//begin code to get special tissue tasks from grossing station
	$scope.getSpecialTasks=function(){
	
	$("#messageDiv1").addClass("hidden");
	$("#messageDiv2").addClass("hidden");
	$("#messageDiv3").addClass("hidden");
	$("#asset-list1").addClass("hidden");
	$("#asset-list3").addClass("hidden");
	$("#asset-list2").removeClass("hidden");
	
	

    $scope.label="Special Tasks";
    $scope.assetTasksTable=[];
    $scope.task=true;
    var url=STATION_BASE_URL+"/special?stationId=2";
    
    $http.get(url)
        .success(function (data) {
        	
            $scope.assetTasksTable1=data;
           
            //to display latest record first
            $scope.assetTasksTable1 =  $scope.assetTasksTable1.reverse();
            
            $scope.noOfSpecialtasks = data.length;
            //$scope.changetoWarning();
        })
    
	}
	//end of code

	//begin code to get special instructions from the sectioning station
	$scope.getSpecialTasks1=function(){
		
	$("#messageDiv1").addClass("hidden");
	$("#messageDiv2").addClass("hidden");
	$("#messageDiv3").addClass("hidden");
	$("#asset-list1").addClass("hidden");
	$("#asset-list2").addClass("hidden");
	$("#asset-list3").removeClass("hidden");
	
	$scope.myVar = true;
    $scope.label="Special Tasks";
    $scope.assetTasksTable2=[];
    $scope.task=true;
    
    var url=STATION_BASE_URL+"/special?stationId=4";
    $http.get(url)
        .success(function (data) {
        	
            $scope.assetTasksTable2=data;
            for(var i=0;i<$scope.assetTasksTable2.length;i++){
            
            
            if($scope.assetTasksTable2[i].createdAt){
            	var d = new Date($scope.assetTasksTable2[i].createdAt);
    	    	
    	    	 $scope.assetTasksTable2[i].createdAt = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    	    	d.getHours() + ":" + d.getMinutes();
    	    	
            	
            }else{
            	$scope.assetTasksTable2[i].createdAt = "";
            }
            }
           
            $scope.myVar = false;
            
            //to display latest record first
            //$scope.assetTasksTable = $scope.assetTasksTable.reverse();
            $scope.noOfSpecialtasks2 = data.length;
           // $scope.changetoWarning();
        })
    
	}
	//end of code


	$scope.nextState_array = [];
	
	//begin code to check  and  display the report template
	$scope.checkReport =  function(np){
	
	var np1="'"+np+"'";
	
	$http.get(URL_BASE+"assets/nextState?np="+np1)
    .then(function successCallback(response) {
      
       $scope.nextState_array = response.data.split("next_state:");
       
       if($scope.nextState_array[1] == 6){
    	   
    	   var data1 = {
    				 "parm1":"14",
    				 "parm2":np
    		 };
    	   
    	   return $http.post(URL_BASE+'ehosp/reportUsingSampleId',data1,config1)
    		.then(
    				function(response){
    					
    					
    					if(response.data != ""){
    						$("#template_dropdown").addClass("hidden");
    						$("#select_button").addClass("hidden");
    						$("#select_label").addClass("hidden");
    						$('#report_button1').addClass("hidden");
    						$('#div4').removeClass("hidden");
    						$('#report_button2').removeClass("hidden");
    						var report = response.data[0].result;
    						 CKEDITOR.instances.editor4.setData(report);
    					}else{
    						$("#select_label").removeClass("hidden");
    						$("#template_dropdown").removeClass("hidden");
    						$("#select_button").removeClass("hidden");
    						$('#div4').addClass("hidden");
    						$('#report_button2').addClass("hidden");
    					}
    					
    					  

    				});
    	   
       }else if($scope.nextState_array[1] > 6){
    	   
    	   $("#template_dropdown").addClass("hidden");
			$("#select_button").addClass("hidden");
			$("#select_label").addClass("hidden");
			$('#report_button1').addClass("hidden");
			$('#div4').addClass("hidden");
			$('#report_button2').addClass("hidden");
    	   
       }else{
    	   
    	   $("#template_dropdown").addClass("hidden");
			$("#select_button").addClass("hidden");
			$("#select_label").addClass("hidden");
			$('#report_button1').addClass("hidden");
			$('#div4').addClass("hidden");
			$('#report_button2').addClass("hidden");
    	   
       }
       
        
        
    },function errorCallBack(err) {
    		console.log(err);
           alert("Invalid Scan. Please Scan Again");
    })
	 	 
	
	}
	//end of code


	//begin code to submit the report
	$scope.submitReport2 =  function(){
	
	$("#report_button2").prop("disabled",true);
	$scope.report = "";
	 $scope.report = CKEDITOR.instances.editor4.getData();
 

	 if($scope.patient.patientSex === 0){
		 $scope.patient.patientSex = "Male";
	 }
	 else{
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



	// if nextstate is 6, then in the reporting station , if already there is report(remarks from grossing station), we have to display the remarks and enter the report
	//if nextstate is 6, and there is no report , then we have to display the template to write the report
	// if nextstate is >6, then should not display template and existing report
	$scope.check_status = function(barcodeValue){
	
	$http.get(ASSET_URL_BASE+"/scan?np="+barcodeValue+"&stationId=6&technician="+$scope.username,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
    .then(function successCallback(response) {
       
       
        if(response.data.nextState == 6){
        	
        	$scope.checkReport(barcodeValue);
        	
        	}else if(response.data.nextState > 6){
        		
        		$("div4").addClass("hidden");
        		$('#report_button2').addClass("hidden");
        		$("#template_dropdown").addClass("hidden");
				$("#select_button").addClass("hidden");
				$("#select_label").addClass("hidden");
        	}
        
    },function errorCallBack(err) {
    		console.log(err);
           alert("Invalid Scan. Please Scan Again");
    })
	
	}
	//end of code
	
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
	sessionStorage.setItem("station", "5");
	window.location.href = "NCSDetails.html";
}
	
});