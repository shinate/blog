---
layout: post
status: publish
published: true
title: Mysql安装及配置
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
excerpt: MySQL是一个小型关系型数据库管理系统，开发者为瑞典MySQL AB公司。目前MySQL被广泛地应用在Internet上的中小型网站中。由于其体积小、速度快、总体拥有成本低，尤其是开放源码这一特点，许多中小型网站为了降低网站总体拥有成本而选择了MySQL作为网站数据库。目前Internet上比较流行的网站构架方式是LAMP（Linux+Apache+MySQL+PHP），本文将以实际操作为参考进行系统化的讲解MySQL的安装全过程。
wordpress_id: 61
wordpress_url: http://codante.org/?p=61
date: '2010-06-30 03:08:28 +0800'
date_gmt: '2010-06-29 19:08:28 +0800'
---

感谢老男孩赐予的知识。 老男孩（QQ:49000448， mail:49000448@qq.com）

## 下载源码包

```bash
wget http://dev.mysql.com/get/Downloads/MySQL-5.1/mysql-5.1.41-linux-i686-glibc23.tar.gz/from/http://mysql.cdpa.nsysu.edu.tw/
```

## 创建mysql用户

```bash
groupadd mysql;
useradd -s /sign/nologin -g mysql -M mysql  #-s /sign/nologin禁止其他所有的php，cookie。
```

## 编译

```bash
./configure --prefix=/usr/local/mysql \
--with-unix-socket-path=/usr/local/mysql/tmp/mysql.sock \
--localstatedir=/usr/local/mysql/data \
--enable-assembler \
--with-mysqld-ldflags=-all-static \
--with-client-ldflags=-all-static \
--enable-thread-safe-client \
--with-mysqld-user=mysql \
--with-big-tables \
--without-debug \
--with-pthread;
```

## 安装

```bash
make
make install
```

## 初始化数据库

拷贝MySQL的配置文件到/etc目录下

```bash
cp support-files/my-huge.cnf /etc/my.cnf
```

创建数据文件夹

```bash
mkdir -p /usr/local/mysql/data
```

生成mysql.sock

```bash
/usr/local/mysql/bin/mysql_install_db --user=mysql
```

将软件的安装目录拥有者改为root用户

```bash
chown -R root /usr/local/mysql/
```

将存放数据库的目录拥有者改为mysql用户

```bash
chown -R mysql /usr/local/mysql/data
```

将软件的安装目录属组改为mysql组

```bash
chgrp -R mysql /usr/local/mysql/
```

## 启动

```bash
/usr/local/mysql/bin/mysqld_safe --user=mysql &
```

## 添加开机启动

```bash
vi /etc/rc.local
```

添加一行

```bash
/usr/local/mysql/bin/mysqld_safe --user=mysql &
```