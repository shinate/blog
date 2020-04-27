---
layout: post
title: PHP中用Memcache存储Session数据
---

## 优缺点

**优点：**

1. 使用内存存放session信息，不经过磁盘，数据库等，速度快
2. 可以多台机器共用一个/组memcached服务器，达到多台机器共享session信息，方便多机集群的session问题处理。
3. ...

**不足：**

1. 首先memcached的服务必须正常工作，否则php的session相关功能将不起作用,这样php的处理就多了一层外面的依赖。
2. 由于memcached是使用内存的，这样当用户量比较大时，就可能由于内存方面原因导致session时长上的问题,session的实际失效时长达不到设定的失效时长(由于memcached在内存不够下的处理机制决定)
3. 由于memcached的内存管理机制，当session存储的数据超过1MB的时候有数据丢失问题（不过一般不会有人在session中存放这么多的信息吧)。
4. ...

## 实现

在PHP中有两种实现

### memcache

PHP的基础memcache客户端
**在配置文件中进行设置：**

```ini
session.save_handler = memcache
session.save_path = "tcp://127.0.0.1:11211"
```

**或者在程序中如下测试：**

```php
ini_set("session.save_handler","memcached");
ini_set("session.save_path","tcp://127.0.0.1:11211");
```

详见：[http://cn.php.net/manual/en/memcache.ini.php][0]

### memcached

基于libmemcached通用类库的memcache客户端

**在配置文件中进行设置：**

```ini
session.save_handler = memcached
session.save_path = "127.0.0.1:11211"  //注意这里不需要tcp
```

**或者在程序中如下测试：**

```php
ini_set("session.save_handler","memcached");
ini_set("session.save_path","127.0.0.1:11211");
```

详见：[http://cn.php.net/manual/en/memcached.sessions.php][1]感觉

### 验证效果

通过[memcachephp][2]来查询是否session数据被正确设置了：

```
The session keys are stored under the prefix memc.sess.key
memc.sess.key.8fvadbqo1lt2l6j98tbg7ao1d7
```

[0]: http://cn.php.net/manual/en/memcache.ini.php
[1]: http://cn.php.net/manual/en/memcached.sessions.php
[2]: http://livebookmark.net/memcachephp/memcachephp.zip