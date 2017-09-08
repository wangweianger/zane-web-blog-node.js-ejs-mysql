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

    // 获取单页面列表
    async getList(ctx) {
        try {

            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.SELECT({
                table: 'onepage',
                sort: 'id',
                isdesc: true,
            });
            let result = await mysql(sql);

            ctx.body = util.result({
                data: result
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

    // 获得单个页面详情
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
                table:'onepage',
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

    // 编辑单页面
    async editOnepage(ctx){
        try {
            let id          = ctx.request.body.id
            let pageName    = ctx.request.body.pageName
            let pageText    = ctx.request.body.pageText

            if(!pageName || !pageText){
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全"
                });
                return;
            }

            let sql = ""
            if (id) {
                // 表示修改
                sql = getsql.UPDATE({
                    table: 'onepage',
                    fields: [{pageName},{pageText}],
                    wheres: [{id}]
                })
            } else {
                // 表示新增
                sql = getsql.INSERT({
                    table: 'onepage',
                    fields: [{pageName},{pageText}],
                })
            }

            let result = await mysql(sql)

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
   
    // 删除单页面
    async deleteOnepage(ctx){
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
                table:'onepage',
                wheres:[{id}]
            })

            let result = await mysql(sql);
            
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