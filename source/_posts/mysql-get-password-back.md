---
layout: post
title: Mysql数据库丢失root密码恢复
date: 2010-06-07 09:10:55 +0800
categories:
- 研发之路
- 服务器
tags:
- mysql
---

如果不小心把MySQL root的密码弄丢，或是在修改初始密码时忘记了新的密码，无需重装MySQL，下面就是具体的解决方案。

```bash
###############################
# Mysql 数据库丢失root密码恢复 #
###############################

############################################################
# Purpose: recover mysql root password
#
# USER          YYYY-MM-DD -- ACTION
# Oldboy        2009-10-24 -- Created
# QQ:49000448   老男孩       mail:49000448@qq.com
############################################################
```

### 单实例

```bash
killall mysqld
mysqld_safe --skip-grant-tables &
mysql -u root -p
```

### 多实例

```bash
killall mysqld
mysqld_safe --defaults-file=/data/3306/my.cnf  --skip-grant-table &
mysql -u root -p -S /data/3306/mysql.sock
```

## 跳过验证启动mysql

### 登陆后修改密码

```bash
mysql> UPDATE mysql.user SET password=PASSWORD("新密码") WHERE user='root';
Query OK, 2 rows affected (0.00 sec)
Rows matched: 2  Changed: 2  Warnings: 0
mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.00 sec)
mysql> quit
Bye
```

### 重起mysql登陆测试(多实例修改密码后测试)

```bash
/data/3306/mysql restart
[root@ryan01 3306]# mysql -u root -p新密码 -S /data/3306/mysql.sock
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 1
Type 'help;' or '\h' for help. Type '\c' to clear the buffer.
mysql>;
```