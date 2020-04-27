---
layout: post
status: publish
published: true
title: Linux文本处理命令大集合
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
excerpt: Linux中强大的文档处理能力，持续收集中...
wordpress_id: 73
wordpress_url: http://codante.org/?p=73
date: '2010-07-02 18:10:48 +0800'
date_gmt: '2010-07-02 10:10:48 +0800'
---

## 清空文档

```bash
echo "" > filename
```

```bash
> filename
```

```bash
cat /dev/null > filename
```

## 统计

**在apache的log中找出访问次数最多的10个IP。**

```bash
awk '{print $1}' apache_log |sort |uniq -c|sort -nr|head
```

```bash
cat xxxxx | awk '{print $2}'|sort|uniq -c|sort -nr| head -10
```