---
title: 在nginx中使用lua-nginx-module
date: 2020-04-26 14:39:38
categories:
- 研发之路
- 服务器
tags:
- linux
- nginx
- lua

---

## 工作顺序

![](http://static.0.codante.org/d/a/da95f6c82ae4ec3f5666fd78b03f8f326d9e7337.png)

## 基本知识点

```lua
ngx.say() -- 直接输出到响应response
ngx.log() -- 打印到日志

ngx.var.* -- 指向到nginx种的变量(以"$"为首的全部变量皆可调用或修改)，在lua里不需要加"$"
```

```content_by_lua[_file|_block]``` 与 proxy_pass 只能同时一者生效，所以如果预处理后仍要发往其他backend需要使用 ```access_by_lua[_file|_block]```

## ngxin 配置

```
server {
  location /example {
    set $methoded_url '';
    access_by_lua_file 'path to lua file';
    #echo $methoded_url;

    proxy_buffering off;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_http_version 1.1;
    proxy_pass http://127.0.0.1:8080/$methoded_url;

    header_filter_by_lua_file 'path to lua file';
    body_filter_by_lua_file 'path to lua file';
  }
}
```

## 请求预处理

```access_by_lua[_file|_block]```

```lua
ngx.req.read_body()

-- 获取POST参数
local args, err = ngx.req.get_post_args()
-- 清空body，清理原始提交中的所有post
--ngx.req.set_body_data('')
ngx.req.discard_body()
if err == "truncated" then
    -- one can choose to ignore or reject the current request here
    ngx.status = ngx.HTTP_FORBIDDEN
    ngx.exit(ngx.HTTP_FORBIDDEN)
end

if not args then
    ngx.status = ngx.HTTP_FORBIDDEN
    ngx.exit(ngx.HTTP_FORBIDDEN)
end

--for key, val in pairs(args) do
--    if type(val) == "table" then
--        ngx.say(key, ": ", table.concat(val, ", "))
--    else
--        ngx.say(key, ": ", val)
--    end
--end

-- 获取参数
local method = nil
local paramStr = ""
local ft = 0

-- 将post参数连入get
local function P(k, v)
    if ft == 0 then
        paramStr = paramStr .. '?'
    else
        paramStr = paramStr .. '&'
    end
    paramStr = paramStr .. k .. '=' .. v
    ft = ft + 1
end

-- 除了method，其他的参数原样抛POST
for key, val in pairs(args) do
    if key == 'method' then
        method = val
        --else
        ----if val ~= nil and val ~= '' then
        ----    val = util.url_encode(val)
        ----end
        --if key ~= 'timestamp' then
        --    P(key, val)
        --end
    end
end

-- 设定nginx中的 $methoded_url
ngx.var.methoded_url = method .. paramStr

-- 如果外部使用proxy_pass，原始的post依然会带过去，除非这里做body的清空
```

## 响应处理（过滤器）

### 头处理

```header_filter_by_lua[_file|_block]```

```lua
ngx.header['content-length'] = nil
ngx.header["Content-Type"] = "application/json"
```
### 内容处理

```body_filter_by_lua[_file|_block]```

```lua
local cjson = require("cjson")

-- 获取相应状态，来自proxy_pass同样有效
local status = ngx.status
local chunk, eof = ngx.arg[1], ngx.arg[2]
chunk = chunk or ''

local function res_json(errCode, errMsg)
    local res = {}
    res["success"] = false
    res["errCode"] = errCode
    res["errMsg"] = errMsg
    return cjson.encode(res)
end

if status ~= 200 then
    -- 只有在遇到末尾时才输出
    if eof then
        ngx.arg[1] = res_json(20, '接口请求失败:' .. chunk)
    else
        -- ngx.ctx.buffered = nil
        ngx.arg[1] = nil -- 这里是为了将原本的输出不显示
    end
end

ngx.status = ngx.OK
```

**修改 ```ngx.arg[1]``` 会改变输出内容，但经常出现输出两次的情况，是因为在输出流的末尾会有一个空的输出，可用 ```ngx.arg[2]``` 存在的情况进行判断。**

**输出的时候 如果需要改变状态码，如，直接退出 ```ngx.exit(ngx.OK)``` 必须同时修改 ```ngx.status```**

[https://github.com/openresty/openresty](https://github.com/openresty/openresty)
[https://github.com/openresty/lua-nginx-module](https://github.com/openresty/lua-nginx-module)