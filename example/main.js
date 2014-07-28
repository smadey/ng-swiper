require.config({
    paths: {
        'jquery': './lib/jquery.min',
        'angular': './lib/angular.min',
        'angularUIRouter': './lib/angular-ui-router.min',
        'swiper': './lib/idangerous.swiper.min',
        'swiperAnimation': './lib/idangerous.swiper.progress.min',
        'swiperScrollbar': './lib/idangerous.swiper.scrollbar.min',
        'ngSwiper': '../ng-swiper'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angularUIRouter': ['angular'],
        'angularBootstrap': ['angular'],
        'swiperAnimation': ['swiper'],
        'swiperScrollbar': ['swiper']
    },
    waitSeconds: 15
});


require( [
    'angular',
    'app'
], function(angular, app) {
    'use strict';

    angular.bootstrap(document, [app.name]);
});
