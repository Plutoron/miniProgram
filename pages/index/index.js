//index.js
//获取应用实例
var app = getApp()
Page({
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
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
        //console.log(that.tracks[0])
      }
    })
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    // this.audioCtx = wx.createAudioContext('myAudio'); 
 
  },
  data: {
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
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
          wx.playBackgroundAudio({
            dataUrl: _src,
            title: dataset.name,
            coverImgUrl: dataset.poster
          }) 
          console.log('submit success');
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
