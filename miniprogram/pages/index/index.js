// miniprogram/pages/index/index.js
const app = getApp()
var template = require('../../template/template.js')
var urlRequest = require('../../basicUrl.js')
import getCard from '../../utils/getCardInfo.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/banner.png',
      '../../images/banner.png'
    ],
    indicatorDots: true,
    indicatorActive:"#e4393c",
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperH: '',//设置高度
    swiperH1: '',//设置轮播图高度
    winWid: '',
    winWid1: '',
    showModal: true,
    routers: [
      {
        tab:'recharge',
        name: '充值',
        url: '/pages/recharge/recharge',
        icon: 'icon-chongzhi',
        color:"#e4393c"
      },{
        tab:'loss',
        name: '挂失',
        url: '/pages/loss/loss',
        icon: 'icon-guashi',
        color: '#e66a39'
      }, {
        tab:'reissue',
        name: '补卡',
        url: '/pages/reissue/reissue',
        icon: 'icon-buka',
        color: '#2183cc'
      },{
        tab: 'handleCard',
        name: '自助领卡',
        url: '/pages/handleCard/handleCard',
        icon: 'icon-banka',
        color: '#52b13c'
      }
    ],
    isBindCard:false,
    phone:null,
    PrjID:null,
    EmployeeID:null,
    nCardStatusIDName:null,
    nCardStatusID: null,
    CardID:null,
    nCardValue:null,
    AccountMoney:null,
  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    //加载缓存中的phone，PrjID，EmployeeID
    this.setData({
      phone: wx.getStorageSync("phone"),
      PrjID: wx.getStorageSync("PrjID"),
      EmployeeID: wx.getStorageSync("EmployeeID")
    });
    if (this.data.EmployeeID != null && this.data.EmployeeID != undefined && this.data.EmployeeID != 0 ){
      //绑定卡了
      this.setData({
        isBindCard: true,
      });
      //获取卡片数据
      getCard.getCardInfo({ PrjID: this.data.PrjID, EmployeeID: this.data.EmployeeID},(res)=>{
        this.setData({
          nCardStatusIDName: getCard.stuatTrans(res.nCardStatusID),
          nCardStatusID: res.nCardStatusID,
          CardID: res.CardID,
          nCardValue: res.nCardValue,
          AccountMoney: res.AccountMoney
        });
        //挂失-解挂
        if (res.nCardStatusID==1){
          this.setData({
            routers: [
              {
                tab: 'recharge',
                name: '充值',
                url: '/pages/recharge/recharge',
                icon: 'icon-chongzhi',
                color: "#e4393c"
              }, {
                tab: 'loss',
                name: '解挂',
                url: '/pages/loss/loss',
                icon: 'icon-guashi',
                color: '#e66a39'
              }, {
                tab: 'reissue',
                name: '补卡',
                url: '/pages/reissue/reissue',
                icon: 'icon-buka',
                color: '#2183cc'
              }, {
                tab: 'handleCard',
                name: '自助领卡',
                url: '/pages/handleCard/handleCard',
                icon: 'icon-banka',
                color: '#52b13c'
              }
            ]
          });
        } else{
          routers: [
            {
              tab: 'recharge',
              name: '充值',
              url: '/pages/recharge/recharge',
              icon: 'icon-chongzhi',
              color: "#e4393c"
            }, {
              tab: 'loss',
              name: '挂失',
              url: '/pages/loss/loss',
              icon: 'icon-guashi',
              color: '#e66a39'
            }, {
              tab: 'reissue',
              name: '补卡',
              url: '/pages/reissue/reissue',
              icon: 'icon-buka',
              color: '#2183cc'
            }, {
              tab: 'handleCard',
              name: '自助领卡',
              url: '/pages/handleCard/handleCard',
              icon: 'icon-banka',
              color: '#52b13c'
            }
          ]
        }
      });
    }
    app.globalData.Index = 0;
    template.tabbar("tabBar", app.globalData.Index, this)//0表示第一个tabbar
  },
  swiperHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw;//等比设置swiper的高度。
    this.setData({
      winWid1: winWid + 'px',//设置高度
      swiperH1: swiperH + 'px',//设置高度
    })
  },
  //跳转功能
  //充值
  recharge(e){
    if(e.target.dataset.isbindcard){
      if (this.data.nCardStatusID==0){
        wx.navigateTo({
          url: e.target.dataset.url,
        })
      }else{
        urlRequest.toast('您目前卡片状态为  ' + getCard.stuatTrans(this.data.nCardStatusID) +'  无法完成此操作！');
      }
      
    }else{
      urlRequest.toast('您尚未绑卡无法完成此操作！');
    }
  },
  //解挂与挂失
  loss(e) {
    if (e.target.dataset.isbindcard) {
      if (this.data.nCardStatusID == 0 || this.data.nCardStatusID == 1) {
        wx.navigateTo({
          url: e.target.dataset.url,
        })
      } else {
        urlRequest.toast('您目前卡片状态为  ' + getCard.stuatTrans(this.data.nCardStatusID) + '  无法完成此操作！');
      }
    } else {
      urlRequest.toast('您尚未绑卡无法完成此操作！');
    }
  },
  //补卡
  reissue(e) {
    if (e.target.dataset.isbindcard) {
      if (this.data.nCardStatusID==1){
        wx.navigateTo({
          url: e.target.dataset.url,
        })
      }else{
        urlRequest.toast('您目前卡片状态为  ' + getCard.stuatTrans(this.data.nCardStatusID) + '  无法完成此操作！');
      }
      
    } else {
      urlRequest.toast('您尚未绑卡无法完成此操作！');
    }
  },
  //自助领卡
  handleCard(e) {
    if (e.target.dataset.isbindcard) {
      wx.navigateTo({
        url: e.target.dataset.url,
      })
    } else {
      urlRequest.toast('您尚未绑卡无法完成此操作！');
    }
  },

  /* 生命周期函数--监听页面初次渲染完成*/
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