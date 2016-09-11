### 项目用到一些工具

- util.js工具函数库
将平时遇到的一些函数积累起来封装的通用函数库，使用原生JS实现，包括类型判断、日期格式化、根据给定日返回倒计时对象、深拷贝、数组去重、跨浏览器addEvent、跨浏览器removeEvent、ajax、dom操作等一系列的api。

- expose.js 曝光加载插件
依赖于 `util.js`，调用方式。(在require.js中)

```javascript

require(['expose'],function(Exposure){
	//传入元素和回调函数
	Exposure.init(element,callback);
})

```

- r.js打包压缩
不符合`AMD`规范的模块在用require()加载之前，要先用`require.config()`方法，定义它们的一些特征。在`requireJs`的`config`方法中，这些模块可以使用`shim`定义。
```javsscript
require.config({
  baseUrl:'js/modules',
  shim: {
    'imagesloaded':{
      exports: 'imagesloaded'
    }
  }
});
```

这个项目使用imagesloaded插件来判断页面所以得图片是否加载完毕。这个模块不符合`AMD`规范，所有可以使用`skim`属性来定义。

`bulid.js`文件配置选项非常多，这个项目里只用到简单三个。

```javascript
({
  baseUrl:'modules',//规定基准路径
  name:"../main",//打包入口文件
  out:"../main.min.js"//压缩文件的输出路径
})
```



