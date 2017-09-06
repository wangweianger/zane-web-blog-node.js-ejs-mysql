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

    // 获得列表
    async getNewsList(tagsid, categoryid, pageNo, pageSize) {
        try {
            pageSize = pageSize
            pageNo = pageNo
            let isOnline =1

            let arr=[];
            if(tagsid) arr.push({tagsid});
            if(categoryid) arr.push({categoryid});
            
            // ----------------   查询总条数 sql   -------------------------
            let totalSql = getsql.SELECT({
                table: 'goods',
                wheres: arr,
                iscount: true,
            })
            let totalNum = (await mysql(totalSql))[0]['COUNT(*)']

            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.SELECT({
                table: 'goods',
                fields:['id','title','category','difficulty','longtime','mainimg','oldprice','newprice','tagsid','categoryid','size'],
                wheres: arr,
                limit: {
                    pageNo,
                    pageSize
                },
                sort: 'id',
                isdesc: true,
            })
            let result = await mysql(sql)

            return {
                pageSize: pageSize,
                pageNo: pageNo,
                totalNum: totalNum,
                datalist: result,
            }
            
        } catch (err) {
            console.log(err)
            return ''
        }
    }

    //搜索列表
    async getSearchList(searchtext) {
        try {
            let isOnline =1
            let title = searchtext || ''

            let arr=[];
            if(title) arr.push({title,'like':true});
            
            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.SELECT({
                table: 'goods',
                fields:['id','title','category','difficulty','longtime','mainimg','oldprice','newprice','tagsid','categoryid','size'],
                wheres: arr,
            })
            let result = await mysql(sql)

            return result
            
        } catch (err) {
            console.log(err)
            return ''
        }
    }
}

module.exports = new detail();