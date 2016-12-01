/**
 * Created by juan on 23-11-16.
 */
var profileApp=angular.module("profileApp", []);
profileApp.controller("profileController",function ($scope,$http) {
    $scope.user = null;
    $scope.userInf= {};
    $scope.formData={text:""};
    $scope.ProyectosAsignados={};
    $scope.ProyectosNoAsignados=[];
    $scope.ActualizarProyectos = function () {
        $http.get('/api/Proyect')
            .success(function (data) {
                for(var i=0; i<$scope.ProyectosAsignados.length; i++){
                    for(var j=0; j<data.length; j++){
                        if($scope.ProyectosAsignados[i].ProyectId==data[j].id){
                            $scope.ProyectosAsignados[i].nombre=data[j].nombre;
                            break;
                        }
                    }
                }
            });

    }
    $scope.FiltrarProyectos = function () {
        $http.get('/api/Proyect')
            .success(function (data) {
                $scope.ProyectosNoAsignados=[]
                var asignado;
                for (var i = 0; i <data.length ; i++) {
                    asignado = 0;
                    for(var j=0; j<$scope.ProyectosAsignados.length; j++){
                        if($scope.ProyectosAsignados[j].ProyectId==data[i].id){
                            asignado=1;
                            break
                        }
                    }
                    if (asignado==0){
                        $scope.ProyectosNoAsignados.push(data[i]);
                    }
                }
            });
    }
    $scope.init = function (id) {
        $scope.user = id;
        $http.get('/api/profile/' + $scope.user)
            .success(function (data) {
                $scope.userInf = data;
                $http.get('/api/Rol/' + $scope.user)
                    .success(function (data) {
                        $scope.userInf[0].permiso = data[0].permiso
                    });
            });
        $http.get('/api/usersProyect/' + $scope.user)
            .success(function (data) {
                $scope.ProyectosAsignados = data;
                $scope.ActualizarProyectos();
                $scope.FiltrarProyectos();
            });
    }
    $scope.delete = function (id) {
        $scope.formData.text="DELETE";
        $http.post('/api/userProyect/'+id,$scope.formData)
            .success(function(data){
                $http.get('/api/usersProyect/' + $scope.user)
                    .success(function (data) {
                        $scope.ProyectosAsignados = data;
                        $scope.ActualizarProyectos();
                        $scope.FiltrarProyectos();
                    })
            })
    };
    $scope.Asignar = function (id) {
        $scope.formData.text = "Create";
        $scope.formData.UserId = $scope.user;
        $http.post('/api/userProyect/' + id, $scope.formData)
            .success(function (data) {
                $http.get('/api/usersProyect/' + $scope.user)
                    .success(function (data) {
                        $scope.ProyectosAsignados = data;
                        $scope.ActualizarProyectos();
                        $scope.FiltrarProyectos();
                    })
            })
    }
});