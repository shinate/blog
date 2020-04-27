---
layout: post
status: publish
published: true
title: nodejs安装及配置
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 615
wordpress_url: http://codante.org/?p=615
date: '2011-06-20 14:55:54 +0800'
date_gmt: '2011-06-20 06:55:54 +0800'
---

## 下载及安装

```bash
git clone git://github.com/joyent/node.git
cd node
./configure --prefix=/servers/app/node
make && make install
```

## 启动

```bash
/servers/app/node/bin/node
```

直接执行./node将进入nodejs的命令行