---
layout: post
title: haproxy设置websocket
date_gmt: 2012-04-17 03:39:56 +0800
categories:
- 研发之路
- 服务器
tags:
- websocket
---

```ini
frontend all 0.0.0.0:80
   timeout client 86400000
   default_backend www_backend
   acl is_websocket hdr(Upgrade) -i WebSocket
   acl is_websocket hdr_beg(Host) -i ws
   use_backend socket_backend if is_websocket
```