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
            let isOnline = 1;
            
            let sql = getsql.SELECT({
                table: 'article',
                wheres:[{isOnline}],
                fields:['id','title','createTime'],
                sort: 'id',
                isdesc: true,
            });

            let result = await mysql(sql);

            if (result && result.length) {
                result.forEach((i,k) => {
                    i.classTime     =   moment(i.createTime).format('YYYY-MM-DD')
                    i.monthTime     =   moment(i.createTime).format('YYYY年MM月')
                })
            }
            
            return result
            
        } catch (err) {
            console.log(err)
            return [];
        }
    }

}

module.exports = new atticle();

