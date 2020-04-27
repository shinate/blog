---
layout: post
status: publish
published: true
title: tar命令不完全总结
author:
  display_name: "莳子"
  login: admin
  email: shine.wangrs@gmail.com
  url: http://codante.org
author_login: admin
author_email: shine.wangrs@gmail.com
author_url: http://codante.org
excerpt: tar命令详细的介绍与测试，包括排除式打包、增量备份等实际操作。
wordpress_id: 63
wordpress_url: http://codante.org/?p=63
date: '2010-06-30 11:41:24 +0800'
date_gmt: '2010-06-30 03:41:24 +0800'
---

感谢老男孩赐予的知识。 老男孩（QQ:49000448， mail:49000448@qq.com）

## 常用选项

```bash
-z, --gzip, --ungzip
#filter the archive through gzip||调用gzip来压缩归档文件，与-x联用时调用gzip完成解压缩
-c, --create
#create a new archive ||建立新的归档文件
-v, --verbose
#verbosely list files processed||处理过程中输出相关信息
-f, --file [HOSTNAME:]F
#use archive file or device F (default "-", meaning stdin/stdout)||对普通文件操作
-x, --extract, --get
#extract files from an archive||从归档文件中解出文件
-j, --bzip2
#filter archive through bzip2, use to decompress .bz2 files||用GNU的bzip2压缩文件或解压
-C, --directory DIR
#change to directory DIR
--exclude PATTERN
#exclude files based upon PATTERN
-X, --exclude-from FILE
#exclude files listed in FILE
-Z, --compress, --uncompress
#filter the archive through compress||调用compress来压缩归档文件，与-x联用时调用compress完成解压缩
-N, --after-date DATE, --newer DATE
#only store files newer than DATE
```

## 举例

不同方法对应不同的解压方式

### 方法1 (tar.gz)

```bash
#打包
tar zcvf test.tar.gz ./test
#解压
tar zxvf test.tar.gz
```

### 方法2 (tar.bz)

```bash
#打包
tar jcvf test.tar.bz ./test
#解压
tar jxvf test.tar.bz
```

### 错误的例子

命令必须对应相应的包，否则无法解压。

```bash
tar zxvf test.tar.bz
```

报错：
gzip: stdin: not in gzip format
tar: Child returned status 1
tar: Error exit delayed from previous error

```bash
tar jxvf test.tar.gz
```

报错：
bzip2: (stdin) is not a bzip2 file.
tar: Child returned status 2
tar: Error exit delayed from previous errors

### 指定解压路径(参数 -C)

```bash
tar jxvf test.tar.bz -C /home/rhy/
tar zxvf test.tar.gz -C /home/rhy/
```

### 排除式打包(参数 -X)

```bash
#man tar:
--exclude PATTERN
#exclude files based upon PATTERN
-X, --exclude-from FILE
#exclude files listed in FILE
```

#### 测试准备

```bash
cd /
mkdir -p /test/baoliu
mkdir -p /test/paichu
touch exceptlist;echo "paichu"&gt;exceptlist
```

#### 测试开始

**--exclude** 参数

```bash
cd /
tar zcvf  paichu.tar.gz ./test --exclude=test/paichu
./test/
./test/baoliu/
```

**-X** 参数

```bash
cd /
cat exceptlist
paichu
tar zcvfX paichuX.tar.gz /exceptlist ./test
./test/
./test/baoliu/
```

### 增量备份(参数 -N)

```bash
#自00点以来的新文件。
tar -N $(date -d yesterday +%F) zcvf a.tar.gz ./a
#自2009-09-26以来的新文件
tar -N 2009-09-26 zcvf a.tar.gz ./a
```