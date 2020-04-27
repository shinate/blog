---
layout: post
status: publish
published: true
title: crontable中的百分号"%"问题
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 222
wordpress_url: http://codante.org/?p=222
date: '2010-07-20 11:01:26 +0800'
date_gmt: '2010-07-20 03:01:26 +0800'
---

写个 crontab ，命令是类似这样的

```bash
/path/to/script `date +%Y-%m-%d`
```

直接运行很正常，但是在 crotnab 里就出错。

```
/bin/sh: -c: line 1: unexpected EOF while looking for matching ``'
/bin/sh: -c: line 2: syntax error: unexpected end of file
```

google 了好一阵才找到答案。原来 crontab 里的 % 是有特殊意义的，在这里需要转义。man 5 crontab 可以看到，

```
Percent-signs (%) in the command, unless escaped with backslash (\), will be changed into newline characters, and all data after the first % will be sent to the command as standard input.
```

**% 如果没有用 \ 转义，就会被替换成换行。所以之前的 crontab 就出错了。**
解决办法：可以在 % 前面都加个 \ ，对于这个例子，写成 date +\%Y-\%m-\%d。

```bash
/path/to/script `date +\%Y-\%m-\%d`
```

感谢神仙赐予的知识