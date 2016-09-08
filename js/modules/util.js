/**
 * Created by xiaoxiao on 2016/9/8.
 */
define('util',function(){
  return {
    /**
     * [判断是否是数组]
     * @param  {[type]}  arr [description]
     * @return {Boolean}     [description]
     */
    isArray: function (arr) {
      if (Array.isArray) {
        return Array.isArray(arr);
      } else {
        return typeof arr == "object" && Object.prototype.toString.call(arr) == "[object Array]";
      }
    },
    /**
     * [判断是否是函数]
     * @param  {[type]}  arr [description]
     * @return {Boolean}     [description]
     */
    isFunction: function (fn) {
      return typeof fn && Object.prototype.toString.call(fn) == "[object Function]";
    },
    /**
     * [使用递归实现一个深度克隆]
     * @param  {[type]}  arr [description]
     * @return {type}     [description]
     */
    cloneObject: function (src) {
      //如果是数字等基本值类型
      if (typeof src != "object" || typeof src == null) {
        return src;
      }
      //如果是数组
      if (this.isArray(src)) {
        var arr = [];
        src.forEach(function (item, index) {
          arr[index] = Util.cloneObject(item);
        })
        return arr;
      }
      //如果是日期
      if (typeof src == "object" && Object.prototype.toString.call(src) == "[object Date]") {
        var time = src.getTime();
        return new Date(time);
      }
      //如果是对象
      if (typeof src == "object" && Object.prototype.toString.call(src) == "[object Object]") {
        var obj = new Object();
        for (var key in src) {
          if (src.hasOwnProperty(key)) {
            obj[key] = this.cloneObject(src[key]);
          }
        }
        return obj;
      }
    },
    /**
     * [数组去重]
     * 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
     * @param  {[type]}  arr [description]
     * @return {Array}     [description]
     */
    uniqArray: function (arr) {
      arr.forEach(function (item, index) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == item && i != index) {
            arr.splice(i, 1);
          }
        }
      });
      return arr;
    },
    /**
     * [Trim]
     * 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
     * @param  {[type]}  arr [description]
     * @return {String}     [description]
     */
    trim: function (str) {
      return str.replace(/^(\s)+|(\s)+$/g, "");
    },
    /**
     * [isEmail]
     * 判断是否是邮箱账号
     * @param  {[type]}  arr [description]
     * @return {Boolean}     [description]
     */
    isEmail: function (email) {
      return email.match(/^[a-z0-9]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) != null;
    },
    /**
     * [isEmail]
     * 判断是否是手机号
     * @param  {[type]}  str [description]
     * @return {Boolean}     [description]
     */
    isPhone: function (phone) {
      phone += "";
      return phone.match(/^(13[0-9]|14[67]|15[012356789]|17[678]|18[0-9])\d{8}$/) != null;
    },
    /**
     * [hasClass]
     * 判断是否有某个样式
     * @param  {[type]}  arr [description]
     * @return {Boolean}     [description]
     */
    hasClass: function (ele, cls) {
      cls = this.trim(cls);
      var patt = new RegExp("\\b" + cls + "\\b", 'g');
      return patt.test(ele.className);
    },
    /**
     * [addClass]
     * 添加样式
     * @param  {[String]}
     */
    addClass: function (ele, cls) {
      if (this.hasClass(ele, cls) == false) {
        ele.className += " " + cls;
        ele.className = ele.className.replace(/\s+/g, " ");
      }
    },
    /**
     * [removeClass]
     * 删除某个样式
     * @param  {[type]} String [description]
     */
    removeClass: function (ele, cls) {
      if (this.hasClass(ele, cls)) {
        var patt = new RegExp("\\b" + cls + "\\b", "g");
        ele.className = ele.className.replace(patt, "");
        ele.className = ele.className.replace(/\s+/g, " ");
      }
    },
    /**
     * [getRandom]
     * 获取任意范围的随机数
     * @param  {[type]} [description]
     */
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    /**
     * [dataFormate]
     * 根据格式返回当前时间
     * @param  {[type]} String [格式yyyy表示年，MM表示月，dd表示日期，HH表示小时，mm表示分钟，ss表示秒数]
     */
    dateFormat: function (fmt) {
      if (!fmt) {
        return undefined;
      }
      var time = new Date();
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();

      month = month < 10 ? "0" + month : month;
      date = date < 10 ? "0" + date : date;
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      fmt = fmt.replace("yyyy", year);
      fmt = fmt.replace("MM", month);
      fmt = fmt.replace("dd", date);
      fmt = fmt.replace("HH", hours);
      fmt = fmt.replace("mm", minutes);
      fmt = fmt.replace("ss", seconds);

      return fmt;

    },
    /**
     * [getRemaining]
     * 根据指定日期返回倒计时对象
     * @param  {[type]} String []
     */
    getRemaining: function (endTime) {
      var t = Date.parse(endTime) - new Date().getTime();

      var seconds = Math.floor(t / 1000 % 60);
      var minutes = Math.floor(t / 1000 % 60 % 60);
      var hours = Math.floor(t / 1000 % 60 % 60 % 24);
      var day = Math.floor(t / (1000 * 60 * 60 * 24));

      return {
        total: t,
        day: day,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    },
    /**
     * [decimalToOther]
     * 将十进制数转换为其他进制
     * @param  {[Number]}
     * @param  {[Number]}
     * @return  {[Number]}
     */
    decimalToOther: function (num, other) {
      var arr = [];
      while (num > 0) {
        var yushu = num % other; //余数
        arr.unshift(yushu);
        num = parseInt(num / other); //商
      }

      return Number(arr.join(""));
    },
    /**
     * [getPosition]
     * 获得一个元素相对于浏览器窗口的位置
     * @param  {[Object]}
     */
    getPosition: function (ele) {
      var left = ele.offsetLeft;
      var top = ele.offsetTop;
      var currentEle = ele.offsetParent;

      while (currentEle != null) {
        left += currentEle.offsetLeft;
        top += currentEle.offsetTop;
        currentEle = currentEle.offsetParent;
      }

      left -= (document.body.offsetLeft + document.documentElement.offsetTop);
      top -= (document.body.offsetTop + document.documentElement.offsetTop);

      return {
        left: left,
        top: top
      };
    },
    /**
     * [isVisible]
     * 判断一个元素是否可见
     * @param  {[Object]}
     */
    isVisible: function (ele) {
      var top = this.getPosition(ele).top;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (top < scrollTop + window.innerHeight) {
        return true;
      }
      return false;
    },
    setCookie: function (c_name, value, expires) {
      c_name = encodeURIComponent(c_name);
      value = encodeURIComponent(value);
      var time = new Date().getTime() + expires;
      expires = new Date(time).toUTCString();
      var cookieText = c_name + "=" + value + ((expires == null)) ? "" : "expires=" + expires;
      document.cookie = cookieText;
    },
    getCookie: function (c_name) {
      if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name);
        var patt = new RegExp("\\b" + c_name + "\\b");
        if (document.cookie.match(patt)) {
          c_start = c_start + c_name.length + 1;
          var c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) c_end = document.cookie.length;
          return decodeURIComponent(document.cookie.slice(c_start, c_end));
        }
      }
      return "";
    },
    isNodeList:function(ele){
      return Object.prototype.toString.call(ele) === "[object HTMLCollection]";
    },
    ajax: function (url, opts) {
      var xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = window.XMLHttpRequest;
      } else {
        xmlhttp = new ActiveXObject('Microsoft.XMLHttp');

      }
      //处理传来的数据
      if (opts.data) {
        var dataArr = [];
        for (var key in opts.data) {
          dataArr.push(key + "=" + opts.data[key]);
        }
        var data = dataArr.join("&");
      }
      if (!opts.type) {
        opts.type = "GET";
      }
      opts.type = opts.type.toUpperCase();
      //发送请求
      if (opts.type == "GET") {
        var myUrl = '';
        if (opts.data) {
          myUrl = data.url + "?" + data;
        } else {
          myUrl = data.url;
        }
        xmlhttp.open("GET", myUrl, true);
        xmlhttp.send();
      } else if (opts.type == "POST") {
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send();
      }
      //指定回调函数
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            if (opts.onsuccess) {
              opts.onsuccess(xmlhttp.responseText);
            }
          } else {
            if (opts.onfail) {
              opts.onfail();
            }
          }
        }
      }

    },
    getEvent: function (event) {
      return event ? event : window.event;
    },
    getTarget: function (event) {
      event = this.getEvent(event);
      return event.target || event.srcElement;
    },
    addHandler: function (ele, type, handler) {
      if (ele.addEventListener) {
        ele.addEventListener(type, handler, false)
      } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, handler);
      } else {
        ele["on" + type] = handler;
      }
    },
    removeHandler: function (ele, type, handler) {
      if (ele.removeEventListener) {
        ele.removeEventListener(type, handler, false)
      } else if (ele.detachEvent) {
        ele.detachEvent("on" + type, handler);
      } else {
        ele["on" + type] = null;
      }
    },
    //一个简单的Query
    $: function (selector) {

      var ele = document.getElementsByTagName("html")[0];
      var sele = selector.replace(/\s+/, " ").split(" ");

      var childs = function (element) {
        return element.getElementsByTagName("*");
      };
      for (var i = 0, len = sele.length; i < len; i++) {
        ele = childs(ele);
        var eleLength = ele.length;
        switch (sele[i][0]) {
          case "#":
            var key = sele[i].substring(1);
            ele = document.getElementById(key);
            break;

          case ".":
            var key = sele[i].substring(1);
            ele = document.getElementsByClassName(key)[0];
            break;
          case "[":
            if (sele[i].indexOf("=") == -1) {
              var key = sele[i].substring(1, sele[i].length - 1);
              for (var j = 0; j < eleLength; j++) {
                if (ele[j].getAttribute(key) !== null) {
                  ele = ele[j];
                  break;
                }
              }
            } else {
              var loca = sele[i].indexOf("=");
              var key = sele[i].substring(1, loca);
              var attrValue = sele[i].substring(loca + 1, sele[i].length - 1);
              console.log(loca + 1);
              console.log(sele[i]);
              for (var j = 0; j < eleLength; j++) {
                if (ele[j].getAttribute(key) === attrValue) {
                  ele = ele[j];
                  break;
                }
              }
            }
            break;
          default:
            for (var j = 0; j < eleLength; j++) {
              if (ele[j].tagName === sele[i].toUpperCase()) {
                ele = ele[j];
                break;
              }
            }
            break;
        }
      }
      return ele;
    },

  };
})
