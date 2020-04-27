---
layout: post
title: Linux中关于CPU的一些说明
date: 2010-09-08 11:16:11 +0800
categories:
- 研发之路
- 服务器
tags:
- linux
---

### 逻辑CPU个数

```bash
cat /proc/cpuinfo | grep "processor" | wc -l
```

### 物理CPU个数

```bash
cat /proc/cpuinfo | grep "physical id" | sort | uniq | wc -l
```

"siblings"指的是一个物理CPU有几个逻辑CPU。
"cpu cores"指的是一个物理CPU有几个核。
不应该按照flags里是否有ht标志来判断系统是否有超线程能力，而应该：
* 如果"siblings"和"cpu cores"**一致**，则说明**不支持**超线程，或者**超线程未打开**。
* 如果"siblings"是"cpu cores"**的两倍**，则说明**支持**超线程，并且**超线程已打开**。

### 举例说明

两个双核超线程CPU：

```bash
processor   0 1 2 3 4 5 6 7
physical id 0 0 0 0 1 1 1 1
siblings    4 4 4 4 4 4 4 4
core id     0 0 1 1 0 0 1 1
cpu cores   2 2 2 2 2 2 2 2
```

感谢老男赐予的知识。