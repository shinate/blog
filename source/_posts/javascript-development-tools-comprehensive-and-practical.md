---
layout: post
title: JavaScript开发工具，全面&实用！
categories:
- 研发之路
- 前端
tags:
- javascript
- 工具
date: 2011-02-09 17:05:27 +0800
---

不管你是JavaScript新手还是经验丰富的开发者，你所使用的工具直接影响你的工作效率。开放源代码运动使得拥有得力的工具不再意味着付一大笔钱；实际上你什么都不用付出。本文中将介绍各种对JavaScript开发者真正有实用价值的免费工具。

## 测试器

* [JSLint --JavaScript的验证器][0]
  
  JSLint取得一个JavaScript源代码并对其扫描。如果发现问题，它送回信息描述问题状况及在源代码中的大概位置。问题不一定就出在句法上，不过常常正是这里出错。JSLint查看一些风格约定和结构问题，它证明不了程序是否正确。它只是提供了另一双眼睛来帮助发现问题。
* [JsUnit][1]  
  
  JsUnit是一个客户端（内浏览器）JavaScript单元测试框架。它其实是JUnit给JavaScript的一个口岸。其中还有一个平台来在多个浏览器上以及运行不同操作系统的多个机器上的自动执行测试。
* [YUI Test][2]  
  
  YUI Test是一个测试框架，它针对基于浏览器的JavaScript解决方案。你可以用YUI Test在JavaScript 解决方案上轻松添加单元测试。
* [Obtrusive JavaScript Checker][3]  
  
  可作为Firefox扩展，Greasemonkey用户脚本，以及Ubiquity命令；Obtrusive JavaScript Checker是一种可以扫过页面上所有元素的工具，发现带有行内事件的HTML元素（这是有危害性的，JavaScript应该是不张扬的）时，它给这部分加红边使其凸显。
* [Crosscheck][4]  
  
  Crosscheck是一个开源测试框架，验证内浏览器JavaScript代码。它帮助你确保代码可以在Internet Explorer和Firefox等种种不同的浏览器上运行，而这些浏览器都不需要安装。
* [JSLitmus][5]  
  
  JSLitmus是一个轻量级工具用来制作JavaScript的特定标准测试。
* [JavaScriptMVC的测试插件][6]  
  
  JavaScriptMVC的测试库提供事件模拟，单元测试，Ajax 夹具，和一个控制台程序。

## 调试工具

* [Javascript调试工具包][7]
  
  JavaScript调试工具包是一种跨浏览器调试JavaScript的eclipse plugin，它可以在IE,Firefox,Safari,Chrome,Opera甚至是移动浏览器上调试JavaScript。
* [Firebug][8]  
  
  作为最受欢迎的网页开发程序工具，Firebug是Firefox的一个插件，可以用它在任何网页上现时编辑，调试和监控CSS, HTML, 和JavaScript。它提供给JavaScript登陆和调试控制台一些有用的功能如AJAX requests logging，JavaScript解释器，DOM explorer等等。[Firebug Lite][9] 可以在IE, Opera, 和Safari上使用。
* [Venkman][10]  
  
  Venkman为基于Gecko的浏览器提供功能强大JavaScript调试环境。这个调试器以Firefox & Mozilla插件的形式使用。可以在用户界面上和控制台命令中使用断点管理，调用栈检查，变量/对象检查等功能，可以让你以最习惯的方式调剂。
* [NitobiBug][11]  
  
  NitobiBug是一种基于浏览器的JavaScript对象记录和检查工具------与Firebug作用相似。NitobiBug在可以在不同的服务器（IE6+, Safari, Opera, Firefox）上运行以提供开发各种Ajax应用程序一致且功能强大的工具。
* [DamnIT][12]  
  
  DamnIT是一种免费服务，当用户在网页上遇到JavaScript错误时它会给你发送电子邮件。
* [JS Bin][13]  
  
  JS Bin是一种在线网络应用程序，为帮助JavaScript开发者在一定情景里测试代码片段以及协作调试代码而特别设计。你可以用JS Bin在线编辑测试JavaScript和HTML代码。一旦完成，你可以将URL保存并发送给同伴来进行审查或获得帮助。
* [Blackbird][14]  
  
  许多JavaScript开发者仅仅使用alert()来显示各种信息调试代码。Blackbird在JavaScript上提供了记录信息的简单方式以及一个引人注意的控制台程序来察看并过滤信息。

