/**
 * 
 */
var app = angular.module('messageStation', ['ui.bootstrap','ngCookies']);
app.controller('messageController',function($scope,$http,$window,$cookieStore)
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
                         "Lugol’s iodine"];
   
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
 
    
    $scope.setUsername=function() {
       
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
    $scope.techTable=[];
    $scope.tech={};
    
  //starts ranjans code
    
    if($scope.username!=undefined)
    	$scope.showLogout=true;
    else
    	$scope.showLogout=false;
    
    $scope.techTable=[];
    $scope.faculty_Array = [];
    $scope.residentArray = [];
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
    
    $scope.logout=function(){
    	
    	$cookieStore.remove("reportingusername");
    	 $window.location.reload();
    	 
    }
    //ends


    $scope.myVar=false;
    
    $scope.getPatientFromRequest=function(){
    	
    	if($scope.username==null)
    		$scope.getAllUsers();
    	else{
	    	
	    	$scope.myVar=true;
	    	
	    	var tempString = $scope.barcodeValue + ";";
	    	var test = tempString.substring(0,tempString.indexOf(";"));
	    	test=test.toUpperCase();
	    	$scope.barcodeValue=test;
	    	// $scope.getFiles($scope.barcodeValue);
	        $http.get(REQUEST_URL_BASE+"?npbase="+$scope.barcodeValue)
	        .success(function(data) {
	        	
	            $scope.patient=data;
	           
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
    
    $scope.getPendingTasksReporting=function (){
    	
    $scope.assetTasksTable=[];
    var url=STATION_BASE_URL+"/pending?stationId=6";
   
    $http.get(url)
        .success(function (data) {
            $scope.assetTasksTable=data;
            //to display latest record first
            $scope.assetTasksTable =  $scope.assetTasksTable.reverse();
        })
    }
   
    $scope.nparray=[];
    $scope.npindex=[];
    
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

$scope.flag= false;
    
$scope.barcodeValue='';
    $scope.doneReporting=function(){
    	$scope.flag=true;
    	if($scope.barcodeValue==''){
    		
    		if($scope.nparray.lenght!=0){
    			
    			for(var i in $scope.nparray){
    				
    				$http.get(ASSET_URL_BASE+"/scan?np="+$scope.nparray[i]+"&stationId=6&technician="+$scope.username,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
    	            /*.then(function successCallback(response) {
    	                console.log(response.data);
    	                if(i==$scope.nparray.length-1)
    	                	{
    	                	window.location.reload();
    	                	
    	                	$scope.flag=true;
    	                	}
    	           
    	            },function errorCallBack(err) {
    	            		console.log(err);
    	                   alert("Invalid Scan. Please Scan Again");
    	            })*/
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
    		
    	}
    	else{
    		
    	
    		$http.get(ASSET_URL_BASE+"/scan?np="+$scope.barcodeValue+"&stationId=6&technician="+$scope.username,{headers: {'Content-Type': 'application/json','Content-Type':'text/html'}})
            .then(function successCallback(response) {
               
                if(response.data.nextState==6)
                	window.location.href='ReportingStation.html';
                else if(response.data.nextState>6)
                	{alert("This case is already passed Reporting");
                	window.location.href='ReportingStation.html';
                	}
                else
                	{alert("please complete previous station before doing Reporting");
                	window.location.href='ReportingStation.html';
                	}
            },function errorCallBack(err) {
            		console.log(err);
                   alert("Invalid Scan. Please Scan Again");
            })
    		
    	}
    	
        
    }
    setInterval(function(){
    	
    	$scope.getPendingTasksReporting();// calling this for checking pending tasks
    	console.log("interval");
        	}, 120000)
    
    $scope.sendSpecialRequest = function(){
    	
    	window.location.href = "specialRequest.html?npnumber="+$scope.patient.npBase;
    }
    
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
    
    var no = 0;
    $scope.others1 = '';
    $scope.others2 = '';
    $scope.others3 = '';
    $scope.array3 = [];
    $scope.submit = function(){
    	
    	$("#special_button").prop('disabled',true);
    	console.log($scope.tissue_array);
    	console.log($scope.test_array);
    	$scope.allStainTests = '';
    	$scope.allihcTests = '';
    	
    	i = 0;
    	j = 0;
    	
    	
    	console.log($scope.tissue_array);
    	console.log($scope.test_array);
    	
    	//tissue data
    	for(var k1=0;k1<$scope.tissue_array.length;k1++){
    		$scope.tissue_array[k1]["notes"] = $scope.special.note;
    		
    		if($scope.tissue_array[k1].em == 1){
    			/*$scope.specialRequest(5,5,$scope.tissue_array[k1]);*/
    			$scope.specialRequest(1,2,$scope.tissue_array[k1]);
    		}else if($scope.tissue_array[k1].process_all == 1){
    			$scope.specialRequest(1,2,$scope.tissue_array[k1]);
    		}else if($scope.tissue_array[k1].process_more == 1){
    			$scope.specialRequest(1,2,$scope.tissue_array[k1]);
    		}
    		
    	}
    	
    	console.log($scope.special.checkbox_ihc);
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
    	
    	/*for(var k2=0;k2<$scope.test_array.length;k2++){
    		
    		if($scope.tissue_array[k2].em == 1){
    			$scope.specialRequest(5,5,$scope.tissue_array[k2]);
    		}else if($scope.tissue_array[k2].process_all == 1){
    			$scope.specialRequest(1,2,$scope.tissue_array[k2]);
    		}
    		
    	}*/
    	
    		
    	
    	
    	
    	
    	/*for (var test in $scope.selectedStainTests){
    		
    		if($scope.selectedStainTests[test]=="true"){
    			if(i==0)
    				$scope.allStainTests = test;
    			else
    				$scope.allStainTests +=","+ test;
    			i++;
    		}
    		
    	}*/
    	
    	
    	/*$scope.allStainTests+=($scope.others1=='')?'':(","+$scope.others1);
    	for (var test in $scope.selectedihcTests){
    		
    		if($scope.selectedihcTests[test]=="true"){
    			if(j==0)
    				$scope.allihcTests = test;
    			else
    				$scope.allihcTests +=","+ test;
    			j++;
    		}
    		
    	}*/
    	/*$scope.allihcTests +=($scope.others2=='')?'':(","+ $scope.others2);
    		
    	if($scope.special.em == true){
    			//console.log("going to staining");
    			if($scope.special.tissue2){
    				for(var i in $scope.special.tissue2);
    				
    				//$scope.specialRequest(5,5,$scope.special.tissue2[i]);
    				
    				
    				
    				no++;
    			}
    			else
            		alert("Please select the tissue");
    		}  */ 		
    		
    		/*if($scope.special.processAll == true){
    			//console.log("going to grossing");
    			if($scope.special.tissue1){
    				for(var i in $scope.special.tissue1)
    				//$scope.specialRequest(1,2,$scope.special.tissue1[i]);
    				no++;
    			}
    			else
            		alert("Please select the tissue");
    		}*/

					
    			/*if (arraysEqual($scope.special.block1,$scope.special.block2)) {

							//console.log("going to sectioning both");
							if ($scope.special.block1) {
								for ( var i in $scope.special.block1)
									$scope.specialRequest(3, 4,
											$scope.special.block1[i]);
								no++;
							} else
								alert("Please select the block");

				} else {
					if ($scope.special.checkbox_stain == true) {
					//console.log("going to sectioning alone1");
					if ($scope.special.block1) {
						for ( var i in $scope.special.block1)
							$scope.specialRequest(3, 4,
									$scope.special.block1[i]);
						no++;
					} else
						alert("Please select the block");

				} if ($scope.special.checkbox_ihc == true) {
					//console.log("going to sectioning alone 2");
					if ($scope.special.block2) {
						for ( var i in $scope.special.block2)
							$scope.specialRequest(3, 4,
									$scope.special.block2[i]);
						no++;
					} else
						alert("Please select the block");
				}
				}*/
    	
    	console.log($scope.test_array);
    	console.log($scope.tissue_array);

    }
    
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

    
    var specialRequest1 = {};
    
    $scope.specialRequest = function(currentStation,nextStation,specialRequest){

    	/*var specialRequest ={
    		npNumber : npNum,
    		notes : $scope.special.note,
    		process_all : ($scope.special.processAll==true)?1:0,
    		em	: ($scope.special.em==true)?1:0	
    	};*/
    	
    	//notes
    	//console.log($scope.special.note);
    	//block test array
    	//console.log($scope.test_array);
    	//tissue test array
    	//console.log($scope.tissue_array);
    	
    	//merge test and tissue array into one
    	//Array.prototype.push.apply($scope.test_array,$scope.tissue_array);
    	
    	/*$scope.array3  = $scope.test_array.concat($scope.tissue_array);
    	
    	for(var i=0;i<$scope.array3.length;i++){
    		$scope.array3[i]["notes"] = $scope.special.note;
    		
    		if($scope.array3[i]["ihc"] === "undefined:"){
    			
    			$scope.array3[i]["ihc"] = "";
    		}
    		if($scope.array3[i]["special_stain"] === "undefined:"){
    			
    			$scope.array3[i]["ihc"] = "";
    		}
    	}
    	console.log($scope.array3);*/
    	
    //commented
    	/*if($scope.special.checkbox_ihc == true)
    		specialRequest["ihc"]=$scope.ihc[$scope.special.ihc]+":"+$scope.allihcTests;
    	
    	if($scope.special.checkbox_stain == true)
    		specialRequest["special_stain"]=$scope.special_stains[$scope.special.stain]+":"+$scope.allStainTests;*/
    	
    	console.log(specialRequest);
    	//commented temporarily on 12-02-2020 - this is the REST call for saving special instructions in the db
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
    $scope.special.checkbox_stain = false;
    $scope.special.checkbox_ihc = false;
   
    $scope.showRequest = function(){
    	
        $scope.special.checkbox_stain = true;
       
    }
    $scope.showRequest1 = function(){
    	 $scope.special.checkbox_ihc = true;
    	
    }
    
    $scope.processall = function(){
    	
    	$scope.special.processAll = true;
    }
 $scope.processmore = function(){
    	
    	$scope.special.processMore = true;
    }
    
    $scope.em = function(){
    	
    	$scope.special.em = true;
    }
    
    
    $scope.selectAllTests = function(){
    	
    	if($scope.selectAll==false){
    		
    		$scope.selectedStainTests = [];
    		for(var test in $scope.stainTestTable){
    			
    			$scope.selectedStainTests[$scope.stainTestTable[test]]="true";
    		}
    	}
    	else
    		$scope.selectedStainTests = [];
    	
    }
    $scope.selectAll2 = false;
    $scope.selectAllTests2 = function(){
    	
    	if($scope.selectAll2==false){
    		
    		$scope.selectedihcTests = [];
    		for(var test in $scope.ihcTestTable){	
    			
    			$scope.selectedihcTests[$scope.ihcTestTable[test]]="true";
    		}
    	}
    	else
    		$scope.selectedihcTests = [];
    	
    	
    }
    
    $scope.openTemplate = function(){
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
    		
    	}	
    	else if($scope.selected==="epileptic"){
    		$('#div1').addClass("hidden");
    		$('#div2').addClass("hidden");
    		$('#div3').removeClass("hidden");
    		//CKEDITOR.replace('editor3');
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
    $scope.submitReport =  function(){
    	
    		$("#report_button1").prop("disabled",true);
    	/*var nicE = new nicEditors.findEditor('report');
    	question = nicE.getContent();
    	console.log(question);*/
    	 if($scope.selected==="general"){
    		 $scope.report = "";
    		 $scope.report = CKEDITOR.instances.editor1.getData();
    		//console.log(CKEDITOR.instances.editor1.getData());
    		
    		
    	}else if($scope.selected==="muscle"){
    		 $scope.report = "";
    		 $scope.report = CKEDITOR.instances.editor2.getData();
    		//console.log(CKEDITOR.instances.editor2.getData());
    		
    	}	
    	else if($scope.selected==="epileptic"){
    		 $scope.report = "";
    		 $scope.report = CKEDITOR.instances.editor3.getData();
    		//console.log(CKEDITOR.instances.editor3.getData());
    		
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
    
    //new code for special stains
    
    var test_obj = {};
    $scope.test_array = [];
    $scope.allStainTests = '';
	$scope.allihcTests = '';
	$scope.block_others = '';
	
	
	
	//function to add multiple tests for each block - both special stains and ihc
    $scope.addTest = function(){
    	
    	
    	
    	//display the selected tests row
    	var result_style = document.getElementById('test_selected').style;
    	result_style.display = 'table-row';
    	
    	//npNumber
    	test_obj.npNumber = $scope.special.block1[0];
    	i = 0;
    	j = 0;
    	
    	//Special stains
    	//$scope.allStainTests+=($scope.others1=='')?'':(","+$scope.others1);
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
    	//$scope.allihcTests +=($scope.others2=='')?'':(","+ $scope.others2);
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
    	
    	console.log($scope.others3);
    	//test_obj.ihc = $scope.ihc[$scope.special.ihc]+":"+$scope.allihcTests;
    	//test_obj.special_stain = $scope.special_stains[$scope.special.stain]+":"+$scope.allStainTests;
    	test_obj.ihc = $scope.allihcTests;
    	test_obj.special_stain = $scope.allStainTests;
    	test_obj.block_others = $scope.others3;
    	
    	if($scope.special.checkbox_ihc === false){
    		test_obj.ihc ="";
		}
		if($scope.special.checkbox_stain === false){
			test_obj.special_stain ="";
		}
    	
    	
    	$scope.test_array.push(test_obj);
    	
    	console.log($scope.test_array);
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
    
    
    
    //function to remove any selected test displayed above before saving in db
    $scope.remove_test =  function(n){
    	$scope.test_array.splice($scope.test_array.indexOf(n),1);
    	
    }
    
    $scope.process_all;
    $scope.process_more;
    $scope.em;
    
    tissue_obj = {};
    $scope.tissue_array = [];
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
    
  //function to remove any selected test displayed above before saving in db
    $scope.remove_tissue =  function(n){
    	$scope.tissue_array.splice($scope.tissue_array.indexOf(n),1);
    	
    }
    
    
   /* $( document ).ready(function() {
    	
    	
    	console.log($('#special_select').val());
    	 $('#special_select').change(function(){
    	        if($('#special_select').val() == '0') {
    	        	alert("check1");
    	        	
    	        	$scope.test_option = false;
    	        	
    	        } else {
    	        	 $('#selectall1').show();
    	        } 
    	    });
    });*/
    
    
    $scope.edit = {};

    $scope.update=function ()
    {
    	
       
        
        $scope.edit.corrective=$scope.edit.corrective;
        $scope.edit.preventive=$scope.edit.preventive;
        $scope.edit.faculty=$scope.edit.faculty;
        $scope.edit.ncsType=$scope.edit.ncsType;
        console.log( $scope.edit);
        
       
    }
     
    
    $scope.file_array = [];
    $scope.pic = '';
    $scope.upload_id = '';
$scope.getFiles =  function(barcodeValue){
	console.log("check1");
	console.log(barcodeValue);
	
	
	$http.get(ASSET_URL_BASE+"/getlistofimage?np_base="+barcodeValue)
    .success(function(data) {
       
        console.log(data);
        if(data.length == 0){
        	var fileFrame = document.getElementById("myFrame");
    		fileFrame.style.display="none";
        	$("#button_view").addClass("hidden");
        	
        }else{
        	
        	$("#button_view").removeClass("hidden");
        	$scope.file_array= data;
        	//for(var i=0;i<data.length;i++){
        	//$scope.file_array[i]= data[i];
        	//console.log($scope.file_array);
            /*$scope.pic = $scope.file_array[i];
            $scope.upload_id = data[i].np_upload_id;
            console.log( $scope.pic);*/
        	//}
        	
        }
        
        
        
    })
}

$scope.viewFile = function(file_url){
	
	if(file_url != ""){
	var fileFrame = document.getElementById("myFrame");
	fileFrame.style.display="block";
	//fileFrame.src = BASE_URL1+file_url;
	 var tabOrWindow = window.open(BASE_URL1+file_url, '_blank');
	 tabOrWindow.focus();
	
	//fileFrame.src = "http://localhost:8080/Sample_Tracker/"+doc;
	}else{
		
		alert("No file exists");
	}
}

$scope.deleteFile = function(upload_id){
	console.log("check2");
	$http.get(URL_BASE+"ehosp/deleteFile?np_upload_id="+upload_id)
    .success(function(data) {
       
        console.log(data);
        alert("Successfully deleted file");
        $scope.pic = ""; 
      	$scope.file_array = [];
      	$('#fileid').val("");
      	$("#myFrame").hide();
      	$("#myFrame").contents().find("body").html("");
       
        
        
    })
	
}

$scope.close =  function(){
	
	 $scope.pic = ""; 
	 $scope.file_array = [];
	 $('#uploadModal').modal('hide');
}
$scope.close1 =  function(){
	
	 
	 $('#messageModal').modal('hide');
}
$scope.close2 =  function(){
	
	 
	 $('#displayMessageModal').modal('hide');
}

$scope.np_Number = '';
$scope.getMessages = function(np){
	//alert(np);
	$scope.np_Number = np;
	
	$("#messageModal").modal('show');
}
//$scope.getFiles();

$scope.viewMessage =  function(){
	
	$("#messageModal").modal('hide');
	$("#displayMessageModal").modal('show');
	
}

$scope.sendReply =  function(){
	//console.log($scope.np_Number);
	alert("Sent message successfully ");
	$('#messageModal').modal('hide');
	
}
});