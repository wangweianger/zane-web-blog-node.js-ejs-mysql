//前端路由
import KoaRouter from 'koa-router'
import controllers from '../controllers'
import moment from 'moment'
import crypto from 'crypto'
import {
	SYSTEM
} from '../config'
const router = new KoaRouter()

// 请求接口校验中间件
const checkfn 		= 	controllers.common.checkRequestUrl;
const checkIsLogin  = 	controllers.common.checkIsLogin;

// 上传图片接口
router.post('/api/back/common/uploadImgs', controllers.common.uploadImgs)
// 编辑器上传图片
router.post('/upload', controllers.common.fwbUploadImgs)

/*--------------------------------------------首页相关-----------------------------------------------------------*/

/*后台首页*/
router.get(['/back/home'], async(ctx, next) => {

	let datas = {
		title:'后台首页',
	}
	
	await ctx.render('back/home',{
		datas:datas
	}); 

});

// 新增文章
router.get(['/back/add'], async(ctx, next) => {
	let datas = {
		title:'新增文章',
	}
	await ctx.render('back/add',{
		datas:datas
	}); 
});

// 获得文章列表
router.post('/api/back/goods/getList',checkIsLogin, controllers.back.home.getList)

// 删除文章
router.post('/api/back/goods/deleteGoods',checkIsLogin, controllers.back.home.deleteGoods)

// 新增文章
router.post('/api/back/goods/editGoods',checkIsLogin, controllers.back.home.editGoods)

// 获得文章详情
router.post('/api/back/goods/getItemDetail',checkIsLogin, controllers.back.home.getItemDetail)

// 文章上下架
router.post('/api/back/goods/editOnline',checkIsLogin, controllers.back.home.editOnline)

/*--------------------------------------------分类相关-----------------------------------------------------------*/

// 友链列表
router.get(['/back/link'], async(ctx, next) => {
	let datas = {
		title:'友链列表',
	}
	await ctx.render('back/link',{
		datas:datas
	}); 
});

// 获得友链列表
router.post('/api/back/link/getList',checkIsLogin, controllers.back.link.getList)

//编辑友链 
router.post('/api/back/link/editLink',checkIsLogin, controllers.back.link.editLink)

// 删除友链
router.post('/api/back/link/deleteLink',checkIsLogin, controllers.back.link.deleteLink)


/*--------------------------------------------标签相关-----------------------------------------------------------*/

// 标签列表
router.get(['/back/tags'], async(ctx, next) => {
	let datas = {
		title:'标签列表',
	}
	await ctx.render('back/tags',{
		datas:datas
	}); 
});

// 获得标签列表
router.post('/api/back/tags/getList',checkIsLogin, controllers.back.tags.getList)

// 编辑标签
router.post('/api/back/tags/editTags',checkIsLogin, controllers.back.tags.editTags)

// 删除标签
router.post('/api/back/tags/deleteTags',checkIsLogin, controllers.back.tags.deleteTags)


/*--------------------------------------------评论列表-----------------------------------------------------------*/
// 评论列表
router.get(['/back/comment'], async(ctx, next) => {
	let datas = {
		title:'评论列表',
	}
	await ctx.render('back/comment',{
		datas:datas
	}); 
});

// 获得评论列表
router.post('/api/back/comment/getList',checkIsLogin, controllers.back.comment.getList)

// 编辑评论
router.post('/api/back/comment/editComment',checkIsLogin, controllers.back.comment.editComment)

// 删除评论
router.post('/api/back/comment/deleteComment',checkIsLogin, controllers.back.comment.deleteComment)

/*--------------------------------------------单页面-----------------------------------------------------------*/
// 单页面列表
router.get(['/back/onepages'], async(ctx, next) => {
	let datas = {
		title:'单页面',
	}
	await ctx.render('back/onepages',{
		datas:datas
	}); 
});
// 新增单页
router.get(['/back/addonepage'], async(ctx, next) => {
	let datas = {
		title:'新增单页',
	}
	await ctx.render('back/addonepage',{
		datas:datas
	}); 
});

// 获得单页面列表
router.post('/api/back/onepages/getList',checkIsLogin, controllers.back.onepages.getList)

// 获得单页面详情
router.post('/api/back/onepages/getItemDetail',checkIsLogin, controllers.back.onepages.getItemDetail)

// 编辑单页面
router.post('/api/back/onepages/editOnepage',checkIsLogin, controllers.back.onepages.editOnepage)

// 删除单页面
router.post('/api/back/onepages/deleteOnepage',checkIsLogin, controllers.back.onepages.deleteOnepage)

/*--------------------------------------------用户相关-----------------------------------------------------------*/

/*登录页面*/
router.get(['/back/login'], async(ctx, next) => {
	let datas = {
		title:'后台登录',
	}
	await ctx.render('back/login',{
		datas:datas
	}); 
});

// 退出登录
router.post('/api/back/user/userLoginOut',checkIsLogin, controllers.back.user.userLoginOut)

// 用户登录
router.post('/api/back/user/userLogin',checkfn, controllers.back.user.userLogin)



module.exports = router






