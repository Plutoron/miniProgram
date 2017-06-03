//search.js
//获取应用实例
var app = getApp()
Page({
  onLoad: function () {
    //调用应用实例的方法获取全局数据
    var that =this;
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    }),
    console.log(this.data.userInfo);
  },
  onReady: function (e) {
    
  },
  onShow: function () {
   
  },
  data: {
    array: ['单曲', '专辑', '歌单', '主播电台'],
    objectArray: [
      {
        id: 0,
        name: '单曲',
        val: '1'
      },
      {
        id: 1,
        name: '专辑',
        val: '10'
      },
      {
        id: 2,
        name: '歌单',
        val: '1000'
      },
      {
        id: 3,
        name: '主播电台',
        val: '1009'
      }
    ],
    index: 0,
    inputShowed: false,
    inputVal: ""
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
    this.setData({
      inputVal: e.detail.value
    });
  },
  bindPickerChange: function (e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})
