// miniprogram/pages/pwdEdit/pwdEdit.js
var urlRequest = require('../../basicUrl.js');
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPassword:null,
    newPassword:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化创建表单
    this.initValidate();
  },
  // 输入旧密码
  oldPassword: function (e) {
    this.setData({
      oldPassword: e.detail.value
    })
  },
  // 输入新密码
  newPassword: function (e) {
    this.setData({
      newPassword: e.detail.value
    })
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
  submitInfo() {
    var message = {
      PrjID: wx.getStorageSync("PrjID"),
      EmployeeID: wx.getStorageSync("EmployeeID"),
      TelPhone: wx.getStorageSync("phone"),
      oldLogPwd: this.data.oldPassword,
      newLogPwd: this.data.newPassword
    }
    urlRequest.utilGet("stuApp/modifyPwd.action", message, function (res) {
      if (res.data.success == "true") {
        wx.reLaunch({
          url: '../my/my'
        })
      }
      urlRequest.toast(res.data.msg);
    })
  },
  // 表单验证
  initValidate() {
    const rules = {
      oldPassword: {
        required: true,
        rangelength: [6, 6]
      },
      newPassword: {
        required: true,
        rangelength: [6, 6]
      }
    }

    const messages = {

      oldPassword: {
        required: '请输入旧密码',
        rangelength: '请输入6位数字密码',
      },
      newPassword: {
        required: '请输入新密码',
        rangelength: '请输入6位数字密码',
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