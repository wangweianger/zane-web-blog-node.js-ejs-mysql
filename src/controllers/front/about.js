import moment from 'moment'
import {
    SYSTEM
} from '../../config'
import {
    util,
    mysql,
    getsql,
    gtsdk
} from '../../tool'

class atticle {

    //初始化对象
    constructor() {

    };

    // 获取列表
    async getAboutme(pageNos,pageSizes) {
        try {
            let id = 1;
            
            let sql = getsql.SELECT({
                table: 'onepage',
                wheres:[{id}],
            });

            let result = await mysql(sql);

            return result&&result.length?result[0]:{};
            
        } catch (err) {
            console.log(err)
            return [];
        }
    }

    // 获得单页面评论列表
    async getCommentList(pageId){
        try{
            if(!pageId){
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全"
                });
                return;
            }
            let sql = getsql.SELECT({
                table:'comment',
                wheres:[{pageId}],
                isdesc:true,
                sort:'id',
            })
            let result = await mysql(sql);

            if (result && result.length) {
                result.forEach((i,k) => {
                   i.createTime = moment(i.createTime).format('YYYY-MM-DD HH:mm:ss')
                })
            }

            return result;

        }catch(err){
            console.log(err)
            return []
        }
    }

    // 极验验证 验证
    async gtValidate(ctx,next){
        try{
            let text        = ctx.request.body.text
            let pageId      = ctx.request.body.pageId
            let pageName    = ctx.request.body.pageName
            let createTime  =   moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')

            let data = await gtsdk.validate(ctx) 

            if(!text){
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全"
                });
                return;
            }
            if(text.length>1000){
                ctx.body = util.result({
                    code: 1001,
                    desc: "评论内容太长!"
                });
                return;
            }

            let sql = getsql.INSERT({
                table:'comment',
                fields:[{text},{pageId},{pageName},{createTime}],
            })

            let result = await mysql(sql);

            if(data === 0){
                ctx.body = util.result({
                    code: 1001,
                    desc: "验证失败"
                });
            }else if(data === 1){
                ctx.body = util.result({
                    data: {
                        text:text,
                        createTime:moment(createTime).format('YYYY-MM-DD HH:mm:ss')
                    }
                });
            }
        }catch(err){
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "参数错误"
            });
        }
    }

}

module.exports = new atticle();

