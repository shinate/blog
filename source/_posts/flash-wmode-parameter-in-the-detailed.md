---
layout: post
status: publish
published: true
title: Flash中的wmode参数详解
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
excerpt: 在做web开发中可能会遇到flash遮挡页面中元素的情况，无论怎么设置flash容器和层的深度(z-index)也无济于事，现有的解决方案是在插入flash的embed或object标签中加入"wmode"属性并设置为wmode="transparent"或"opaque"，但wmode属性到起怎样的作用，它们都具有什么养的意义呢？本文将详细的进行介绍。
wordpress_id: 376
wordpress_url: http://codante.org/?p=376
date: '2010-11-17 10:15:11 +0800'
date_gmt: '2010-11-17 02:15:11 +0800'
---

## 参数详解

wmode即窗口模式总共有三种，看看当年Macromedia官方的说法：
* Window: Use the Window value to play a Flash Player movie in its own  rectangular window on a web page. This is the default value for wmode  and it works the way the classic Flash Player works. This normally  provides the fastest animation performance.
* Opaque: By using the Opaque value you can use JavaScript to  move or resize movies that don't need a transparent background. Opaque  mode makes the movie hide everything behind it on the page.  Additionally, opaque mode moves elements behind Flash movies (for  example, with dynamic HTML) to prevent them from showing through.
* Transparent: Transparent mode allows the background of the HTML  page, or the DHTML layer underneath the Flash movie or layer, to show  through all the transparent portions of the movie. This allows you to  overlap the movie with other elements of the HTML page. Animation  performance might be slower when you use this value.

### window

默认情况下的显示模式，在这种模式下flash  player有自己的窗口句柄，这就意味着flash影片是存在于Windows中的一个显示实例，并且是在浏览器核心显示窗口之上的，所以flash只 是貌似显示在浏览器中，但这也是flash最快最有效率的渲染模式。由于他是独立于浏览器的HTML渲染表面，这就导致默认显示方式下flash总是会遮 住位置与他重合的所有DHTML层。
但是大多数苹果电脑浏览器会允许DHTML层显示在flash之上，但当flash影片播放时会出现比较诡异的现象，比如DHTML层像被flash刮掉一块一样显示异常。

### opaque

这是一种无窗口模式，在这种情况下flash player没有自己的窗口句柄，这就需要浏览器需要告诉flash  player在浏览器的渲染表面绘制的时间和位置。这时flash影片就不会在高于浏览器HTML渲染表面而是与其他元素一样在同一个页面上,因此你就可 以使用z-index值来控制DHTML元素是遮盖flash或者被遮盖。

### transparent

透明模式，在这种模式下flash  player会将stage的背景色alpha值将为0并且只会绘制stage上真实可见的对象，同样你也可以使用z-index来控制flash影片的 深度值，但是与Opaque模式不同的是这样做会降低flash影片的回放效果，而且在9.0.115之前的flash  player版本设置wmode="opaque"或"transparent"会导致全屏模式失效。
了解了各种模式的实现方式和意义在以后的开发中就可以按照具体情况选择设置wmode属性的值了。