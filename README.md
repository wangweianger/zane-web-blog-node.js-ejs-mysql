#zane-koa2-restful-api

### 阿里云部署说明
http://blog.seosiwei.com/detail/6
### 博客效果
http://blog.seosiwei.com/


### 项目采用 koa2+gulp+mysal 搭建的一套后台集成模板

### 项目通过gulp-nodemon 实时编译刷新node服务


### 其他说明
>  * config.js 		正确填写自己的七牛云JDK，七牛云访问根域名    
>  * config.js 		正确填写极验验证JDK秘钥
>  * config.js 		设置用户名和密码
>  * gulpfile.js 	打包时正确替换需要替换的信息      


### 安装使用
```
	git clone https://github.com/wangweianger/zane-web-blog-node.js-ejs-mysql.github.com
	yarn install || npm install
	npm run dev

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


### Demo 图

![PC首页](https://git.oschina.net/uploads/images/2017/0930/161445_c95a96ed_818875.png "在这里输入图片标题")
![后台](https://git.oschina.net/uploads/images/2017/0930/161451_fa7646d9_818875.png "在这里输入图片标题")
![移动端](https://git.oschina.net/uploads/images/2017/0930/161455_9b5ef5a8_818875.png "在这里输入图片标题")
