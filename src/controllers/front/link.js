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

    // 获取标签列表
    async getList(ctx) {
        try {

            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.SELECT({
                table: 'link',
                sort: 'id',
                isdesc: true,
            });
            let result = await mysql(sql);

            return result;
            
        } catch (err) {
            console.log(err)
            return {};
        }
    }

}

module.exports = new detail();

