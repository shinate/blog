---
layout: post
status: publish
published: true
title: Linux统计文件、目录数量
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 620
wordpress_url: http://codante.org/?p=620
date: '2011-06-30 10:59:37 +0800'
date_gmt: '2011-06-30 02:59:37 +0800'
---

统计当前目录下的文件以及目录数量（不包括子目录）

```bash
ls -l | wc -l
```

统计当前目录下的文件数量（遍历所有子目录）

```bash
find . -type f | wc -l
```

统计当前目录下的目录数量（遍历所有子目录）

```bash
find . -type d |  wc -l
```

当然，也可以指定某个目录来使用

```bash
find /xxx/yyy ......
ls -l /xxx/yyy......
```
