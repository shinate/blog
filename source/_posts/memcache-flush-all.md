---
layout: post
title: Memcache 数据刷新
---

```
telnet 127.0.0.1 11211
```

输入指令```flush_all```

也可以一行指令解决

```bash
echo "flush_all" | nc 127.0.0.1 11211
```