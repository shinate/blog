---
layout: post
status: publish
published: true
title: 全世界最短的IE判断方法
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 559
wordpress_url: http://codante.org/?p=559
date: '2011-03-31 11:05:01 +0800'
date_gmt: '2011-03-31 03:05:01 +0800'
---

```javascript
var isIE = !-[1,];
```

仅仅需要6bytes即可进行判断，利用了IE与标准浏览器在处理数组的toString方法时的差异来完成的。
对于标准游览器，如果数组里面最后一个字符为逗号，js的引擎会自动剔除它。