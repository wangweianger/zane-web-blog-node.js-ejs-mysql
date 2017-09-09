import moment from 'moment'
import {
    SYSTEM
} from '../../config'
import {
    util,
    mysql,
    getsql,
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

 



    

}

module.exports = new atticle();

