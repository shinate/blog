---
layout: post
title: Excel CSV 解决自动科学技术法
categories:
- 研发之路
tags:
- excel
---

### 解决科学计数

用程序导出的csv数据字段如果为很长很长的数字，比如身份证，带区号的手机，带前导0的数字等，就会被转换成科学计数法

看例子

```
"4173","SpeedyCorp","268435459705526269","","268435459705526269","848 Model Widget","2011-01-17"
```

如果直接打开会出现

```
4173    SpeedyCorp  2.68435E+17     2.68435E+17 848 Model Widget    2011-01-17
```

长数字都被转换成科学计数法了... 其实在字段前加上"```=```"即可解决

```
"4173","SpeedyCorp",="268435459705526269","","268435459705526269","848 Model Widget","2011-01-17"
```

打开后

```
4173    SpeedyCorp  268435459705526269     2.68435E+17 848 Model Widget    2011-01-17
```

### 参考资料

[http://superuser.com/questions/234997/how-can-i-stop-excel-from-eating-my-delicious-csv-files-and-excreting-useless-da](http://superuser.com/questions/234997/how-can-i-stop-excel-from-eating-my-delicious-csv-files-and-excreting-useless-da)