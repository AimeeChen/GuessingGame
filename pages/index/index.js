//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isGoingAuto:true,
    winNum:0,
    indexAi:0,
    imgAi:'/pages/image/bu.png',
    imgUser:'/pages/image/wenhao.png',
    resultDescription:'',
    srcs:[
      '/pages/image/bu.png',
      '/pages/image/jiandao.png',
      '/pages/image/shitou.png'
    ],
    timer:'',
  },

  onLoad: function (options) {
    this.timerGo();
    var num = wx.getStorageSync('winNum')
    if (num == null)
      num = 0;
    this.setData({ winNum: num})
    console.log(this.data.winNum);
  },
  
  changeForChoose(e) {
    var t = this.data.timer;
    if (t != null && t != '') {
      clearInterval(t);
      this.setData({ timer: '' })
    } else {
      return;
    }

    var indexUser = e.target.id
    this.setData({ imgUser: this.data.srcs[indexUser] })

    
    var num = this.data.winNum
    var user = this.data.imgUser
    var ai = this.data.imgAi

    if (user == ai) {
      this.setData({ resultDescription: '平局'});
    } else if (user == '/pages/image/bu.png' && ai == '/pages/image/jiandao.png') {
      this.setData({ resultDescription: '你输了' });
    } else if (user == '/pages/image/jiandao.png' && ai == '/pages/image/shitou.png') {
      this.setData({ resultDescription: '你输了' });
    } else if (user == '/pages/image/shitou.png' && ai == '/pages/image/bu.png') {
      this.setData({ resultDescription: '你输了' });
    } else {
      num++;
      this.setData({ resultDescription: '你赢了' });
      this.setData({ winNum: num})
      wx.setStorageSync('winNum', num)
    }
  },

  timerGo: function() {
    let that = this;
    var interval = setInterval(function () {
      // 获取 [0, 3) 随机数
      var random = Math.floor(Math.random() * 3);
      that.setData({ indexAi: random })
      that.setData({ imgAi: that.data.srcs[random]})
    }, 150)
    that.setData({ timer : interval})
  },

  again: function() {
    if (this.data.timer == null || this.data.timer == '')
      this.timerGo();
  }
})
