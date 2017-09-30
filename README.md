#zane-koa2-restful-api


### 项目采用 koa2+gulp+mysal 搭建的一套后台集成模板

### 项目通过gulp-nodemon 实时编译刷新node服务

### Demo 图

![PC首页](https://git.oschina.net/uploads/images/2017/0930/161445_c95a96ed_818875.png "在这里输入图片标题")
![后台](https://git.oschina.net/uploads/images/2017/0930/161451_fa7646d9_818875.png "在这里输入图片标题")
![移动端](https://git.oschina.net/uploads/images/2017/0930/161455_9b5ef5a8_818875.png "在这里输入图片标题")


### 阿里云部署说明

说明文档地址： http://blog.seosiwei.com/detail/6


### 其他说明
>  * config.js 		正确填写自己的七牛云JDK，七牛云访问根域名    
>  * config.js 		正确填写极验验证JDK秘钥
>  * config.js 		设置用户名和密码
>  * gulpfile.js 	打包时正确替换需要替换的信息      


### 项目目录大致结构
```
	assets    
	build 
		server.js     	项目启动文件 babel 编译
	dist   				打包好的项目文件	
	logs                pm2运行时生成的日志文件
	noode_modules      
	src
		controllers     
			index.js    controller入口文件
			email.js    nodemailer 邮件发送controller
			common.js   公共接口，比如：验证接口来源，检测接口参数，公共用户信息等
			......
		models
		routes
			index.js    路由入口
			......
		tool
			index.js    入口文件
			getsql.js   对mysql 的增删改查 语句的封装
			mysql.js    mysql配置文件
			util.js     工具函数
	.babelrc
	.gitignore
	gulpfile.js         gulp配置
	package.json
	pm2.config.json     pm2配置
	README.md		

```

### 说明

```
	项目使用babel编译
	项目通过gulp-nodemon 实时编译刷新node服务
	提供了mysql的封装函数 和案例 （我自己开发使用时做的）
	提供了邮件发送 nodemailer 配置

```



##运行方式
```
	开发环境：npm run dev

	打包：npm run build

	启动项目：npm run server

	pm2启动方式：npm run pm2

```



