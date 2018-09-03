import moment from 'moment'
import {
    SYSTEM
} from '../../config'
import {
    util,
    mysql,
    getsql,
} from '../../tool'
import redis from '../redis'

class detail {

    //初始化对象
    constructor() {

    };

    // 获取列表
    async getList(ctx) {
        try {
            let pageNo   = ctx.request.body.pageNo || 1
            let pageSize = ctx.request.body.pageSize || SYSTEM.PAGESIZE
            let isOnline = ctx.request.body.isOnline || ''
            let datas = {
                totalNum:0,
                datalist:[],
                pageNo:pageNo,
                pageSize:pageSize
            };

            console.log(datas)

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
                sort: 'id',
                isdesc: true,
                sort: 'id',
                isdesc: true,
                limit:{
                    pageNo:pageNo,
                    pageSize:pageSize,
                }
            });
            let result = await mysql(sql);

            if (result && result.length) {
                result.forEach((i,k) => {
                   i.createTime = moment(i.createTime).format('YYYY-MM-DD HH:mm:ss')
                })
            }

            datas.totalNum = totalNum;
            datas.datalist = result;
            ctx.body = util.result({
                data: datas
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

    // 获得单个文章详情
    async getItemDetail(ctx){
        try {
            let id=ctx.request.body.id

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
            
            ctx.body = util.result({
                data: result.length?result[0]:[]
            });

        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "服务错误"
            });
            return;
        }
    }

    // 删除文章
    async deleteGoods(ctx){
        try {
            let id=ctx.request.body.id

            if(!id){
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全"
                });
                return;
            }

            let sql = getsql.DELETE({
                table:'article',
                wheres:[{id}]
            })

            let result = await mysql(sql);

            // 更新首页redis缓存
            redis.resetHomeDatas()

            ctx.body = util.result({
                data: result
            });

        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "服务错误"
            });
            return;
        }
    }

    // 文章上下线
    async editOnline(ctx){
        try {
            let id = ctx.request.body.id
            let isOnline = ctx.request.body.isOnline

            if(!id){
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全"
                });
                return;
            }

            let sql = getsql.UPDATE({
                table:'article',
                fields:[{isOnline}],
                wheres:[{id}]
            })

            let result = await mysql(sql);

            // 更新首页redis缓存
            redis.resetHomeDatas()

            ctx.body = util.result({
                data: result
            });

        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "服务错误"
            });
            return;
        }
    }
    
    // 编辑文章
    async editGoods(ctx){
        try {
            let id          =   ctx.request.body.id
            let title       =   ctx.request.body.title
            let describes   =   ctx.request.body.describes
            let text        =   ctx.request.body.text
            let author      =   ctx.request.body.author
            let browse      =   ctx.request.body.browse
            let tagid       =   ctx.request.body.tagid
            let isOnline    =   ctx.request.body.isOnline
            let createTime  =   moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')

            if(!title || !text || !describes){
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全"
                });
                return;
            }

            let arr=[{title},{text}];
            if(describes) arr.push({describes});
            if(author) arr.push({author});
            if(browse) arr.push({browse});
            if(tagid) arr.push({tagid});
            if(isOnline+'') arr.push({isOnline});

            let sql = ""
            if (id) {
                // 表示修改
                sql = getsql.UPDATE({
                    table: 'article',
                    fields: arr,
                    wheres: [{
                        id
                    }]
                })
            } else {
                // 表示新增
                arr.push({createTime});
                sql = getsql.INSERT({
                    table: 'article',
                    fields: arr,
                })
            }

            let result = await mysql(sql)

            // 更新首页redis缓存
            redis.resetHomeDatas()
            //更新详情页redis缓存
            redis.resetDetailData(result.insertId || id)

            ctx.body = util.result({
                data: result
            });

        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "服务错误"
            });
            return;
        }
    }


    

}

module.exports = new detail();