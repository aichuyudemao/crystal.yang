//app.js
App({
  globalData: {
    userInfo: null,
    phone: 0,
    PrjID: 0,
    EmployeeID: 0,
    Index: 0,
    appid: 'wxfabb0bbf41eb991b',
    secret: '5d0bfd90dfd8dbab181ec5f9520234b5',
    urlH:"http://47.96.121.112:10001/"
  },
  onLaunch: function () {
    var that = this
    var user = wx.getStorageSync('user') || {};
    if (!user.openid) {
      wx.login({
        success: function (res) {
          if (res.code) {
            var d = that.globalData;//这里存储了appid、secret、token串  
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({
              url: l,
              data: {},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
              // header: {}, // 设置请求的 header  
              success: function (res) {
                var obj = {};
                obj.openid = res.data.openid;
                obj.session_key = res.data.session_key;
                wx.setStorageSync('user', obj);//存储openid  
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
  }

})
