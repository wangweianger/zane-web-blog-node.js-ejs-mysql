import path from 'path'

// 系统配置
export let SYSTEM = {
	//允许调用接口的域名，用来检测防盗链
	ORIGIN: 'http://127.0.0.1:18090',

	// HTTP服务器端口号
	PROT: 18090,
	
	// 分页条数
	PAGESIZE: 20,

	DEBUG: false,

	BASEIMG: 'http://ormfcl92t.bkt.clouddn.com/',

	//限制文件上传大小 500kb
	FILESIZE:512000,

	// 七牛云JDK
	QINIU:{
		ACCESS_KEY:'xxxxxxxxxxxxxxx',
		SECRET_KEY:'xxxxxxxxxxxxxxx'
	},

	// 极验验证JDK
	GTSDK:{
		GETTEST_ID:'xxxxxxxxxxxxxxx',
		GETTEST_KEY:'xxxxxxxxxxxxxxx'
	},

	// 后台登录用户密码 （未使用数据库）
	USERMSG:{
		USERNAME:'admin',
		PASSWORD:'123456'
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