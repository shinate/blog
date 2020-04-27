---
layout: post
status: publish
published: true
title: linux下的httpd(apache)安装及配置
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
excerpt: "在CentOS5.4 x86_64系统下进行Apache的安装配置，路径都是安装时自己用的，可以根据需要进行更改。在此介绍一下操作流程。"
wordpress_id: 43
wordpress_url: http://codante.org/?p=43
date: '2010-06-23 11:55:37 +0800'
date_gmt: '2010-06-23 03:55:37 +0800'
---

## 下载安装包

```bash
wget http://apache.etoak.com/httpd/httpd-2.2.11.tar.gz
```

## 创建apache用户

```bash
groupadd apache;useradd -g apache apache
```

## 编译安装

```bash
./configure --prefix=/usr/local/apache2 \
--enable-modules=all \
--enable-ssl \
--enable-so \
--enable-rewrite \
--enable-mime-magic \
--enable-file-cache \
--enable-cache \
--enable-disk-cache \
--enable-mem-cache \
--enable-static-rotatelogs \
--enable-vhost-alias
make
make install
```

## 配置

### 修改apache配置文件

```bash
vi /usr/local/apache2/conf/httpd.conf
```

修改:

```ini
DirectoryIndex index.html index.htm index.php
User apache
Group apache
```

添加:

```ini
ServerName 127.0.0.1:80
```

```ini
AddType application/x-httpd-php .php .php3
AddType application/x-httpd-php-source .phps
```

## 启动apache

```bash
/usr/local/apache2/bin/apachectl start
```

## 设置开机启动

```bash
vi /etc/rc.local
```

添加

```bash
/usr/local/apache2/bin/apachectl start
```

感谢老男赐予的文档...