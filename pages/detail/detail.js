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
  onShareAppMessage: function () {
    var _title = this.data.name + this.data.author;
    return {
      title: _title,
      desc: '这首歌不错，来听听吧!',
      path: '/pages/detail/detail'
    }
  },
  onReady: function (e) {
    
  },
  onShow: function () {
    var that = this;
    this.setData({
      poster: app.globalData.poster,
      name: app.globalData.name,
      author: app.globalData.author,
      src: app.globalData.src
    }),
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          console.log('成功背景音乐信息');
          var status = res.status
          if (status == 1) {
            that.setData({
              musicStatus: 'play'
            })
          } else if (status == 0){
            that.setData({
              musicStatus: 'pause'
            })
          }
        },
        fail: function () {
          console.log('获取背景音乐信息失败');
          app.playMusic();
        },
        complete: function () {
          console.log('complete获取背景音乐信息结束');
        }
      })
  },
  data: {
      poster: '',
      name: '',
      author: '',
      src: '',
      musicStatus: 'play'
  },
  audioControl: function () {
    wx.getBackgroundAudioPlayerState({
      fail: function (){
        console.log('获取背景音乐信息失败');
        app.playMusic();
      },
      complete: function () {
        console.log('complete获取背景音乐信息结束');
      }
    })
    console.log('获取背景音乐信息结束');
    var status = this.data.musicStatus;
    if (status == 'play'){
        wx.pauseBackgroundAudio();
        this.setData({
          musicStatus: 'pause'
        })
    } 
    else if (status == 'pause'){
        app.playMusic();
        this.setData({
          musicStatus: 'play'
        })
    }
  }
})
