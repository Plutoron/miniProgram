//mine.js
//获取应用实例
var app = getApp()
Page({
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
      //更新数据
    this.setData({
      userInfo: app.globalData.userInfo
    })
    // wx.request({
    //   url: '', //仅为示例，并非真实的接口地址
    //   data: {
    //     type: 'playlist',
    //     id: '507182467'
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
        
    //   }
    // })\
  },
  onReady: function (e) {
    
  },
  onShow: function () {
    
  },
  data: {
    userInfo: '',
    myList: {}
  }
})
