#使用koa.js和mysql搭建的个人博客

* > 项目采用 koa2+gulp+mysal 搭建的一套后台集成模板
* > 项目通过gulp-nodemon 实时编译刷新node服务

### 阿里云部署说明
http://blog.seosiwei.com/detail/6

### node.js+mysql推荐开发库，让开发更简单
https://github.com/wangweianger/mysqls

### 博客新增https解析
https://blog.seosiwei.com/detail/29

### 说明

```
	项目使用babel编译
	项目通过gulp-nodemon 实时编译刷新node服务
	提供了mysql的封装函数 和案例 （我自己开发使用时做的）
	提供了邮件发送 nodemailer 配置
```

### 博客技术栈
```
前端：node.js+ejs+vue.js+es6+sass+jquery+gulp
后端：node.js+redis+mysql+koa2+koa-router
第三方JDK|插件说明：七牛云JDK、极验验证JDK、nodemailer JDK、mysql2、wangEdito.js
域名开启https访问
http协议采用http2.0版本
首页list列表、详情页数据使用redis缓存

```

##运行方式
```
	开发环境：npm run dev

	打包：npm run build

	启动项目：npm run server

	pm2启动方式：npm run pm2

```

### Demo 图

![PC首页](https://git.oschina.net/uploads/images/2017/0930/161445_c95a96ed_818875.png "在这里输入图片标题")
![后台](https://git.oschina.net/uploads/images/2017/0930/161451_fa7646d9_818875.png "在这里输入图片标题")
![移动端](https://git.oschina.net/uploads/images/2017/0930/161455_9b5ef5a8_818875.png "在这里输入图片标题")

