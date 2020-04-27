---
layout: post
title: CSS中的各种缩写
categories:
- 研发之路
- 前端
tags:
- css
---

css缩写的主要规则如下：

## 颜色 color

16进制的色彩值，如果每两位的值相同，可以缩写一半，例如：
\#000000可以缩写为\#000;\#336699可以缩写为\#369;

## 盒尺寸

通常有下面四种书写方法:

```css
property:value1; /*表示所有边都是一个值value1*/
property:value1 value2;  /*表示top和bottom的值是value1,right和left的值是value2*/
property:value1 value2 value3;  /*表示top的值是value1，right和left的值是value2，bottom的值是value3*/
property:value1 value2 value3 value4;  /*四个值依次表示top,right,bottom,left*/
```

方便的记忆方法是顺时针，**上 右 下 左**。具体应用在margin和padding的例子如下：

```css
margin:1em 0 2em 0.5em;
```

## 边框 border

边框的属性如下：

```css
border-width:1px;
border-style:solid;
border-color:\#000;
```

可以缩写为一句：

```css
border:1px solid \#000;
```

语法是border:尺寸样式颜色;

## 背景 Backgrounds

背景的属性如下：

```css
background-color:\#f00;
background-image:url(background.gif);
background-repeat:no-repeat;
background-attachment:fixed;
background-position:0 0;
```

可以缩写为一句：

```css
background:\#f00 url(background.gif) no-repeat fixed 0 0;
```

语法是background:背景颜色背景图片填充类型附属定位;
你可以省略其中一个或多个属性值，如果省略，该属性值将用浏览器默认值，默认值为：
color: **transparent**
image: **none**
repeat: **repeat**
attachment: **scroll**
position: **0% 0%**

## 字体 fonts

字体的属性如下：

```css
font-style:italic;
font-variant:small-caps;
font-weight:bold;
font-size:1em;
line-height:140%;
font-family:"Lucida Grande",sans-serif;
```

可以缩写为一句：

```css
font:italic small-caps bold 1em/140% "Lucida Grande",sans-serif;
```

注意，如果你缩写字体定义，至少要定义font-size和font-family两个值。

## 列表 lists

取消默认的圆点和序号可以这样写list-style:none;,
list的属性如下:

```css
list-style-type:square;
list-style-position:inside;
list-style-image:url(image.gif);
```

可以缩写为一句：

```css
list-style:square inside url(image.gif);
```