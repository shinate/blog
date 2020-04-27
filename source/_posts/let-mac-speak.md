---
layout: post
title: 在命令行让MAC说话唱歌
---

## 调用say

```bash
/usr/bin/say 那啥那啥啥
```

## 参数

```bash
# -v 选择声音，默认是Siri(say -v Samantha)
# -o 输出为音频文件，(say -v Cellos -o "xxx.m4a")
```

## 写脚本的时候为了兼容linux系统，可以包个方法

```bash
function VT (){
    if [[ (-f /usr/bin/say) && (-n "${1}") ]]; then
        /usr/bin/say "${1}"
    fi
}
```
