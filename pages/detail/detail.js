//detail.js
//获取应用实例
var app = getApp()
Page({
  onLoad: function () {
    console.log('detail onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        musicStatus: 'play'
      })
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        musicStatus: 'pause'
      })
    })
    wx.onBackgroundAudioStop(function () {
      that.setData({
        musicStatus: 'pause'
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
    })
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log('成功背景音乐信息');
        var status = res.status
        if (status == 1) {
          that.setData({
            musicStatus: 'play'
          })
        }
      },
      fail: function () {
        console.log('获取背景音乐信息失败');
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
    musicStatus: 'pause'
  },
  audioControl: function () {
    var status = this.data.musicStatus;
    var that = this;
    if (status == 'play'){
        wx.pauseBackgroundAudio();
        that.setData({
          musicStatus: 'pause'
        })
    } 
    else if (status == 'pause'){
        app.playMusic();
        that.setData({
          musicStatus: 'play'
        })
    }
  }
})
