/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap','ngCookies']);

App2.controller('superAdmin', function($scope,$http,$cookieStore) {
	    
    
    var ADMIN_URL_BASE = URL_BASE + "admin";
	
    //begin code for super admin login
	$scope.loginSuperAdmin =function(){
		
		 var user_name =  $('#admin_uname').val();
	     var password =  $('#login-password').val();
	     
        if((password != "") && (user_name !="")){
			 
			 
       	 var data = {
       			  admin_name:user_name,
       			  password:password
					 };
       	 
       	 $http.post(ADMIN_URL_BASE+"/adminDetails", JSON.stringify(data)).then(function (response) {
              
                 if((response.status == 200) && (response.data == 1)){
                	 
                	 window.location.href="externalSample.html";
                	 
                	 sessionStorage.setItem("admin_id", response.data);
                	 
                 }else{
                	 
                	alert("Please login with valid credentials"); 
                 }
                 
					}, function (response) {
						

				});
       	 
       	 
		 }else{
			 
			 alert("Please enter USER NAME & PASSWORD");
		 }
			
		}
		//end of code
});