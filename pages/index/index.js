//index.js
//获取应用实例
var app = getApp()
Page({
  onLoad: function () {
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
          id: data[0].id,
          poster: data[0].poster,
          name: data[0].name,
          author: data[0].author,
        })
        wx.request({
          url: 'https://suyunlong.top/mini/getUrl',
          data: {
            'id': data[0].id
          },
          success: function (res) {
            console.log('res.data');
            console.log(res.data);
            app.globalData.url = res.data;
          }
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
  onPullDownRefresh() {
    var that = this;
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
      },
      complete: function () {
        console.log('下拉完');
        wx.hideLoading();
        that.setData({
          pull: true,
          loading: false,
          end: false,
          page: 2
        })
      }
    })
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
        data = res.data;
        _maxPage = data.pop();
        that.setData({
          pull: false,
          loading: true
        })
        if(data == 'noMore'){
          return;
        }
        that.setData({
          page: that.data.page + 1
        })
        that.setData({
          maxPage: _maxPage.maxPage,
          tracks: that.data.tracks.concat(data)
        })
      },
      complete: function () {
        that.setData({
          pull: true,
          loading: false
        })
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
      app.playMusic(data.id,data);
    }else {
      console.log('longtab');
    }
  },
  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
  }
})
