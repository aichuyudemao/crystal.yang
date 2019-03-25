// pages/login/login.js
import WxValidate from '../../utils/WxValidate.js'
var Validate = ""
const app = getApp();
var urlRequest = require('../../basicUrl.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化创建表单
    this.initValidate();
  },
  //表单提交校验
  submitForm(e) {
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.submitInfo();
  },
  submitInfo(){
    var message = {
      TelPhone: this.data.phone,
      logPwd: this.data.password
    }
    urlRequest.utilGet("stuApp/studentLogin.action", message, function (res) {
      if (res.data.success == "true") {
        //电话存入全局
        app.globalData.phone = message.TelPhone;
        wx.setStorageSync("phone", message.TelPhone);
        //prjID存入全局
        app.globalData.PrjID = res.data.PrjID;
        wx.setStorageSync("PrjID", res.data.PrjID);
        //EmployeeID存入全局
        app.globalData.EmployeeID = res.data.EmployeeID;
        wx.setStorageSync("EmployeeID", res.data.EmployeeID);
        wx.redirectTo({
          url: '../index/index',
        })
      }
      urlRequest.toast(res.data.msg);
    });
  },
  getVerificationCode: function() {

  },
  // 输入手机号
  phone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 输入密码
  password: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  
  // 表单验证
  initValidate() {
    const rules = {

      phone: {
        required: true,
        tel: true
      },
      password: {
        required: true,
        rangelength: [6, 6]
      }
    }

    const messages = {

      phone: {
        required: '请输入手机号码',
        tel: '请输入正确的手机号码',
      },
      password: {
        required: '请输入密码',
        rangelength: '请输入6位数字密码'
      }
    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})