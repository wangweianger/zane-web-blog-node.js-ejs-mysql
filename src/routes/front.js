//前端路由
import KoaRouter from 'koa-router'
import controllers from '../controllers'
import moment from 'moment'
import {
	SYSTEM
} from '../config'
const router = new KoaRouter()

// 请求接口校验中间件
const checkfn = controllers.common.checkRequestUrl;

/*-------------------------------------首页相关-----------------------------------------------*/

/*首页页面*/
router.get(['/'], async(ctx, next) => {

	let datas = {
		title:'zane 的博客',
		imgBase:SYSTEM.BASEIMG,
		pageNo:1,
		pageSize:0,
		totalNum:0,
		datalist:[],
	}

	let pageNo 			= 	ctx.query.pageNo || 1;
	let pageSize 		= 	SYSTEM.PAGESIZE

	let tagsList    = await controllers.front.tags.getList()
	let atticleList = await controllers.front.home.getList(pageNo,pageSize)

	for(let i=0,len=atticleList.datalist.length;i<len;i++){
		for(let j=0,lenj=tagsList.length;j<lenj;j++){
			if(atticleList.datalist[i].tagid === tagsList[j].id){
				atticleList.datalist[i].tagname = tagsList[j].tagname
			}
		}
	};

	datas.pageNo 	= 	pageNo
	datas.pageSize 	= 	pageSize
	datas.totalNum  = 	atticleList.totalNum
	datas.datalist  =   atticleList.datalist

	await ctx.render('front/index',{
		datas:datas
	}); 
});

// 归档
router.get(['/file'], async(ctx, next) => {
	let datas = {
		title:'按日期归档',
		imgBase:SYSTEM.BASEIMG,
		dataobj:{},
	}

	let atticleList = await controllers.front.file.getList()||[]

	atticleList.forEach(item=>{
		if(datas.dataobj[item.monthTime]){
			datas.dataobj[item.monthTime].push(item)
		}else{
			datas.dataobj[item.monthTime] = [item]
		}
		
	})
	
	console.log(JSON.stringify(datas))

	await ctx.render('front/file',{
		datas:datas
	});
})

// 标签
router.get(['/tags'], async(ctx, next) => {
	let datas = {
		title:'标签列表',
		imgBase:SYSTEM.BASEIMG,
		datalist:[],
	}

	datas.datalist = await controllers.front.tags.getList()

	await ctx.render('front/tags',{
		datas:datas
	});
})

// 友链
router.get(['/link'], async(ctx, next) => {
	let datas = {
		title:'友情链接',
		imgBase:SYSTEM.BASEIMG,
		datalist:[],
	}

	datas.datalist = await controllers.front.link.getList()
	console.log(datas)

	await ctx.render('front/link',{
		datas:datas
	});
})

// 关于我
router.get(['/about'], async(ctx, next) => {
	let datas = {
		title:'关于博主',
		imgBase:SYSTEM.BASEIMG,
	}

	await ctx.render('front/about',{
		datas:datas
	});
})

/*-------------------------------------列表相关-----------------------------------------------*/
/*列表页面*/
router.get(['/list'], async(ctx, next) => {
	let datas = {
		title:'前端开发 运维&测试 云计算&大数据 数据库 移动开发 各种视频分享学习',
		imgBase:SYSTEM.BASEIMG,
		tagsList:[],
		categoryList:[],
		goodsList:[],
		pageNo:0,
		pageSize:0,
		tagsid:null,
		categoryid:null,

	}

	let pageNo 			= 	ctx.query.pageNo || 1;
	let pageSize 		= 	ctx.query.pageSize || SYSTEM.PAGESIZE
	datas.tagsid		=	ctx.query.tagsid||''
	datas.categoryid	=	ctx.query.categoryid||''

	datas.tagsList		= 	await controllers.front.common.getTagsList()  
	datas.categoryList	= 	await controllers.front.common.getCategoryList()  

	let goodsList 	= 	await controllers.front.goodslist.getNewsList(datas.tagsid, datas.categoryid, pageNo, pageSize)

	datas.pageNo 	= 	goodsList.pageNo
	datas.totalNum 	= 	goodsList.totalNum
	datas.pageSize 	= 	goodsList.pageSize
	datas.goodsList = 	goodsList.datalist

	for(let i=0,len=datas.goodsList.length;i<len;i++){
		for(let j=0,lenj=datas.tagsList.length;j<lenj;j++){
			if(datas.goodsList[i].tagsid == datas.tagsList[j].id){
				datas.goodsList[i].tagName = datas.tagsList[j].tagname
			}
		}
		for(let k=0,lenk=datas.categoryList.length;k<lenk;k++){
			if(datas.goodsList[i].categoryid == datas.categoryList[k].id){
				datas.goodsList[i].categoryName = datas.categoryList[k].categoryname
			}
		}
	};

	await ctx.render('front/list',{
		datas:datas
	}); 
});

