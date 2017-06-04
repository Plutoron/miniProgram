//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    poster: '',
    name: '',
    author: '',
    src: ''
  },
  setGlobalData: function(obj){
    this.globalData.poster = obj.poster;
    this.globalData.name = obj.name;
    this.globalData.author = obj.author;
    this.globalData.src = obj.src;
  },
  playMusic: function () {
    wx.playBackgroundAudio({
      dataUrl: this.globalData.src,
      title: this.globalData.name,
      coverImgUrl: this.globalData.poster
    }) 
  },
  setSrc: function (event) {
    var dataset = event.currentTarget.dataset;
    var that = this;
    var _src = '';
    wx.request({
      url: 'https://api.imjad.cn/cloudmusic/', //仅为示例，并非真实的接口地址
      data: {
        type: 'song',
        id: dataset.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data.data[0];
        _src = data.url;
        console.log(_src);
        if (_src == null) {
          wx.showToast({
            title: '因版权问题，暂时不能播放，抱歉',
            icon: 'loading',
            duration: 3000,
            mask: true
          });
          return;
        }
        that.setGlobalData({
          poster: dataset.poster,
          name: dataset.name,
          author: dataset.author,
          src: _src
        });
        that.playMusic();
      },
      complete: function (res) {
      }
    });
  }
})