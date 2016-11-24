/**
 * Created by juan on 13-11-16.
 */
var myApp=angular.module("myApp", []);
myApp.config(['$compileProvider',function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|skype):/);
}
]);
myApp.controller("PrimerController",function ($scope,$http) {
    $scope.users = [];
    $scope.formData = {id: 1};
    $scope.Proyects=[];
    $http.post('/api/baseDatosLlamar',$scope.formData)
        .success(function(data){
            $scope.users = data;
            $http.get('/api/Proyect')
                .success(function (data) {
                    $scope.Proyects=data;
                })
        });
    $scope.cambiarProyect=function (id) {
        $scope.formData.id = id;
        $http.post('/api/baseDatosLlamar',$scope.formData)
            .success(function(data){
                $scope.users = data;
            })
    };
    $scope.estadoSi=function (id) {
        $scope.formData.text="si";
        $http.post('/api/baseDatosLlamar/'+id,$scope.formData)
            .success(function (data) {
                $scope.formData.text="";
                $http.post('/api/baseDatosLlamar',$scope.formData)
                    .success(function(data){
                        $scope.users = data;
                    })
            })
    };
    $scope.estadoDist=function (id) {
        $http.post('/api/baseDatosLlamar/'+id,$scope.formData)
            .success(function (data) {
                $scope.formData.text="";
                $http.post('/api/baseDatosLlamar',$scope.formData)
                    .success(function(data){
                        $scope.users = data;
                    })
            })
    }
});