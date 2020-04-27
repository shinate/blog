---
layout: post
status: publish
published: true
title: redis安装及配置
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 676
wordpress_url: http://codante.org/?p=676
date: '2012-10-31 11:13:11 +0800'
date_gmt: '2012-10-31 03:13:11 +0800'
---

## 依赖

安装redis需要先安装tcl
[http://www.linuxfromscratch.org/blfs/view/cvs/general/tcl.html][0]

## 获取软件

```bash
#tcl8.5
wget http://downloads.sourceforge.net/tcl/tcl8.5.12-src.tar.gz
#redis
wget http://redis.googlecode.com/files/redis-2.6.2.tar.gz
```

## 安装

### tcl

```bash
tar -zxf tcl8.5.12-html.tar.gz --strip-components=1
cd unix && ./configure --prefix=/usr \
--enable-threads \
--mandir=/usr/share/man
make
sed -e "s@^\(TCL_SRC_DIR='\).*@/usr/include'@" \
-e "/TCL_B/s@='\(-L\)\?.*unix@='/usr/lib@" \
-i tclConfig.sh
make install
make install-private-headers
ln -v -sf tclsh8.5 /usr/bin/tclsh
chmod -v 755 /usr/lib/libtcl8.5.so
```

[0]: http://www.linuxfromscratch.org/blfs/view/cvs/general/tcl.html "tcl"