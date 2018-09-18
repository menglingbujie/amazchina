# AmazChina System

> 这是一个文章管理平台。

[线上地址](https://www.amazchina.com)

#### 编译工具

``` bash

# Clone project
git clone https://github.com/menglingbujie/amazchina.git

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:5000
npm run dev
npm run server

# build for production with minification
npm run release

# build for production and view the bundle analyzer report
npm run repease --report
```
#### 目录结构

````
- public 开放目录
  - dist 前端编译目录（对应web目录下的编译）
  - assets 资源目录
    - css 服务器样式（less中间件样式编译目录）
    - fonts 字体
    - images 服务器图片
    - js 服务器js源文件
    - plugins 服务器js拓展源文件
- gulp 前端代码构建目录
- server 前端服务器目录
  - bin 启动
  - lang 语言
  - less 前端页面样式源文件
  - routes 路由
  - services 服务拓展插件
  - views 视图
- web 前端项目文件
  - styles 样式
  - asset 图片，字体，音视频资源
  - components # vue-element-admin组件目录
  - icons 图标文件
  - utils 脚手架
  - mixins # vue混合
  - api # RESTful API
  - views # vue-element-admin项目视图（演示用） 
  - 自定义组件目录（包含自己的router，stores）
````

Copyright (c) 2018-present www.amazchina.com


