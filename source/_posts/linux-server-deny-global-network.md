---
title: 禁止外网ssh登录LINUX服务器
date: 2018-07-13 13:57:00
tags:
- Linux
categories:
- 研发之路
- 服务器
---

公司搭建vpn后，要控制外网ssh登录服务器。

用```/etc/hosts.allow```，```/etc/hosts.deny```控制

当```/etc/hosts.allow```与```/etc/hosts.deny```中有相同项时，以```hosts.deny```为准。

### 允许内网登录

```bash
vim /etc/hosts.allow

sshd:10.0.5.0/255.255.255.0  ###sshd服务，允许10.0.5.0网段登录
```

hosts.allow格式：（服务：ip段）

### 禁止其它ip段登录

```bash
vim /etc/hosts.deny

sshd:all
```

以上配置即可达到允许10.0.5.0内网段登录，禁止外网ssh登录

**openvpn，两台电脑用相同的证书登录，会出现断断续续的情况。**