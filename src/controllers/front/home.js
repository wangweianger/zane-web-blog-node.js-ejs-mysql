import moment from 'moment'
import {
    SYSTEM
} from '../../config'
import {
    util,
    mysql,
    getsql,
    gtsdk,
} from '../../tool'

class atticle {

    //初始化对象
    constructor() {

    };

    // 获取列表
    async getList(pageNos,pageSizes) {
        try {
            let pageNo   = pageNos || 1
            let pageSize = pageSizes || SYSTEM.PAGESIZE
            let isOnline =  1

            let datas = {
                totalNum:0,
                datalist:[],
                pageNo:pageNo,
                pageSize:pageSize
            };
            let arr=[]
            if(isOnline+'') arr.push({isOnline})

            // ----------------   查询总条数 sql   -------------------------
            let totalSql = getsql.SELECT({
                table: 'article',
                wheres:arr,
                iscount: true,
            })
            let totalNum = (await mysql(totalSql))[0]['COUNT(*)']

            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.SELECT({
                table: 'article',
                wheres:arr,
                fields:['id','title','describes','author','browse','createTime','tagid'],
                sort: 'id',
                isdesc: true,
                limit:{
                    pageNo:pageNo,
                    pageSize:pageSize,
                }
            });
            console.log(sql)
            let result = await mysql(sql);

            if (result && result.length) {
                result.forEach((i,k) => {
                   i.createTime = moment(i.createTime).format('YYYY-MM-DD HH:mm:ss')
                })
            }

            datas.totalNum = totalNum;
            datas.datalist = result;
            return datas
            
        } catch (err) {
            console.log(err)
            return {};
        }
    }

    // 获得单个文章详情
    async getItemDetail(id){
        try {
            if(!id){
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全"
                });
                return;
            }

            let sql = getsql.SELECT({
                table:'article',
                wheres:[{id}]
            })

            let result = await mysql(sql);

            if(result.length){
                let datas = result[0]
                datas.classTime     =   moment(datas.createTime).format('YYYY-MM-DD HH:mm:ss')
                datas.monthTime     =   moment(datas.createTime).format('YYYY年MM月DD日')
            }else{
                return {};
            }
            
            return result.length?result[0]:{}

        } catch (err) {
            console.log(err)
            return {};
        }
    }

 
    // 获得文章页评论列表
    async getCommentList(articleId){
        try{
            if(!articleId){
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全"
                });
                return;
            }
            let sql = getsql.SELECT({
                table:'comment',
                wheres:[{articleId}],
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

    // 极验验证 注册
    async gtRegister(ctx,next){
        let data = await gtsdk.register(ctx) 
        ctx.body = data   
    }

    // 极验验证 验证
    async gtValidate(ctx,next){
        try{
            let text        = ctx.request.body.text
            let articleId   = ctx.request.body.articleId
            let articleName = ctx.request.body.articleName
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
                fields:[{text},{articleId},{articleName},{createTime}],
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

