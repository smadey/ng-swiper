define([
    'angular',
    'angularUIRouter',
    'ngSwiper'
], function (angular) {
        'use strict';

        /* App Module */

        var app = angular.module('App', ['ui.router', 'swiper']);

        app.controller('MainCtrl', ['$scope',
            function($scope) {

                $scope.animations = [
                    { name: 'rotate' },
                    { name: 'scale' },
                    { name: 'reverse' },
                    { name: 'reverse2' },
                    { name: 'cover' },
                    { name: 'fade' },
                    { name: 'flip' },
                    { name: 'translateZ' }
                ];

                $scope.currAnimation = $scope.animations[0];

                $scope.$watch('currAnimation', function(newValue, oldValue) {
                    if(newValue != oldValue) {
                        $scope.$broadcast('swiper.changeAnimation', newValue.name);
                    }
                });
            }
        ]);

        app.config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $stateProvider.state('home', {
                    url: '/',
                    templateUrl: 'view.html',
                    controller: 'MainCtrl'
                });
                $urlRouterProvider.otherwise('/');
            }
        ]);

        return app;
});