/*-------------------------------------内容相关-----------------------------------------------*/

/*详情页面*/
router.get(['/list/detail'], async(ctx, next) => {
	let datas = {
		title:'',
		describe: '',
		imgBase:SYSTEM.BASEIMG,
		detail:{},
		explain:'',
		recomList:[],
		categoryList:[],
	}
	let id 				= 	ctx.query.id || 1;

	let tagsList		= 	await controllers.front.common.getTagsList()  
	let categoryList	= 	await controllers.front.common.getCategoryList()
	datas.categoryList  = 	categoryList;

	datas.detail 	= 	await controllers.front.goodsdetail.getItemDetail(id) 
	datas.explain	=	await controllers.front.goodsdetail.getExplain() 
	datas.title		= 	datas.detail.title
	datas.describe	=	datas.detail.describes

	for(let j=0,lenj=tagsList.length;j<lenj;j++){
		if(datas.detail.tagsid == tagsList[j].id){
			datas.detail.tagName = tagsList[j].tagname
		}
	}
	for(let k=0,lenk=categoryList.length;k<lenk;k++){
		if(datas.detail.categoryid == categoryList[k].id){
			datas.detail.categoryName = categoryList[k].categoryname
		}
	}

	//获得推荐列表
	datas.recomList		=	await controllers.front.home.getHomeRecomList(4)  
	for(let i=0,len=datas.recomList.length;i<len;i++){
		for(let j=0,lenj=tagsList.length;j<lenj;j++){
			if(datas.recomList[i].tagsid == tagsList[j].id){
				datas.recomList[i].tagName = tagsList[j].tagname
			}
		}
		for(let k=0,lenk=categoryList.length;k<lenk;k++){
			if(datas.recomList[i].categoryid == categoryList[k].id){
				datas.recomList[i].categoryName = categoryList[k].categoryname
			}
		}
	};

	await ctx.render('front/detail',{
		datas:datas
	}); 
});

/*-------------------------------------搜索结果页-----------------------------------------------*/
router.get(['/list/search'], async(ctx, next) => {
	let datas = {
		title:'搜索商品结果',
		imgBase:SYSTEM.BASEIMG,
		tagsList:[],
		categoryList:[],
		goodsList:[],
		searchtext:null,
	}

	datas.searchtext	=	ctx.query.searchtext

	datas.tagsList		= 	await controllers.front.common.getTagsList()  
	datas.categoryList	= 	await controllers.front.common.getCategoryList()  

	let result 	= 	await controllers.front.goodslist.getSearchList(datas.searchtext)

	datas.goodsList = 	result

	for(let i=0,len=datas.goodsList.length;i<len;i++){
		for(let j=0,lenj=datas.tagsList.length;j<lenj;j++){
			if(datas.goodsList[i].tagsid == datas.tagsList[j].id){
				datas.goodsList[i].tagName = datas.tagsList[j].tagname
			}
		}
		for(let k=0,lenk=datas.categoryList.length;k<lenk;k++){
			if(datas.goodsList[i].categoryid == datas.categoryList[k].id){
				datas.goodsList[i].categoryName = datas.categoryList[k].categoryname
			}
		}
	};

	await ctx.render('front/search',{
		datas:datas
	}); 
});


module.exports = router






