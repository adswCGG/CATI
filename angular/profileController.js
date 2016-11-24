/**
 * Created by juan on 23-11-16.
 */
var profileApp=angular.module("profileApp", []);
profileApp.controller("profileController",function ($scope,$http) {
    $scope.user = null;
    $scope.userInf= {};
    $scope.ProyectosAsignados={};
    $scope.ProyectosNoAsignados={};
    $scope.init = function (id) {
        $scope.user=id
        $http.get('/api/profile/' + $scope.user)
            .success(function (data) {
                $scope.userInf = data
            })
        $http.get()
            .success(function (data) {
                //obtener userProyect con idUser, luego sacar proyectos que su id est4e en estos,
                // luego lo mismo pero que no esten
            })
    }
});