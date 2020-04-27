---
title: 最近玩 Vue 的心得和收集的一些技巧
date: 2019-01-04 11:02:05
tags:
---

## 动态组件的强制数据渲染

**dynamic component vue force re-render**

问题：切换组件时re-render，变数据时却不

解决：表明唯一身份，加个 ```:key``` 参数

```html
<component ... :key="{MyMethod()}"></component>
```

```javascript
MyMethod(){
    return +new Date
}
```

PS：**$forceUpdate是没用的，因为根本没有更新props**

[https://cn.vuejs.org/v2/guide/list.html#key]()

## 生命周期

[Vue Parent and Child lifecycle hooks](https://medium.com/@brockreece/vue-parent-and-child-lifecycle-hooks-5d6236bd561f)

![](http://static.0.codante.org/e/3/e3c6e4b2a540c0ce4833c14c4f275804892ffa8b.png)

## 这图很有用

![](http://static.0.codante.org/a/f/af4260b93777258e321ce7a2ca1d288e2f9e3e3c.png)