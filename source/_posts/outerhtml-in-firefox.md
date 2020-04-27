---
layout: post
status: publish
published: true
title: FireFox中的outerHTML
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
wordpress_id: 528
wordpress_url: http://codante.org/?p=528
date: '2011-02-28 22:38:36 +0800'
date_gmt: '2011-02-28 14:38:36 +0800'
---

此方法是直接将outerHTML添加为HTMLElement的动态方法，可供直接调用。

```javascript
if (document.body.__defineGetter__) {
   if (HTMLElement) {
          var element = HTMLElement.prototype;
          if (element.__defineGetter__) {
                 element.__defineGetter__("outerHTML",
                       function () {
                              var parent = this.parentNode;
                              var el = document.createElement(parent.tagName);
                              el.appendChild(this);
                              var shtml = el.innerHTML;
                              parent.appendChild(this);
                              return shtml;
                       }
                 );
          }
   }
}
```