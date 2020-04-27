---
layout: post
title: Zend Grard 安装及配置
---

### 下载Zend Guard

```bash
cd /home
wget http://downloads.zend.com/guard/5.5.0/ZendGuardLoader-php-5.3-linux-glibc23-i386.tar.gz    #32位
wget http://downloads.zend.com/guard/5.5.0/ZendGuardLoader-php-5.3-linux-glibc23-x86_64.tar.gz  #64位
```

### 安装Zend Guard

```bash
mkdir /usr/zend       #建立Zend Guard安装目录
tar xvfz ZendGuardLoader-php-5.3-linux-glibc23-i386.tar.gz    #解压安装文件
cp ZendGuardLoader-php-5.3-linux-glibc23-i386/php-5.3.x/ZendGuardLoader.so /usr/zend/   #拷贝文件到安装目录
```
      
### 配置Zend Guard

```bash
cp /etc/php.ini    /etc/php.inibak   #修改之前先备份
vi /etc/php.ini    #编辑文件
```

在最后位置添加以下内容

```
[Zend Guard]
zend_extension=/usr/zend/ZendGuardLoader.so
zend_loader.enable=1
zend_loader.disable_licensing=0
zend_loader.obfuscation_level_support=3
```

### 重启php-fpm