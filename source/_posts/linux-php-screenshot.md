---
layout: post
status: publish
published: true
title: LINUX+PHP实现网页快照（截屏）
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 674
wordpress_url: http://codante.org/?p=674
date: '2012-08-24 20:08:17 +0800'
date_gmt: '2012-08-24 12:08:17 +0800'
---

## 服务器端

为实现截图的程序必须借助服务器端程序：http://code.google.com/p/wkhtmltopdf/
可将网页转换为pdf或者图片，32和64位有区别，找个适合自己服务器的版本。

### 安装

安装过程十分简单：解压 -&gt; 找个合适的路径放下...

### 执行

命令行调用

```bash
/servers/app/qtwebkit/wkHtmlToImage weibo.com weibo.com.png
```

默认的清晰度比较高，图片会很大，生成图片需要一定的时间。
php

```php
exec('/servers/app/qtwebkit/wkHtmlToImage weibo.com weibo.com.png');
```

具体的使用方法

```php
<?php
ob_start();
//如果将输出的文件名设置为'-'，则直接返回文件数据流
passthru('/servers/app/qtwebkit/wkHtmlToImage --width 800 --height 600 -quality 85 weibo.com -');
$fileName = self::cachePath() . '/' . self::name();
$content = ob_get_clean();
//写入图片文件，备用
//file_put_contents($fileName, $content);
//直接输出为图片
header("Content-type: image/png");
echo $content;
?>
```

### 中文乱码问题

主要看服务器是否支持中文语言，如果截图中出现乱码，直接装个中文包就好了。

```bash
yum install fonts-chinese
```