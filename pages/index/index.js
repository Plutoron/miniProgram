//index.js
//获取应用实例
var app = getApp()
Page({
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    wx.showLoading({
      title: '加载列表中',
    })
    wx.request({
      url: 'https://suyunlong.top/mini/baselist', //仅为示例，并非真实的接口地址
      data: {
        page: '1'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        that.setData({
          tracks: data
        })
        app.setGlobalData({
          poster: data[0].poster,
          name: data[0].name,
          author: data[0].author,
          url: data[0].url
        })
      },
      complete: function () {
        wx.hideLoading();
        that.setData({
           pull: true
        })
      }
    })
  },
  onShow: function () {
    
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    // this.audioCtx = wx.createAudioContext('myAudio'); 
  },
  onReachBottom: function () {
    console.log('底部');
    var that = this;
    var data = '';
    var _maxPage = '';
    //判断数据是否加载完毕
    if(this.data.page > this.data.maxPage){
      console.log('页数过大');
      that.setData({
        pull: false,
        loading: false,
        end: true
      })
      return;
    }
    //判断当前是否是loading状态
    if(this.data.loading) return;
    wx.request({
      url: 'https://suyunlong.top/mini/baselist', //仅为示例，并非真实的接口地址
      data: {
        page: that.data.page
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('page: ' + that.data.page)
        data = res.data;
        _maxPage = data.pop();
        that.setData({
          pull: false,
          loading: true
        })
        if(data == 'noMore'){
          console.log('isnoMore');
          return;
        }
        that.setData({
          page: that.data.page + 1
        })
        that.setData({
          maxPage: _maxPage.maxPage,
          tracks: that.data.tracks.concat(data)
        })

        that.setData({
          pull: true,
          loading: false
        })
      },
      complete: function () {
        console.log('page: ' + that.data.page)
      }
    })
  },
  data: {
      pull: false,
      loading: false,
      end: false,
      maxPage: 1000,
      userInfo: '',
      tracks: '',
      page: 2
  },
  play: function (e) {
    if (this.endTime - this.startTime < 350) {
      var data = e.currentTarget.dataset;
      console.log(data);
      app.setGlobalData(data);
      app.playMusic();
    }else {
      console.log('longtab');
    }
  },
  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
    console.log('start' + this.startTime);
  },
  bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
    console.log('end' + this.endTime);
  }
})
