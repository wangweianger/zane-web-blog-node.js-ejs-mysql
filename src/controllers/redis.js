
import tags from './front/tags'
import home from './front/home'
import redis from 'redis'  
const client = redis.createClient()  

class node_redis {
    constructor() {

    }
    //-----------------------------------首页redis缓存-----------------------------------
    // redis首页homedata
    getHomeDatasForRdis(){
    	try{
	    	return new Promise((resolve,reject)=>{
		    	client.get('my_blog_home_list',async (err,reply)=>{
		    		if(err){
		    			console.log(err)
		    			resolve({})
		    			return;
		    		}
		    		if(reply){
		    			let datas = JSON.parse(reply)
		    			resolve(datas)
		    		}else{
		    			let datas = await this.resetHomeDatas()
		    			resolve(datas)
		    		}
		    	})
	    	})
    	}catch(err){
    		console.log(err)
    		return new Promise((resolve,reject)=>{ resolve({}) })
    	}
    }
    // 重新设置首页redis缓存数据
    async resetHomeDatas(){
    	let tagsList    = await tags.getList()
		let atticleList = await home.getList()
		for(let i=0,len=atticleList.datalist.length;i<len;i++){
			for(let j=0,lenj=tagsList.length;j<lenj;j++){
				if(atticleList.datalist[i].tagid === tagsList[j].id){
					atticleList.datalist[i].tagname = tagsList[j].tagname
				}
			}
		};
    	client.set('my_blog_home_list',JSON.stringify(atticleList))
    	return atticleList
    }

    // 获得首页数据
    async getHomeData(pageNo,pageSize){
    	let atticleList = await this.getHomeDatasForRdis(pageNo,pageSize)
        return {
        	totalNum:atticleList.totalNum,
        	datalist:atticleList.datalist
        }
    };

    //-----------------------------------详情页redis缓存-----------------------------------
    // 通过redis获取详情页数据
    getDetailDataForRedis(id){
    	try{
	    	return new Promise((resolve,reject)=>{
		    	client.get(`my_blog_detail_data${id}`,async (err,reply)=>{
		    		if(err){
		    			console.log(err)
		    			resolve({})
		    			return;
		    		}
		    		if(reply){
		    			let datas = JSON.parse(reply)
		    			resolve(datas)
		    		}else{
		    			let datas = await this.resetDetailData(id)
		    			resolve(datas)
		    		}
		    	})
	    	})
    	}catch(err){
    		console.log(err)
    		return new Promise((resolve,reject)=>{ resolve({}) })
    	}
    }
    // 重新设置详情页redis缓存
    async resetDetailData(id){
    	let tagsList    = 	await tags.getList()
		let detail 		= 	await home.getItemDetail(id) 
		for(let j=0,lenj=tagsList.length;j<lenj;j++){
			if(detail.tagid === tagsList[j].id){
				detail.tagname = tagsList[j].tagname
			}
		}
		client.set(`my_blog_detail_data${id}`,JSON.stringify(detail))
		return detail
    }
    // 获得详情页数据
    async getDetailData(id){
    	let detail = await this.getDetailDataForRedis(id)
		return detail
    }
   
}

module.exports = new node_redis();
