import path from 'path'

// 系统配置
export let SYSTEM = {
	//允许调用接口的域名，用来检测防盗链
	ORIGIN: 'https://127.0.0.1:18090',

	// HTTP服务器端口号
	PROT: 18090,
	
	// 分页条数
	PAGESIZE: 30,

	DEBUG: false,

	// 七牛云上传图片根路径 
	BASEIMG: 'http://xxx.com/',

	//限制文件上传大小 500kb
	FILESIZE:512000,

	// 极验验证秘钥
	GEETEST:{
		ID:'xxxxxx',
		KEY:'xxxxxx'
	},

	// 骑牛云JDK
	QINIU:{
		BUCKET:'zane',  //存储空间名
		ACCESS_KEY:'xxxxxx',
		SECRET_KEY:'xxxxxx'
	},

	USERMSG:{
		USERNAME:'admin',
		PASSWORD:'123456789'
	}

}

export let DB = {
	// 服务器地址
	HOST: 'localhost',

	// 数据库端口号     
	PROT: 3306,

	// 数据库用户名              
	USER: 'root',

	// 数据库密码    
	PASSWORD: '123456',

	// 数据库名称    
	DATABASE: 'zane_web_front',

	// 默认"api_"
	PREFIX: 'web_'
}

export let NODEMAILER = {
	// SMTP服务提供商域名
	HOST: '163',
	// 用户名/用户邮箱
	USER: 'xxx@163.com',
	// 邮箱密码
	PASSWORD: '132456',
}