// 请求
var app=getApp();
const urlServer = app.globalData.urlH
var utilPost=function(url,data,callback){
  wx.request({
    url: urlServer + url,
    method: "POST",
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
    },
    success(res) {
      callback(res);
    }
  });
}
var utilGet = function (url, data, callback) {
  wx.request({
    url: urlServer + url,
    method: "GET",
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
    },
    success(res) {
      callback(res);
    }
  });
}
var toast=function(title){
  wx.showToast({
    title: title,
    icon: "none",
    duration: 2000
  })
}
module.exports = {
  utilPost,
  utilGet,
  toast
}