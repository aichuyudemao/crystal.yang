// miniprogram/pages/recharge/recharge.js
var urlRequest = require('../../basicUrl.js')
import getCard from '../../utils/getCardInfo.js'
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    text:"其他金额",
    hiddenmodalput: true,
    value:'',
    CardID:'',
    EmployeeName:'',
    nCardValue:'',
    AccountMoney:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取卡片数据
    getCard.getCardInfo({ PrjID: wx.getStorageSync("PrjID"), EmployeeID: wx.getStorageSync("EmployeeID") }, (res) => {
      this.setData({
        CardID: res.CardID,
        EmployeeName: res.EmployeeName,
        nCardValue: res.nCardValue,
        AccountMoney: res.AccountMoney
      });
    });
  },
  changeOil: function (e) {
    this.setData({
      num: e.target.dataset.num
    });
    if (e.target.dataset.num==6){
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      });
    }
  },
  /*取消*/
  cancel:function(){
    this.setData({
      text:'其他金额',
      hiddenmodalput: true,
      value:""
    });
  },
  /*确认*/
  confirm:function(){
    this.setData({
      hiddenmodalput: true
    });
  },
  bindblur: function (e) {
    var money = e.detail.value;
    money = parseFloat(money).toString();
    if (money.indexOf(".") == 0){//.=>0.
      money = money.replace(/./, "0.");
    }
    money = money.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");//只允许存在一个.
    money = money.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两位小数
    this.setData({
      text: money+"元",
      value: parseFloat(money)
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