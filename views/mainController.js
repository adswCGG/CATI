var myApp=angular.module("myApp", []);
myApp.config(['$compileProvider',function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|skype):/);
}
]);
myApp.controller("PrimerController",["$scope","$http",function ($scope,$http) {
    $scope.users = [];
    $scope.formData={};
    $scope.nombre = "echo123";
    $http.get('/api/baseDatosLlamar')
        .success(function(data){
            $scope.users = data;
        })
    $scope.estadoSi=function (id) {
        $scope.formData.text="si";
        $http.post('/api/baseDatosLlamar/'+id,$scope.formData)
            .success(function (data) {
                $scope.formData={};
                $scope.users=data;
            })
    }
    $scope.estadoNo=function (id) {
        $scope.formData.text="no";
        $http.post('/api/baseDatosLlamar/'+id,$scope.formData)
            .success(function (data) {
                $scope.formData={};
                $scope.users=data;
            })
    }
}]);