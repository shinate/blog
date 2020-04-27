---
layout: post
status: publish
published: true
title: SVN安装及配置流程
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
excerpt: "安装及配置的过程比较简单，32位与64位系统安装时略有不同，本文主要介绍linux下svn服务器的安装配置及部署到apache的过程。"
wordpress_id: 41
wordpress_url: http://codante.org/?p=41
date: '2010-06-22 10:09:10 +0800'
date_gmt: '2010-06-22 02:09:10 +0800'
---

## 卸载系统自带的svn

```bash
rpm -e --allmatches subversion
```

## 安装apr

```bash
wget http://apache.mirror.phpchina.com/apr/apr-1.3.5.tar.gz
./configure
make
make install
```

## 安装apr-util

```bash
wget http://apache.mirror.phpchina.com/apr/apr-util-1.3.7.tar.gz
./configure --with-apr=/usr/local/apr
make
make install
```

## 安装subversion

```bash
wget http://subversion.tigris.org/downloads/subversion-1.4.5.tar.gz
./configure \
--with-apxs=/usr/local/webserver/apache_web_001/bin/apxs \
--prefix=/usr/local/subversion \
--with-apr=/usr/local/apr/bin/apr-1-config \
--with-apr-util=/usr/local/apr/bin/apu-1-config \
--with-ssl \
--with-zlib \
--enable-maintainer-mode \
--bindir=/usr/bin/ LDFLAGS="-L/usr/lib64 -L/lib64"
make
make install
```

* 如果使用的是64位系统，一定要加上这句 **- -bindir=/usr/bin/ LDFLAGS="-L/usr/lib64 -L/lib64"**

## 安装apache

```bash
wget http://apache.etoak.com/httpd/httpd-2.2.11.tar.gz
./configure \
--prefix=/usr/local/webserver/apache_svn \
--enable-dav \
--enable-modules=so \
--enable-maintainer-mode --enable-rewrite \
--with-apr=/usr/local/apr/bin/apr-1-config \
--with-apr-util=/usr/local/apr/bin/apu-1-config
make
make install
```

* 一定要加上 **- -enable-dav**，后面配置svn的时候会用到
[更多关于apache的安装及配置][0]

## 配置

### 修改httpd.conf

添加以下信息

```ini
LoadModule dav_svn_module modules/mod_dav_svn.so
LoadModule authz_svn_module modules/mod_authz_svn.so
```

在末尾添加

```ini
<Location /svn>
  DAV svn
  SVNParentPath /home/nuptsoft/subversion_project  (此处配置你的版本库根目录)
  AuthType Basic
  AuthName "Subversion repository"  （此处字符串内容修改为提示对话框标题）
  AuthUserFile /home/nuptsoft/passwd    (此处修改为访问版本库用户的文件，用apache 的 htpasswd命令生成)
  AuthzSVNAccessFile /home/nuptsoft/auth （此处修改为访问版本库权限的文件）
  Require valid-user
</Location>
```

### 创建版本库目录

```bash
svnadmin create /home/nuptsoft/subversion_project/test
```

### 添加用户和密码

运行apache的htpasswd

```bash
/usr/local/webserver/apache_svn/bin/htpasswd -cm /home/nuptsoft/passwd admin
/usr/local/webserver/apache_svn/bin/htpasswd -m /home/nuptsoft/passwd somebody
```

第一次执行要加参数 **c** 来建立文件

### svn项目权限分配

通过修改auth文件来配置权限
用户组格式：

```ini
[groups]
<用户组名> = <用户1>,<用户2>
```

其中，1个用户组可以包含1个或多个用户，用户间以逗号分隔。
版本库目录格式：

```ini
[<版本库>:/项目/目录]
@<用户组名> = <权限>
<用户名> = <权限>
```

其中，方框号内部分可以有多种写法:

/,表示根目录及以下。根目录是svnserve启动时指定的，我们指定为/opt/svndata。这样，/就是表示对全部版本库设置权限。

repos1:/,表示对版本库1设置权限

repos2:/abc, ,表示对版本库2中的abc项目设置权限

