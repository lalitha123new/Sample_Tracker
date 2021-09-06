/**
 * 
 */
var App2 = angular.module('myApp2',['ui.bootstrap']);

var data1;
App2.controller('ExternalSampleDisplayController', function($scope,$http) {
	  
	 $scope.startDate = "2018-01-01";
	 var d = new Date(),
     month = '' + (d.getMonth() + 1),
     day = '' + d.getDate(),
     year = d.getFullYear();

 if (month.length < 2) 
     month = '0' + month;
 if (day.length < 2) 
     day = '0' + day;

 $scope.endDate = [year, month, day].join('-');
	  var date_array = [];
	  //var Session_id = sessionStorage.getItem("admin_id")
	  var self = this;
	  self.state=false;
	  self.buttonstate = true;
    
	  self.outputlist1=[]; 
	  $scope.checkNpNumber = true;
	  
	  $scope.obj1 = {};
	  $scope.download_data_array = [];
	  $scope.obj1.SlNo = "";
	  $scope.dd_array = [];
	  
	
	
	 //begin code to get external sample details
	 $scope.getAllSamples = function(){
		 
			//if(Session_id){
			$http.get(BASE_URL2+"patient")
			.success(function(data) {
				
	    	 data1 = data;
	         self.outputlist1 = data;
	         
	         for(var i = 0;i<self.outputlist1.length;i++){
	        	
	        	 if(self.outputlist1[i].date_of_entry  != null){
	        	 date_array = self.outputlist1[i].date_of_entry.split(" ");
	        	 self.outputlist1[i].date_format = date_array[0];
	        	 
	        	 }
	        	 
	        	 
	         }
	       
	         
	         //latest first display
	         self.outputlist1 = self.outputlist1.reverse();
	         
	         $scope.dd_array1 = [];
	         
	         for(var j=0;j<self.outputlist1.length;j++){
	        	 
	        	 
	        	if(self.outputlist1[j].dd_no){
		        	$scope.dd_array[j] = (self.outputlist1[j].dd_no);
		        	$scope.dd_array1[j] = JSON.parse($scope.dd_array[j]);
		        	
		        	
		        	self.outputlist1[j].dd1 = $scope.dd_array1[j][0].dd_no;
		        	self.outputlist1[j].trans_no = $scope.dd_array1[j][0].trans_no;
		        	self.outputlist1[j].bank_name = $scope.dd_array1[j][0].bank_name;
		        	self.outputlist1[j].dd_date = $scope.dd_array1[j][0].date_of_dd.formatted;
		        	
		        	
		        	 $scope.obj1 = {};
		        	 $scope.obj1.SNo = i+1;
		        	 $scope.obj1.Hosp_name = self.outputlist1[j].username;
		        	 $scope.obj1.Sample_id = self.outputlist1[j].transaction_id;
		        	 $scope.obj1.Np_No = self.outputlist1[j].npno;
		        	 $scope.obj1.Status = self.outputlist1[j].status;
		        	 $scope.obj1.Pat_name = self.outputlist1[j].pat_name;
		        	 $scope.obj1.Referred_by = self.outputlist1[j].referred_by;
		        	 $scope.obj1.Contact = self.outputlist1[j].doctor_phone_no;
		        	 $scope.obj1.Email_ID = self.outputlist1[j].doctor_email_id;
		        	// $scope.obj1.Transaction = self.outputlist1[j].transaction_id;
		        	 $scope.obj1.Payment = self.outputlist1[j].amount;
		        	 
		        	 $scope.obj1.dd1 = $scope.dd_array1[j][0].dd_no;
		        	 $scope.obj1.trans_no = $scope.dd_array1[j][0].trans_no;
		        	 $scope.obj1.bank_name = $scope.dd_array1[j][0].bank_name;
		        	 $scope.obj1.dd_date = $scope.dd_array1[j][0].date_of_dd.formatted;
		        	 $scope.download_data_array.push($scope.obj1);
		        	
		        	
			        
	        	 }
	        	 
	        	 if(self.outputlist1[j].npno != null){
	        		 $('#j').prop("disabled",false);
	        		 
	        	 }else{
	        		
	        		 $('#j').prop("disabled",true);
	        	 }
	         }
	         
	     	})
	     	.error(function(data) {
				  //newly added error code
		    	  alert("Error: server encountered an internal error. Please try again after some time ");
		        
		    });
	     	
			/*}else{
	    	 
	    	 alert("Session got expired, Please login again");
	    	 window.location.href="././superAdmin.html";
	    	 
	    	 sessionStorage.clear();
			}*/
			
		}
	 
	 $scope.getAllSamples();
	 //end code to get external sample details
	 
	 
	 //begin code to redirect to the preview page
	 $scope.previewSample = function(sampleid,npnum,hospitalid){
		
		 sessionStorage.setItem("hosp_id",hospitalid);
		 sessionStorage.setItem("sample_id",sampleid);
		 sessionStorage.setItem("np_num1",npnum);
		 window.location.href = "previewSampleDisplay.html";
         
	 }
	 
  $scope.back=function(){
	 
	  window.location.href="././RecievingStation.html";
	  sessionStorage.clear();
	  
	 
  }
  
  //begin code to get notification count
  $scope.get_notification_count = function(){
		//if(Session_id){
			$http.get(BASE_URL2+"notificationscount/2")
			.success(function(data) {
	    	 
				 count = data;
			      var el = document.querySelector('.notification');
			      el.setAttribute("data_count",count);
			      el.classList.add('notify');
			        
			            
			      if(count > 0){
			        el.classList.add('show_count');
			        }
	         
	     	})
	     	
	     	.error(function(data) {
				  //newly added error code
		    	  alert("Error: server encountered an internal error. Please try again after some time ");
		        
		    });
	     	
			/*}else{
	    	 
	    	 alert("Session got expired, Please login again");
	    	 window.location.href="././superAdmin.html";
	    	 
	    	 sessionStorage.clear();
			}*/
		
		
	}
	$scope.get_notification_count();
	//end of code
	
	
	var download_array = [];
	
	//download table
	$scope.downloadFile =  function(){
	
		alasql('SELECT * INTO CSV("ExternalSamples.csv",{headers:true}) FROM ?',[ $scope.download_data_array]);
		   
	}
	
	 $scope.status_options = [
		   
		    { value: "Received"},
		    { value: "Reported"},
		    { value: "Verified"},
		    { value: "Dispatched"}
		    
		  
		  ];
	
	$scope.editSampleStatus = function(ext_sample_id,pat_name,hosp_name,ref_no){
		$('#ext_sample_id').val(ext_sample_id);
		$('#edit_pat_name').val(pat_name);
		$('#edit_hosp_name').val(hosp_name);
		$('#ref_hosp_pat_id').val(ref_no);
		
		$("#editSampleModal").modal('show');
		
	}
	
	$scope.ediSampleSave = function(){
		var ext_id = $('#ext_sample_id').val();
		 var status =  $scope.status;
		 var np_number =  $('#np_number').val();
		 np_number = np_number.toUpperCase();
		
		 
		
		 
		 var editObj = {
				 npno:np_number,
				 status:status,
				 ext_trc_id:ext_id
    			
    			
		 }
		 
		
		
		 
		 $http.post(BASE_URL2+"statuschange/", editObj ,{headers: {'Content-Type': 'application/json'}})
         .then(function successCallback(response) {
        	 
        	 window.location.reload();
         
             })
             .error(function(data) {
              alert("Not able to save the sheet asset");
             });
		 //console.log(editObj);
		
		 
	}

  
 
});

//filter table based on date entered
App2.filter("myfilter", function($filter) {
	
	
    return function(items, from, to) {
    	
          return $filter('filter')(items, "date_format", function(v){
            var date  = moment(v);
           
            return date >= moment(from) && date <= moment(to);
           
          });
    };
    
  });