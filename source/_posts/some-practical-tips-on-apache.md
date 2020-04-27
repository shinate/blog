---
layout: post
status: publish
published: true
title: 关于apache的一些实用技巧
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
excerpt: "关于apache的一些实用技巧，看了几个版本的翻译，不是白字先生就是翻译有偏差，只好自己修改了份。对英文不是很有爱，感谢偶老婆的帮助^ ^"
wordpress_id: 58
wordpress_url: http://codante.org/?p=58
date: '2010-06-28 16:04:01 +0800'
date_gmt: '2010-06-28 08:04:01 +0800'
---

原文地址: [http://www.petefreitag.com/item/505.cfm][0]

## 隐藏Apache的版本号

另外包括一些其他的信息
apache的默认设置公开了apache的版本号，操作系统，甚至还有已经安装了的apache组件。黑客们会利用这些信息更方便的去攻击你。并且，这些信息告诉了所有人：你的apache并没有经过配置
你可以在httpd.conf文件中，加上或者修改两条代码，隐藏信息。

```ini
ServerSignature Off
ServerTokens Prod
```

ServerSignature apache生成的一些页面底部,比如404页面,文件列表页面等等。
ServerTokens指向被用来设置Server的http头回响。设置为Prod可以让HTTP头回响显示成这样....
Server: Apache
如果是个超级偏执狂，你可以修改源代码或者使用mod_security，来显示比Apache更多的东西.

## 确定运行apache的用户组

很多apache安装之后他们是运行在nobody之下的。所以,每个运行在nobody之下的apache，将会被同组的邮件服务器攻击。所以

```bash
chown -R apache.apache /webserver/apache2/
```

编辑httpd.conf

```ini
User apache
Group apache
```

## 确认根目录的东西是关闭的

我们不希望apache有修改根目录的权限。 所以，建议你所有的网站都放在一个目录下面(我们称为/web，你可以象这样设置:

```ini
Order Deny,Allow
Deny from all
Options None
AllowOverride None
```

由于设置了Options None 和AllowOverride None，这将关闭options权限和覆盖权限，你现在必须为每个文件夹加上独立的配置，为他们恢复Option和Override权限。

```ini
Order Allow,Deny
Allow from all
```

## 关闭文件夹浏览

你可以在httpd.conf的Directory标签中间加上一个Options指令。 设置Options为None或者-Indexes

```ini
Options -Indexes
```

## 关闭服务器的side includes

也要添加一条Optoions指令到Directory 标签中, 使Options 为 None或者-Includes

```ini
Options -Includes
```

## 关掉CGI

如果你不用CGI,那就在Directory标签中加上一条Options指令关掉他。 使Options为None或者-ExecCGI

```ini
Options -ExecCGI
```

## 禁用伪链接

只允许访问真实的地址
也是在directory中修改Options 为 -FollowSymLinks

```ini
Options -FollowSymLinks
```

## 关闭多选项

关闭所有选项

```ini
Options None
```

关闭几个选项

```ini
Options -ExecCGI -FollowSymLinks -Indexes
```

## 关闭 .htaccess 文件的支持

也在Directory标签中，但是AllowOverride指令

```ini
AllowOverride none
```

如果你需要Overrides，需要确认他们不能被下载。改变他们的文件名，而不是原来的.htaccess, 比如可以改为.httpdoveride, 或者屏蔽所有的.ht开头的文件。

```ini
AccessFileName .httpdoverride
Order allow,deny
Deny from all
Satisfy All
```

## 运行 mod_security

mod_security 是一个非常好用的Apache组件.
通过mod_security你可以达到以下效果:
1. 简单的过滤
2. 正则表达式过滤
3. URL 编码验证
4. Unicode编码验证
5. 核查
6. Null值攻击预防
7. 上传大小限制
8. 服务器身份掩藏
9. 内置Chroot支持

## 关掉一些不需要的组件

去[module documentation][1] 看一下你到底需要哪些组件. 好多时候你会发现，你并不需要...。
一行一行去查找你的httpd.conf里是否包含LoadModule, 可以用\#放在行首去关闭组件。 如果象搜索组件，可以运行:

```bash
grep LoadModule httpd.conf
```

这里有些组件常常打开的，但是不需要。

```ini
mod_imap,mod_include,mod_info,mod_userdir,mod_status,mod0cgi,mod-autoindex.
```

## 限制目录权限

root有阅读apache配置文件和bin文件的权限。

```bash
chown -R root:root /usr/local/webserver/apache2
chmod -R o-rwx /usr/local/webserver/apache2
```

## 减少Timeout值

默认设置timeout指令是300秒。 你可以减小他，以预防一些潜在攻击。

```ini
Timeout 45
```

## 减小最大请求

apache有很多指令来减小请求数，一个很好的指令是LimitRequestBody指令。 这条指令默认设置是无限的。 如果你想设置上传文件不能超过1MB， 你可以这样写:

```ini
LimitRequestBody 1048567
```

如果不允许问文件上传。你可以设得更小。
其他得指令，可以看看LimitRequestFields,LimitrequestFieldSize , LimitRequestLine. 这些指令都是默认设置。但是你必须去优化他们，成为你需要的。 可以看看这个[文档][2]

## 限制XML body区的大小

如果你运行了mod_dav,你会希望限制XML 请求的body大小。 LimitXMLRequestBody指令只有在Apache2中有。 并且他的默认值是1个millon字节大小，大约1M, 很多教材上说这里设置为0比较好，这就意味着多大的文件都可以上传，如果你需要上传大文件的话。 但是如果你简单的改变一下控制。 你可以大概的设置成10MB

```ini
LimitXMLRequestBody 10485760
```

## 限制并发

apache有些设置可以限制并发请求。MaxClients就是服务器能承受的最大用户值。
其他的指令比如MaxSpareServers，MaxRequestsPerChild, Apache2上的 ThreadsPerChild,ServerLimit,和MaxSpareThreads 和你的系统硬件配置的配合都是很重要的。

## IP限制地址段

如果你有一些资源只能给特定的网段使用...176。16.0.0--176.16.0.16

```ini
Order Deny,Allow
deny from all
Allow from 176.16.0.0/16
```

或者也可以限定单一IP

```ini
Order Deny,Allow
Deny from all
Allow from 127.0.0.1
```

## 调整KeepAlive(永久保持)设置

```ini
MaxKeepAliveRequests --> 100  (你需要的数)
KeepAliveTimeout --> 15  (你需要的数)
```

## 在Chroot环境运行apache

chroot allows you to run a program in its own isolated jail. This prevents a break in on one service from being able to effect anything else on the server.
It can be fairly tricky to set this up using chroot due to library dependencies. I mentioned above that the mod_security module has built in chroot support. It makes the process as simple as adding a mod_security directive to your configuration:
SecChrootDir /chroot/apache
There are however some caveats however, so check out the docs for more info.

[0]: http://www.petefreitag.com/item/505.cfm
[1]: http://httpd.apache.org/docs/2.0/mod/
[2]: http://httpd.apache.org/docs/2.0/mod/core.html