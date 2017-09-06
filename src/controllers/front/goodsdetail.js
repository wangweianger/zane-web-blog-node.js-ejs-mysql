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

    // 获得单个商品详情
    async getItemDetail(id){
        try {

            let sql = getsql.SELECT({
                table:'goods',
                wheres:[{id}]
            })

            let result = await mysql(sql);
            
            return result.length?result[0]:{}
 
        } catch (err) {
            console.log(err)
            return '';
        }
    }

    // 获得说明详情
    async getExplain(){
        try {
            let id = 1
            let sql = getsql.SELECT({
                table:'explain',
                wheres:[{id}]
            })
            let result = await mysql(sql);
            return result[0].bayexplain
        } catch (err) {
            console.log(err)
            return '';
        }
    }

}

module.exports = new detail();

