//初始化数据
const app = getApp();
// const url = app.data.url;
function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/index/index",
      "icon": "icon-index",
      "text": "亚都校园"
    },
    {
      "current": 0,
      "pagePath": "/pages/my/my",
      "icon": "icon-my",
      "text": "我的"
    },
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  // otabbar['2']['qpNum'] = app.globalData.qpNum > 0 ? app.globalData.qpNum:'';
  bindData[bindName] = otabbar,
    that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}