repos2:/abc/aaa, ,表示对版本库2中的abc项目的aaa目录设置权限

权限主体可以是用户组、用户或*，用户组在前面加@，*表示全部用户。权限可以是w、r、wr和空，空表示没有任何权限。


示例：

```
[groups]
admin = alan
[/]
@admin = rw
[repos1:/abc/aaa]
somebody = rw
[repos2:/pass]
somebody =
```

## 附1：与CVS对比

在SVN之前，CVS是使用最广泛的版本管理软件。SVN与CVS对比的优点如下：
* 统一的版本号。CVS是对每个文件顺序编排版本号，在某一时间各文件的版本号各不相同。而Subversion下，任何一次提交都会对所有文件增加到同一 个新版本号，即使是提交并不涉及的文件。所以，各文件在某任意时间的版本号是相同的。版本号相同的文件构成软件的一个版本。
* 原子提交。一次提交不管是单个还是多个文件，都是作为一个整体提交的。在这当中发生的意外例如传输中断，不会引起数据库的不完整和数据损坏。
* 重命名、复制、删除文件等动作都保存在版本历史记录当中。
* 对于二进制文件，使用了节省空间的保存方法。（简单的理解，就是只保存和上一版本不同之处）
* 目录也有版本历史。整个目录树可以被移动或者复制，操作很简单，而且能够保留全部版本记录。
* 分支的开销非常小。
* 优化过的数据库访问，使得一些操作不必访问数据库就可以做到。这样减少了很多不必要的和数据库主机之间的网络流量。

## 附2：SVN的发展历史

早在2000年，CollabNet, Inc.就开始召集开发人员开发CVS的替代品。CollabNet 提供一套名为SourceCast协同工作套件，其中的一部分组件是版本控制。 虽然SourceCast使用CVS作为其最初的版本控制系统，但是CVS的种种限制从一开始就处处可见，最后CollabNet明白必须要找到一个更好 的解决方案。不幸的是，至少在免费license中，因为没有更好的选择，CVS已经广泛成为了开源世界中事实上的标准。所以CollabNet决定开发 一个新的版本控制系统，保留CVS的基本特性但去除CVS的bug和不好的特性。
在2000年2月，他们联系《使用CVS开发开源项目》（Open Source Development with CVS）(Coriolis, 1999)的作者Karl Fogel，并征求了他是否愿意在这个新的项目中担任一个角色。巧合的是，当时Karl已经和他的朋友Jim Blandy讨论了一个关于新的版本控制系统的设计。在1995年，这两人就成立了Cyclic Software，一个提供CVS的商业支持的软件公司。虽然他们经营商业服务，但是仍然在每天都在工作中使用CVS。使用CVS的挫折感使得Jim认真 思考更好的方法来管理数据，不但确定名字为"Subversion"，而且完成了Subversion档案库的基础设计。
当CollabNet的电话到来时，Karl立即答应了加入项目中，而且Jim让他的雇主 RedHat Software同意让他在这个项目中不定期工作。CollabNet雇用了Karl和Ben Collins-Sussman，并在5月开始了详细设计工作。在得到了来自CollabNet的Brian Behlendorf、Jason Robbins和Greg Stein（当时是一名活跃在WebDAV/DeltaV规范过程的自由程序员）很多创意的帮助下，Subversion很快地引起了一个活跃开发者社区 的注意。它找出并欢迎很多同样在CVS上受到挫折的社员能来为这个项目做点什么。
Subversion 最初的设计Team定下了几个简单的目标。 它必须在功能上可取代 CVS，也就是说, 所有 CVS 可做到的事, 它都要能够作到。 在修正最明显的瑕疵的同时, 还要保留相同的开发模式。 还有, Subversion 应该要和 CVS 很相像, 任何 CVS 使用者只要花费少许的力气, 就可以很快地上手。
经过十四个月的编码后, Subversion 于2001年8月31日开始实现 "自行管理"。 也就是说, 开发人员不再使用 CVS 来管理 Subversion 的代码, 而以 Subversion 自己来管理。

[0]: /blog/2010/06/23/apache-install-and-configuration.html