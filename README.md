# 体育用品商城-客户端

[![GitHub stars](https://img.shields.io/github/stars/itning/sports-mall-client.svg?style=social&label=Stars)](https://github.com/itning/sports-mall-client/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/itning/sports-mall-client.svg?style=social&label=Fork)](https://github.com/itning/sports-mall-client/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/itning/sports-mall-client.svg?style=social&label=Watch)](https://github.com/itning/sports-mall-client/watchers)
[![GitHub followers](https://img.shields.io/github/followers/itning.svg?style=social&label=Follow)](https://github.com/itning?tab=followers)

[![GitHub issues](https://img.shields.io/github/issues/itning/sports-mall-client.svg)](https://github.com/itning/sports-mall-client/issues)
[![GitHub license](https://img.shields.io/github/license/itning/sports-mall-client.svg)](https://github.com/itning/sports-mall-client/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/itning/sports-mall-client.svg)](https://github.com/itning/sports-mall-client/commits)
[![GitHub release](https://img.shields.io/github/release/itning/sports-mall-client.svg)](https://github.com/itning/sports-mall-client/releases)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/itning/sports-mall-client.svg)](https://github.com/itning/sports-mall-client)
[![HitCount](http://hits.dwyl.io/itning/sports-mall-client.svg)](http://hits.dwyl.io/itning/sports-mall-client)
[![language](https://img.shields.io/badge/language-JAVA-green.svg)](https://github.com/itning/sports-mall-client)

## 架构：
- MySQL 8
- Java 8
- Spring Boot 2
- Vue.JS

## 功能

- 垂直/水平轮播图展示管理
- 商品分类展示管理
- 商品搜索
- 推荐商品管理展示
- 订单管理
- 购物车管理
- 登录注册
- 商品评论展示
- 商品详情信息展示
- 商品介绍跑马灯

## 部署

1. 使用git克隆项目（[Git是什么，如何使用？](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)）

   ```bash
   # 克隆后端文件到本地磁盘
   git clone https://github.com/itning/sports-mall-server
   # 克隆前端文件到本地磁盘
   git clone https://github.com/itning/sports-mall-client
   ```

2. 打开前端文件夹

   安装之前确保你有[node.js](https://nodejs.org/zh-cn/)和[yarn](https://classic.yarnpkg.com/zh-Hans/docs/install/#windows-stable)

   ```bash
   # 如果已经在前端文件夹内了，则不需要这个命令
   cd sports-mall-client
   # 安装依赖
   yarn install
   ```

3. 后端建议使用[idea](https://www.jetbrains.com/idea/)打开本项目，不建议使用Eclipse或MyEclipse

   确保你有[maven](https://maven.apache.org/download.cgi)，并执行编译命令

   ```bash
   mvn clean compile
   ```

   不出意外会出现`BUILD SUCCESS`

4. 数据库密码在哪改？

   [在这](https://github.com/itning/sports-mall-server/blob/master/src/main/resources/application.properties#L22)

5. 前端接口域名在哪改？

   [在这](https://github.com/itning/sports-mall-client/blob/master/src/api/index.js#L1)

6. 登录管理员账户？

   ```sql
   # 先插入管理员账户数据 用户名：admin 密码：admin
   INSERT INTO `mail_user` VALUES ('admin', NULL, 'admin@admin.co', '2020-02-13 11:31:24.451000', '2020-02-13 11:31:24.451000', 'admin', '17588755691', '1');
   ```

7. 运行项目：

   后端[main方法](https://github.com/itning/sports-mall-server/blob/master/src/main/java/com/sport/sportsmallserver/SportsMailServerApplication.java#L9)直接运行

   前端执行以下命令进行开发运行

   ```bash
   yarn serve
   ```

8. 数据库SQL文件？

   JPA自动建库建表不需要SQL文件。

## 项目预览

![a](https://raw.githubusercontent.com/itning/sports-mall-server/master/pic/1.png)

![b](https://raw.githubusercontent.com/itning/sports-mall-server/master/pic/2.png)

![c](https://raw.githubusercontent.com/itning/sports-mall-server/master/pic/3.png)

![d](https://raw.githubusercontent.com/itning/sports-mall-server/master/pic/4.png)

![e](https://raw.githubusercontent.com/itning/sports-mall-server/master/pic/5.png)

![f](https://raw.githubusercontent.com/itning/sports-mall-server/master/pic/6.png)
