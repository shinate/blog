---
layout: post
status: publish
published: true
title: 在windows中创建软链接，junction的使用方法
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 493
wordpress_url: http://codante.org/?p=493
date: '2011-02-12 19:01:37 +0800'
date_gmt: '2011-02-12 11:01:37 +0800'
---

## junction

软链接也可以称作符号链接，类似于unix中的ln -s。
其实windows也是有这个功能的，不过windows貌似没有内置相关的符号连接工具。最好用的工具应该是Microsoft网站上提供的SysInternals套件，里面包含了大量的实用程序，其中junction.exe就是用来管理符号连接的。
使用junction所创建的符号链接文件夹并不会占用任何磁盘空间，它仅仅是指向了源文件夹。
官方网址：[http://technet.microsoft.com/en-us/sysinternals/bb896768][0]

## 适用环境

* 必需为NTFS文件格式
* windows XP+
* windows server 2003+

## 下载安装

地址：[http://download.sysinternals.com/Files/Junction.zip][1]
将junction.zip解压得到junction.exe，直接扔到C:\WINDOWS\system32

## 命令格式

### 创建

```bash
junction [-s] 链接路径 源路径
```

*其中参数-s为递归子文件夹

### 删除

```bash
junction -d 链接路径
```

## 举例

D盘中有个文件夹movies，存储大量的视频，想实现访问C:\movies等于访问D"\movies的效果。
首先确保C盘下不存在 movies文件夹，之后开始-&gt;运行(windows功能键+R也可)，出入cmd调出命令行，执行以下代码：

```bash
junction -s C:\movies D:\movies
```

出现提示：

```
Created: C:\movies
Targetted at: D:\movies
```

此时，软链接创建完毕。
而删除时只需要：

```bash
junction -d C:\movies
```

很方便吧~
用这种方法可以配合同步网盘，将比较大的硬盘用来存储，工作盘可以挪到系统盘上。
[0]: http://technet.microsoft.com/en-us/sysinternals/bb896768
[1]: http://download.sysinternals.com/Files/Junction.zip