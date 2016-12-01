/**
 * Created by juan on 24-11-16.
 */
var proyectApp=angular.module("proyectApp", []);
proyectApp.controller("ProyectController",function ($scope,$http) {
    $scope.formData = {text:""};
    $scope.Proyects=[];
    $http.get('/api/Proyect')
        .success(function (data) {
            $scope.Proyects=data;
        })
    $scope.delete = function (id) {
        $scope.formData.text="DELETE";
        $http.post('/api/Proyect/'+id,$scope.formData)
            .success(function(data){
                $scope.Proyects = data;
            })
    };

});