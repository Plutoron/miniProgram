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
    })
  },
  onReady: function (e) {
    
  },
  onShow: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  data: {
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
      title: '搜索中',
    })
    wx.request({
      url: 'https://api.imjad.cn/cloudmusic/',
      data: {
        type: 'search',
        s: that.data.inputVal,
        limit: 8
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resSongs = res.data.result.songs;
        var newArray = [];
        for(var i in resSongs){
          var songName = resSongs[i].name;
          if (songName.length > 15){
            var array = [];
            if (songName.indexOf('（') > -1){
              array = songName.split('（');
            } else if (songName.indexOf('(') > -1){
              array = songName.split('('); 
            } else {
              return;
            }
            songName = array[0];
          }
          newArray.push({
            poster: resSongs[i].al.picUrl,
            name: songName,
            author: resSongs[i].ar[0].name,
            id: resSongs[i].id
          })
        }
        that.setData({
          resArray: newArray
        })
      },
      complete: function () {
        wx.hideLoading();
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
  play: function(e) {
    app.setSrc(e);
    console.log(1);
  }
})
