/**
 * Created by juan on 13-11-16.
 */
var myApp=angular.module("myApp", []);
myApp.config(['$compileProvider',function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|skype):/);
}
]);
myApp.controller("PrimerController",function ($scope,$http) {
    $scope.datos = [];
    $scope.user = [];
    $scope.formData = [];
    $scope.Proyects = [];
    $scope.URL = [];
    $scope.init = function (id) {
        $scope.user = id;
        $http.get('/api/usersProyect/' + id)
            .success(function (data) {
                $scope.formData={"id": data[0].ProyectId};
                $http.post('/api/baseDatosLlamar', $scope.formData)
                    .success(function (data) {
                        $scope.datos = data;
                        $http.get('/api/Proyect')
                            .success(function (data) {
                                $scope.Proyects = data;
                                for (var i = 0; i < $scope.Proyects.length; i++) {
                                    if ($scope.datos[0].ProyectId == $scope.Proyects[i].id) {
                                        $scope.URL = $scope.Proyects[i].URL;
                                        break;
                                    }
                                }
                            });
                    });
            });

    };
    $scope.cambiarProyect=function (id) {
        $scope.formData.id = id;
        $http.post('/api/baseDatosLlamar',$scope.formData)
            .success(function(data){
                $scope.datos = data;
                $scope.URL=[];
                for(var i=0; i<$scope.Proyects.length; i++){
                    if($scope.datos[0].ProyectId==$scope.Proyects[i].id) {
                        $scope.URL = $scope.Proyects[i].URL;
                        break;
                    }
                }
            })
    };
    $scope.estadoSi=function (id) {
        $scope.formData.text="si";
        $http.post('/api/baseDatosLlamar/'+id,$scope.formData)
            .success(function (data) {
                $scope.formData.text="";
                $http.post('/api/baseDatosLlamar',$scope.formData)
                    .success(function(data){
                        $scope.datos = data;
                    })
            })
    };
    $scope.estadoDist=function (id) {
        $http.post('/api/baseDatosLlamar/'+id,$scope.formData)
            .success(function (data) {
                $scope.formData.text="";
                $http.post('/api/baseDatosLlamar',$scope.formData)
                    .success(function(data){
                        $scope.datos = data;
                    })
            })
    }
});