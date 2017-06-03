//index.js
//获取应用实例
var app = getApp()
Page({
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    }),
    wx.request({
      url: 'https://api.imjad.cn/cloudmusic/', //仅为示例，并非真实的接口地址
      data: {
        type: 'playlist',
        id: '507182467'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        that.setData({
          tracks: data.playlist.tracks
        })
        that.tracks = data.playlist.tracks;
        wx.request({
          url: 'https://api.imjad.cn/cloudmusic/', //仅为示例，并非真实的接口地址
          data: {
            type: 'song',
            id: that.tracks[0].id
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var _src = res.data.data[0].url;
            app.setGlobalData({
              poster: that.tracks[0].al.picUrl,
              name: that.tracks[0].name,
              author: that.tracks[0].ar[0].name,
              src: _src
            });
          }
        })
      }
    })
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    // this.audioCtx = wx.createAudioContext('myAudio'); 
  },
  data: {
  
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
        if(_src == null){
          wx.showToast({
            title: '因版权问题，暂时不能播放，抱歉',
            icon: 'loading',
            duration: 3000,
            mask: true
          });
          return;
        }
        app.setGlobalData({
          poster: dataset.poster,
          name: dataset.name,
          author: dataset.author,
          src: _src
        });
        app.playMusic();
      },
      complete: function (res) {
      }
    });
  }
})
