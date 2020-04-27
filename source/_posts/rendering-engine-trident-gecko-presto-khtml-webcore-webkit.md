---
layout: post
status: publish
published: true
title: 浏览器内核(Rendering Engine):Trident、Gecko、Presto、KHTML、WebCore、WebKit
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 485
wordpress_url: http://codante.org/?p=485
date: '2011-02-11 14:23:56 +0800'
date_gmt: '2011-02-11 06:23:56 +0800'
---

几种常见的浏览器内核简介：

## Trident

Windows下的IE浏览器使用的内核代号。除IE外，众多的IE Shell（如 Maxthon）都使用这个内核。
Trident （又称为MSHTML），是微软的窗口操作系统（Windows）搭载的网页浏览器---Internet   Explorer的排版引擎的名称，它的第一个版本随着1997年10月Internet   Explorer第四版释出，之后不断的加入新的技术并随着新版本的Internet Explorer释出。在未来最新的Internet   Explorer第七版中，微软将对Trident排版引擎做了的重大的变动，除了加入新的技术之外，并增加对网页标准的支持。尽管这些变动已经在相当大  的程度上落后了其它的排版引擎，如Gecko、WebCore、KHTML及Presto。

## Gecko

Mozilla Firefox浏览器使用的内核代号。使用Gecko内核的浏览器也有不少，如Netscape、MozillaSuite/SeaMonkey等。另外，Mozilla Thunderbird也使用Gecko。
Gecko壁虎，英文为"Gecko"。Gecko是由Mozilla基金会开发的布局引擎的名字。它原本叫作NGLayout。Gecko的作用是读取 诸如HTML、CSS、XUL和JavaScript等的网页内容，并呈  现到用户屏幕或打印出来。Gecko已经被许多应用程序所使用，包括若干浏览器，例如Firefox、Mozilla Suite、Camino等等。

## Presto

Opera浏览器使用的内核代号，这是目前公认网页浏览速度最快的浏览器内核。
Presto是一个由Opera Software开发的浏览器排版引擎，供Opera 7.0及以上使用。
Presto取代了旧版Opera 4至6版本使用的Elektra排版引擎，包括加入动态功能，例如网页或其部分可随着DOM及Script语法的事件而重新排版。
Presto在推出后不断有更新版本推出，使不少错误得以修正，以及阅读Javascript效能得以最佳化，并成为速度最快的引擎。

## KHTML/WebCore

Konqueror/Safari浏览器使用的内核代号。Konqueror是X协议下的KDE桌面环境使用的浏览器和资源 管理器，可以用在Unix/Linux/BSD系统中，KDE 4.0以后向Windows移植；Safari则是Apple用户中最受欢迎的浏览器。

### KHTML

KHTML是HTML网页排版引擎之一，由KDE所开发。
KDE系统自KDE2版起，在档案及网页浏览器使用了KHTML引擎。该引擎以C++编程语言所写，并以LGPL授权，支援大多数网页浏览标准。由于微软的Internet Explorer的占有率相当高，不少以FrontPage制作的网页均包含只有IE才能读取的非标准语法，为了使KHTML引擎可呈现的网页达到最多，部分IE专属的语法也一并支援。
KHTML拥有速度快捷的优点，但对错误语法的容忍度则比Mozilla产品所使用的Gecko引擎小。
苹果电脑于2002年采纳了KHTML，作为开发Safari浏览器之用，并发布所修改的最新及过去版本源代码。后来发表了开放源代码的WebCore及WebKit引擎，它们均是KHTML的衍生产品，在开发网站列出引擎改变内容，并会传回至KDE计划。由于两个衍生产品各走不同路线，使两者源代码偏离，在与KDE交换更新会出现困难。其中一个原因，是苹果在对外公开源代码之前，以一年时间编修他们的KHTML。另外，苹果传送更新至KDE计划的方式，多是一口气把大量改动一起传送，KDE在整理资料也出现一定的困难，及后苹果表示会以CVS格式来传送。再者，苹果所作出的改动包括Mac OS X系统独有的事物，如Objective-C、KWQ等，在Linux及KHTML是没有的。但KDE方面仍透过这些改动，为KHTML加入新功能及加快其排版速度。

### WebCore

WebCore是苹果公司开发的排版引擎，它是在另外一个排版引擎"KHTML"的基础上而来的。苹果电脑于2002年采纳了KHTML，作为开发Safari浏览器之用，并发布所修改的最新及过去版本源代码。后来发表了开放源代码的WebCore及WebKit引擎，它们均是KHTML的衍生产品。使用WebCore的主要有Safari，此外还有OmniWeb、Shiira、Swift等。

### WebKit

WebKit是一个开源浏览器网页排版引擎，与之相应的引擎有Gecko（Mozilla，Firefox  等使用的排版引擎）和Trident（也称为MSHTML，IE 使用的排版引擎）。同时WebKit 也是苹果Mac OS X  系统引擎框架版本的名称，主要用于Safari，Dashboard，Mail 和其他一些Mac OS X 程序。WebKit 所包含的  WebCore 排版引擎和 JSCore 引擎来自于 KDE 的 KHTML 和 KJS，当年苹果比较了 Gecko 和 KHTML  后，仍然选择了后者，就因为它拥有清晰的源码结构、极快的渲染速度。
目前使用WebKit 引擎的浏览器主要有：Safari(apple出品)，Midori，chrome(google出品)等。2009年推出的safari和chrome使用的webkit引擎完全通过了acid3测试满分！

## Konqueror

Konqueror是 KDE 桌面系统的一部分，主要用于 Linux 和 BSD家族的操作系统。在微软的 Windows 系统下，也有零星使用，当然功能相对有限。Konqueror主要用于文件管理、浏览，以及网页浏览。Konqueror 按照 GPL 进行发布。
在给 Konqueror 命名上，其命名者跟其它的网页浏览器玩了个文字游戏：首先是 Navigator（意为航海家，网景公司的浏览器）、然后是 Explorer（意为探索者），接下来就是 Konqueror （Conqueror 的变体，意为征服者）啦；这里首字母取 K 是为了遵循 KDE 软件都以 K 打头的传统。