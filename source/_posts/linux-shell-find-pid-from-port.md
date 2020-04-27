---
layout: post
status: publish
published: true
title: 根据端口查找进程pid
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 82
wordpress_url: http://codante.org/?p=82
date: '2010-07-08 10:49:38 +0800'
date_gmt: '2010-07-08 02:49:38 +0800'
---

```bash
netstat -lnp|grep 端口号|grep -v grep|sed -n '1p'|awk '{print $7}'|awk -F/ '{print $1}'
```