---
layout: post
status: publish
published: true
title: PHP中不太常用的方法
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
excerpt: "在php中，有一些方法经常被人们所遗忘，在一些特定的需求下，他们还是非常有用的。"
wordpress_id: 55
wordpress_url: http://codante.org/?p=55
date: '2010-06-28 09:20:31 +0800'
date_gmt: '2010-06-28 01:20:31 +0800'
---

### 返回当前class的所有方法

```php
get_class_methods()
```

### 返回当前页所有加载的文件

```php
get_included_files()
```

### 返回当前页所有class

```php
get_declared_classes()
```

### 返回所有的接口

```php
get_declared_interfaces()
```

### 返回所有的function

```php
get_defined_functions()
```

### 返回当前页所有的变量

```php
get_defined_vars()
```

### 返回当前用户

```php
get_current_user()
```

### 返回所有常量

```php
get_defined_constants()
```

### 获取PHP当前加载的所有扩展

```php
get_loaded_extensions()
```

### 获取指定扩展的所有方法列表

```php
get_extension_funcs('xml')
```