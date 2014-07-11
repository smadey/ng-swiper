define(['angular', 'swiper', 'swiperAnimation', 'swiperScrollbar'], function (angular, Swiper) {
    'use strict';

    /* Directives */

    var appDirectives = angular.module('appDirectives', []);

    appDirectives.directive('swiper', ['$compile', function($compile) {
        var animations = {
            rotate: function(mode) {
                var isY = mode == 'vertical' ? true : false;
                return {
                    onProgressChange: function(swiper) {
                        for (var i = 0; i < swiper.slides.length; i++){
                            var slide = swiper.slides[i];
                            var progress = slide.progress;
                            var rotate = -90 * progress;

                            if(rotate < -90) rotate = -90;
                            if(rotate > 90) rotate = 90;

                            var translate = progress * (isY ? swiper.height : swiper.width) / 2;
                            var opacity = 1 - Math.min(Math.abs(progress), 1);

                            slide.style.opacity = opacity;
                            swiper.setTransform(slide, (isY ? 'rotateX(' : 'rotateY(') + rotate + 'deg) ' + (isY ? 'translateY(' : 'translateX(') + translate + 'px');
                        }
                    }
                };
            },
            scale: function(mode) {
                var isY = mode == 'vertical' ? true : false;
                return {
                    onProgressChange: function(swiper) {
                        for (var i = 0; i < swiper.slides.length; i++) {
                            var slide = swiper.slides[i];
                            var progress = slide.progress;
                            var scale, translate, opacity;
                            if(progress <= 0) {
                                opacity = 1 - Math.min(Math.abs(progress), 1);
                                scale = 1 - Math.min(Math.abs(progress), 1);
                                translate = progress * (isY ? swiper.height : swiper.width);
                            }
                            else {
                                opacity = 1 - Math.min(Math.abs(progress), 1);
                                scale = 1;
                                translate = 0;
                            }
                            slide.style.opacity = opacity;
                            swiper.setTransform(slide, (isY ? 'translateY(' : 'translateX(') + translate + 'px) scale(' + scale + ')');
                        }
                    }
                };
            },
            reverse: function(mode) {
                var isY = mode == 'vertical' ? true : false;
                return {
                    onProgressChange: function(swiper) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            var slide = swiper.slides[i];
                            var progress = slide.progress;
                            var rotate = -180 * progress;
                            var translate = progress * (isY ? swiper.height : swiper.width);

                            if(rotate < -180) rotate = -180;
                            if(rotate > 180) rotate = 180;

                            swiper.setTransform(slide, 'translate3d(' + (isY ? ('0,' + translate + 'px,') : (translate + 'px,0,')) + -Math.abs(progress) * 500 + 'px)');
                            swiper.setTransform(slide.children[0], (isY ? 'rotateX(' : 'rotateY(') + rotate + 'deg)');
                        }
                    },
                    onTouchStart: function(swiper) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            swiper.setTransition(swiper.slides[i], 0);
                            swiper.setTransition(swiper.slides[i].children[0], 0);
                        }
                    },
                    onSetWrapperTransition: function(swiper, speed) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            swiper.setTransition(swiper.slides[i], speed);
                            swiper.setTransition(swiper.slides[i].children[0], speed);
                        }
                    }
                };
            },
            reverse2: function(mode) {
                var isY = mode == 'vertical' ? true : false;
                return {
                    onProgressChange: function(swiper) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            var slide = swiper.slides[i];
                            var progress = slide.progress;
                            var rotate = -180 * progress / 1.5;
                            var translate = progress * (isY ? swiper.height : swiper.width) / 4;

                            if(rotate < -180) rotate = -180;
                            if(rotate > 180) rotate = 180;

                            swiper.setTransform(slide, 'translate3d(' + (isY ? ('0,' + translate + 'px,') : (translate + 'px,0,')) + -Math.abs(progress) * 500 + 'px)');
                            swiper.setTransform(slide.children[0], (isY ? 'rotateX(' : 'rotateY(') + rotate + 'deg)');
                        }
                    },
                    onTouchStart: function(swiper) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            swiper.setTransition(swiper.slides[i], 0);
                            swiper.setTransition(swiper.slides[i].children[0], 0);
                        }
                    },
                    onSetWrapperTransition: function(swiper, speed) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            swiper.setTransition(swiper.slides[i], speed);
                            swiper.setTransition(swiper.slides[i].children[0], speed);
                        }
                    }
                };
            },
            fade: function(mode) {
                var isY = mode == 'vertical' ? true : false;
                return {
                    onProgressChange: function(swiper) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            var slide = swiper.slides[i];
                            var progress = slide.progress;
                            var opacity, translate;

                            if(progress > 0) {
                                opacity = 1 - Math.min(Math.abs(progress), 1);
                                translate = progress * (isY ? swiper.height : swiper.width);
                            }
                            else {
                                opacity = 1 - Math.min(Math.abs(progress), 1);
                                translate = 0;
                            }

                            slide.style.opacity = opacity;
                            swiper.setTransform(slide, (isY ? 'translateY(' : 'translateX(') + translate + 'px');
                        }
                    }
                };
            },
            fall: function(mode) {
                var isY = mode == 'vertical' ? true : false;
                return {
                    onProgressChange: function(swiper) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            var slide = swiper.slides[i];
                            var progress = slide.progress;
                            var opacity, translate;

                            if(progress < 0) {
                                opacity = 1 - Math.min(Math.abs(progress), 1);
                                translate = (progress - 1) * (isY ? swiper.height : swiper.width);
                            }
                            else {
                                opacity = 1 - Math.min(Math.abs(progress), 1);
                                translate = 0;
                            }

                            slide.style.opacity = opacity;
                            swiper.setTransform(slide, (isY ? 'translateY(' : 'translateX(') + translate + 'px');
                        }
                    }
                };
            },
            flip: function(mode) {
                var isY = mode == 'vertical' ? true : false;
                return {
                    onProgressChange: function(swiper) {
                        for (var i = 0; i < swiper.slides.length; i++) {
                            var slide = swiper.slides[i];
                            var progress = slide.progress;
                            var translate = progress * (isY ? swiper.height : swiper.width);
                            var rotate = progress * 180;
                            var characters = slide.querySelectorAll('.flip-item');
                            for (var j = 0; j < characters.length; j++) {
                                var charOpacity = 1 - Math.min(Math.abs(progress), 1);
                                swiper.setTransform(characters[j], (isY ? 'rotateX(' : 'rotateY(') + rotate + 'deg)');
                                characters[j].style.opacity = charOpacity;
                            }
                            swiper.setTransform(slide, (isY ? 'translateY(' : 'translateX(') + translate + 'px)');
                        }
                    },
                    onTouchStart: function(swiper) {
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.setTransition(swiper.slides[i], 0);
                            var characters = swiper.slides[i].querySelectorAll('.flip-item');
                            for (var j = 0; j < characters.length; j++) {
                                swiper.setTransition(characters[j], 0);
                            }
                        }

                    },
                    onSetWrapperTransition: function(swiper) {
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.setTransition(swiper.slides[i], swiper.params.speed);
                            var characters = swiper.slides[i].querySelectorAll('.flip-item');
                            for (var j = 0; j < characters.length; j++) {
                                swiper.setTransition(characters[j], swiper.params.speed);
                            }
                        }
                    }
                };
            }
        };
        var animationNames = Object.keys(animations);

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                animationName: '@',
                mode: '@',
                onlyExternal: '@',
                showPager: '@',
                speed: '@',
                currentSlideIndex: '=?'
            },
            template: '<div class="swiper-container"><ul class="swiper-wrapper" ng-transclude></ul></div>',
            controller: ['$scope', '$element', '$attrs',
                function($scope, $element, $attrs) {
                }
            ],
            link: function($scope, $element, $attrs, $parse) {
                var animationOptions = animations[$scope.animationName] || animations[animationNames[0]];
                var mode = $scope.mode === 'vertical' ? 'vertical' : 'horizontal';
                var onlyExternal = $scope.$eval($scope.onlyExternal) === true ? true : false;
                var showPager = $scope.$eval($scope.showPager) === false ? false : true;
                var speed = parseInt($scope.speed) || 1000;

                var options = angular.extend({
                    mode: mode,
                    onlyExternal: onlyExternal,
                    progress: true,
                    speed: speed,
                    onSlideChangeStart: function(swiper) {
                        $scope.currentSlideIndex = swiper.activeIndex;
                        $scope.$apply();
                    },
                    onTouchStart: function(swiper) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            swiper.setTransition(swiper.slides[i], 0);
                        }
                    },
                    onSetWrapperTransition: function(swiper, speed) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            swiper.setTransition(swiper.slides[i], speed);
                        }
                    }
                }, animationOptions(mode));

                if(showPager) {
                    var childScope = $scope.$new();
                    var pager = angular.element('<swiper-pagination></swiper-pagination>');
                    $element.append(pager);
                    $compile(pager)(childScope);

                    options.pagination = pager[0];
                }

                var mySwiper = new Swiper($element[0], options);

                $scope.$watch('currentSlideIndex', function(newValue) {
                    if (angular.isDefined(newValue)) {
                        mySwiper.swipeTo(newValue, speed, false);
                    }
                });
            }

        };
    }]).directive('swiperSlide', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: '^swiper',
            template: '<li class="swiper-slide" ng-transclude></li>',
            link: function($scope, $element, $attr) {
            }
        };
    }).directive('swiperPagination', function() {
        return {
            restrict: 'E',
            replace: true,
            require: '^swiper',
            template: '<div class="swiper-pagination"></div>',
            link: function($scope, $element, $attr) {
            }
        };
    });

    appDirectives.directive('scroll', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                mode: '@',
                size: '=?'
            },
            template: '<div class="swiper-container"><div class="swiper-scrollbar"></div><div class="swiper-wrapper"><div class="swiper-slide" ng-transclude></div></div></div>',
            link: function($scope, $element, $attrs) {
                var mode = $scope.mode === 'vertical' ? 'vertical' : 'horizontal';
                var size = angular.isNumber($scope.size) ? ($scope.size + 'px') : $scope.size;

                var $scrollbar = $element.find('.swiper-scrollbar:eq(0)');
                var $slide = $element.find('.swiper-slide:eq(0)');

                if(mode == 'vertical') {
                    $scrollbar.addClass('swiper-scrollbar-v');
                    $slide.css({ height: size });
                }
                else {
                    $scrollbar.addClass('swiper-scrollbar-h');
                    $slide.css({ width: size });
                }
                
                var mySwiper = new Swiper($element[0], {
                    mode: mode,
                    scrollContainer: true,
                    scrollbar: {
                        container: $scrollbar[0]
                    }
                });
            }
        };
    });

    return appDirectives;
});