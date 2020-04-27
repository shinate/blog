---
layout: post
status: publish
published: true
title: Apache URL Rewriting 技巧及实例
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
excerpt: "这是一个Apache模块mod_rewrite，它是一个真正先进的模块，它提供了对网址强大的操作方式。有了它你可以做几乎所有类型的URL操纵。"
wordpress_id: 71
wordpress_url: http://codante.org/?p=71
date: '2010-07-02 14:47:26 +0800'
date_gmt: '2010-07-02 06:47:26 +0800'
---

## 环境需求

### apache:mod_rewrite

当你的服务器使用apache的时候，需要加载此模块。

### IIS:ISAPI_rewrite

在windows的IIS上也可以实现同样的功能，那么需要安装ISAPI_rewrite。

## RewriteRule基础知识

一个完整的RewriteRule语句分成三个部分
1. 匹配：传入的URL应该受到规则;
2. 替换：匹配的请求被发送;
3. [标志]：影响重写请求。

### 例子

一个完整的文件系统资源路径，它映射请求到你的文件系统的任意位置上，就像Alias指令那样。

```ini
RewriteRule ^/games.* /usr/local/games/web
```

一个网络资源的路径，如果DocumentRoot设置为/usr/local/apache2/htdocs ，那么，这个指令将http://example.com/foo转到路径/usr/local/apache2/htdocs/bar。

```ini
RewriteRule ^/foo$ /bar
```

一个绝对的URL重写，跳转到另一url最直接的办法

```ini
RewriteRule ^/product/view$ http://site2.example.com/seeproduct.html [R]
```

由上面的例子引申出的，括号中的".*"在匹配时赋值给了变量$1，$1可以作为任何匹配到的文字写入到替换规则中。一个请求**http://example.com/product/r14df/view**将被映射到路径**/var/web/productdb/r14df **。

```ini
RewriteRule ^/product/(.*)/view$ /var/web/productdb/$1
```

## RewriteCond重写条件

一个或多个RewriteCond指令可以用来限制RewriteRule的请求类型，它的语句也分为三部分
1. 变量的特征描述、要求；
2. 正则表达式 ，必须符合变量；
3. [标志]，用来描述如何进行匹配。

### 例子

将符合此IP范围内的所有请求发送至域名：

```ini
RewriteCond %{REMOTE_ADDR} ^10\.2\.
RewriteRule (.*) http://intranet.example.com$1
```

当有多个RewriteCond指令时，他们都会被RewriteRule所采用。例:当cookie中含有"go"的时候才处理请求字符串"hack"，否则拒绝，写法：

```ini
RewriteCond %{QUERY_STRING} hack
RewriteCond %{HTTP_COOKIE} !go
RewriteRule .* - [F]
```

注意："!"感叹号是**否定**匹配，也就是说当条件中 cookie没有"go"且请求中含有"hack"，将会遭到拒绝。
在RewriteCond指令中也有像RewriteRule中所用的"$1"、"$2"匹配变量，但写法列有不同，使用的符号是"%"，比如"%1"、"%2"。例：匹配主机名和目录，拼接成新的请求：

```ini
RewriteCond %{HTTP_HOST} (.*)
RewriteRule ^/(.*) /sites/%1/$1
```

如果请求是**http://example.com/foo/bar** ，那么**%1**将包含**example.com**和**$1**将包含**foo/bar**。

## 一些常用的例子

### 简单的替换

这个例子中我们替换`/~user`到`/u/user`和修复缺少末尾的斜杠`/u/user`

```ini
RewriteRule ^/~([^/]+)/?(.*) /u/$1/$2 [R]
RewriteRule ^/([uge])/( [^/]+ )$ /$1/$2/ [R]
```

### 改变根目录

"移动的DocumentRoot"，将站点的根/改写为/e/www/

```ini
RewriteEngine on
RewriteRule ^/$ /e/www/ [R]
```

### 无www的跳转到有www

```ini
RewriteEngine on
RewriteCond %{http_host} ^domain.com [NC]
RewriteRule ^(.*)$ http://www.domain.com/$1 [R=301,NC]
```

还是上面的例子，但是对于/mytest/my目录不跳转，也就是可以直接访问 http://domain.com/mytest/my

```ini
RewriteEngine on
RewriteCond %{HTTP_HOST} ^domain.com [NC]
RewriteCond %{REQUEST_URI} !/mytest/my [NC]
RewriteRule ^(.*)$ http://www.domain.com/$1 [R=301,NC]
```

### 结尾的斜线问题

