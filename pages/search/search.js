//search.js
//获取应用实例
var app = getApp()
Page({
  onLoad: function () {
    //调用应用实例的方法获取全局数据
  },
  onShow: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    })
  },
  data: {
    inputShowed: false,
    inputVal: "",
    longtab: false,
    resArray: [],
    target: {}
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    var that = this;
    this.setData({
      inputVal: e.detail.value,
      resArray: []
    });
  },
  getRes: function () {
    var that = this;
    if (this.data.inputVal == ''){
      return;
    }
    wx.showLoading({
      title: '搜索中'
    })
    wx.request({
      url: 'https://suyunlong.top/mini/search',
      data: {
        s: that.data.inputVal,
        limit: 10
      },
      success: function (res) {
          let data = res.data;
          that.setData({
            resArray: data
          })
          wx.hideLoading();
      },
      fail: function () {
        wx.showLoading({
          title: '搜索失败',
          duration: 1000
        })
      },
      complete: function () {
    
      }
     })
  },
  bindPickerChange: function (e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  play: function (e) {
    var that = this;
    var data = e.currentTarget.dataset;
    if (this.endTime - this.startTime < 350) {
      app.playMusic(data.id, data);
    } else {
      console.log('longtab');
      that.setData({
        target: data
      })
      console.log(that.data.target);
      wx.showModal({
        title: '这首还不错，不如添加到我的歌单',
        success: function (res) {
          if (res.confirm) {
            app.setNewSong(data);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
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
