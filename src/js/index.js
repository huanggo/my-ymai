// window.onload = function() {
//   var btnSrch = document.querySelector('#btnSrch');
//   var startTime;
//   btnSrch.addEventListener('click', function(e) {
//     console.log('click');
//     var diffTime = Date.now() - startTime;
//     console.log(diffTime);
//   });
//   btnSrch.addEventListener('touchstart', function(e) {
//     console.log('touchstart');
//     startTime = Date.now();
//   });
//   btnSrch.addEventListener('touchmove', function(e) {
//     console.log('touchmove');
//   });
//   btnSrch.addEventListener('touchend', function(e) {
//     console.log('touchend');
//   });

//   var box = document.querySelector('.box');
//   box.addEventListener('touchstart', function(e) {
//     console.log('touchstart')
//     console.dir(e); // 打印事件对象（触碰事件）
//   })
//   box.addEventListener('touchmove', function(e) {
//     // console.log('touchmove')
//   })
//   box.addEventListener('touchend', function(e) {
//     // console.log('touchend')
//   })
// };

// zepto.js 也有页面加载完成事件。
// $(function() {
//   $('.box').on('tap singleTap doubleTap longTap', function(e) {
//     console.log(e.type);
//   });
//   $('.box').on('swipe swipeUp swipeDown swipeLeft swipeRight', function(e) {
//     console.log(e.type);
//   });
// });

var timer,  // 时钟的id
    timerIndex = -1, // 时钟索引
    // 存放主时钟的回调函数。
    timerFnArray = [];

// 页面加载完成的事件
$(function() {
  // 绑定搜索按钮的初始化的事件
  $('#btnSrch').on('tap', function(e) {
    // 第一步： 获取搜索文本框的文本
    var txt = $('#srchTxt').val() || "老马前端";
    // 第二步：页面跳转到搜索页面，并把参数传递给搜索页面
    window.location.href = '../srch.html?kw=' + txt;
  });

  // 初始化轮播图的代码
  initBannerSwiper();

  // 注册时钟的回调函数。
  timerFnArray.push(updateMSTimer);

  // 初始化页面主时钟并启动
  timer = setInterval(function() {
    timerIndex += 1;
    timerIndex = timerIndex % 100; 
    // 执行页面中所有需要注册时钟执行的函数。
    for(var i = 0; i < timerFnArray.length; i++) {
      timerFnArray[i](); // 调用数组中的每个回调函数执行。
    }
  }, 200);
});

// 页面卸载之前清除时钟。
window.onunload = function() {
  clearInterval(timer);
}

// 更新当前时间与秒杀结束事件差的span标签，数字。
function updateMSTimer() {
  // 每秒中去更新页面中的时间。
  if(timerIndex % 5 != 0) {
    return;
  }
  // 满一秒钟
  // 计算时间差，并更新到页面的span中去
  var endDate = new Date(loadData.ms.endTimer);
  // ['2', '2', '1','1', '0','9']
  var strArr = getHouersMinutesSecondsByMS(endDate - Date.now());
  // 把时钟变换字符串更新到span标签
  $('#msTimerBox .timer-num').each(function(index, item) {
    // $(item).text(strArr[index]);
    item.innerHTML = strArr ? strArr[index] : '-';
  });
}

// 初始化轮播图的代码
function initBannerSwiper() {
  var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical',
    loop: true,
    autoplay: true,
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // }
  });       
}


// 测试我们的common.js中的js中的getHouersMinutesSecondsByMS 
// var t = getHouersMinutesSecondsByMS(40034000);
// console.log(t);
