import moment from 'moment'
import {
    SYSTEM
} from '../../config'
import {
    util,
    mysql,
    getsql,
} from '../../tool'

class detail {

    //初始化对象
    constructor() {

    };

    // 退出登录
    async userLoginOut(ctx){
        ctx.cookies.set('npm-username','')
        ctx.cookies.set('npm-secretKey','')
        ctx.body = util.result({
            data: 'OK'
        });
    }

    async userLogin(ctx){
        try {
            let username = ctx.request.body.username
            let password = ctx.request.body.password
            let userMsg={
                username:SYSTEM.USERMSG.USERNAME,
                password:SYSTEM.USERMSG.PASSWORD
            }

            if(!username || !password){
                ctx.body = util.result({
                    code: 1001,
                    desc: '参数有误!'
                });
                return
            }

            if(username != userMsg.username || password!=userMsg.password){
                ctx.body = util.result({
                    code: 1001,
                    desc: '用户名或者密码有误!'
                });
                return
            }

            let timestamp = new Date().getTime();
            let secretKey = util.signwx({
                username:username,
                password:password,
                timestamp:timestamp,
                random:util.randomString()
            }).paySign;

            ctx.cookies.set('npm-username',username)
            ctx.cookies.set('npm-secretKey',secretKey)

            ctx.body = util.result({
                data:{
                    username:username,
                    secretKey:secretKey
                }
            });

        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "参数错误"
            });
            return;
        }
    }
    

}

module.exports = new detail();

