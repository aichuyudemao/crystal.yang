var urlRequest = require('../basicUrl.js');
var getCardInfo = function (prams, callback){
  var message = {
    PrjID: prams.PrjID,
    EmployeeID: prams.EmployeeID,
  }
  urlRequest.utilGet("stuApp/getCardInfo.action", message, function (res) {
    if (res.data.success == "true") {
      callback(res.data);
    }
    urlRequest.toast(res.data.msg);
  });
}
var stuatTrans=function(prams){
  switch (prams) {
    case 0:
      return "正常";
      break;
    case 1:
      return "挂失";
      break;
    case 2:
      return "退卡";
      break;
    case 3:
      return "无卡";
      break;
    case 4:
      return "无卡销户";
      break;
    case 5:
      return "补卡";
      break;
    case 6:
      return "发卡";
      break;
    default:
      return "未知状态";
  }
}
module.exports = {
  getCardInfo,
  stuatTrans,
}