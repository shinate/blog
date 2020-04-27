---
layout: post
title: 在apache的log中找出访问次数最多的N个IP。
date: 2010-07-08 11:18:06 +0800
categories:
- 研发之路
- 服务器
tags:
- apache
- 日志
---

根据需求修改文件名和行数即可  

```bash
awk '{print $1}' 日志文件名 |sort |uniq -c|sort -nr|head -行数
```

输出：

```
1234 123.456.789.0
 321 11.22.33.44
  56 22.33.44.55
  34 33.44.55.66
  ......
```