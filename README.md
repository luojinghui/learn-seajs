#learn-seajs

####为什么使用 Sea.js ？

Sea.js 追求简单、自然的代码书写和组织方式，具有以下核心特性：

1. 简单友好的模块定义规范：Sea.js 遵循 CMD 规范，可以像 Node.js 一般书写模块代码。
2. 自然直观的代码组织方式：依赖的自动加载、配置的简洁清晰，可以让我们更多地享受编码的乐趣。

Sea.js 还提供常用插件，非常有助于开发调试和性能优化，并具有丰富的可扩展接口。

####如何使用？

在 seajs-demo.html 页尾，通过 script 引入 sea.js 后，有一段配置代码：

```
// 配置seajs入口
seajs.config({
    paths: {	// 设置路径，方便跨目录调用
        'sta': '../js/static/'
    },
    alias: {	// 设置别名，方便调用
        'jquery': 'jquery.js'
    }
});
// 加载入口模块
seajs.use('sta/index')
```

sea.js 在下载完成后，会自动加载入口模块。页面中的代码就这么简单。

####模块代码

例子我构建了两个模块listener.js 和 scrollImg.js;

```
//listener.js
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

//scrollImg.js
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
	
```

入口文件：index.js

```
define(function(require, exports, module){
    var listener = require('../static/listener.js');
    var scrollImg = require('../static/scrollImg.js');

    listener.sca_img();
    var mySwiper = scrollImg.my_swiper();
    
    console.log(mySwiper);
});
```

上面就是 Sea.js 推荐的 CMD 模块书写格式。因为使用过 Node.js，一切都很自然。

####API 快速参考

#####seajs.use

用来在页面中加载一个或多个模块。

```
// 加载一个模块
seajs.use('./a');

// 加载一个模块，在加载完成时，执行回调
seajs.use('./a', function(a) {
  a.doSomething();
});

// 加载多个模块，在加载完成时，执行回调
seajs.use(['./a', './b'], function(a, b) {
  a.doSomething();
  b.doSomething();
});
```
更多配置说明：[传送门](https://github.com/seajs/seajs/issues/260)

#####define

用来定义模块。Sea.js 推崇一个模块一个文件，遵循统一的写法：

```
define(function(require, exports, module) {
  // 模块代码
});
```

也可以手动指定模块 id 和依赖，详情请参考：[传送门](https://github.com/seajs/seajs/issues/242)

建议仔细阅读，加深了解

require, exports 和 module 三个参数可酌情省略，具体用法如下。

#####require

require 用来获取指定模块的接口。

```
define(function(require) {

  // 获取模块 a 的接口
  var a = require('./a');

  // 调用模块 a 的方法
  a.doSomething();
});
```

注意，require 只接受字符串直接量作为参数

#####require.async(id, callback?)

用来在模块内部异步加载一个或多个模块。

require.async 方法用来在模块内部异步加载模块，并在加载完成后执行指定回调。callback 参数可选。

```
define(function(require, exports, module) {

  // 异步加载一个模块，在加载完成时，执行回调
  require.async('./b', function(b) {
    b.doSomething();
  });

  // 异步加载多个模块，在加载完成时，执行回调
  require.async(['./c', './d'], function(c, d) {
    c.doSomething();
    d.doSomething();
  });

});
```

注意：require 是同步往下执行，require.async 则是异步回调执行。require.async 一般用来加载可延迟异步加载的模块。

#####exports

exports 是一个对象，用来向外提供模块接口

```
define(function(require, exports) {

  // 对外提供 foo 属性
  exports.foo = 'bar';

  // 对外提供 doSomething 方法
  exports.doSomething = function() {};

});
```

除了给 exports 对象增加成员，还可以使用 return 直接向外提供接口。

```
define(function(require) {

  // 通过 return 直接提供接口
  return {
    foo: 'bar',
    doSomething: function() {}
  };

});
```

如果 return 语句是模块中的唯一代码，还可简化为：

```
define({
  foo: 'bar',
  doSomething: function() {}
});
```

#####module.exports

当前模块对外提供的接口。

传给 factory 构造方法的 exports 参数是 module.exports 对象的一个引用。只通过 exports 参数来提供接口，有时无法满足开发者的所有需求。 比如当模块的接口是某个类的实例时，需要通过 module.exports 来实现：

```
define(function(require, exports, module) {

  // exports 是 module.exports 的一个引用
  console.log(module.exports === exports); // true

  // 重新给 module.exports 赋值
  module.exports = new SomeClass();

  // exports 不再等于 module.exports
  console.log(module.exports === exports); // false

});
```

注意：对 module.exports 的赋值需要同步执行，不能放在回调函数里。下面这样是不行的：

```
// x.js
define(function(require, exports, module) {

  // 错误用法
  setTimeout(function() {
    module.exports = { a: "hello" };
  }, 0);

});
```

#####小结

这就是 CMD 模块定义规范的所有内容。经常使用的 API 只有 define, require, require.async, exports, module.exports 这五个。其他 API 有个印象就好，在需要时再来查文档，不用刻意去记。

与 RequireJS 的 AMD 规范相比，CMD 规范尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。通过 CMD 规范书写的模块，可以很容易在 Node.js 中运行，后续会介绍。

#####备注

seajs官方文档入口：[http://seajs.org/docs/#docs](http://seajs.org/docs/#docs)

ID 和路径匹配原则： [https://github.com/seajs/seajs/issues/930](https://github.com/seajs/seajs/issues/930)

关闭包装jquery：

```
define(function(){
    //jquery源代码
    return $.noConflict();
});
```

jQuery支持的是AMD规范，在jQuery文件的末尾会有以下的代码:

```
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
define( "jquery", [], function () { return jQuery; } );
}

```

只要将支持该规范的define.amd && define.amd.jQuery删除，jQuery便可以自动模块化





