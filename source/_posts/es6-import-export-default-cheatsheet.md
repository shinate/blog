---
title: 【ES6】中的import，export，default
date: 2018-12-13 17:51:59
categories:
- 研发之路
- 前端
tags:
- javascript
- es6
---

![](http://static.0.codante.org/5/6/56470bf3538dfd279f58638cd607ef401196fdbb.png)

## 命名导出

```javascript
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

或者

```javascript
//------ main.js ------
import * as lib from 'lib';

console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5
```

## 默认导出

```javascript
//------ myFunc.js ------
export default function () { ... };

//------ main.js ------
import myFunc from 'myFunc';
myFunc();
```

## 命名 + 默认 导出

```javascript
//------ underscore.js ------
export default function (obj) {
    ...
}
export function each(obj, iterator, context) {
    ...
}
export { each as forEach }

//------ main.js ------
import _, { each } from 'underscore';
...
```

## 环形依赖

```javascript
// lib.js
import Main from 'main';
var lib = {message: "This Is A Lib"};
export { lib as Lib };

// main.js
import { Lib } from 'lib';
export default class Main { 
  // ....
}
```

**参考资料**

[http://2ality.com/2014/09/es6-modules-final.html]()

[https://gist.github.com/vasco3/22b09ef0ca5e0f8c5996#modules]()