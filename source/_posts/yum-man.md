---
layout: post
status: publish
published: true
title: yum使用说明
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 673
wordpress_url: http://codante.org/?p=673
date: '2012-07-11 15:50:37 +0800'
date_gmt: '2012-07-11 07:50:37 +0800'
---

在Centos中yum安装和卸载软件的使用方法

## 安装

### 单一软件

```bash
yum -y install httpd
```

### 多个类似软件

```bash
yum -y install httpd*
```

### 多个非类似软件

```bash
yum -y install httpd php php-gd mysql
```

## 卸载

### 单一软件

```bash
yum -y remove httpd
```

### 多个相类似软件

```bash
yum -y remove httpd*
```

### 多个非类似软件

```bash
yum -y remove httpd php php-gd mysql
```


## yum search

假如我要执行iostat这个命令来查看CPU与存储设备状态，可是执行却发现没有这个命令，于是执行yum install iostat，结果说找不到该软件，使用下面的办法可以解决

```bash
yum search iostat
```

就能查到和iostat相关的安装包了。
另外想安装一个程序，只记得一部分名称，也可以用这个办法来实现安装

```bash
yum search png |grep png
```

就能找到我们想安装的libpng这个名称。