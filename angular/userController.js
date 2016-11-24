/**
 * Created by juan on 13-11-16.
 */
var userApp=angular.module("userApp", []);
userApp.controller("UserController",function ($scope,$http) {
    $scope.users = [];
    $scope.formData = {text:""};
    $scope.Proyects=[];
    $scope.asd={};
    $http.get('/api/usuarios')
        .success(function(data){
            $scope.users = data;
            for(var i=0;i<data.length;i++) {
                $scope.users[i].Proyects = [];
            }
            $http.get('/api/userProyect')
                .success(function (data) {
                    $scope.asd=data
                   for(var i=0;i<data.length ; i++){
                       $scope.users[data[i].UserId].Proyects.push(data[i].ProyectId)
                   }
                });
            $http.get('/api/Proyect')
                .success(function (data) {
                    $scope.Proyects=data;
                })
        });
    $scope.delete = function (id) {
        $scope.formData.text="DELETE";
        $http.post('/api/usuarios/'+id,$scope.formData)
            .success(function(data){
                $scope.users = data;
            })
    };
    $scope.asignar = function (id) {
        $http.post('api/userProyect/'+id,$scope.formData)
            .success(function (data) {
                $scope.users = data;
            })
    }

});