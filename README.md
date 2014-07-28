ng-swiper
=========

use [swiper](http://www.idangero.us/sliders/swiper/index.php)(include [swiper.progress](http://www.idangero.us/sliders/swiper/plugins/progress.php) and [swiper.scrollbar](http://www.idangero.us/sliders/swiper/plugins/scrollbar.php)) with angular and requirejs

usage:
```
<h2>
    Animation:
    <select ng-model="currAnimation" ng-options="animation.name for animation in animations">
    </select>
</h2>

<h2>Horizontal Swiper:</h2>
<swiper show-pager="true" ng-class="currAnimation.name == 'translateZ' && 'translateZ'">
    <swiper-slide>
        <div class="slide-inner">
            <div class="flip-item red"></div>
        </div>
    </swiper-slide>
    <swiper-slide>
        <div class="slide-inner">
            <div class="flip-item green"></div>
        </div>
    </swiper-slide>
    <swiper-slide>
        <div class="slide-inner">
            <div class="flip-item blue"></div>
        </div>
    </swiper-slide>
</swiper>


<h2>Vertical Swiper:</h2>
<swiper mode="vertical" ng-class="currAnimation.name == 'translateZ' && 'translateZ'">
    <swiper-slide>
        <div class="slide-inner">
            <div class="flip-item red"></div>
        </div>
    </swiper-slide>
    <swiper-slide>
        <div class="slide-inner">
            <div class="flip-item green"></div>
        </div>
    </swiper-slide>
    <swiper-slide>
        <div class="slide-inner">
            <div class="flip-item blue"></div>
        </div>
    </swiper-slide>
</swiper>

<h2>Srcoll:</h2>
<scroll mode="vertical" ng-init="arr=[0,1,2,3,4,5,6,7,8,9,10]" size="arr.length">
    <div class="scroll-item" ng-repeat="n in arr">{{ 'Line' + n }}</div>
</scroll>
```
