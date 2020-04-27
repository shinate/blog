---
layout: post
status: publish
published: true
title: apache日志处理分析合集
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 339
wordpress_url: http://codante.org/?p=339
date: '2010-09-21 13:21:46 +0800'
date_gmt: '2010-09-21 05:21:46 +0800'
---

统计访问量最多的前N个IP，倒序排列

```bash
cat 日志文件 | awk '{print $1}'|sort|uniq -c|sort -r -n -k1|head -数量
```

统计访问量最多的50个IP，倒序排列，并且排除包含"bot"和"spider"的记录

```bash
cat access_20100921.log |egrep -v "bot|spider"| awk '{print $1}'|sort|uniq -c|sort -r -n -k1|head -50
```