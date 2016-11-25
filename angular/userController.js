/**
 * Created by juan on 13-11-16.
 */
var userApp=angular.module("userApp", []);
userApp.controller("UserController",function ($scope,$http) {
    $scope.users = [];
    $scope.formData = {text:""};
    $scope.Roles=[];
    $http.get('/api/usuarios')
        .success(function(data){
            $scope.users = data;
            $http.get('/api/Rol')
                .success(function (data) {
                    $scope.Roles=data;
                    for(var i=0; i<$scope.users.length; i++){
                        for(var j=0; j<$scope.Roles.length; j++){
                            if($scope.users[i].id==$scope.Roles[j].UserId){
                                $scope.users[i].permiso=$scope.Roles[j].permiso;
                                break;
                            }
                        }
                    }
                });
        });
    $scope.delete = function (id) {
        $scope.formData.text="DELETE";
        $http.post('/api/usuarios/'+id,$scope.formData)
            .success(function(data){
                $scope.users = data;
            })
    };

});