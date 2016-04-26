/**
 * Created by: Luojinghui/luojinghui424@gmail.com
 * Date: 16/4/26
 * Time: 下午1:08
 */
define(function(require, exports, module){
    require('./../lib/swiper.min.js');

    module.exports = {
        'my_swiper' :  function() {
            var mySwiper = new Swiper('.swiper-container',{
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                resistanceRatio: 0.6,
//            autoplay : 3000,
                loop : true,
                autoplayDisableOnInteraction : false,
                observer:true,
                observeParents:true,
                simulateTouch: false,
                onlyExternal: true,
                touchMoveStopPropagation: true,
                lazyLoading: true
            });
            return mySwiper;
        }
    }
});