在通常的情况下，当你访问 /~quux/foo 服务器会认为这是一个文件，它并不是像/~quux/foo/xxx.gif那样实际存在的，也许你只是忘记了加上"/"，但服务器会让你看到一个优雅的错误页面。为了解决这个问题，我们可以这样来写：

```ini
RewriteEngine on
RewriteBase /~quux/
RewriteRule ^foo$ foo/ [R]
```

以上仅仅是针对一个目录的，下面的写法更加的暴力，任何文件甚至都能作为下一级目录的顶端来使用，我们就会看到/~quux/foo/xxx.gif/这种奇异现象

```ini
RewriteEngine on
RewriteBase /~quux/
RewriteCond %{REQUEST_FILENAME}  -d
RewriteRule ^(.+[^/])$ $1/  [R]
```

### 将url的解释权交给某个页面

我们伟达的wordpress就是这么做的，这种方式为我们集中管理各个应用（页面）提供了宝贵的经验和思路。
下面的例子，用语言来解释："**把/后面任何非真实存在的请求全部交给index.php来处理**"
也就是说 http://youdomain.com/**xxx/yyy/zzz/aaa.gif?ccc=ddd**中，域名后面红色加粗的部分 xxx/yyy/zzz/aaa.gif?ccc=ddd 会当做一个字符串，全部交给index.php进行分析与处理。

```ini
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
```

## 参数列表

对rewrite的参数进行了相近的介绍

### 常用的参数

1. **redirect|R [=code]** (强制重定向 redirect)<br>以http://thishost[:thisport]/(使  新的URL成为一个URI) 为前缀的Substitution可以强制性执行一个外部重定向。  如果code没有指定，则产生一个HTTP响应代码302(临时性移动)。  如果需要使用在300-400范围内的其他响应代码，只需在此指定这个数值即可， 另外，还可以使用下列符号名称之一: temp (默认的), permanent, seeother. 用它可以把规范化的URL反馈给客户端，如, 重写``/~''为 ``/u/''，或对/u/user加上斜杠，等等。**注意:** 在使用这个标记时，必须确保该替换字段是一个有效的URL! 否则，它会指向一个无效的位置! 并且要记住，此标记本身只是对URL加上 http://thishost[:thisport]/的前缀，重写操作仍然会继续。 通常，你会希望停止重写操作而立即重定向，则还需要使用'L'标记.

2. **forbidden|F** (强制URL为被禁止的 forbidden)<br>强制当前URL为被禁止的，即，立即反馈一个HTTP响应代码403(被禁止的)。 使用这个标记，可以链接若干RewriteConds以有条件地阻塞某些URL。

3. **gone|G** (强制URL为已废弃的 gone)<br>强制当前URL为已废弃的，即，立即反馈一个HTTP响应代码410(已废弃的)。 使用这个标记，可以标明页面已经被废弃而不存在了.

