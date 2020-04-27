---
layout: post
title: Javascript在IE和Firefox下的兼容性问题整理
date: 2011-02-28 16:23:26 +0800
categories:
- 研发之路
- 前端
tags:
- javascript
- html
---

**在现代浏览器已经基本普及的今天，这些问题只能当做美好的回忆来看看了~ modified at 2018**

Javascript的IE和Firefox兼容性问题集合

## 表单

```document.formName.item("itemName")```

- IE：可以使用```document.formName.item("itemName")```或```document.formName.elements["elementName"]```
- Firefox：只能使用```document.formName.elements["elementName"]```

**解决方法：**统一使用```document.formName.elements["elementName"]```

## 集合类对象

- IE：可以使用()或[]获取集合类对象;
- Firefox：只能使用[]获取集合类对象.

**解决方法：**统一使用[]获取集合类对象.

## 自定义属性

- IE：可以使用获取常规属性的方法来获取自定义属性，也可以使用getAttribute()获取自定义属性
- Firefox：只能使用getAttribute()获取自定义属性.

**解决方法：**统一通过getAttribute()获取自定义属性.

## 元素获取

```eval("idName")```

- IE：可以使用```eval("idName")```或```getElementById("idName")```来取得id为idName的HTML对象;
- Firefox：只能使用```getElementById("idName")```来取得id为idName的HTML对象。
**解决方法：**统一用```getElementById("idName")```来取得id为idName的HTML对象。

## 命名重复

变量名与某HTML对象ID相同的问题

- IE：HTML对象的ID可以作为document的下属对象变量名直接使用，Firefox下则不能；
- Firefox：可以使用与HTML对象ID相同的变量名，IE下则不能。

**解决方法：**使用```document.getElementById("idName")```代替```document.idName```。最好不要取HTML对象ID相同的变量名,以减少错误;在声明变量时，一律加上var，以避免产生歧义。

## const

- IE：只能使用var关键字来定义变量。
- Firefox：可以使用const关键字或var关键字来定义变量。

**解决方法：**统一使用var关键字来定义变量。

## input.type

input.type属性问题

- IE：input.type属性为只读。
- Firefox：input.type属性为读写。

## window.event

- window.event只能在IE下运行，而不能在Firefox下运行，这是因为Firefox的event只能在事件发生的现场使用。
- Firefox：必须从源处加入event作参数传递。IE忽略该参数，用window.event来读取该event。

**解决方法：**

```javascript
&lt;script language="javascript"&gt;
function fun(e) {
    e = e ? e : (window.event ? window.event : null);
}
&lt;/script&gt;
```

## event.x与event.y

说明:IE下,even对象有x,y属性,但是没有pageX,pageY属性;Firefox下,even对象有pageX,pageY属性,但是没有x,y属性.

**解决方法：**使用```mX(mX = event.x ? event.x : event.pageX;)```来代替IE下的event.x或者Firefox下的event.pageX.

## event.srcElement

- IE：event对象有srcElement属性，但是没有target属性；
- Firefox：even对象有target属性，但是没有srcElement属性。

**解决方法：**使用```obj(obj = event.srcElement?event.srcElement:event.target;)```来代替IE下的event.srcElement或者Firefox下的event.target。请同时注意event 的兼容性问题。

## window.location.href

- IE或者Firefox2.0.x：可以使用window.location或window.location.href；
- Firefox1.5.x：只能使用window.location

**解决方法：**使用window.location来代替window.location.href.

## 模态和非模态窗口

- IE：可以通过showModalDialog和showModelessDialog打开模态和非模态窗口
- Firefox：不能！

**解决方法：**直接使用window.open(pageURL, name, parameters)方式打开新窗口。
如果需要将子窗口中的参数传递回父窗口,可以在子窗口中使用window.opener来访问父窗口. 例如：var parWin =  window.opener;parWin.document.getElementById("Aqing").value = "Aqing";

## frame

以下面的frame为例：

```<frame src="xxx.html" id="frameId" name="frameName" />```

- 访问frame对象：
  
  [ ie中返回的为object , ff中会显示具体的类型 比如： object window ]  
  
  - IE：使用window.frameId或者window.frameName来访问这个frame对象. frameId和frameName可以同名。  
  
  - Firefox：只能使用window.frameName来访问这个frame对象.  

**在IE和Firefox中都可以使用window.document.getElementById("frameId")来访问这个frame对象.**

- 切换frame内容:  
  
  在IE和Firefox中都可以使用window.document.getElementById("testFrame").src = "xxx.html"或window.frameName.location = "xxx.html"来切换frame的内容.  
  
  如果需要将frame中的参数传回父窗口(注意不是opener,而是parent frame)，可以在frme中使用parent来访问父窗口。例如：parent.document.form1.filename.value="a";

## body

- IE：body必须在body标签被浏览器完全读入之后才存在。
- Firefox：body在body标签没有被浏览器完全读入之前就存在。

## 事件委托方法

- IE：document.body.onload = inject; //function inject()在这之前已被实现
- Firefox：document.body.onload = inject();

## 父元素

Firefox与IE的父元素(parentElement)的区别

- IE：obj.parentElement
- Firefox：obj.parentNode

**解决方法：**因为firefox与IE都支持DOM,因此使用obj.parentNode是不错选择.

## 鼠标指针cursor

cursor:hand VS cursor:pointer

- Firefox：不支持hand
- IE：支持pointer

**解决方法：**统一使用pointer

## 内容文本

innerText在IE中能正常工作。但是innerText在FireFox中却不行，需用textContent。

**解决方法：**

```javascript
if(navigator.appName.indexOf("Explorer") &gt; -1){
    document.getElementById('element').innerText = "my text";
} else{
    document.getElementById('element').textC;
}
```

## 对table的操作

IE，Firefox以及其它浏览器对于 table 标签的操作都各不相同，在IE中不允许对table和tr的innerHTML赋值，使用js增加一个tr时，使用appendChild方法也不管用。

**解决方法：**

```javascript
//向table追加一个空行：
var row = otable.insertRow(-1);
var cell = document.createElement("td");
cell.innerHTML = " ";
cell.className = "a";
row.appendChild(cell);
```

## options集合

对select的options集合操作
枚举元素除了[]外，SelectName.options.item()也是可以的,另外SelectName.options.length，SelectName.options.add/remove都可以在两种浏览器上使用。

**注意在 add后赋值元素，否则会失败。**

## XMLHTTP

```javascript
if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
} else if (window.ActiveXObject) {  // code for IE
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
if (xmlhttp){
    xmlhttp.onreadystatechange = xmlhttpChange;
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}
```