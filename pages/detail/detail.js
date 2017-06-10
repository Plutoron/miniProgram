//detail.js
//获取应用实例
var app = getApp()
Page({
  onLoad: function () {
    console.log('detail onLoad');
    var that = this;
    that.setData({
      id: app.globalData.id,
      poster: app.globalData.poster,
      name: app.globalData.name,
      author: app.globalData.author
    })
    //调用应用实例的方法获取全局数据
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        musicStatus: true
      })
      console.log('播放开始');
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        musicStatus: false
      })
      console.log('播放暂停');
    })
    wx.onBackgroundAudioStop(function () {
      that.setData({
        musicStatus: false
      })
      console.log('播放结束');
      wx.playBackgroundAudio({
        dataUrl: app.globalData.url
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
  onShow: function () {
    var that = this;
    that.setData({
      id: app.globalData.id,
      poster: app.globalData.poster,
      name: app.globalData.name,
      author: app.globalData.author
    })
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res.status);
        var _status = res.status;
        if (_status == 1) {
          that.setData({
            musicStatus: true
          })
          return
        }
        that.setData({
          musicStatus: false
        })
      },
      fail: function () {
        console.log('onShow失败');
        that.setData({
          musicStatus: false
        })
      }
    })
  },
  data: {
    id: '',
    poster: '',
    name: '',
    author: '',
    musicStatus: false
  },
  audioControl: function () {
    var that = this;
    var status = that.data.musicStatus;
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log('成功背景音乐信息');
        var _status = res.status;
        console.log(_status);
        if (_status == 1) {
          console.log('暂停背景音乐信息');
          wx.pauseBackgroundAudio();
          that.setData({
            musicStatus: !that.data.musicStatus
          })
        } else if (_status == 0){
          wx.playBackgroundAudio({
            dataUrl: app.globalData.url
          })
          console.log('继续播放背景音乐信息');
          that.setData({
            musicStatus: !that.data.musicStatus
          })
        } else {
          app.playMusic(that.data.id);
          wx.showLoading({
            title: '缓冲中',
            mask: true,
            duration: 1000
          });
          console.log('没有播放背景音乐信息');
        }
      },
      fail: function () {
        console.log('获取背景音乐信息失败');
        app.playMusic(that.data.id);
        that.setData({
          musicStatus: !that.data.musicStatus
        })
      },
      complete: function () {
        console.log('complete获取背景音乐信息结束');
      }
    })
  }
})
