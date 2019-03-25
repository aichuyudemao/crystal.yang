// miniprogram/pages/index/index.js
const app = getApp()
 import getCard from '../../utils/getCardInfo.js'
var urlRequest = require('../../basicUrl.js')
var template = require('../../template/template.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    EmployeeName:'',
    phone:'',
    BuildingName:'',
    RoomName:'',
    nCardStatusID:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(){
    getCard.getCardInfo({ PrjID: wx.getStorageSync("PrjID"), EmployeeID: wx.getStorageSync("EmployeeID")},(res)=>{
      this.setData({
        EmployeeName: res.EmployeeName,
        phone: wx.getStorageSync("phone"),
        BuildingName: res.BuildingName,
        RoomName: res.RoomName,
        nCardStatusID: res.nCardStatusID,
      });
    });
    app.globalData.Index = 1;
    template.tabbar("tabBar", app.globalData.Index, this)//1表示第二个tabbar
  },
  /*选择图片*/
  chooseImg: function(){
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
       /* // 限制最多只能留下3张照片
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        $digest(this)*/
      }
    });
  },
  /*编辑资料*/
  userEdit:function(){
    wx.navigateTo({
      url: '/pages/userEdit/userEdit'
    })
  },
  /*修改密码*/
  pwdEdit: function () {
    wx.navigateTo({
      url: '/pages/pwdEdit/pwdEdit'
    })
  },
  /*楼道选择*/
  build: function () {
    wx.navigateTo({
      url: '/pages/build/build'
    })
  },
  /*房间选择*/
  room: function () {
    wx.navigateTo({
      url: '/pages/room/room'
    })
  },
  /*退出登录*/
  loginOut: function () {
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },
  cancelBind:function(){
    if (this.data.nCardStatusID=="0"){
      wx.showModal({
        content: '是否确认取消绑定？',
        success(res) {
          if (res.confirm) {
            var message = {
              TelPhone: wx.getStorageSync("phone"),
            }
            urlRequest.utilGet("stuApp/cancelBinding.action", message, function (res) {
              if (res.data.success == "true") {
                wx.setStorage({
                  key: 'EmployeeID',
                  data: 0
                });
                wx.reLaunch({
                  url: '../index/index'
                })
              }
              urlRequest.toast(res.data.msg);
            })
          }
        }
      })
    }else{
      urlRequest.toast("目前您的卡片为非正常状态，无法解除绑定！");
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