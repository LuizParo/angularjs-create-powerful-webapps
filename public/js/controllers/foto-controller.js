angular.module('alurapic').controller('FotoController', function($scope, recursoFoto, cadastroDeFotos, $routeParams) {
    $scope.foto = {};

    var fotoId = $routeParams.fotoId;
    if(fotoId) {
        recursoFoto.get({fotoId : fotoId}, function(foto) {
            $scope.foto = foto;
        }, function(error) {
            console.log(error);
            $scope.mensagem = 'Não foi possível obter a foto';
        });
    }

    $scope.submeter = function() {
        if($scope.formulario.$valid) {
            cadastroDeFotos.cadastrar($scope.foto)
                .then(function(dados) {
                    $scope.mensagem = dados.mensagem;

                    if(dados.inclusao) {
                        $scope.formulario.$submitted = false;
                        $scope.foto = {};
                    }
                })
                .catch(function(error) {
                    $scope.mensagem = error.mensagem;
                });
        }
    };
});