---
layout: post
title: Blender 3D 技巧收集
categories:
- 设计之路
tags:
- 3D
- 工具
- blender
---

### Modifiers cannot be applied to multi-user data

Press U \> Objects and Data. Then apply your modifier. Using just Object will make the object a new, separate datablock for the mesh (but will ignore modifiers). However, using Object and Data will make both the objects mesh and it's modifiers a new, separate datablock.

## 骚操作

### 复位变更

- alt + g 清除位移
- alt + s 清除缩放
- alt + r 清除旋转