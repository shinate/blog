---
layout: post
title: linux中去掉Windows文件的"^M"字符
---

## VI

对某个文件进行处理

```
vi filename
```

```
:%s/^M/\r/g
```

## SED方法

## PERL方法

可对多文件批量处理

```
perl -p -i -e "s/^M//g" `find .`
```

`find .` 可以替换为任何文件或者多个文件，它的作用为提取所需的文件名。

`^M`字符需要使用`Ctrl+v+m`来输入

持续......