---
layout: post
title: HTTP状态码
date: 2011-11-16 20:03:39 +0800
categories:
- 研发之路
tags:
- http
---

## 常见的

* 200 - OK，服务器成功返回网页
  - Standard response for successful HTTP requests.
* 301 - Moved Permanently（永久跳转），请求的网页已永久跳转到新位置。  
  - This and all future requests should be directed to the given.
* 403 - Forbidden（禁止访问）,服务器拒绝请求  
  - forbidden request (matches a deny filter) =&gt; HTTP 403  
  - The request was a legal request, but the server is refusing to respond to it.
* 404 - Not Found,服务器找不到请求的页面。  
  - The requested resource could not be found but may be available again in the future.
* 500 - Internal Server Error（内部服务器错误）  
  - internal error in haproxy =&gt; HTTP 500  
  - A generic error message, given when no more specific message is suitable.
* 502 - Bad Gateway（坏的网关）,一般是网关服务器请求后端服务时，后端服务没有按照http协议正确返回结果。  
  - the server returned an invalid or incomplete response =&gt; HTTP 502  
  - The server was acting as a gateway or proxy and received an invalid response from the upstream server.
* 503 - Service Unavailable（服务当前不可用）,可能因为超载或停机维护。  
  - no server was available to handle the request =&gt; HTTP 503  
  - The server is currently unavailable (because it is overloaded or down for maintenance).
* 504 - Gateway Timeout（网关超时）,一般是网关服务器请求后端服务时，后端服务没有在特定的时间内完成服务。  
  - the server failed to reply in time =&gt; HTTP 504  
  - The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.

## 其他

* 100 : Continue
* 101 : Switching Protocols
* 102 : Processing
* 200 : OK
* 201 : Created
* 202 : Accepted
* 203 : Non-Authoritative Information
* 204 : No Content
* 205 : Reset Content
* 206 : Partial Content
* 207 : Multi-Status
* 226 : IM Used
* 300 : Multiple Choices
* 301 : Moved Permanently
* 302 : Found
* 303 : See Other
* 304 : Not Modified
* 305 : Use Proxy
* 306 : Reserved
* 307 : Temporary Redirect
* 400 : Bad Request
* 401 : Unauthorized
* 402 : Payment Required
* 403 : Forbidden
* 404 : Not Found
* 405 : Method Not Allowed
* 406 : Not Acceptable
* 407 : Proxy Authentication Required
* 408 : Request Timeout
* 409 : Conflict
* 410 : Gone
* 411 : Length Required
* 412 : Precondition Failed
* 413 : Request Entity Too Large
* 414 : Request-URI Too Long
* 415 : Unsupported Media Type
* 416 : Requested Range Not Satisfiable
* 417 : Expectation Failed
* 422 : Unprocessable Entity
* 423 : Locked
* 424 : Failed Dependency
* 426 : Upgrade Required
* 500 : Internal Server Error
* 501 : Not Implemented
* 502 : Bad Gateway
* 503 : Service Unavailable
* 504 : Gateway Timeout
* 505 : HTTP Version Not Supported
* 506 : Variant Also Negotiates
* 507 : Insufficient Storage
* 510 : Not Extended