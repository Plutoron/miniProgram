//detail.js
//获取应用实例
var app = getApp()
Page({
  onLoad: function () {
    console.log('detail onLoad');
    var that = this;
    this.setData({
      poster: app.globalData.poster,
      name: app.globalData.name,
      author: app.globalData.author,
      src: app.globalData.src
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onReady: function (e) {
    
  },
  onShow: function () {
    this.setData({
      poster: app.globalData.poster,
      name: app.globalData.name,
      author: app.globalData.author,
      src: app.globalData.src
    })
  },
  data: {
      poster: '',
      name: '',
      author: '',
      src: ''
  },
    audioPlay: function () {
      this.audioCtx.play()
    },
    audioPause: function () {
      this.audioCtx.pause()
    },
    audio14: function () {
      this.audioCtx.seek(14)
    },
    audioStart: function () {
      this.audioCtx.seek(0)
    }
})
