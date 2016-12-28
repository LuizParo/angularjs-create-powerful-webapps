angular.module('meusServicos', ['ngResource'])
    .factory('recursoFoto', function($resource) {
        return $resource('/v1/fotos/:fotoId', null, {
            update : {
                method : 'PUT'
            }
        });
    })
    .factory('recursoGrupo', function($resource) {
        return $resource('/v1/grupos');
    })
    .factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope) {
        var service = {};

        service.cadastrar = function(foto) {
            return $q(function(resolve, reject) {
                if(foto._id) {
                    $rootScope.$broadcast('fotoCadastrada');

                    recursoFoto.update({fotoId : foto._id}, foto, function() {
                        resolve({
                            mensagem : 'Foto ' + foto.titulo + ' atualizada com sucesso',
                            inclusao : false
                        });
                    }, function(error) {
                        console.log(error);
                        reject({
                            mensagem : 'Não foi possível atualizar a foto ' + foto.titulo
                        });
                    });
                } else {
                    recursoFoto.save(foto, function(foto) {
                        $rootScope.$broadcast('fotoCadastrada');

                        resolve({
                            mensagem : 'Foto ' + foto.titulo + ' incluída com sucesso',
                            inclusao : true
                        });
                    }, function(error) {
                        console.log(error);
                        reject({
                            mensagem : 'Não foi possível incluir a foto ' + foto.titulo
                        });
                    });
                }
            });
        };

        return service;
    });