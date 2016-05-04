/**
 * Created by: Luojinghui/luojinghui424@gmail.com
 * Date: 16/4/26
 * Time: 上午11:55
 */

define(function(require, exports, module){
    //var swiperCss = require('../../css/swiper.min.css');
    //var mainCss = require('../../css/main.css');
    var listener = require('../static/listener.js');
    var scrollImg = require('../static/scrollImg.js');

    //listener.sca_img();
    listener.hover_line();
    listener.own_hover_line();
    //listener.own_hover_fade();
    listener.own_hover_fadein();

    var mySwiper = scrollImg.my_swiper();

});