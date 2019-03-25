// miniprogram/pages/loss/loss.js
import getCard from '../../utils/getCardInfo.js'
var urlRequest = require('../../basicUrl.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loss:true,
    CardID:null,
    EmployeeName:null,
    nCardStatusID:null,
    nCardValue:null,
    AccountMoney:null,
    password:"",
    flag:true,
    action:'挂失',
    actionNum:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载卡号基本信息
    getCard.getCardInfo({ PrjID: wx.getStorageSync("PrjID"), EmployeeID: wx.getStorageSync("EmployeeID") }, (res) => {
      this.setData({
        CardID: res.CardID,
        EmployeeName: res.EmployeeName,
        nCardStatusID: getCard.stuatTrans(res.nCardStatusID),
        nCardValue: res.nCardValue,
        AccountMoney: res.AccountMoney
      });
      if (res.nCardStatusID==1){
        this.setData({
          action:'解挂',
          actionNum:0,
        });
      }else{
        this.setData({
          action: '挂失',
          actionNum: 1,
        });
      }
    });

  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  loss:function(){
    this.setData({
      loss: !this.data.loss
    });
  },
  /*取消*/
  cancel: function () {
    this.setData({
      loss: true,
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
    if (message.TelPhone == null || message.TelPhone == undefined || message.TelPhone == ""){
      this.setData({
        flag:false,
      });
      urlRequest.toast("手机号找不到啦！");
    }else{
      this.setData({
        flag: true,
      });
    }
    if (message.logPwd == null || message.logPwd == undefined || message.logPwd == "") {
      this.setData({
        flag: false,
      });
      urlRequest.toast("密码尚未填写！");
    }else{
      this.setData({
        flag: true,
      });
    }
    if(this.data.flag){
      urlRequest.utilGet("stuApp/studentLogin.action", message, (res) => {
        if (res.data.success == "true") {
          let prams = {
            PrjID: wx.getStorageSync("PrjID"),
            EmployeeID: wx.getStorageSync("EmployeeID"),
            intStatus: this.data.actionNum,
          };
          //挂失与解挂
          urlRequest.utilGet("stuApp/studentLostAndUnLostCard.action", prams, (res) => {
            if (res.data.success == "true") {
              //挂失与解挂请求成功
              this.setData({
                loss: true,
                password:'',
              });
              wx.redirectTo({
                url: '../index/index',
              })
            }
            this.setData({
              loss: true,
              password: '',
            });
            urlRequest.toast(res.data.msg);
          });

        }
        this.setData({
          loss: true,
          password: '',
        });
        urlRequest.toast(res.data.msg);
      });

    }
  },
  bindblur: function (e) {
    this.setData({
      password: e.detail.value,
    });
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