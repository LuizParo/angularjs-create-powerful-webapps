angular.module('alurapic').controller('GruposController', function($scope, recursoGrupo) {
    $scope.grupos = [];

    recursoGrupo.query(function(grupos) {
        $scope.grupos = grupos;
    }, function(error) {
        console.log(erro);
    });
});