4. **proxy|P** (强制为代理 proxy)<br>此标记使替换成分被内部地强制为代理请求，并立即(即， 重写规则处理立即中断)把处理移交给代理模块。 你必须确保此替换串是一个有效的(比如常见的以 http://hostname开头的)能够为Apache代理模块所处理的URI。 使用这个标记，可以把某些远程成分映射到本地服务器名称空间， 从而增强了ProxyPass指令的功能。注意: 要使用这个功能，代理模块必须编译在Apache服务器中。 如果你不能确定，可以检查"httpd -l"的输出中是否有mod_proxy.c。 如果有，则mod_rewrite可以使用这个功能； 如果没有，则必须启用mod_proxy并重新编译"httpd"程序。

5. **last|L** (最后一个规则 last)<br>立即停止重写操作，并不再应用其他重写规则。 它对应于Perl中的last命令或C语言中的break命令。 这个标记可以阻止当前已被重写的URL为其后继的规则所重写。 举例，使用它可以重写根路径的URL("/")为实际存在的URL, 比如, "/e/www/".

6. **next|N** (重新执行 next round)<br>重新执行重写操作(从第一个规则重新开始)这时再次进行处理的URL已经不是原始的URL了，而是经最后一个重写规则处理的URL。 它对应于Perl中的next命令或C语言中的continue命令。 此标记可以重新开始重写操作，即, 立即回到循环的头部。**但是要小心，不要制造死循环!**

7. **chain|C** (与下一个规则相链接 chained)<br>此标记使当前规则与下一个(其本身又可以与其后继规则相链接的，并可以如此反复的)规则相链接。 它产生这样一个效果:  如果一个规则被匹配，通常会继续处理其后继规则， 即，这个标记不起作用；如果规则不能被匹配，  则其后继的链接的规则会被忽略。比如，在执行一个外部重定向时， 对一个目录级规则集，你可能需要删除".www"(此处不应该出现".www"的)。

8. **type|T**=MIME-type (强制MIME类型 type)<br>强制目标文件的MIME类型为MIME-type。 比如，它可以用于模拟mod_alias中的ScriptAlias指令， 以内部地强制被映射目录中的所有文件的MIME类型为"application/x-httpd-cgi"。

9. **nosubreq|NS** (仅用于不对内部子请求进行处理 no internal sub-request)<br>在当前请求是一个内部子请求时，此标记强制重写引擎跳过该重写规则。 比如，在mod_include试图搜索可能的目录默认文件(index.xxx)时， Apache会内部地产生子请求。对子请求，它不一定有用的，而且如果整个规则集都起作用， 它甚至可能会引发错误。所以，可以用这个标记来排除某些规则。根据你的需要遵循以下原则: 如果你使用了有CGI脚本的URL前缀，以强制它们由CGI脚本处理， 而对子请求处理的出错率(或者开销)很高，在这种情况下，可以使用这个标记。

10. **nocase|NC** (忽略大小写 no case)<br>它使Pattern忽略大小写，即, 在Pattern与当前URL匹配时，"A-Z" 和"a-z"没有区别。

11. **qsappend|QSA** (追加请求串 query string append)<br>此标记强制重写引擎在已有的替换串中追加一个请求串，而不是简单的替换。 如果需要通过重写规则在请求串中增加信息，就可以使用这个标记。

12. **noescape|NE** (在输出中不对URI作转义 no URI escaping)<br>此标记阻止mod_rewrite对重写结果应用常规的URI转义规则。 一般情况下，特殊字符(如"%", "$", ";"等)会被转义为等值的十六进制编码。 此标记可以阻止这样的转义，以允许百分号等符号出现在输出中，如：

```ini
RewriteRule /foo/(.*) /bar?arg=P1\%3d$1 [R,NE]
```

可以使"/foo/zed"转向到一个安全的请求"/bar?arg=P1=zed"。

13. **passthrough|PT** (移交给下一个处理器 pass through)<br>此标记强制重写引擎将内部结构request_rec中的uri字段设置为 filename字段的值，它只是一个小修改，使之能对来自其他URI到文件名翻译器的 Alias，ScriptAlias, Redirect 等指令的输出进行后续处理。举一个能说明其含义的例子： 如果要通过mod_rewrite的重写引擎重写/abc为/def， 然后通过mod_alias使/def转变为/ghi，可以这样:
  

```ini
RewriteRule ^/abc(.*) /def$1 [PT]
```

Alias /def /ghi如果省略了PT标记，虽然mod_rewrite运作正常， 即，作为一个使用API的URI到文件名翻译器， 它可以重写uri=/abc/...为filename=/def/...， 但是，后续的mod_alias在试图作URI到文件名的翻译时，则会失效。

注意: **如果需要混合使用不同的包含URI到文件名翻译器的模块时， 就必须使用这个标记**。 混合使用mod_alias和mod_rewrite就是个典型的例子。

### For **Apache** hackers

如果当前Apache API除了URI到文件名hook之外，还有一个文件名到文件名的hook， 就不需要这个标记了!  但是，如果没有这样一个hook，则此标记是唯一的解决方案。 Apache Group讨论过这个问题，并在Apache 2.0  版本中会增加这样一个hook。'skip|S=num' (跳过后继的规则 skip)
此标记强制重写引擎跳过当前匹配规则后继的num个规则。 它可以实现一个伪if-then-else的构造: 最后一个规则是then从句，而被跳过的skip=N个规则是else从句. (它和'chain|C'标记是不同的!)

1. **env|E=**VAR:VAL (设置环境变量 environment variable)
  
  此标记使环境变量VAR的值为VAL, VAL可以包含可扩展的反向引用的正则表达式$N和%N。 此标记可以多次使用以设置多个变量。 这些变量可以在其后许多情况下被间接引用，但通常是在XSSI (via &lt;!--\#echo var="VAR"--&gt;) or CGI (如 $ENV{'VAR'})中， 也可以在后继的RewriteCond指令的pattern中通过%{ENV:VAR}作引用。 使用它可以从URL中剥离并记住一些信息。

2. **cookie|CO=**NAME:VAL:domain[:lifetime[:path]] (设置cookie)
  
  它在客户端浏览器上设置一个cookie。 cookie的名称是NAME，其值是VAL。 domain字段是该cookie的域，比如'.apache.org', 可选的lifetime是cookie生命期的分钟数， 可选的path是cookie的路径。