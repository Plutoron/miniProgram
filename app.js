//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this;
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },
  onShow: function () {
    var that = this;
    wx.login({
      success: function (e) {
        console.log('调用成功');
        let code = e.code;
        let userInfo = null;
        that.globalData.code = code;
        console.log(that.globalData.code);
        wx.getUserInfo({
          success: function (res) {
            console.log('获取数据成功');
            userInfo = res.userInfo;
            that.globalData.userInfo = userInfo;
          },
          fail: function () {
            console.log('获取数据失败');
            userInfo = {
              nickName: '游客',
              city: 'yours'
            };
            that.globalData.userInfo = userInfo;
          },
          complete: function () {
            console.log('获取数据完成');
            that.postUserInfo(code, userInfo);
            console.log('code: ');
            console.log(code);
            console.log('userInfo: ');
            console.log(userInfo);
          }
        })
      },
      fail: function () {
        console.log('调用失败');
      },
      complete: function () {
        console.log('调用完成');
      }
    })
  },
  globalData:{
    code: '',
    userInfo:null,
    poster: '',
    name: '',
    author: '',
    url: ''
  },
  postUserInfo: function(code,userInfo) {
    wx.request({
      url: 'https://suyunlong.top/mini/getuserinfo',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        'code': code,
        'nickName': userInfo.nickName,
        'city': userInfo.city
      },
      success: function (res) {
        console.log(res.data);
      },
      fail: function () {
        console.log('post失败');
      },
      complete: function () {
        console.log('post完成');
      }
    })
  },
  setGlobalData: function(obj){
    this.globalData.poster = obj.poster;
    this.globalData.name = obj.name;
    this.globalData.author = obj.author;
    this.globalData.url = obj.url;
    console.log('设置url');
    console.log(obj.url);
    console.log(this.globalData.url);
  },
  playMusic: function () {
    var that = this; 
    console.log('play');
    console.log(this.globalData.url);
    wx.playBackgroundAudio({
      dataUrl: that.globalData.url,
      title: that.globalData.name,
      coverImgUrl: that.globalData.poster
    })
    console.log('播放'); 
  }
})