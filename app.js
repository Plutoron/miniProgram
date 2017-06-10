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
        let code = e.code;
        let userInfo = null;
        that.globalData.code = code;
        wx.getUserInfo({
          success: function (res) {
            userInfo = res.userInfo;
            that.globalData.userInfo = userInfo;
          },
          fail: function () {
            userInfo = {
              nickName: '游客',
              city: 'yours'
            };
            that.globalData.userInfo = userInfo;
          },
          complete: function () {
            that.postUserInfo(code, userInfo);
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
    id: '',
    poster: '',
    name: '',
    author: '',
    url: '',
    userList:[],
    newSong: {} 
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
  getUserSongList: function () {
    wx.request({
      url: 'https://suyunlong.top/',
    })
  },
  setGlobalData: function(obj){
    this.globalData.id = obj.id;
    this.globalData.poster = obj.poster;
    this.globalData.name = obj.name;
    this.globalData.author = obj.author;
  },
  setNewSong: function(data) {
    this.globalData.newSong = data;
    this.globalData.userList.push(data);
    console.log(this.globalData.newSong);
  },
  playMusic: function (id,obj) {
    var that = this; 
    var url = '';
    wx.showLoading({
      title: '缓冲中',
      mask: true
    })
    wx.request({
      url: 'https://suyunlong.top/mini/getUrl',
      data: {
        'id': id
      },
      success: function (res) {
        let _data = res.data;
        url = _data;
        console.log('!url');
        console.log(!url);
        if(!url){
          wx.showLoading({
            title: '因版权问题，暂时无法播放QAQ',
            duration: 1000
          })
          return 
        }
        that.globalData.url = url;
        if(obj){
          console.log('obj存在');
          that.setGlobalData(obj);
        }
        wx.playBackgroundAudio({
          dataUrl: url,
          title: '歌'
        })
        wx.hideLoading();
      },
      complete: function () {
      
      }
    })
  }
})