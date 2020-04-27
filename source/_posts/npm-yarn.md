---
title: npm-yarn
date: 2018-11-27 15:29:03
categories:
- 研发之路
- 前端
tags:
- node.js
- javascript
- 工具
---

|NPM|YARN|说明|
|---|---|---|
|npm init|yarn init|初始化某个项目|
|npm install/link|yarn install/link|从package.json安装全部依赖项目|
|npm install * --save|yarn add *|安装某个依赖项目，并且默认保存到package.json|
|npm uninstall * --save|yarn remove *|移除某个依赖项目|
|npm install * --save-dev|yarn add * --dev|安装某个开发时依赖项目|
|npm update * --save|yarn upgrade *|更新某个依赖项目|
|npm install * --global|yarn global add *|安装某个全局依赖项目|
|npm publish/login/logout|yarn publish/login/logout|发布/登录/登出，NPM Registry操作|
|npm run/test|yarn run/test|运行某个命令|