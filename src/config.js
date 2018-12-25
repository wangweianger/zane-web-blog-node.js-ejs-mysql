import path from 'path'
let PROT = 18090;

// ORIGIN参数匹配是否是https
const IS_HTTPS = process.env.IS_HTTPS || 'FALSE'
let ORIGIN = `http://127.0.0.1:${PROT}`
if(IS_HTTPS == 'TRUE') ORIGIN = `https://127.0.0.1:${PROT}`
	
// 系统配置
export let SYSTEM = {
	//允许调用接口的域名，用来检测防盗链
	ORIGIN: ORIGIN,

	// HTTP服务器端口号
	PROT: PROT,
	
	// 分页条数
	PAGESIZE: 30,

	DEBUG: false,

	BASEIMG: '//cdn.seosiwei.com/',

	//限制文件上传大小 500kb
	FILESIZE:512000,

	// 极验验证秘钥
	GEETEST:{
		ID:'xxxxxx',
		KEY:'xxxxxx'
	},

	// 骑牛云JDK
	QINIU:{
		BUCKET:'xxxxxx',  //存储空间名
		ACCESS_KEY:'xxxxxx',
		SECRET_KEY:'xxxxxx'
	},

	USERMSG:{
		USERNAME:'xxxxxx',
		PASSWORD:'xxxxxx'
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

	// 是否等待连接
	WAITFORCONNECTIONS:false,

	// 链接池大小
	POOLLIMIT:5,

	// 排队限制数量
	QUEUELIMIT:0,
}

export let NODEMAILER = {
	// SMTP服务提供商域名
	HOST: '163',
	// 用户名/用户邮箱
	USER: 'xxx@163.com',
	// 邮箱密码
	PASSWORD: '132456',
}