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

    // 获取组件详情
    async getDetail(ctx) {
        try {

            let id = 1
            
            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.SELECT({
                table: 'explain',
                wheres:[{id}]
            });
            let result = await mysql(sql);
            let datas={};

            if(result.length){
                datas=result[0]
            }

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

    // 编辑详情
    async editItem(ctx){
        try {
            let id=1;
            let bayexplain = ctx.request.body.bayexplain

            if(!bayexplain){
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全"
                });
                return;
            }

            let sql = getsql.UPDATE({
                table:'explain',
                fields:[{bayexplain}],
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
                desc: "参数错误"
            });
            return;
        }
    }
   

    

}

module.exports = new detail();