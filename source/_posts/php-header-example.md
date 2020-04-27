---
layout: post
status: publish
published: true
title: PHP中header的使用范例
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
excerpt: "本文对于php中header的使用做出了比较详细的解释。"
wordpress_id: 39
wordpress_url: http://codante.org/?p=39
date: '2010-06-18 11:25:36 +0800'
date_gmt: '2010-06-18 03:25:36 +0800'
---

## 成功

// See related links for more status codes  

```php
header('HTTP/1.1 200 OK');
```

## 页面未找到

Page was not found
//Use this header instruction to fix 404 headers
//produced by url rewriting...

```php
header('HTTP/1.1 404 Not Found');
```

## 拒绝访问

Access forbidden

```php
header('HTTP/1.1 403 Forbidden');
```

## 永久转向

Moved Permanently
The page moved permanently should be used for
all redrictions, because search engines know
what's going on and can easily update their urls.

```php
header('HTTP/1.1 301 Moved Permanently');
```

## 服务器内部错误

Server error

```php
header('HTTP/1.1 500 Internal Server Error');
```

## 页面跳转

Redirect to a new location

```php
header('Location: http://www.example.org/');
```

## 一定时间后重定向

Redriect with a delay

```php
header('Refresh: 10; url=http://www.example.org/');
print 'You will be redirected in 10 seconds';
```

当然,还可以这样:

### 通过html实现

```php
&lt;meta http-equiv="refresh" content="10;http://www.example.org/ /&gt;
```

## 重置技术支持信息

override X-Powered-By value

```php
header('X-Powered-By: PHP/4.4.0');
header('X-Powered-By: Brain/0.6b');
```

## 设定语言

content language (en = English)

```php
header('Content-language: en');
```

## 最后编辑时间

last modified
对缓存页面有很好的帮助

```php
$time = time() - 60; // or filemtime($fn), etc
header('Last-Modified: '.gmdate('D, d M Y H:i:s', $time).' GMT');
```

## 已缓存的

Not Modified
// header for telling the browser that the content
// did not get changed

```php
header('HTTP/1.1 304 Not Modified');
```

## 设定内容长度

set content length (good for caching)

```php
header('Content-Length: 1234');
```

## 用于下载的文件头

Headers for an download:

```php
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="example.zip"');
header('Content-Transfer-Encoding: binary');
```

读取文件内容:

```php
readfile('example.zip');
```

## 不使用缓存

Disable caching of the current document

```php
header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header('Pragma: no-cache');
```

## 设置页面类型

set content type

```php
header('Content-Type: text/html; charset=iso-8859-1');
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: text/plain'); // plain text file
header('Content-Type: image/jpeg'); // JPG picture
header('Content-Type: application/zip'); // ZIP file
header('Content-Type: application/pdf'); // PDF file
header('Content-Type: audio/mpeg'); // Audio MPEG (MP3,...) file
header('Content-Type: application/x-shockwave-flash'); // Flash animation
```

## 弹出一个消息框

show sign in box

```php
header('HTTP/1.1 401 Unauthorized');
header('WWW-Authenticate: Basic realm="Top Secret"');
print 'Text that will be displayed if the user hits cancel or ';
print 'enters wrong login data';
```