## HTTP监控

* [Fiddler][15]
  
  Fiddler是一种Web调试代理，它记录你的电脑和网络之间所有的HTTP(S)流量。可以用Fiddler检查所有HTTP(S)流量，设置断点，干涉进来或出去的数据。
* [TamperData][16]  
  
  TamperData是一个追踪并修改http/https请求的Firefox扩展。可以用它做基于网络的应用程序的安全测试，追踪请求/回应。
* [Live HTTP Headers][17]  
  
  可以在浏览的时候查看网页的HTTP headers。可以用Live HTTP Headers调试网页应用程序，找出远端网站使用的是那种网站服务器，或者查看远端网站发送的小数据文件。

## 文件

* [jGrouseDoc][18]
  
  jGrouseDoc可以从源代码中的注释生成API文件。你可以用这个工具记载你需要的所有构造------不仅有函数和变量，还有类文件包，界面，命名空间，包和其它。使用那种JavaScript框架是无关紧要的------你可以不采取框架或工具强加的方式而以自己希望的方式记录代码，
* [JSDoc Toolkit][19]  
  
  JavaScript的一种文件产生器，以JavaScript形式写成；它自动从加注的JavaScript源代码中生成格式模版化，多页面HTML（或XML, JSON, 抑或其它文本）。

## 压缩

* [Online Javascript Compression Tool][20]
  
  一个可以用一些压缩算法如[JSMin][21] 和 [Packer][22]压缩JavaScript文件的在线JavaScript压缩器。压缩的JavaScript文件是生产环境中的理想文件，因为它们常常将文件大小减小30-90%。在很大程度上，文件尺寸的缩小是通过除去网页浏览者或访问者不需要的注释和多余的空格字符来实现的。
* [Scriptalizer][23]  
  
  一个将多个JavaScript文件组合为一个文件的在线工具。
* [Dojo ShrinkSafe][24]  
  
  一种命令行实用程序，允许你用浏览器缩小文件大小，从而缩短响应时间。Dojo压缩器不是建立在脆弱的规则表达式基础上的。它基于来自莫兹拉专案的JavaScript引擎。由于一个基于真正的parse stream，Dojo压缩器比基于规则表达式的工具可以更好体现代符（变量名等等）的环境。
* [YUI Compressor][25]  
  
  The YUI Compressor是一种JavaScript压缩器。去除注释和空格之外，它还可以用最小可用变量名混淆局部变量。即使在使用'eval'或'with'之类构造（在这些情况下压缩并不合适），这种混淆也是安全的。与jsmin相比，它平均节省20%。

## 格式化

* [JavaScript代码美化工具][26]
  
  这个美化工具可处理散乱或压缩的JavaScript代码，不断对其进行快速的格式化并使其可读。编辑程序&集成开发环境
* [Aptana Studio][27]  
  
  Aptana Studio是一个完整的网络开发环境。它提供有JavaScript代码自动完成和调试，HTML/CSS/JavaScript代码提示，以及对重要的Ajax类库的支持。Aptana Studio甚至给你页面上所有的，包括你自己的JavaScript提供代码提示。
* [Komodo Edit][28]  
  
  Komodo Edit是一种免费开放的源编辑程序。它提供自动完成，调用提示，多种语言支持，语法高亮颜色显示，语法检查，Vi emulation，Emacs快捷键绑定等等功能。扩展Komodo Edit是其最实用的功能之一。你会发现各种对JavaScript开发者有用的扩展（如[JSLint plugin for Komodo][29], [Venkman JavaScript Debugger][30]，等等）。
* [Spket IDE][31]  
  
  Spket IDE是JavaScript和XML开发功能强大的工具包。JavaScript, XUL/XBL and Yahoo! Widget开发功能强大的编辑器。JavaScript编辑器有代码完成，语法高亮显示和内容概要等功能，这些功能帮助开发者高效制作出有效的JavaScript代码。Spket IDE为非商业用途免费提供。

## 其它工具

* [Google的 AJAX APIs Playground][32]
  
  AJAX API Playground装载有Google JavaScript APIs（Maps, Search, Feeds, Calendar, Visualization, Language, Blogger, Libraries和 Earth,等等）例子，你可以编辑运行这些例子帮助你探究Google的APIs可提供的功能。同时也还有保存和输出功能。你可以用保存功能保持编辑的例子以留待以后使用。而输出功能可用来修改例子并把代码公布在一个永久的URL上。
