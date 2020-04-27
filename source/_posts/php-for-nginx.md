---
layout: post
status: publish
published: true
title: PHP for Nginx
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 551
wordpress_url: http://codante.org/?p=551
date: '2011-03-16 20:03:38 +0800'
date_gmt: '2011-03-16 12:03:38 +0800'
---

我用的是5.2.9，所以就以它为例，为了运行为FastCGI模式，需要打上fpm补丁包。
PHP各个版本fpm补丁包下载 [http://php-fpm.org/downloads/][0]

```bash
wget http://cn.php.net/get/php-5.2.9.tar.gz/from/this/mirror
wget http://php-fpm.org/downloads/php-5.2.9-fpm-0.5.10-unofficial.diff.gz
tar zxf php-5.2.9.tar.gz
gzip -cd php-5.2.9-fpm-0.5.10-unofficial.diff.gz | patch -d php-5.2.9 -p1
cd php-5.2.9
./configure \
--prefix=/servers/app/php \
--with-config-file-path=/servers/app/php/etc \
--with-mysql=/usr/local/mysql \
--with-mysqli=/usr/local/mysql/bin/mysql_config \
--with-iconv \
--with-freetype-dir \
--with-jpeg-dir \
--with-png-dir \
--with-zlib \
--with-libxml-dir=/usr \
--enable-xml \
--disable-rpath \
--enable-discard-path \
--enable-safe-mode \
--enable-bcmath \
--enable-shmop \
--enable-sysvsem \
--enable-inline-optimization \
--with-curl \
--with-curlwrappers \
--enable-mbregex \
--enable-fastcgi \
--enable-fpm \
--enable-force-cgi-redirect \
--enable-mbstring \
--with-mcrypt \
--with-gd \
--enable-gd-native-ttf \
--with-openssl \
--with-mhash \
--enable-pcntl \
--enable-sockets \
--with-ldap \
--with-ldap-sasl
make ZEND_EXTRA_LIBS='-liconv'
make install
```

*缺失的库可以尝试用yum进行安装

```bash
yum install libjpeg-devel
yum install libpng-devel
yum install libXpm-devel
yum install libmcrypt-devel
```

等... 看报错信息就好了
然后，复制配置文件到php安装目录中的etc下。

```bash
cp php.ini-dist /servers/app/php/etc/php.ini
```

编辑fpm的文件

```bash
vi /servers/app/php/etc/php-fpm.conf
```

需要修改的不是很多，重新设置一下pid，log，端口，进程数什么的，根据自己机器来定。
放个简洁版的，注释太长，去了。

```xml
<?xml version="1.0" ?>
<configuration>
    <section name="global_options">
        <value name="pid_file">/servers/run/php-fpm-9000.pid</value>
        <value name="error_log">/servers/logs/php-fpm-9000.log</value>
        <value name="log_level">notice</value>
        <value name="emergency_restart_threshold">10</value>
        <value name="emergency_restart_interval">1m</value>
        <value name="process_control_timeout">5s</value>
        <value name="daemonize">yes</value>
    </section>
    <workers>
        <section name="pool">
            <value name="name">default</value>
            <value name="listen_address">127.0.0.1:9000</value>
            <value name="listen_options">
                <value name="backlog">-1</value>
                <value name="owner"></value>
                <value name="group"></value>
                <value name="mode">0666</value>
            </value>
            <value name="php_defines">
                <value name="sendmail_path">/usr/sbin/sendmail -t -i</value>
                <value name="display_errors">0</value>
            </value>
            <value name="user">nginx</value>
            <value name="group">nginx</value>
            <value name="pm">
                <value name="style">static</value>
                <value name="max_children">128</value>
                <value name="apache_like">
                    <value name="StartServers">20</value>
                    <value name="MinSpareServers">5</value>
                    <value name="MaxSpareServers">35</value>
                </value>
            </value>
            <value name="request_terminate_timeout">0s</value>
            <value name="request_slowlog_timeout">0s</value>
            <value name="slowlog">logs/slow.log</value>
            <value name="rlimit_files">65535</value>
            <value name="rlimit_core">0</value>
            <value name="chroot"></value>
            <value name="chdir"></value>
            <value name="catch_workers_output">yes</value>
            <value name="max_requests">1024</value>
            <value name="allowed_clients">127.0.0.1</value>
            <value name="environment">
                <value name="HOSTNAME">$HOSTNAME</value>
                <value name="PATH">/usr/local/bin:/usr/bin:/bin</value>
                <value name="TMP">/tmp</value>
                <value name="TMPDIR">/tmp</value>
                <value name="TEMP">/tmp</value>
                <value name="OSTYPE">$OSTYPE</value>
                <value name="MACHTYPE">$MACHTYPE</value>
                <value name="MALLOC_CHECK_">2</value>
            </value>
        </section>
    </workers>
</configuration>
```

启动fastcgi

```bash
/servers/app/php/sbin/php-fpm start
```


持续。。。
[0]: http://php-fpm.org/downloads/