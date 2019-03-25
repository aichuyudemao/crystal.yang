// miniprogram/pages/userEdit/userEdit.js
import getCard from '../../utils/getCardInfo.js'
var urlRequest = require('../../basicUrl.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    EmployeeName:'',
    SexID:'',
    Identifier:'',
    check:true,
    flag:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取基本信息
    getCard.getCardInfo({ PrjID: wx.getStorageSync("PrjID"), EmployeeID: wx.getStorageSync("EmployeeID") }, (res) => {
      this.setData({
        EmployeeName: res.EmployeeName,
        SexID: res.SexID,
        Identifier: res.Identifier
      });
      if (this.data.SexID == "1") {
        this.setData({
          check: true
        })
      } else {
        this.setData({
          check: false
        })
      }
    });
    
  },
  radioChange:function(e){
    this.setData({
      SexID: e.detail.value
    })
  },
  EmployeeName:function(e){
    this.setData({
      EmployeeName: e.detail.value
    })
  },
  Identifier:function(e){
    this.setData({
      Identifier: e.detail.value
    })
  },
  //提交信息
  submitInfo:function(){
    //校验必填
    if (this.data.EmployeeName == null || this.data.EmployeeName == undefined || this.data.EmployeeName == ""){
      this.setData({
        flag: false,
      })
      urlRequest.toast("姓名尚未填写！");
    }else{
      this.setData({
        flag: true,
      })
    }
    if (this.data.Identifier == null || this.data.Identifier == undefined || this.data.Identifier == "") {
      this.setData({
        flag: false,
      })
      urlRequest.toast("身份证尚未填写！");
    } else {
      this.setData({
        flag: true,
      })
    }

    if (this.data.flag){
      var message = {
        PrjID: wx.getStorageSync("PrjID"),
        EmployeeID: wx.getStorageSync("EmployeeID"),
        EmployeeName: this.data.EmployeeName,
        SexID: this.data.SexID,
        Identifier: this.data.Identifier
      }
      urlRequest.utilGet("stuApp/editStuInfo.action", message, function (res) {
        if (res.data.success == "true") {
          wx.redirectTo({
            url: '../my/my',
          })
        }
        urlRequest.toast(res.data.msg);
      });
    }
    
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