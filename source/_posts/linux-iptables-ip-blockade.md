---
layout: post
status: publish
published: true
title: linux下利用iptables屏蔽IP段
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 84
wordpress_url: http://codante.org/?p=84
date: '2010-07-08 14:58:49 +0800'
date_gmt: '2010-07-08 06:58:49 +0800'
---

屏蔽单个IP  

```bash
iptables -I INPUT -s 124.115.0.199 -j DROP
```

屏蔽IP段

```bash
iptables -I INPUT -s 124.115.0.0/16 -j DROP
iptables -I INPUT -s 124.115.3.0/16 -j DROP
iptables -I INPUT -s 124.115.4.0/16 -j DROP
```

屏蔽整个IP段

```bash
iptables -I INPUT -s 124.115.0.0/8 -j DROP
```

屏蔽几个IP段

```bash
iptables -I INPUT -s 61.37.80.0/24 -j DROP
iptables -I INPUT -s 61.37.81.0/24 -j DROP
```

在执行之后不要忘记保存，并重启iptables服务。

```bash
/etc/rc.d/init.d/iptables save
service iptables restart
```