* [QuirksMode -- 相容性表 ][33]  
  
  检查CSS2, CSS3, DOM Core, DOM HTML, DOM CSS, DOM Events 和CSS Object Model View主要浏览器相容性状态的最受欢迎的出处。
* [HTML到JavaScript转换器][34]  
  
  HTML到JavaScript转换器获得置标并将它转换成一系列可以在JavaScript块中使用的document.write()申明。
* [Glimmer][35]  
  
  Glimmer是一种桌面应用软件，可以用它利用jQuery库的作用在网页上轻松制作交互式元素。可以用它轻松制作交错感受如旋转相册/报头，下拉导航，悬停效果，或自定义动画。
* [jQuery Function Builder][36]  
  
  你可以用这个工具很快建立一个函数集，当页面加载完毕/准备完毕时，调用该函数集。
* [JavaScript Regex Generator][37]  
  
  一个制作规则表达的在线工具。

## 其它浏览器扩展

* [Firefox, Flock & Seamonkey的网络开发人员扩展][38]
  
  网络开发人员拓展在浏览器中增加了一个菜单和工具条，其中包含许多网络开发工具包括能使你的XHTML生效，发现JavaScript/CSS的错误，网页结构可视化，测试网络表单，改变运行中的XHTML，检查HTTP头信息等等。
* [Opera Dragonfly][39]  
  
  Opera Dragonfly 是Opera浏览器的跨设备，跨平台调试环境---调试 JavaScript, 检查编辑CSS和DOM， 并且查看移动设备或计算机上的错误。
* [IE6/7的开发者工具条][40]  
  
  微软的英特网浏览器开发者工具条为网页的快速创建，理解和故障诊断提供了各种的工具。
[0]: http://www.jslint.com/
[1]: http://www.jsunit.net/
[2]: http://developer.yahoo.com/yui/yuitest/
[3]: http://robertnyman.com/obtrusive-javascript-checker/
[4]: http://www.thefrontside.net/crosscheck
[5]: http://broofa.com/Tools/JSLitmus/
[6]: http://javascriptmvc.com/wiki/index.php?title=Test_Overview
[7]: http://www.eclipseplugincentral.com/Web_Links-index-req-viewlink-cid-1372.html
[8]: http://getfirebug.com/
[9]: http://getfirebug.com/lite.html
[10]: http://www.hacksrus.com/%7Eginda/venkman/
[11]: http://www.nitobibug.com/
[12]: https://damnit.jupiterit.com/
[13]: http://jsbin.com/
[14]: http://www.gscottolson.com/blackbirdjs/
[15]: http://www.fiddler2.com/
[16]: http://tamperdata.mozdev.org/
[17]: http://livehttpheaders.mozdev.org/
[18]: http://jgrouse.com/
[19]: http://code.google.com/p/jsdoc-toolkit/
[20]: http://jscompress.com/
[21]: http://www.crockford.com/javascript/jsmin.html
[22]: http://dean.edwards.name/packer/
[23]: http://scriptalizer.com/
[24]: http://dojotoolkit.org/docs/shrinksafe
[25]: http://developer.yahoo.com/yui/compressor/
[26]: http://jsbeautifier.org/
[27]: http://www.aptana.com/
[28]: http://www.activestate.com/komodo_edit/
[29]: http://community.activestate.com/xpi/kjslint-jslint-komodo
[30]: http://community.activestate.com/xpi/venkman-javascript-debugger
[31]: http://www.spket.com/
[32]: http://code.google.com/apis/ajax/playground/
[33]: http://www.quirksmode.org/compatibility.html
[34]: http://accessify.com/tools-and-wizards/developer-tools/html-javascript-convertor/
[35]: http://code.msdn.microsoft.com/glimmer
[36]: http://accessify.com/tools-and-wizards/developer-tools/jquery-builder/default.php
[37]: http://www.jslab.dk/tools.regex.php
[38]: http://chrispederick.com/work/web-developer/
[39]: http://www.opera.com/dragonfly/
[40]: http://www.microsoft.com/downloads/details.aspx?familyid=e59c3964-672d-4511-bb3e-2d5e1db91038&displaylang=en#QuickInfoContainer