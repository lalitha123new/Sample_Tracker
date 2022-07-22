'use strict';

App.factory('Service', ['$http', '$q', function($http, $q){
	
	
	
    //var URL_BASE="http://10.11.3.3:8080/Sample_Tracker/webapi/";
	//var URL_BASE="http://pushd.healthelife.in:8080/Sample_Tracker/webapi/";
    //var URL_BASE="http://localhost:8080/Sample_Tracker/webapi/";
    
    
    var REQUEST_URL_BASE = URL_BASE+ "requests";
    var ASSET_URL_BASE = URL_BASE + "assets";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";
	
     var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
     					}
     };
     
     var config2 = {
                headers : {
               	contentType : "application/json",
    				dataType : "json"
     					}
     };
	
	 return {
			
			searchFunction: function(str_pname,str_np,str_hname,str_dname,str_ttype) {
					var data = $.param(
					{
						npNumber: str_np,
						pName: str_pname,
						dName: str_dname,
						tType: str_ttype,
						hName: str_hname
						
					});
					
					return $http.post(URL_BASE+'rest/controller/searchPage/',data,config)
							.then(
									function(response){
										return response.data;
										
									}, 
									function(errResponse){
										console.error('Error');
										return $q.reject(errResponse);
									}
							);
			},
			
			
			
			dynamicSuggestionsFunction: function(searchQuery,searchField,search_object) {
					
					var report="";
					//ADD REST API for getting report dynamically
					
					if(searchField=="npNumber"){
					
					return $http.get(REQUEST_URL_BASE+"?npbase="+searchQuery)
		            .success(function(data1) {
		            	
		            	
		                return data1;
		            })
					}else{
						
						//search_object = JSON.stringify(search_object);
						 return $http.post(REQUEST_URL_BASE+"/withAllSearchDetails",search_object,config2)
		      				.then(
		      						function(reponse){
		      							
		      							//console.log(reponse);
		    			                return reponse;

		      	 });
			}
			},
			

			transDetails: function(np) {
			
					var data = $.param(
					{
						np_number: np
						
					});
					
					return $http.post(URL_BASE+'rest/controller/transactionReport/',data,config)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error ');
										return $q.reject(errResponse);
									}
							);
			},
			

	};

	
}]);
