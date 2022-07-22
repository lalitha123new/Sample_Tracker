var app = angular.module('tasks', []);
app.controller('TasksController',function($scope,$http,$window)
{
    $scope.hello="hey ! ";
    $scope.assetTable=[];
    var URL_BASE="http://172.16.86.4:8080/Sample_Tracker/webapi/";
    var STATION_BASE_URL=URL_BASE+"station";

    $scope.getPendingTasks=function ()
    {
        $scope.assetTable=[];
        var url=STATION_BASE_URL+"/pending?stationId=2";
        $http.get(url)
            .success(function (data) {
                $scope.assetTable=data;
                
            })
            .error(function(data) {
  			  //newly added error code
  	    	  alert("Error: server encountered an internal error. Please try again after some time ");
  	        
  	    });
    }


    $scope.getCompletedTasks=function()
    {
        var url=STATION_BASE_URL+"/completed?stationId=3";
        $http.get(url)
            .success(function (data) {
                $scope.assetTable=data;
                
            })
            .error(function(data) {
  			  //newly added error code
  	    	  alert("Error: server encountered an internal error. Please try again after some time ");
  	        
  	    });
    }

});