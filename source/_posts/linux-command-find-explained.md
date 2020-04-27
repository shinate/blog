---
layout: post
status: publish
published: true
title: Linux find命令详解
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 65
wordpress_url: http://codante.org/?p=65
date: '2010-06-30 14:57:48 +0800'
date_gmt: '2010-06-30 06:57:48 +0800'
---

感谢老男孩赐予的知识。 老男孩（QQ:49000448， mail:49000448@qq.com）

## 查看帮助（很重要）

```bash
find --help
```

## 显示所有文件

显示多个目录文件列表(仅限于3层)

```bash
find test ryan hyran -maxdepth 3
```

## 按文件名、路径名查找

多参数，可用通配符

```bash
find -maxdepth 3 -name 'd*'
find -maxdepth 3 -name 'ji*\.sql'
find -path '*server*'
```

## 按文件属性查找

```bash
find . -type f
find . -size -100M
find . -size +1G
find . -mtime +2
find . -perm 755
find . -perm -755  \#权限至少为755
```

## 组合查找

```bash
find . -type d -mtime +30
find . -type f -mtime +15
find . -type f -size +10M
find . -type d -name 'server*'
find /ryan -name '*.log' -mtime +5
```

## 使用逻辑运算查找

```bash
#/ryan目录下30天前访问过得大于20M的文件（-a and,-o or !）
find /ryan -size +20M -a atime 30
find /ryan -type f -o -mtime +15
find /ryan ! -user rhy
```

## 对查找文件实施操作

```bash
#删目录 30天以前
find . -type d -mtime +30 |xargs rm -rf
#删文件 15天以前
#删目录下文件用这个好
find . -type f -mtime +15 |xargs rm -f
```