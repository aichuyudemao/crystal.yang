// miniprogram/pages/reissue/reissue.js
var urlRequest = require('../../basicUrl.js')
import getCard from '../../utils/getCardInfo.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CardID:'',
    EmployeeName:'',
    Sex:'',
    Identifier:'',
    BuildingName:'',
    RoomName:'',
    reissue:true,
    password: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取卡片数据
    getCard.getCardInfo({ PrjID: wx.getStorageSync("PrjID"), EmployeeID: wx.getStorageSync("EmployeeID")}, (res) => {
      this.setData({
        CardID: res.CardID,
        EmployeeName: res.EmployeeName,
        Sex: res.Sex==1?"男":"女",
        Identifier: res.Identifier,
        BuildingName: res.BuildingName,
        RoomName: res.RoomName,
      });
    });
  },
  reissue: function () {
    //提示
    urlRequest.toast('补卡后原卡将无法使用请谨慎补卡！');
    this.setData({
      reissue: !this.data.reissue
    });
  },
  /*取消*/
  cancel: function () {
    this.setData({
      reissue: true,
      value: ""
    });
  },
  /*确认*/
  confirm: function () {
    //校验登录
    var message = {
      TelPhone: wx.getStorageSync("phone"),
      logPwd: this.data.password
    }
    urlRequest.utilGet("stuApp/studentLogin.action", message, (res) => {
        if (res.data.success == "true") {
          let prams = {
            PrjID: wx.getStorageSync("PrjID"),
            EmployeeID: wx.getStorageSync("EmployeeID"),
          };
          //补卡
          urlRequest.utilGet("stuApp/autoReMakeCard.action", prams, (res) => {
            if (res.data.success == "true") {
              //补卡请求成功
              this.setData({
                reissue: true,
                password: '',
              });
              wx.redirectTo({
                url: '../index/index',
              })
            }
            this.setData({
              reissue: true,
              password: '',
            });
            urlRequest.toast(res.data.msg);
          });

        }
        this.setData({
          reissue: true,
          password: '',
        });
        urlRequest.toast(res.data.msg);
    });
  },
  bindblur: function (e) {
    this.setData({
      password: e.detail.value,
    });
  },
  submitInfo(){

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