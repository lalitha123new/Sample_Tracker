/**
 * Created by Dell on 07-07-2016.
 */
var application =angular.module('login', ['ui.bootstrap']);
var ModalDemoCtrl = function ($scope, $modal, $log) {
    var URL_BASE="http://10.11.30.235:8080/Sample_Tracker/webapi/";
    var TECHNICIAN_URL_BASE = URL_BASE + "technicians";

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.technicians = [];

    $scope.getTechnician=function () {
        $http.get(TECHNICIAN_URL_BASE+"/technicians")
            .success(function(data) {
                $scope.technicians = data;
            },function errorCallBack(err) {
            })
    }
    
    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
        
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
};

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};