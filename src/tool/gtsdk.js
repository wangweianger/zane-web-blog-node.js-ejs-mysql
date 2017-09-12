import util from './util'
import Geetest from 'gt3-sdk'
import {
    SYSTEM
} from './config'

//config配置
class geetest {

    constructor() {
        //要上传的空间
        this.geetest_id     = SYSTEM.GTSDK.GETTEST_ID;
        this.geetest_key    = SYSTEM.GTSDK.GETTEST_KEY;
        this.captcha        = null;
        this.init()
    }

    init() {
        this.captcha = new Geetest({
            geetest_id: this.geetest_id,
            geetest_key: this.geetest_key
        });
    }

    async register(ctx) {
        return new Promise((resolve, reject)=> {
            this.captcha.register(null,  (err, data) => {
                 if (err) {
                    console.error(err);
                    resolve({})
                    return;
                }
                if (!data.success) {
                    // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
                    // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址
                    // 为以防万一，你可以选择以下两种方式之一：
                    // 1. 继续使用极验提供的failback备用方案
                    // ctx.request.session.fallback = true;
                    ctx.cookies.set('fallback',true)
                    resolve(data)
                    // 2. 使用自己提供的备用方案
                    // todo
                } else {
                    // 正常模式
                    // ctx.request.session.fallback = false;
                    ctx.cookies.set('fallback',false)
                    resolve(data)
                }
            });
        })
    }

    //构建上传策略函数
    async validate(ctx) {
        return new Promise((resolve, reject)=> {
            // 对ajax提供的验证凭证进行二次验证
            this.captcha.validate(ctx.cookies.get('fallback'), {
                geetest_challenge: ctx.request.body.geetest_challenge,
                geetest_validate: ctx.request.body.geetest_validate,
                geetest_seccode: ctx.request.body.geetest_seccode
            }, (err, success) => {

                if (err) {
                    // 网络错误
                    console.log(err)
                    resolve(0)

                } else if (!success) {
                    // 二次验证失败
                    console.log('fail 验证失败')
                    resolve(0)
                } else {
                    resolve(1)
                }
            });
        })
    }

   
}

module.exports = new geetest()

