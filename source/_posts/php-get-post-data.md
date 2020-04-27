---
layout: post
title: PHP获取post参数的几种方式
categories:
- 研发之路
- PHP
tags:
- PHP
---

1. ```$_POST['paramName']``` 只能接收Content-Type: ```application/x-www-form-urlencoded```提交的数据

2. ```file_get_contents("php://input")``` 适用大多数类型的Content-type，```php://input``` 允许读取 POST 的原始数据。和 ```$HTTP_RAW_POST_DATA``` 比起来，它给内存带来的压力较小，并且不需要任何特殊的 php.ini 设置。```php://input``` 不能用于 ```enctype="multipart/form-data"```。

3. ```$GLOBALS['HTTP_RAW_POST_DATA'];``` 总是产生 ```$HTTP_RAW_POST_DATA```  变量包含有原始的 POST 数据。此变量仅在碰到未识别 MIME 类型的数据时产生。```$HTTP_RAW_POST_DATA``` 对于 ```enctype="multipart/form-data"``` 表单数据不可用。如果post过来的数据不是PHP能够识别的，你可以用 ```$GLOBALS['HTTP_RAW_POST_DATA']``` 来接收，比如 ```text/xml``` 或者 ```soap``` 等等。