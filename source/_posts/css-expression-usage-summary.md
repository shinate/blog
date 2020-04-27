---
layout: post
status: publish
published: true
title: CSS Expression（动态属性）用法总结
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 482
wordpress_url: http://codante.org/?p=482
date: '2011-02-11 09:28:41 +0800'
date_gmt: '2011-02-11 01:28:41 +0800'
---

## CSS Expression

动态 css属性，ie 私有，从5.0开始引入（IE8 不支持），参考 [MSDN][0]。一般只用在IE6的hack。

### 优点

css属性动态生成，所以基本 js 能做的它都能做。选择器用的是 css的，比 js 方便得多。

### 缺点

expression 会反复执行，有严重的效率问题。触发方式并不是通过事件，类似于js中的 interval 。

## 实例

### 背景闪烁

IE6的背景闪烁Bug Fix

```css
body {
zoom: expression(function(el){
document.execCommand('BackgroundImageCache', false, true);
el.style.zoom = '1';
}(this));
}
```

### input样式

给不同 type 的 input 赋予不同的样式

```css
input {
zoom: expression(function(el){
    el.style.zoom = "1";
    el.className ? el.className+=" "+el.type : el.className=el.type;
}(this));
}
```

### 隔行换色

zebra lists

```css
.test {
unicode-bidi: expression(function(el){
    el.style.unicodeBidi = "normal";
    var childs = el.getElementsByTagName("li");
    for(var i=0; i
        (i % 2)?childs[i].className+=" even":childs[i].className+=" odd";
    }
}(this));
}
```

### :befor,:after

模拟" :before" 或者 ":after"

```css
.test {
letter-spacing: expression(function(el){
    el.style.letterSpacing = "0";
    var newchild = document.createElement("span");
    newchild.className="after";
    newchild.appendChild(document.createTextNode(" World!"));
    el.appendChild(newchild);
}(this));
}
```

### 图片缩放

模拟图片的：max-width 和 max-height (或 min-width 和 min-height)

```css
.max-width span img {
max-width:120px;
max-height:120px;
zoom:expression(function(el){
    el.style.zoom = "1";
    var resizeImg = function() {
        if (el.width &gt; 120 || el.height &gt; 120) {
            if (el.width &gt; el.height) {
                el.width = "120";
                el.height = el.height * (el.width / 120);
            } else {
                el.height = "120";
                el.width = el.width * (el.height / 120);
            }
        }
    }
    if (el.complete) {
        resizeImg();
    } else {
        el.onload = function() {
            resizeImg();
        }
    }
}(this));
}
```

### IE6的鼠标滑过

a之外元素:hover

```css
.ie6-hover input:hover, .ie6-hover .h {
border:1px solid red;
}
.enable-ie6-hover input {
_zoom:expression(function(el){
    el.style.zoom = "0";
    el.onmouseenter = function() {
        el.className = "h";
    };
    el.onmouseleave = function() {
        el.className = "";
    };
}(this));
}
```

### IE6行高问题

line-height bug

```css
.ie6-line-height-bug { background:\#f2f2f2; line-height:50px; zoom:1; }
.ie6-line-height-bug-fixed input {
_zoom: expression(function(el){
    el.style.zoom = "1";
    var iefixer = document.createElement("b");
    iefixer.style.zoom = 1;
    el.parentNode.insertBefore(iefixer, el);
}(this));
}
```

[0]: http://msdn.microsoft.com/en-us/library/ms537634.aspx