---
layout: post
title: 判断 iframe 是否加载完成的完美方法 
---

```javascript
var iframe = document.createElement("iframe");
iframe.src = "http://www.planabc.net";
if (iframe.attachEvent){
iframe.attachEvent("onload", function(){
    alert("Local iframe is now loaded.");
});
} else {
iframe.onload = function(){
    alert("Local iframe is now loaded.");
};
}
document.body.appendChild(iframe);
```