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

    // 获取分类列表
    async getList(ctx) {
        try {

            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.SELECT({
                table: 'link',
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

    // 编辑分类
    async editLink(ctx){
        try {
            let id          = ctx.request.body.id
            let linkName    = ctx.request.body.linkName
            let lineHref    = ctx.request.body.lineHref

            if(!linkName || !lineHref){
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
                    table: 'link',
                    fields: [{linkName},{lineHref}],
                    wheres: [{id}]
                })
            } else {
                // 表示新增
                sql = getsql.INSERT({
                    table: 'link',
                    fields: [{linkName},{lineHref}],
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
   
    // 删除分类
    async deleteLink(ctx){
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
                table:'link',
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