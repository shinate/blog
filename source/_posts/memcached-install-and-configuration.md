---
layout: post
title: memcached安装及配置
excerpt: memcached是一个高性能的、分布式内存对象缓存系统，尽管很通用，但是用来加速WEB应用、降低数据库负载时比较多。memcached可以把数据库的负载降到了几乎没什么事可干的地步，同时为用户提供很快的页面响应速度，更好的资源利用率和更快的数据库存取操作。本文将详细的介绍在Linux系统下memcached的安装与配置过程。
date: '2010-08-06 18:35:57 +0800'
date_gmt: '2010-08-06 10:35:57 +0800'
---

## 优点和缺点

memcached部分实现的是内存空间分配和回收,以及存储服务监听和提供.对于分布式的实现,取决于客户端的使用和构造.我们使用的客户端是完全支持分布式的.只是可能会出现某些问题.
诸如一旦出现网络问题, 网络问题导致某个分布式服务器中的一台失去联系之后,到这台机器恢复正常工作的这段时间内, 写入分布式服务器的数据将基本不可以获取. 可以通过采用分布式hash表的方式解决这个问题.

## 安装 libevent

memcached其实就是个内存管理，所以首先要安装下libevent。

```bash
wget http://www.monkey.org/~provos/libevent-1.4.2-rc.tar.gz
```

```bash
tar zxvf libevent-1.4.2-rc.tar.gz
cd libevent-1.4.2-rc
```

```bash
./configure --prefix=/usr/local/
make
make install
```

### [*1]64位系统

如果系统是64位，需要执行下面的命令，原因见后文。

```bash
ln -s /usr/local/lib/libevent-1.4.so.2 /usr/lib64/libevent-1.4.so.2
```

## 安装memcached

```bash
tar zxf memcached-1.4.5.tar.gz
cd memcached-1.4.5
./configure --prefix=/usr/local/memcached --enable-64bit --with-libevent=/usr/lib64/
```

如果此时没有进行**[*1]**操作，**make test**会报错，但不影响安装。

```bash
make
make install
cp memcached /usr/local/bin/
cp memcached-debug /usr/local/bin/
```

## 启动

```bash
memcached -d -m 1024 -u root -t 64 -r -c 16382 -p 11211
```

**启动成功！**

## 问题

### **[*1]**问题的处理

如果使用的64位系统并且没有执行**[*1]**操作，**启动时**会得到下面的错误。

```
error while loading shared libraries: libevent-1.4.so.2: cannot open shared object file: No such file or directory
```

**使用 "LD_DEBUG=libs /usr/local/memcached/bin/memcached -v" 进行检查**
得到以下结果

```access log
3566: find library=libevent-1.4.so.2 [0]; searching
3566: search cache=/etc/ld.so.cache
3566: search path=/lib64/tls/x86_64:/lib64/tls:/lib64/x86_64:/lib64:/usr/lib64/tls/x86_64:/usr/lib64/tls:/usr/lib64/x86_64:/usr/lib64 (system search path)
3566: trying file=/lib64/tls/x86_64/libevent-1.4.so.2
3566: trying file=/lib64/tls/libevent-1.4.so.2
3566: trying file=/lib64/x86_64/libevent-1.4.so.2
3566: trying file=/lib64/libevent-1.4.so.2
3566: trying file=/usr/lib64/tls/x86_64/libevent-1.4.so.2
3566: trying file=/usr/lib64/tls/libevent-1.4.so.2
3566: trying file=/usr/lib64/x86_64/libevent-1.4.so.2
3566: trying file=/usr/lib64/libevent-1.4.so.2
3566:
/usr/local/memcached/bin/memcached: error while loading shared libraries: libevent-1.4.so.2: cannot open shared object file: No such file or directory
```

可以看出"/usr/local/memcached/bin/memcached: error while loading shared libraries: libevent-1.4.so.2: cannot open shared object file: No such file or directory" 64位系统只会去找lib64下的包，我的处理办法是在lib64下建立个软连接：

```bash
ln -s /usr/local/lib/libevent-1.4.so.2 /usr/lib64/libevent-1.4.so.2
```

此时启动memcached

```bash
memcached -d -m 1024 -u root -t 64 -r -c 16382 -p 11211
```

启动成功

## 安装php支持模块

我下载的是稳定版本

```bash
wget http://pecl.php.net/get/memcache-2.2.5.tgz
tar zxf memcache-2.2.5.tgz
cd memcached-2.2.5
```

执行

```bash
/usr/local/php5/bin/phpize
```

这命令没有加在bin里边-。-，直接运行了。
安装的时候需要指定一下--with-php-config，否则可能会提示找不到路径。

```bash
./configure --enable-memcache --with-php-config=/usr/local/php5/bin/php-config --with-zlib-dir
make
make install
```

提示/usr/local/php5/lib/php/extensions/no-debug-non-zts-20060613/
之前安装eaccelerator.so的时候遇到过，而且在php.ini里边也修改过模块的路径，所以**不用管它**。

```bash
vi /usr/local/Zend/etc/php.ini
```

在最后添加

```
[memcache]
extension=memcache.so
```

重启apache

## 其他修改

加大同时打开文件数

```bash
ulimit -n 10240
```

## 附录

开启了64位参数，可以分配4G以上的内存，如：

```bash
memcached -d -m 6144 -u root -t 64 -r -c 16382 -p 11211
```

可以更改端口：

```bash
memcached -d -m 1024 -u root -t 64 -r -c 16382 -p 11211
memcached -d -m 1024 -u root -t 64 -r -c 16382 -p 11212
memcached -d -m 1024 -u root -t 64 -r -c 16382 -p 11213
```

### 启动参数

```ini
-d 启动deamon模式
-m 最大占用内存，单位为M
-u 运行账户
-t 并发线程数，最好不超过cpu数
-r maximize core file limit
-c 最大可接受并发连接数
-p 监听端口
-l 监听ip
```

### 进程管理

```ini
-d start 启动memcached服务
-d restart 重起memcached服务
-d stop|shutdown 关闭正在运行的memcached服务
-d install 安装memcached服务
-d uninstall 卸载memcached服务
```