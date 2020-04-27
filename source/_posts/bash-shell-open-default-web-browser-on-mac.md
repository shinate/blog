---
layout: post
title: Mac系统用bash shell用默认浏览器打开网址
date: 2016-01-21 00:15:42
categories:
- 研发之路
---

```bash
open http://codante.org -a "$(VERSIONER_PERL_PREFER_32_BIT=true perl -MMac::InternetConfig -le 'print +(GetICHelper "http")[1]')"
```