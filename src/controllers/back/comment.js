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
            let pageNo   = ctx.request.body.pageNo || 1
            let pageSize = ctx.request.body.pageSize || SYSTEM.PAGESIZE

            let datas = {
                totalNum:0,
                datalist:[],
                pageNo:pageNo,
                pageSize:pageSize
            };

            // ----------------   查询总条数 sql   -------------------------
            let totalSql = getsql.SELECT({
                table: 'comment',
                iscount: true,
            })
            let totalNum = (await mysql(totalSql))[0]['COUNT(*)']

            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.SELECT({
                table: 'comment',
                sort: 'id',
                isdesc: true,
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

    // 编辑分类
    async editComment(ctx){
        try {
            let id          = ctx.request.body.id
            let text    = ctx.request.body.text

            if(!id || !text){
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全"
                });
                return;
            }

            // 修改
            let sql = getsql.UPDATE({
                table: 'comment',
                fields: [ {text} ],
                wheres: [ {id} ]
            })
           
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
    async deleteComment(ctx){
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
                table:'comment',
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