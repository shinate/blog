---
layout: post
status: publish
published: true
title: xdebug安装及配置
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 592
wordpress_url: http://codante.org/?p=592
date: '2011-04-27 18:16:28 +0800'
date_gmt: '2011-04-27 10:16:28 +0800'
---

## 下载

```bash
wget http://www.xdebug.org/files/xdebug-2.1.1.tgz
```

## 安装

```bash
cd xdebug-2.1.1
#创建configure
/servers/app/php/bin/phpize
./configure --enable-xdebug --with-php-config=/servers/app/php/bin/php-config
make
make install
```

## 配置

xdebug必须用zend_extension加载
编辑php.ini文件，在最末位添加上：

```bash
zend_extension=/servers/app/php/lib/php/extensions/no-debug-non-zts-20090626/xdebug.so
```

必须写绝对路径！觉得长的话自己去ln个短的，具体怎么部署这里就不多说了。
**Zend Optimizer和xdebug不兼容，如果已经安装了Zend Optimizer，先注释掉吧。**

## 附录

关于xdebug配置的一些说明

```ini
;xdebug配置
[Xdebug]
;开启自动跟踪
xdebug.auto_trace = On
;开启异常跟踪
xdebug.show_exception_trace = On
;开启远程调试自动启动
xdebug.remote_autostart = On
;开启远程调试
xdebug.remote_enable = On
;收集变量
xdebug.collect_vars = On
;收集返回值
xdebug.collect_return = On
;收集参数
xdebug.collect_params = On
```