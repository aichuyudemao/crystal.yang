// pages/school/school.js
import getPinyin from '../../utils/Convert_Pinyin.js'
var urlRequest = require('../../basicUrl.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //字母排序
    letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    schoolListId: '',
    //下面是城市列表信息，这里只是模拟数据
    schoollist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始话一个数组
    let schoollistArr=[];
    for (var i = 0; i < 26; i++) {
      schoollistArr[i]={
        "letter": String.fromCharCode((65 + i)),
        "data": []
      }
    }
    //获取全部数据
    urlRequest.utilGet("stuApp/getPrjInfo.action","",(res)=>{
      if (res.data.success == "true") {
        res.data.prjList.forEach((value, index)=>{
          var char = getPinyin.pinyin.getFullChars(value.PrjName)[0];
          var arrIndex = char.toLowerCase().charCodeAt(0) - 97;
          schoollistArr[arrIndex].data.push({ "id": value.PrjID, "schoolName": value.PrjName }); 
        });
        this.setData({
          schoollist: schoollistArr
        });
      }
      urlRequest.toast(res.data.msg);
    })
  },
  schoolTap: function (e) {
    const val = e.currentTarget.dataset.val || '',
      types = e.currentTarget.dataset.types || '',
      Index = e.currentTarget.dataset.index || '',
      that = this;
    let school = this.data.schoolSel;
    wx.navigateTo({
      url: '/pages/regist/regist?id=' + val.id +'&school=' + val.schoolName
    })

  },
  // 点击城市字母
  letterTap: function (e) {
    const Item = e.currentTarget.dataset.item;
    this.setData({
      schoolListId: Item
    });
    console.log(this.data.schoolListId);
  },
  search: function (e) {
    let schoollistArr = [];
    for (var i = 0; i < 26; i++) {
      schoollistArr[i] = {
        "letter": String.fromCharCode((65 + i)),
        "data": []
      }
    }
    //获取搜索数据
    urlRequest.utilGet("stuApp/getPrjInfo.action", { PrjName:e.detail.value}, (res) => {
      if (res.data.success == "true") {
        res.data.prjList.forEach((value, index) => {
          var char = getPinyin.pinyin.getFullChars(value.PrjName)[0];
          var arrIndex = char.toLowerCase().charCodeAt(0) - 97;
          schoollistArr[arrIndex].data.push({ "id": value.PrjID, "schoolName": value.PrjName });
        });
        this.setData({
          schoollist: schoollistArr
        });
      }
      urlRequest.toast(res.data.msg);
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