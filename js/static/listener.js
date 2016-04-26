/**
 * Created by: Luojinghui/luojinghui424@gmail.com
 * Date: 16/4/25
 * Time: 下午2:57
 */

define(function(require, exports, module){
    var $ = require('./../lib/jquery.js');

    module.exports = {
        sca_img : function() {
            $('.scas').on('click', function() {
                if($(this).hasClass('sca')) {
                    $(this).removeClass('sca');
                } else {
                    $(this).addClass('sca');
                }
            });
        }
    };
});