//index.js
//获取应用实例
var app = getApp()
Page({
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
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
        app.setGlobalData({
          poster: that.tracks[0].al.picUrl,
          name: that.tracks[0].name,
          author: that.tracks[0].ar[0].name,
          src: ''
        });
      }
    })
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    // this.audioCtx = wx.createAudioContext('myAudio'); 
 
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
    },
    setSrc: function (event) {
     // console.log(event.currentTarget.dataset);
     // console.log(this.src)
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
          that.setData({
            poster: dataset.poster,
            name: dataset.name,
            author: dataset.author,
            src: _src
          });
          app.setGlobalData({
            poster: dataset.poster,
            name: dataset.name,
            author: dataset.author,
            src: _src
          });
          wx.playBackgroundAudio({
            dataUrl: _src,
            title: dataset.name,
            coverImgUrl: dataset.poster
          }) 
          console.log('submit success');
          console.log(app.globalData);
        },
        complete: function (res) {
          console.log('submit complete');
          console.log(that.src);
          console.log(that.audioCtx);
        }
      });
    }
    // openToast: function () {
    //   wx.showToast({
    //     title: '已完成',
    //     icon: 'success',
    //     duration: 3000
    //   });
    // }
})
