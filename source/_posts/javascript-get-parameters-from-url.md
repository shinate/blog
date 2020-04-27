---
layout: post
title: Javascript从url中获取参数
date: 2010-11-17 15:09:36 +0800
categories:
- 研发之路
- 前端
tags:
- javascript
- 正则
---

有时我们需要在客户端获取链接参数，一个常见的方法是将链接当做字符串，按照链接的格式分解，然后获取对应的参数值。

## 字符串拆分

```javascript
function getQueryString(name) {
    if (location.href.indexOf("?") == -1 || location.href.indexOf(name + '=') == -1) {
        return '';
    }
    var queryString = location.href.substring(location.href.indexOf("?") + 1);
    var parameters = queryString.split("&");
    var pos, paraName, paraValue;
    for (var i = 0; i < parameters.length; i++) {
        pos = parameters[i].indexOf('=');
        if (pos == -1) continue;
        paraName = parameters[i].substring(0, pos);
        paraValue = parameters[i].substring(pos + 1);
        if (paraName == name) {
            return unescape(paraValue.replace(/\+/g, " "));
        }
    }
    return '';
};
// http://localhost/test.html?aa=bb&test=cc+dd&ee=ff
alert(getQueryString('test'));
```

## 使用正则

```javascript
function getQueryStringRegExp(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    return (reg.test(location.href)) ? unescape(RegExp.$2.replace(/\+/g, " ")) : "";
};
// http://localhost/test.html?aa=bb&test=cc+dd&ee=ff
alert(getQueryStringRegExp('test'));
```