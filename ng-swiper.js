define(['angular', 'swiper', 'swiperAnimation', 'swiperScrollbar'], function (angular, Swiper) {
    'use strict';

    /* Directives */

    var swiper = angular.module('swiper', []);

    swiper.directive('swiper', ['$compile', '$timeout', function($compile, $timeout) {
        var getTranslate = function(translate, isY, translateZ) {
            translateZ = translateZ || 0;
            return 'translate3d(' + (isY ? ('0,' + translate + 'px,') : (translate + 'px,0,')) + translateZ + 'px)';
        };

        var getRotate = function(rotate, isY, rotateZ) {
            rotateZ = rotateZ || 0;
            return 'rotate3d(' + (isY ? '1, 0, ' : '0, 1, ') + rotateZ + ', ' + rotate + 'deg)';
        };

        var animations = {
            rotate: function(isY) {
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
                            swiper.setTransform(slide, getRotate(rotate, isY) + ' ' + getTranslate(translate, isY));
                        }
                    }
                };
            },
            scale: function(isY) {
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
                            swiper.setTransform(slide, getTranslate(translate, isY) + ' scale(' + scale + ')');
                        }
                    }
                };
            },
            reverse: function(isY) {
                return {
                    onProgressChange: function(swiper) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            var slide = swiper.slides[i];
                            var progress = slide.progress;
                            var rotate = -180 * progress;
                            var translate = progress * (isY ? swiper.height : swiper.width);

                            if(rotate < -180) rotate = -180;
                            if(rotate > 180) rotate = 180;

                            swiper.setTransform(slide, getTranslate(translate, isY, -Math.abs(progress) * 500));
                            swiper.setTransform(slide.children[0], getRotate(rotate, isY));
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
            reverse2: function(isY) {
                return {
                    onProgressChange: function(swiper) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            var slide = swiper.slides[i];
                            var progress = slide.progress;
                            var rotate = -180 * progress / 1.5;
                            var translate = progress * (isY ? swiper.height : swiper.width) / 4;

                            if(rotate < -180) rotate = -180;
                            if(rotate > 180) rotate = 180;

                            swiper.setTransform(slide, getTranslate(translate, isY, -Math.abs(progress) * 500));
                            swiper.setTransform(slide.children[0], getRotate(rotate, isY));
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
            cover: function(isY) {
                return {
                    onProgressChange: function(swiper) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            var slide = swiper.slides[i];
                            var progress = slide.progress;
                            var opacity, translate;

                            if(progress >= 0) {
                                translate = progress * (isY ? swiper.height : swiper.width);
                            }
                            else {
                                translate = isY ? progress * 2 * swiper.height : 0;
                            }
                            opacity = 1 - Math.min(Math.abs(progress), 1);

                            slide.style.opacity = opacity;
                            swiper.setTransform(slide, getTranslate(translate, isY));
                        }
                    }
                };
            },
            fade: function(isY) {
                return {
                    onProgressChange: function(swiper) {
                        for(var i = 0; i < swiper.slides.length; i++) {
                            var slide = swiper.slides[i];
                            var progress = slide.progress;
                            var opacity, translate;

                            opacity = 1 - Math.min(Math.abs(progress), 1);
                            translate = progress * (isY ? swiper.height : swiper.width);

                            slide.style.opacity = opacity;
                            swiper.setTransform(slide, getTranslate(translate, isY));
                        }
                    }
                };
            },
            flip: function(isY) {
                return {
                    onProgressChange: function(swiper) {
                        for (var i = 0; i < swiper.slides.length; i++) {
                            var slide = swiper.slides[i];
                            var progress = slide.progress;
                            var translate = progress * (isY ? swiper.height : swiper.width);
                            var rotate = progress * 180;
                            var flipItems = slide.querySelectorAll('.flip-item');

                            for (var j = 0; j < flipItems.length; j++) {
                                var flipOpacity = 1 - Math.min(Math.abs(progress), 1);
                                swiper.setTransform(flipItems[j], getRotate(rotate, isY));
                                flipItems[j].style.opacity = flipOpacity;
                            }

                            swiper.setTransform(slide, getTranslate(translate, isY));
                        }
                    },
                    onTouchStart: function(swiper) {
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.setTransition(swiper.slides[i], 0);
                            var flipItems = swiper.slides[i].querySelectorAll('.flip-item');
                            for (var j = 0; j < flipItems.length; j++) {
                                swiper.setTransition(flipItems[j], 0);
                            }
                        }

                    },
                    onSetWrapperTransition: function(swiper, speed) {
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.setTransition(swiper.slides[i], speed);
                            var flipItems = swiper.slides[i].querySelectorAll('.flip-item');
                            for (var j = 0; j < flipItems.length; j++) {
                                swiper.setTransition(flipItems[j], speed);
                            }
                        }
                    }
                };
            },
            translateZ: function(isY) {
                return {
                    onProgressChange: function(swiper) {
                        for (var i = 0; i < swiper.slides.length; i++){
                            var slide = swiper.slides[i];
                            var progress = slide.progress;

                            var translate = getTranslate(0, isY, -Math.abs(progress * 1500));
                            var rotate = getRotate(progress * 45, isY);

                            slide.style.opacity = Math.max(1 - Math.abs(progress) / 0.5, 0.5);
                            swiper.setTransform(slide, translate + ' ' + rotate);
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
                externalSpeed: '@',
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
                var speed = parseInt($scope.speed) || 800;
                var externalSpeed = isNaN(parseInt($scope.externalSpeed)) ? speed : parseInt($scope.externalSpeed);

                var isY = mode == 'vertical';

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
                }, animationOptions(isY));

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
                        mySwiper.swipeTo(newValue, externalSpeed, false);
                    }
                });

                var reInit = function() {
                    $timeout(function() {
                        var $swiperWrapper = $element.find('.swiper-wrapper:eq(0)');
                        var $slides = $swiperWrapper.find('>.swiper-slide');

                        if($slides.attr('ng-repeat').length > 0) {
                            if(isY) {
                                $swiperWrapper.css({ height: $element.height() * $slides.length });
                            }
                            else {
                                $swiperWrapper.css({ width: $element.width() * $slides.length });
                            }

                            mySwiper.reInit();
                            mySwiper.swipeTo($scope.currentSlideIndex);
                        }
                    }, 0);
                };

                $scope.$on('swiper.reInit', reInit);

                var changeAnimation = function($event, animationName) {
                    var animationOptions = animations[animationName] || animations[animationNames[0]];
                    angular.extend(mySwiper.params, animationOptions(isY));

                    // reset
                    for(var i = 0; i < mySwiper.slides.length; i++) {
                        var slide = mySwiper.slides[i];
                        slide.style.opacity = 1;
                        mySwiper.setTransition(slide, 0);
                        mySwiper.setTransform(slide, '');

                        var slideInnerItems = slide.querySelectorAll('.slide-inner');
                        for (var j = 0; j < slideInnerItems.length; j++) {
                            var slideInnerItem = slideInnerItems[j];
                            slideInnerItem.style.opacity = 1;
                            mySwiper.setTransition(slideInnerItem, 0);
                            mySwiper.setTransform(slideInnerItem, '');
                        }

                        var flipItems = slide.querySelectorAll('.flip-item');
                        for (var k = 0; k < flipItems.length; k++) {
                            var flipItem = flipItems[k];
                            flipItem.style.opacity = 1;
                            mySwiper.setTransition(flipItem, 0);
                            mySwiper.setTransform(slide, '');
                        }
                    }

                    mySwiper.reInit();
                    mySwiper.swipeTo($scope.currentSlideIndex, 0, false);
                };
                $scope.$on('swiper.changeAnimation', changeAnimation);
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

    swiper.directive('scroll', function($timeout, $parse) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                mode: '@',
                childLengthUnit: '@'
            },
            template: '<div class="swiper-container"><div class="swiper-scrollbar"></div><div class="swiper-wrapper"><div class="swiper-slide" ng-transclude></div></div></div>',
            link: function($scope, $element, $attrs) {
                var mode = $scope.mode === 'vertical' ? 'vertical' : 'horizontal';
                var childLengthUnit = parseInt($scope.childLengthUnit) || 1;

                var isY = mode == 'vertical';

                var $scrollbar = $element.find('.swiper-scrollbar:eq(0)');
                var $swiperWrapper = $element.find('.swiper-wrapper:eq(0)');
                var $slide = $element.find('.swiper-slide:eq(0)');

                if(isY) {
                    $element.addClass('scroll-v');
                    $scrollbar.addClass('swiper-scrollbar-v');
                }
                else {
                    $element.addClass('scroll-h');
                    $scrollbar.addClass('swiper-scrollbar-h');
                }

                var mySwiper = new Swiper($element[0], {
                    mode: mode,
                    scrollContainer: true,
                    scrollbar: {
                        container: $scrollbar[0]
                    }
                });

                var reInit = function() {
                    $timeout(function() {
                        var $repeater = $slide.find('>[ng-repeat], >>[ng-repeat]');
                        if($repeater.length > 0) {
                            var size = 0;

                            if(isY) {
                                $repeater.each(function(i) {
                                    if(i % childLengthUnit === 0) {
                                        size += $(this).outerHeight();
                                    }
                                });
                                $swiperWrapper.css({ height: size });
                                $slide.css({ height: size });
                            }
                            else {
                                $repeater.each(function(i) {
                                    if(i % childLengthUnit === 0) {
                                        size += $(this).outerWidth();
                                    }
                                });
                                $swiperWrapper.css({ width: size });
                                $slide.css({ width: size });
                            }

                            mySwiper.callPlugins('onInit');
                            mySwiper.reInit();
                        }
                    }, 0);
                };

                reInit();

                $scope.$on('scroll.reInit', reInit);
            }
        };
    });

    return swiper;
});
