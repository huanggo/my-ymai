/**
 * 获取url地址参数的方法
 * @param {string} key:参数的名
 * @returns {string} 匹配结果 
 */
function getUrlParam(key) {  
  var reg = new RegExp(key + '=([^&]*)');  
  var results = location.href.match(reg);  
  return results ? results[1] : null;  
}  


/**
 * 根据时间差毫秒数，返回具体的小时、分钟、秒的时间差
 * @param {Number} ms 相隔的毫秒数
 * @returns {Array} 返回时间间隔的数组: ['2', '2', '1', '1', '3', '3' ]
 */
function getHouersMinutesSecondsByMS(ms) {
  ms = + ms;
  ms < 0 ? ms = -1 * ms : ms; // 兼容负数的问题
  if( ms < 0 ) {
    return null;
  }

  // 处理小时
  var hours = parseInt(ms / (1000 * 60 * 60)) % 24;
  var minutes = parseInt(ms / (1000 * 60)) % 60;
  var seconds = parseInt(ms / 1000) % 60;
  var hourStr = ('0'+hours);
  hourStr = hourStr.slice(-2);
  var minutesStr = ('0'+minutes);
  minutesStr = minutesStr.slice(-2);
  var secondsStr = ('0'+seconds);
  secondsStr = secondsStr.slice(-2);

  // var str = "221309"
  var str = hourStr + minutesStr + secondsStr;
  return str.split('');
}
