---
layout: post
title: 检测移动设备及鼠标/触摸事件兼容
---

**MAC触摸板也支持touch，加入了区分判断**

```javascript
(function () {
    // IOS desktop has touch events, make them busting
    var hasTouch = !!(('ontouchstart' in global && !/Mac OS X /.test(global.navigator.userAgent)) || global.DocumentTouch && document instanceof global.DocumentTouch);
    return {
        hasTouch: hasTouch,
        startEvt: hasTouch ? 'touchstart' : 'mousedown',
        moveEvt: hasTouch ? 'touchmove' : 'mousemove',
        endEvt: hasTouch ? 'touchend' : 'mouseup',
        cancelEvt: hasTouch ? 'touchcancel' : 'mouseout',
        resizeEvt: 'onorientationchange' in global ? 'orientationchange' : 'resize'
    };
})();
```