/**
 * Created by xiaoxiao on 2016/9/8.
 */
require.config({
  baseUrl:'js/modules',
});
require(['util','expose'],function(util,Exposure){

    var lis = $(".animation-left").getElementsByTagName("li");
    var imgs = $(".animation-right").getElementsByTagName("img");
    var count = 0;
    var timer = null;
    var picIndex = 0;
    //header的动画
    for(var i=0;i<lis.length;i++){
      util.addHandler(lis[i],"mouseover",function(){
        //停止自动播放
        stopAuto();
        var index = this.dataset.index;
        picIndex = index;
        var top = index*56;
        $(".tab .inner").style.top = top + "px";
      })
      util.addHandler(lis[i],"mouseout",function(){
        //开始自动播放
        if(!timer){
          autoPlay();
        }
      })
    }
    util.addHandler($(".tab .inner"),"webkitTransitionEnd",function(){
      for(var j=0;j<lis.length;j++){
        lis[j].className = "";
      }
      //更换图片
      var imgIndex = parseInt(picIndex) + 1;
      changImg(imgIndex);

      util.addClass(lis[picIndex],"cur");
      //执行动画
      animate();
      //动画执行完毕
      setTimeout(function(){
        count++;
        console.log(count);
        //清空class
        for(var m=0;m<imgs.length;m++){
          imgs[m].className = "";
        }
        //修改图片位置
        var p = $(".animation-right");
        p.appendChild(imgs[0]);
        p.appendChild(imgs[0]);

      },500);
    })
    util.addHandler($(".tab .inner"),"transitionend",function(){
      for(var j=0;j<lis.length;j++){
        lis[j].className = "";
      }
      //更换图片
      var imgIndex = parseInt(picIndex) + 1;
      changImg(imgIndex);

      util.addClass(lis[picIndex],"cur");
      //执行动画
      animate();
      //动画执行完毕
      setTimeout(function(){
        count++;
        //console.log(count);
        //清空class
        for(var m=0;m<imgs.length;m++){
          imgs[m].className = "";
        }
        //修改图片位置
        var p = $(".animation-right");
        p.appendChild(imgs[0]);
        p.appendChild(imgs[0]);

      },500);
    })
    function changImg(imgIndex){
      imgs[2].src = "./img/tab-"+imgIndex+"-font.png";
      util.removeClass(imgs[2],"fontIn");
      imgs[3].src = "./img/tab-"+imgIndex+".png";
      util.removeClass(imgs[3],"imgIn");
    }
    function animate(){
      util.addClass(imgs[0],"fontOut");
      util.addClass(imgs[1],"imgOut");
      util.addClass(imgs[2],"fontIn");
      util.addClass(imgs[3],"imgIn");
    }
    autoPlay();
    function autoPlay(){
      timer = setInterval(function(){
        picIndex ++;
        picIndex = picIndex % 6;
        var top = picIndex*56;
        $(".tab .inner").style.top = top + "px";
      },2000)
    }
    function stopAuto(){
      timer && clearInterval(timer);
      timer = null;
    }
    //曝光执行动画
    //page2
    var icons =  $(".page2-icons").getElementsByTagName("img");
    var h5 = $(".page2-icons").getElementsByTagName("h5")[0];
    Exposure.init(h5,function(){
      for(var i=0;i<icons.length;i++){
        util.addClass(icons[i],"img"+(i+1)+"Out");
        util.addHandler(icons[i],"mouseover",function(i){
          this.style.transform = "scale(1.1,1.1)";
        });

        util.addHandler(icons[i],"mouseout",function(){
          this.style.transform = "scale(1,1)";
        })
        util.addHandler(icons[i],"animationend",function(){
          this.className = "";
          this.style.opacity = 1;
        })
        util.addHandler(icons[i],"webkitAnimationEnd",function(){
          this.className = "";
          this.style.opacity = 1;
        })
        util.addHandler(icons[i],"MSAnimationEnd",function(){
          this.className = "";
          this.style.opacity = 1;
        })
      }
    })
    //page3
    var histogramLis = $(".histogram").getElementsByTagName("li");
    var histogramIconLis = $(".histogram-icon").getElementsByTagName("li");
    var page3IconLis = $(".page3-icons").getElementsByTagName("li");
    var iconIndex = 0;
    var iconTimer = null;
    var page3Left = $(".page3-left");
    var page3Title = $(".page3-title");
    var page3Icons = $(".page3-icons");
    var page3DescFont = $(".page3-desc");
    var page3Desc = $(".page3-right .desc");
    function iconAuto(){
      if(iconTimer){
        clearInterval(iconTimer);
      }
      iconTimer = setInterval(function(){
        iconIndex = iconIndex % 8;
        showIcon();
        iconIndex++;
      },1500);
    }
    function iconHandler(){
      for(var j=0;j<page3IconLis.length;j++){
        util.addHandler(page3IconLis[j],"mouseover",function(){
          clearInterval(iconTimer);
          iconIndex = this.dataset.index;
          showIcon();
        });
        util.addHandler(page3IconLis[j],"mouseout",function(){
          iconAuto();
        });
      }
    }
    function showIcon(){
      for(var i=0;i<histogramLis.length;i++){
        histogramLis[i].style.opacity = 0;
        histogramIconLis[i].className = "";
        util.removeClass(page3IconLis[i],"cur");
      }
      histogramLis[iconIndex].style.opacity=1;
      util.addClass(histogramIconLis[iconIndex],"cur");
      util.addClass(page3IconLis[iconIndex],"cur");
    }
    Exposure.init(page3Desc,function(){
      //添加动画
      util.addClass(page3Left,"imgLeftIn");
      util.addClass(page3Title,"titleIn");
      util.addClass(page3Icons,"pageDescIn");
      util.addClass(page3DescFont,"pageDescIn");
      iconAuto();
      iconHandler();
    });
    //page4
    var page4Right = $(".page4-right");
    var page4Title = $(".page4-title");
    var page4DescFont = $(".page4-desc");
    var page4Desc = $(".page4-left .desc");
    Exposure.init(page4Desc,function(){
      //添加动画
      util.addClass(page4Right,"imgRightIn");
      util.addClass(page4Title,"titleIn");
      util.addClass(page4DescFont,"pageDescIn");
    });
    //page5
    var page5Left = $(".page5-left");
    var page5Title = $(".page5-title");
    var page5DescFont = $(".page5-desc");
    var page5Desc = $(".page5-right .desc");
    Exposure.init(page5Desc,function(){
      //添加动画
      util.addClass(page5Left,"imgLeftIn");
      util.addClass(page5Title,"titleIn");
      util.addClass(page5DescFont,"pageDescIn");
    });
    //page6
    var page6Right = $(".page6-right");
    var page6Title = $(".page6-title");
    var page6DescFont = $(".page6-desc");
    var page6Desc = $(".page6-left .desc");
    Exposure.init(page6Desc,function(){
      //添加动画
      util.addClass(page6Right,"imgRightIn");
      util.addClass(page6Title,"titleIn");
      util.addClass(page6DescFont,"pageDescIn");
    });
    //page7
    var page7Right = $(".page7-right");
    var page7Imgs = page7Right.getElementsByTagName('img');
    var page7Title = $(".page7-title");
    var page7DescFont = $(".page7-desc");
    var page7Desc = $(".page7-left .desc");
    Exposure.init(page7Desc,function(){
      //添加动画

      for(var i=0;i<page7Imgs.length;i++){
        page7Imgs[i].style.animationDelay = i * 0.3 + "s";
        page7Imgs[i].style.webkitAnimationDelay = i * 0.3 + "s";
        page7Imgs[i].style.mozAnimationDelay = i * 0.3 + "s";
        util.addClass(page7Imgs[i],"imgRightIn");
      }
      util.addClass(page7Title,"titleIn");
      util.addClass(page7DescFont,"pageDescIn");
    });
    //page8
    var page8Right = $(".page8-right");
    var page8Imgs = page8Right.getElementsByTagName('img');
    var page8Title = $(".page8-title");
    var page8DescFont = $(".page8-desc");
    var page8Desc = $(".page8-left .desc");
    Exposure.init(page8Desc,function(){
      //添加动画

      for(var i=0;i<page8Imgs.length;i++){
        var delay = 0;
        if(i == 0){
          delay = 1.3;
          util.addClass(page8Imgs[i],"memoryIn");
        }else if(i == 1){
          delay = 0.7;
          util.addClass(page8Imgs[i],"titleIn");
        }else {
          delay = 0.2;
          util.addClass(page8Imgs[i],"titleIn");
        }
        page8Imgs[i].style.animationDelay = delay + "s";
        page8Imgs[i].style.webkitAnimationDelay = delay + "s";
        page8Imgs[i].style.mozAnimationDelay = delay + "s";
      }
      util.addClass(page8Title,"titleIn");
      util.addClass(page8DescFont,"pageDescIn");
    });
    function $(selector){
      return document.querySelector(selector);
    }

});
