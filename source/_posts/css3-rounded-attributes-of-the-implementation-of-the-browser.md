---
layout: post
status: publish
published: true
title: CSS3圆角属性在各浏览器中的实现
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 483
wordpress_url: http://codante.org/?p=483
date: '2011-02-11 11:41:33 +0800'
date_gmt: '2011-02-11 03:41:33 +0800'
---

圆角属性border-radius在CSS3中出现了，目前为止IE仍然没有支持它... 这里就不浪费口水了。
根据浏览器所用引擎的不同，圆角的使用方式也略有不同。

## 火狐

firefox目前还不能直接支持border-radius，所以只能使用其特有的属性。
代码结构：-moz-border-radius: {1,4} | inherit
如果设置四个角都是一样圆角的话，可以这样

```css
-moz-border-radius:5px;
```

当然也可根据需要对四个角单独设置，顺序是顺时针从左上开始，上左、上右、下右、下左，

```css
-moz-border-radius-topleft: 5px;
-moz-border-radius-topright: 5px;
-moz-border-radius-bottomright: 5px;
-moz-border-radius-bottomleft: 5px;
```

也可以用合并起来一起设置

```css
-moz-border-radius:5px 0 5px 0;
```

## webkit

Safari, Google Chrome 都是基于Webkit 的。
代码结构：-webkit-border-radius：{1,2} | inherit;
如果设置四个角都是一样圆角的话，可以这样

```css
-webkit-border-radius:3px;
```

如果是单独设置四个角的话，需要采取这种方式

```css
-webkit-border-top-left-radius:3px 5px;
-webkit-border-top-right-radius:3px 5px;
-webkit-border-bottom-right-radius:3px 5px;
-webkit-border-bottom-left-radius:3px 5px;
```

webkit的每个角都能设置的更加细致，分别对每个角的x、y进行设置，表现出非正圆的弧形，带来的问题就是无法像火狐那样全部合并来写。
如果是要合并的话，只能使用-webkit-border-radius:3px;或者-webkit-border-radius:3px 5px;

## 非window环境

在Unix/Linux/BSD系统中非火狐浏览器，主要使用KED出品的khtml引擎。
代码结构：-khtml-border-radius: {1,2} | inherit
类似于webkit。怎么说呢，虽然是小众，加上也无妨。

## IE

要不是因为在中国拥有50%以上的占有率还真不想提它，这个恨呐！
刚在网上翻了翻，还真有解决的办法。
在样式表里增加行为(behavior)，什么东西？你懂的！以前写hover的时候用过，这里还得用。
为了兼容IE，可以用以下代码：

```css
-moz-border-radius: 15px;
-khtml-border-radius: 15px;
-webkit-border-radius: 15px;
border-radius: 15px;
behavior: url(border-radius.htc);
```

## 效果演示

[http://unite.codante.org/development/tester/border-radius/][0]
下载：[border-radius.zip][1]
[0]: http://unite.codante.org/development/tester/border-radius/
[1]: http://codante.org/wp-content/uploads/2011/02/border-radius.zip