/**
 * Created by juan on 24-11-16.
 */
var profileProyApp=angular.module("profileProyApp", []);
profileProyApp.controller("profileProyController",function ($scope,$http) {
    $scope.proyect = null;
    $scope.proyectInf= {};
    $scope.formData={text:""};
    $scope.UsersAsignados={};
    $scope.UsersNoAsignados=[];
    $scope.ActualizarUser = function () {
        $http.get('/api/usuarios')
            .success(function (data) {
                for(var i=0; i<$scope.UsersAsignados.length; i++){
                    for(var j=0; j<data.length; j++){
                        if($scope.UsersAsignados[i].UserId==data[j].id){
                            $scope.UsersAsignados[i].nombre=data[j].username;
                            break;
                        }
                    }
                }
            });

    }
    $scope.FiltrarProyectos = function () {
        $http.get('/api/usuarios')
            .success(function (data) {
                $scope.UsersNoAsignados=[];
                var asignado;
                for (var i = 0; i <data.length ; i++) {
                    asignado = 0;
                    for(var j=0; j<$scope.UsersAsignados.length; j++){
                        if($scope.UsersAsignados[j].UserId==data[i].id){
                            asignado=1;
                            break
                        }
                    }
                    if (asignado==0){
                        $scope.UsersNoAsignados.push(data[i]);
                    }
                }
            });
    };
    $scope.init = function (id) {
        $scope.proyect = id;
        $http.get('/api/Proyect/' + $scope.proyect)
            .success(function (data) {
                $scope.proyectInf = data;
            });
        $http.get('/api/proyectUsers/' + $scope.proyect)
            .success(function (data) {
                $scope.UsersAsignados = data;
                $scope.ActualizarUser();
                $scope.FiltrarProyectos();
            });
    };
    $scope.delete = function (id) {
        $scope.formData.text="DELETE";
        $http.post('/api/userProyect/'+id,$scope.formData)
            .success(function(data){
                $http.get('/api/proyectUsers/' + $scope.proyect)
                    .success(function (data) {
                        $scope.UsersAsignados = data;
                        $scope.ActualizarUser();
                        $scope.FiltrarProyectos();
                    });;
            })
    };
    $scope.Asignar = function (id) {
        $scope.formData.text = "Create";
        $scope.formData.ProyectId = $scope.proyect;
        $http.post('/api/proyectUsers/' + id, $scope.formData)
            .success(function (data) {
                $http.get('/api/proyectUsers/' + $scope.proyect)
                    .success(function (data) {
                        $scope.UsersAsignados = data;
                        $scope.ActualizarUser();
                        $scope.FiltrarProyectos();
                    });
            })
    }

});