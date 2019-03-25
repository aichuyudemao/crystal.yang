// pages/regist/regist.js
var urlRequest = require('../../basicUrl.js');
import WxValidate from '../../utils/WxValidate.js'
var Validate = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '获取验证码',
    disabled: false,
    currentTime: 60,
    city:"",
    school:"请选择学校",
    schoolId:"",
    code:"",
    phone:"",
    password:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.school && options.id){
      this.setData({
        school: options.school,
        schoolId: options.id
      })
    };
    // 初始化创建表单
    this.initValidate();
  },
  // 输入手机号
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 输入密码
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  getVerificationCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime;
    that.setData({
      time: currentTime + 's重新发送',
      disabled:true
    })
    var interval = setInterval(function () {
      that.setData({
        time: (currentTime - 1) + 's重新发送',
        disabled: true
      })
      currentTime--;
      if (currentTime <= 0) {
        clearInterval(interval);
        that.setData({
          time: '重新获取',
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
  },
  chooseCity: function () {
    wx.navigateTo({
      url: '/pages/city/city'
    })
  },
  chooseSchool: function () {
    wx.navigateTo({
      url: '/pages/school/school'
    })
  },
  //表单提交校验
  submitForm(e){
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)){
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.submitInfo();
  },
  submitInfo(){
    var message = {
      PrjID: this.data.schoolId,
      TelPhone: this.data.phone,
      logPwd: this.data.password,
    }
    urlRequest.utilGet("stuApp/studentRegedit.action", message, function (res) {
      if (res.data.success == "true") {
        wx.reLaunch({
          url: '../login/login'
        })
      }
      urlRequest.toast(res.data.msg);
    })
  },
  // 表单验证
  initValidate(){
    const rules = {

      phone: {
        required: true,
        tel: true
      },
      code: {
        required: true,
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
      code: {
        required: '请输入验证码',
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})