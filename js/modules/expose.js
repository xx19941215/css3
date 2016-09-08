/**
 * Created by xiaoxiao on 2016/9/8.
 */
define('expose',['util'],function(util){
  return {
    queue:[],
    flag:false,
    timer:null,
    interval:300,
    init:function(ele,callback){
      this.add(ele,callback);
      this.bind();
      this.do();
    },
    add:function(ele,callback){
      if(util.isNodeList(ele)){
        for(var key in ele){
          var o = {
            el:ele[key],
            cb:callback
          };
          this.queue.push(o);
        }
      }else{
        var o = {
          el:ele,
          cb:callback
        };
        this.queue.push(o);
      }
    },
    bind:function(){
      if(this.flag){
        return;
      }
      this.flag = true;
      var self = this;
      util.addHandler(window,"scroll",function(){
        if(self.timer){
          clearTimeout(self.timer);
        }
        self.timer = setTimeout(function(){
          self.do();
        },self.interval);
      })
    },
    do:function(){
      var tempArr = [];
      for(var i =0;i<this.queue.length;i++){
        if(util.isVisible(this.queue[i].el)){
          this.queue[i].cb && this.queue[i].cb.call(this);
        }else{
          tempArr.push(this.queue[i]);
        }
      }
      this.queue = tempArr;
    },

  };
});
