/**
 * Created by: Luojinghui/luojinghui424@gmail.com
 * Date: 16/4/25
 * Time: 下午2:57
 */

define(function(require, exports, module){
    var $ = require('jquery');

    module.exports = {
        sca_img : function() {
            $('.scas').on('mouseover', function() {
                //if($(this).hasClass('sca')) {
                    //$(this).removeClass('sca');
                //} else {
                    $(this).addClass('sca');
                //}
            }).on('mouseout', function() {
                $(this).removeClass('sca');
            });
        },

        hover_line: function() {
            //卡片效果
            $(".lp-proCard .line").hide();
            var t1,t2;
            $(".lp-proCard").hover(function(){
                $(".lp-proCard .before-line1,.lp-proCard .after-line1").show();
                $(".lp-proCard .before-line1").stop().animate({"width":371+'px',left:-1+'px'},300);
                $(".lp-proCard .after-line1").stop().animate({"width":370+'px',left:369+'px'},300);

                clearTimeout(t1);
                clearTimeout(t2);
                t1 = setTimeout(function(){
                    $(".lp-proCard .before-line2").show();
                    $(".lp-proCard .after-line2").show();
                    $(".lp-proCard .before-line2").animate({"height":200+'px'},300);
                    $(".lp-proCard .after-line2").animate({"height":200+'px','top':0+'px'},300);

                },300);
                t2 = setTimeout(function(){
                    $(".lp-proCard .before-line3").show();
                    $(".lp-proCard .after-line3").show();
                    $(".lp-proCard .before-line3").stop().animate({"width":370+'px'},400);
                    $(".lp-proCard .after-line3").stop().animate({"width":370+'px'},400);

                },600);
            },function(){

                clearTimeout(t1);
                clearTimeout(t2);
                $(".lp-proCard .before-line1").stop().animate({"width":0,left:369+'px'});
                $(".lp-proCard .before-line2").stop().animate({"height":0});
                $(".lp-proCard .before-line3").stop().animate({"width":0});
                $(".lp-proCard .after-line1").stop().animate({"width":0,left:369+'px'});
                $(".lp-proCard .after-line2").stop().animate({"height":0,top:200+'px'});
                $(".lp-proCard .after-line3").stop().animate({"width":0});

            });
        },

        own_hover_line: function() {
            $(".liear-box .li").hide();

            var time_one, time_two;

            $('.liear-box').hover(function() {
                $(".liear-box .one, .liear-box .four").show();
                $('.liear-box .one, .liear-box .four').animate({'width': '300px'}, 400);
                $('.liear-box .two, .liear-box .five').delay(400);
                $(".liear-box .two, .liear-box .five").show();
                $('.liear-box .two').animate({'height': '150px'},300);
                $('.liear-box .five').animate({'height': '150px'},300);
                $('.liear-box .three, .liear-box .six').delay(700);
                $('.liear-box .three, .liear-box .six').show();
                $('.liear-box .three, .liear-box .six').animate({'width': '300px'}, 400);
            }, function() {
                $('.one, .two, .three, .four, .five, .six').clearQueue();
                //$('.one, .two, .three, .four, .five, .six').stop();
                $('.liear-box .three, .liear-box .six').animate({'width': '0px'}, 300);
                $('.liear-box .two, .liear-box .five').delay(300);
                $('.liear-box .two, .liear-box .five').animate({'height': '0px'}, 200);
                $('.liear-box .one, .liear-box .four').delay(500);
                $('.liear-box .one, .liear-box .four').animate({'width': '0px'},300);
            })
        },

        own_hover_fade: function() {
            $('.in-box figure').hover(function() {
                $('.fb-b').delay(200);
                $('.fb-b').animate({'bottom': '40%', 'opacity': '1'}, 400, 'swing');
            },function() {
                $('.fb-b').clearQueue();
                $('.fb-b').animate({'bottom': '0%', 'opacity': '0'}, 200);
            });
        },

        own_hover_fadein: function() {
            $('.in-box figure').hover(function() {
                $(this).find('.fb-b').removeClass('fadeOutDown');
                //$(this).find('.fb-b').delay(5000);
                $(this).find('.fb-b').addClass('fadeInUp');
            },function() {
                $(this).find('.fb-b').clearQueue();
                $(this).find('.fb').clearQueue();
                $(this).find('.fb-b').removeClass('fadeInUp');
                if($(this).find('.fb-b').css('opacity') === 1) {
                    $(this).find('.fb-b').addClass('fadeOutDown');
                }
            });
        }
    };
});