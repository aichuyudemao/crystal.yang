var urlRequest = require('../../basicUrl.js');
import WxValidate from '../../utils/WxValidate.js'
var Validate = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardid:'',
    cardpwd:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化创建表单
    this.initValidate();
  },
  // 输入卡号
  cardid: function (e) {
    this.setData({
      cardid: e.detail.value
    })
  },
  // 输入PIN码
  cardpwd: function (e) {
    this.setData({
      cardpwd: e.detail.value
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
      PrjID: 3,
      TelPhone: wx.getStorageSync("phone"),
      CardID: this.data.cardid,
      CardPwd: this.data.cardpwd,
    }
    urlRequest.utilGet("stuApp/stuBindCard.action", message, function (res) {
      if (res.data.success == "true") {
        wx.setStorage({
          key: 'EmployeeID',
          data: res.data.EmployeeID
        })
        wx.reLaunch({
          url: '../index/index'
        })
      }
      urlRequest.toast(res.data.msg);
    })
  },
  // 表单验证
  initValidate() {
    const rules = {
      cardid: {
        required: true,
      },
      cardpwd: {
        required: true,
      }
    }

    const messages = {
      cardid: {
        required: '请输入卡号',
      },
      cardpwd: {
        required: '请输入PIN码',
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