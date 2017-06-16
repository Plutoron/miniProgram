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
    this.setData({
      isTourist: app.globalData.isTourist,
      myList: app.globalData.userList
    })
  },
  onReady: function (e) {
    
  },
  onShow: function () {
    console.log(this.data.userInfo);
    this.setData({
      myList: app.globalData.userList
    })
    console.log(this.data.myList);
  },
  data: {
    userInfo: '',
    isTourist: false,
    tourist: '../../img/tourist.png',
    code: '',
    myList: []
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
        title: '从我的歌单中删除吗',
        success: function (res) {
          if (res.confirm) {
            that.data.myList.forEach((v,i,a) => {
              if(v.id == data.id){
                console.log('删除完成')
                a.splice(i, 1);
                that.setData({
                  myList: a
                })
                app.setUserList(a);
                if (app.globalData.isTourist) 
                {
                  console.log('游客');
                  return;
                }
                console.log('不是游客');
                app.delFromMyList(data);
                return;
              }
            })
            console.log(typeof that.data.myList[0]);
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
